/*
  # Add bookings functionality

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `service_provider_id` (uuid, references service_providers)
      - `user_id` (uuid, references auth.users)
      - `service_name` (text)
      - `date` (date)
      - `time` (time)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `bookings` table
    - Add policies for users to manage their bookings
    - Add policies for service providers to manage their bookings
*/

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_provider_id uuid REFERENCES service_providers NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  service_name text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service providers can view bookings for their services"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM service_providers 
      WHERE id = service_provider_id
    )
  );

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service providers can update booking status"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM service_providers 
      WHERE id = service_provider_id
    )
  )
  WITH CHECK (
    NEW.status IN ('confirmed', 'completed', 'cancelled') AND
    OLD.service_provider_id = NEW.service_provider_id AND
    OLD.user_id = NEW.user_id
  );