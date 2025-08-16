-- Add first_name column to newsletter_subscriptions table
ALTER TABLE public.newsletter_subscriptions 
ADD COLUMN first_name TEXT;