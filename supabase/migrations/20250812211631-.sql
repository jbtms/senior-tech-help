-- Secure newsletter_subscriptions reads while keeping public inserts working

-- 1) Ensure Row Level Security is enabled (idempotent)
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- 2) Allow SELECT only for authenticated users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'newsletter_subscriptions'
      AND policyname = 'Authenticated users can read newsletter subscriptions'
  ) THEN
    CREATE POLICY "Authenticated users can read newsletter subscriptions"
    ON public.newsletter_subscriptions
    FOR SELECT
    TO authenticated
    USING (true);
  END IF;
END $$;
