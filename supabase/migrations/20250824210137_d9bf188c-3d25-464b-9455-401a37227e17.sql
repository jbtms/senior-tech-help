-- Fix security vulnerability: Restrict newsletter subscription reading to admin users only
DROP POLICY IF EXISTS "Authenticated users can read newsletter subscriptions" ON public.newsletter_subscriptions;

-- Create new policy that only allows admin users to read newsletter subscriptions
CREATE POLICY "Only admins can read newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));