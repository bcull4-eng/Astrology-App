-- Create leads table for storing onboarding data before signup
-- This captures email and quiz answers for users who haven't converted yet

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  gender TEXT,
  birth_date DATE,
  birth_time TIME,
  birth_time_known BOOLEAN DEFAULT true,
  birth_place JSONB,
  relationship_status TEXT,
  future_goals TEXT[] DEFAULT '{}',
  color_preference TEXT,
  element_preference TEXT,
  palm_reading_data JSONB,
  natal_chart_data JSONB,
  profile_data JSONB,
  source TEXT DEFAULT 'onboarding_v2',
  converted_at TIMESTAMPTZ,
  converted_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Index for unconverted leads (for marketing)
CREATE INDEX IF NOT EXISTS idx_leads_unconverted ON leads(converted_at) WHERE converted_at IS NULL;

-- RLS policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (for API routes)
CREATE POLICY "Service role full access" ON leads
  FOR ALL
  USING (auth.role() = 'service_role');

-- Authenticated users can view their own lead record (after conversion)
CREATE POLICY "Users can view own lead" ON leads
  FOR SELECT
  USING (auth.uid() = converted_user_id);
