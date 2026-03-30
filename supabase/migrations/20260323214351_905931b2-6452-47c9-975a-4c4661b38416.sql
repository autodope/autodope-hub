
-- Create booking_requests table
CREATE TABLE public.booking_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  member TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public booking form)
CREATE POLICY "Anyone can submit a booking request"
  ON public.booking_requests
  FOR INSERT
  WITH CHECK (true);

-- No public read access to protect customer data
CREATE POLICY "No public read access"
  ON public.booking_requests
  FOR SELECT
  USING (false);
