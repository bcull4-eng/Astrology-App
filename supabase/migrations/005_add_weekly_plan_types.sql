-- Add weekly plan types and intro offer tracking
-- Supports the new pricing model: £2 intro week -> £4.99/week recurring

-- Step 1: Drop and recreate the plan_type CHECK constraint to include weekly types
-- Keep 'monthly' for existing records
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_plan_type_check;
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_plan_type_check
  CHECK (plan_type IN ('monthly', 'weekly', 'weekly_intro', 'annual', 'lifetime'));

-- Step 2: Add intro_offer_used flag to track whether a user has used the intro offer
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS intro_offer_used BOOLEAN DEFAULT FALSE;

-- Step 3: Add stripe_schedule_id to track the Subscription Schedule for intro->weekly transition
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_schedule_id TEXT;

-- Index for schedule lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_schedule_id ON subscriptions(stripe_schedule_id);
