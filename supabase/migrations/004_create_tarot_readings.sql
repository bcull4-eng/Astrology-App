-- Create tarot_readings table for storing user's tarot readings
CREATE TABLE IF NOT EXISTS tarot_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Reading details
  reading_type TEXT NOT NULL,
  question TEXT,
  cards JSONB NOT NULL,
  interpretation TEXT NOT NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tarot_readings ENABLE ROW LEVEL SECURITY;

-- Users can only access their own readings
CREATE POLICY "Users can view their own tarot readings"
  ON tarot_readings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tarot readings"
  ON tarot_readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Indexes for faster lookups
CREATE INDEX idx_tarot_readings_user_id ON tarot_readings(user_id);
CREATE INDEX idx_tarot_readings_user_date ON tarot_readings(user_id, created_at DESC);
