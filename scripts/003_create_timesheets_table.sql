-- Create timesheets table for tracking work hours
CREATE TABLE IF NOT EXISTS public.timesheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.timesheets ENABLE ROW LEVEL SECURITY;

-- Create index for better performance
CREATE INDEX idx_timesheets_user_id ON public.timesheets(user_id);
CREATE INDEX idx_timesheets_date ON public.timesheets(date);

-- Row Level Security Policies
CREATE POLICY "Users can view their own timesheets" ON public.timesheets
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own timesheets" ON public.timesheets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending timesheets" ON public.timesheets
  FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pending timesheets" ON public.timesheets
  FOR DELETE
  USING (auth.uid() = user_id AND status = 'pending');

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_timesheets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER timesheets_updated_at_trigger
  BEFORE UPDATE ON public.timesheets
  FOR EACH ROW
  EXECUTE FUNCTION update_timesheets_updated_at();
