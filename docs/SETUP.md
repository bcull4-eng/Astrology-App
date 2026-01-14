# Setup Checklist

Complete these steps to prepare the project for development.

---

## 1. Install Dependencies

```bash
# Core dependencies
npm install @supabase/supabase-js @supabase/ssr

# Payments
npm install stripe @stripe/stripe-js

# Validation & utilities
npm install zod date-fns

# UI components (choose one)
npx shadcn@latest init
# OR
npm install @headlessui/react @heroicons/react
```

---

## 2. Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in all required values (see sections below)

---

## 3. Supabase Setup

### Create Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy the project URL and anon key to `.env.local`
3. Copy the service role key (Settings → API) to `.env.local`

### Database Schema
Run these SQL commands in the Supabase SQL editor:

```sql
-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  subscription_status text default 'free' check (subscription_status in ('free', 'pro', 'expired')),
  subscription_expires_at timestamptz,
  stripe_customer_id text,
  created_at timestamptz default now()
);

-- Birth data
create table public.birth_data (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  birth_date date not null,
  birth_time time,
  birth_time_confidence text check (birth_time_confidence in ('exact', 'approximate', 'unknown')),
  birth_place_city text not null,
  birth_place_country text not null,
  birth_place_latitude numeric not null,
  birth_place_longitude numeric not null,
  birth_place_timezone text not null,
  created_at timestamptz default now(),
  unique(user_id)
);

-- User preferences
create table public.user_preferences (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  focus_areas text[] default '{}',
  current_location_city text,
  current_location_country text,
  current_location_latitude numeric,
  current_location_longitude numeric,
  current_location_timezone text,
  email_notifications_enabled boolean default true,
  push_notifications_enabled boolean default false,
  daily_guidance_enabled boolean default true,
  theme_change_enabled boolean default true,
  created_at timestamptz default now(),
  unique(user_id)
);

-- Cached natal charts
create table public.natal_charts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  chart_data jsonb not null,
  calculated_at timestamptz default now(),
  birth_data_hash text not null,
  unique(user_id)
);

-- Cached synthesised themes
create table public.synthesised_themes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  is_primary boolean default false,
  theme_data jsonb not null,
  last_updated_at timestamptz default now()
);

-- Cached synastry results
create table public.synastry_results (
  id uuid default gen_random_uuid() primary key,
  user_a_id uuid references public.profiles on delete cascade not null,
  user_b_id uuid not null,
  partner_birth_data_hash text not null,
  synastry_data jsonb not null,
  calculated_at timestamptz default now(),
  unique(user_a_id, partner_birth_data_hash)
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.birth_data enable row level security;
alter table public.user_preferences enable row level security;
alter table public.natal_charts enable row level security;
alter table public.synthesised_themes enable row level security;
alter table public.synastry_results enable row level security;

-- Policies (users can only access their own data)
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view own birth data" on public.birth_data for select using (auth.uid() = user_id);
create policy "Users can insert own birth data" on public.birth_data for insert with check (auth.uid() = user_id);
create policy "Users can update own birth data" on public.birth_data for update using (auth.uid() = user_id);

create policy "Users can view own preferences" on public.user_preferences for select using (auth.uid() = user_id);
create policy "Users can insert own preferences" on public.user_preferences for insert with check (auth.uid() = user_id);
create policy "Users can update own preferences" on public.user_preferences for update using (auth.uid() = user_id);

create policy "Users can view own natal chart" on public.natal_charts for select using (auth.uid() = user_id);
create policy "Users can insert own natal chart" on public.natal_charts for insert with check (auth.uid() = user_id);
create policy "Users can update own natal chart" on public.natal_charts for update using (auth.uid() = user_id);

create policy "Users can view own themes" on public.synthesised_themes for select using (auth.uid() = user_id);
create policy "Users can insert own themes" on public.synthesised_themes for insert with check (auth.uid() = user_id);
create policy "Users can update own themes" on public.synthesised_themes for update using (auth.uid() = user_id);
create policy "Users can delete own themes" on public.synthesised_themes for delete using (auth.uid() = user_id);

create policy "Users can view own synastry" on public.synastry_results for select using (auth.uid() = user_a_id);
create policy "Users can insert own synastry" on public.synastry_results for insert with check (auth.uid() = user_a_id);
create policy "Users can update own synastry" on public.synastry_results for update using (auth.uid() = user_a_id);
create policy "Users can delete own synastry" on public.synastry_results for delete using (auth.uid() = user_a_id);

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### Enable Auth Providers
1. Go to Authentication → Providers in Supabase dashboard
2. Enable Email provider (at minimum)
3. Configure redirect URLs for your app

---

## 4. Stripe Setup

### Create Account & Products
1. Go to [stripe.com](https://stripe.com) and create an account
2. Create a product called "Pro Subscription"
3. Add a price: £20/month recurring
4. Copy the price ID to `.env.local` as `STRIPE_PRICE_ID`

### API Keys
1. Go to Developers → API Keys
2. Copy the publishable key to `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy the secret key to `STRIPE_SECRET_KEY`

