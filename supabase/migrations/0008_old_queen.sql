/*
  # Add Demo Service Providers and Services

  1. New Data
    - Create demo users for service providers
    - Add service providers with realistic data
    - Add services for each provider
  
  2. Changes
    - Insert demo users into auth.users
    - Insert providers into service_providers table
    - Insert services into services table
*/

DO $$
DECLARE
  luxe_user_id uuid := gen_random_uuid();
  zen_user_id uuid := gen_random_uuid();
  barber_user_id uuid := gen_random_uuid();
  nails_user_id uuid := gen_random_uuid();
  glow_user_id uuid := gen_random_uuid();
BEGIN
  -- Create demo users
  INSERT INTO auth.users (id, email)
  VALUES 
    (luxe_user_id, 'luxe.hair@example.com'),
    (zen_user_id, 'zen.spa@example.com'),
    (barber_user_id, 'barber.club@example.com'),
    (nails_user_id, 'pure.nails@example.com'),
    (glow_user_id, 'glow.lab@example.com');

  -- Insert service providers
  INSERT INTO service_providers 
    (user_id, business_name, category, description, address, rating)
  VALUES 
    (luxe_user_id, 'Luxe Hair Studio', 'Hair Salon', 'Premium hair styling and coloring services', '789 Fashion Ave, Los Angeles', 4.9),
    (zen_user_id, 'Zen Massage & Spa', 'Spa', 'Relaxing therapeutic massages and wellness treatments', '456 Wellness Blvd, Los Angeles', 4.8),
    (barber_user_id, 'The Barber Club', 'Barber', 'Traditional barbering with modern style', '123 Main St, Los Angeles', 4.7),
    (nails_user_id, 'Pure Nails & Beauty', 'Nail Salon', 'Luxury nail care and beauty treatments', '567 Beauty Lane, Los Angeles', 4.8),
    (glow_user_id, 'Glow Beauty Lab', 'Beauty Salon', 'Advanced skincare and beauty treatments', '890 Glow Street, Los Angeles', 4.6);

  -- Insert services for each provider
  INSERT INTO services (provider_id, name, description, price, duration)
  SELECT 
    sp.id,
    s.name,
    s.description,
    s.price,
    s.duration::interval
  FROM service_providers sp
  CROSS JOIN (VALUES
    ('Luxe Hair Studio', 'Haircut & Style', 'Professional haircut and styling', 65, '60 minutes'),
    ('Luxe Hair Studio', 'Color & Highlights', 'Full color treatment with highlights', 150, '120 minutes'),
    ('Zen Massage & Spa', 'Swedish Massage', 'Relaxing full body massage', 90, '60 minutes'),
    ('Zen Massage & Spa', 'Deep Tissue Massage', 'Therapeutic deep tissue treatment', 110, '60 minutes'),
    ('The Barber Club', 'Classic Haircut', 'Traditional men''s haircut', 35, '30 minutes'),
    ('The Barber Club', 'Beard Trim & Shape', 'Professional beard grooming', 25, '20 minutes'),
    ('Pure Nails & Beauty', 'Manicure', 'Classic nail care and polish', 40, '45 minutes'),
    ('Pure Nails & Beauty', 'Pedicure', 'Luxury foot care and polish', 55, '60 minutes'),
    ('Glow Beauty Lab', 'Facial Treatment', 'Deep cleansing facial', 85, '60 minutes'),
    ('Glow Beauty Lab', 'Chemical Peel', 'Professional skin resurfacing', 120, '45 minutes')
  ) AS s(business_name, name, description, price, duration)
  WHERE sp.business_name = s.business_name;
END $$;