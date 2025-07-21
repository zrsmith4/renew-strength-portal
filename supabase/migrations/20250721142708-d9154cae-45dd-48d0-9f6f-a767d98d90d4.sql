-- Create tables for public form submissions (no auth required)
CREATE TABLE public.public_consent_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  agreed BOOLEAN NOT NULL DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.public_financial_policy_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  agreed BOOLEAN NOT NULL DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.public_dry_needling_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  is_pregnant BOOLEAN NOT NULL,
  has_blood_borne_illness BOOLEAN NOT NULL,
  fear_of_needles BOOLEAN NOT NULL,
  on_immunosuppressant BOOLEAN NOT NULL,
  agreed BOOLEAN NOT NULL DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public inserts
ALTER TABLE public.public_consent_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_financial_policy_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_dry_needling_forms ENABLE ROW LEVEL SECURITY;

-- Public can submit forms
CREATE POLICY "Anyone can submit consent forms" 
ON public.public_consent_forms 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit financial policy forms" 
ON public.public_financial_policy_forms 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit dry needling forms" 
ON public.public_dry_needling_forms 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view submissions
CREATE POLICY "Admins can view consent form submissions" 
ON public.public_consent_forms 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "Admins can view financial policy submissions" 
ON public.public_financial_policy_forms 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "Admins can view dry needling submissions" 
ON public.public_dry_needling_forms 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));