### Webhook Setup
1. Go to Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

For local development:
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 5. Astrology API Setup (Phase 1)

Choose and configure an astrology calculation API:

**Options:**
- [AstrologyAPI](https://www.astrologyapi.com/)
- [Prokerala](https://api.prokerala.com/)
- Custom Swiss Ephemeris wrapper

Add credentials to `.env.local`:
```
ASTROLOGY_API_KEY=your_key
ASTROLOGY_API_BASE_URL=https://api.provider.com
```

---

## 6. Verify Setup

```bash
# Check TypeScript compiles
npm run build

# Start development server
npm run dev
```

Visit `http://localhost:3000` to verify the app loads.

---

## 7. Development Order (Recommended)

### Phase 1: Core Infrastructure
1. [ ] Supabase client setup (`src/lib/supabase/`)
2. [ ] Auth flow (sign up, sign in, sign out)
3. [ ] Stripe provider implementation
4. [ ] Astrology API provider implementation

### Phase 2: Onboarding Flow
1. [ ] Birth details form with location autocomplete
2. [ ] Focus areas selection
3. [ ] Calculation screen with loading state
4. [ ] Free insight display
5. [ ] Paywall with Stripe checkout

### Phase 3: Transit Scoring Engine
1. [ ] Planet weight calculations
2. [ ] Aspect weight calculations
3. [ ] Orb scoring
4. [ ] Theme derivation logic
5. [ ] Unit tests for all scoring functions

### Phase 4: Theme Synthesis
1. [ ] Transit grouping by theme
2. [ ] Primary theme selection
3. [ ] Composite date range calculation
4. [ ] Intensity curve generation
5. [ ] Description generation

### Phase 5: Dashboard
1. [ ] Primary theme card
2. [ ] Intensity timeline visualization
3. [ ] Secondary influences (collapsed)
4. [ ] Life area filters
5. [ ] Daily guidance display
6. [ ] Upcoming view

### Phase 6: Synastry
1. [ ] Partner birth data input
2. [ ] Synastry aspect scoring
3. [ ] Results display

### Phase 7: Polish
1. [ ] Update cadence enforcement
2. [ ] Notification preferences
3. [ ] Settings screen
4. [ ] Error handling
5. [ ] Loading states

---

## File Structure Reference

```
src/
├── app/
│   ├── (onboarding)/
│   │   ├── birth-details/
│   │   ├── focus-areas/
│   │   ├── calculating/
│   │   ├── free-insight/
│   │   └── paywall/
│   ├── dashboard/
│   │   └── upcoming/
│   ├── synastry/
│   │   └── results/
│   ├── settings/
│   └── api/
│       └── webhooks/
│           └── stripe/
├── components/
├── hooks/
├── lib/
├── providers/
├── services/
│   ├── astrology/
│   ├── cadence/
│   ├── guidance/
│   ├── scoring/
│   ├── synastry/
│   └── synthesis/
├── store/
└── types/
```
