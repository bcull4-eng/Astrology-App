-- Create generated_reports table for storing user's generated reports
CREATE TABLE IF NOT EXISTS generated_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Report identification
  report_slug TEXT NOT NULL,
  report_title TEXT NOT NULL,

  -- The full generated report content (stored as JSONB)
  report_content JSONB NOT NULL,

  -- Metadata
  word_count INTEGER,
  partner_name TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Each user can only have one version of each report
  UNIQUE(user_id, report_slug)
);

-- Enable RLS
ALTER TABLE generated_reports ENABLE ROW LEVEL SECURITY;

-- Users can only access their own reports
CREATE POLICY "Users can view their own reports"
  ON generated_reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reports"
  ON generated_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reports"
  ON generated_reports FOR UPDATE
  USING (auth.uid() = user_id);

-- Index for faster lookups
CREATE INDEX idx_generated_reports_user_id ON generated_reports(user_id);
CREATE INDEX idx_generated_reports_user_slug ON generated_reports(user_id, report_slug);
