-- Create user_birth_data table to persist birth details and natal charts
CREATE TABLE IF NOT EXISTS user_birth_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Birth details
  birth_date DATE NOT NULL,
  birth_time TIME,
  birth_time_confidence TEXT NOT NULL DEFAULT 'unknown',

  -- Birth place
  birth_city TEXT NOT NULL,
  birth_country TEXT NOT NULL,
  birth_latitude DECIMAL(10, 7) NOT NULL,
  birth_longitude DECIMAL(10, 7) NOT NULL,
  birth_timezone TEXT NOT NULL,

  -- Calculated natal chart (stored as JSON)
  natal_chart JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One birth data record per user
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_birth_data ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own data
CREATE POLICY "Users can read own birth data"
  ON user_birth_data
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own data
CREATE POLICY "Users can insert own birth data"
  ON user_birth_data
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own birth data"
  ON user_birth_data
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_user_birth_data_user_id ON user_birth_data(user_id);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on row update
CREATE TRIGGER update_user_birth_data_updated_at
  BEFORE UPDATE ON user_birth_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
