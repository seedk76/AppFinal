/*
  # Add Demo Services

  1. New Data
    - Add 5 demo service providers with realistic data
    - Add services for each provider
  
  2. Changes
    - Insert demo data into service_providers and services tables
*/

-- Insert demo service providers
INSERT INTO service_providers (user_id, business_name, category, description, address, rating)
SELECT 
  auth.uid(),
  business_name,
  category,
  description,
  address,
  rating
FROM (VALUES
  ('Luxe Hair Studio', 'Hair Salon', 'Premium hair styling and coloring services', '789 Fashion Ave, Los Angeles', 4.9),
  ('Zen Massage & Spa', 'Spa', 'Relaxing therapeutic massages and wellness treatments', '456 Wellness Blvd, Los Angeles', 4.8),
  ('The Barber Club', 'Barber', 'Traditional barbering with modern style', '123 Main St, Los Angeles', 4.7),
  ('Pure Nails & Beauty', 'Nail Salon', 'Luxury nail care and beauty treatments', '567 Beauty Lane, Los Angeles', 4.8),
  ('Glow Beauty Lab', 'Beauty Salon', 'Advanced skincare and beauty treatments', '890 Glow Street, Los Angeles', 4.6)
) AS v(business_name, category, description, address, rating)
WHERE NOT EXISTS (
  SELECT 1 FROM service_providers WHERE business_name = v.business_name
);