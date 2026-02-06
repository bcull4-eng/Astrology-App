-- Migration: Create user_onboarding_profile table
-- Purpose: Store expanded quiz data from onboarding V2 flow

-- Create user_onboarding_profile table
CREATE TABLE IF NOT EXISTS user_onboarding_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  gender TEXT,
  relationship_status TEXT,
  future_goals TEXT[] DEFAULT '{}',
  color_preference TEXT,
  element_preference TEXT,
  palm_reading_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_onboarding_profile_user_id
ON user_onboarding_profile(user_id);

-- Enable RLS
ALTER TABLE user_onboarding_profile ENABLE ROW LEVEL SECURITY;

-- RLS policies: Users can only access their own profile
CREATE POLICY "Users can view own onboarding profile"
  ON user_onboarding_profile FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own onboarding profile"
  ON user_onboarding_profile FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding profile"
  ON user_onboarding_profile FOR UPDATE
  USING (auth.uid() = user_id);

-- Create user_natal_charts table if not exists
-- (May already exist from chart generation, adding upsert-friendly structure)
CREATE TABLE IF NOT EXISTS user_natal_charts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  sun_sign TEXT,
  moon_sign TEXT,
  ascendant TEXT,
  chart_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index and RLS for user_natal_charts
CREATE INDEX IF NOT EXISTS idx_user_natal_charts_user_id
ON user_natal_charts(user_id);

ALTER TABLE user_natal_charts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own natal charts"
  ON user_natal_charts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own natal charts"
  ON user_natal_charts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own natal charts"
  ON user_natal_charts FOR UPDATE
  USING (auth.uid() = user_id);

-- Add updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_user_onboarding_profile_updated_at ON user_onboarding_profile;
CREATE TRIGGER update_user_onboarding_profile_updated_at
  BEFORE UPDATE ON user_onboarding_profile
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_natal_charts_updated_at ON user_natal_charts;
CREATE TRIGGER update_user_natal_charts_updated_at
  BEFORE UPDATE ON user_natal_charts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
