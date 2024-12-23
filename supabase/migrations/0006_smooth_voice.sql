/*
  # Create services table and add sample data

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `provider_id` (uuid, references service_providers)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `duration` (interval)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `services` table
    - Add policies for viewing and managing services
*/

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES service_providers NOT NULL,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  duration interval NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view services
CREATE POLICY "Services are viewable by everyone"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow providers to manage their services
CREATE POLICY "Providers can manage their services"
  ON services
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM service_providers
      WHERE id = services.provider_id
      AND user_id = auth.uid()
    )
  );

-- Insert sample services
INSERT INTO services (provider_id, name, description, price, duration)
SELECT 
  sp.id,
  'Men''s Haircut',
  'Professional haircut with styling',
  35,
  '30 minutes'::interval
FROM service_providers sp
WHERE sp.business_name = 'Elegant Cuts'
UNION ALL
SELECT 
  sp.id,
  'Manicure',
  'Professional nail care service',
  45,
  '45 minutes'::interval
FROM service_providers sp
WHERE sp.business_name = 'Nail Paradise';