-- Create/update helper function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prevent duplicate emails (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_unique_email ON public.newsletter_subscriptions (lower(email));

-- Enable RLS and policies
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon or authenticated) to INSERT, but no SELECT/UPDATE/DELETE by default
DROP POLICY IF EXISTS "Anyone can subscribe (insert)" ON public.newsletter_subscriptions;
CREATE POLICY "Anyone can subscribe (insert)"
  ON public.newsletter_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Auto-update updated_at
DROP TRIGGER IF EXISTS trg_newsletter_updated_at ON public.newsletter_subscriptions;
CREATE TRIGGER trg_newsletter_updated_at
BEFORE UPDATE ON public.newsletter_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Session requests table
CREATE TABLE IF NOT EXISTS public.session_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  details TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Basic indexes for lookups
CREATE INDEX IF NOT EXISTS idx_session_requests_created_at ON public.session_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_session_requests_email ON public.session_requests (lower(email));

-- Enable RLS and policies
ALTER TABLE public.session_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can request a session (insert)" ON public.session_requests;
CREATE POLICY "Anyone can request a session (insert)"
  ON public.session_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Auto-update updated_at
DROP TRIGGER IF EXISTS trg_session_requests_updated_at ON public.session_requests;
CREATE TRIGGER trg_session_requests_updated_at
BEFORE UPDATE ON public.session_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();