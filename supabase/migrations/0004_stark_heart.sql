/*
  # Create services and messages tables

  1. New Tables
    - `service_providers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `business_name` (text)
      - `category` (text)
      - `description` (text)
      - `address` (text)
      - `rating` (numeric)
      - `created_at` (timestamptz)

    - `messages`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references auth.users)
      - `receiver_id` (uuid, references auth.users)
      - `content` (text)
      - `created_at` (timestamptz)
      - `read` (boolean)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create service_providers table
CREATE TABLE IF NOT EXISTS service_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  business_name text NOT NULL,
  category text NOT NULL,
  description text,
  address text,
  rating numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users NOT NULL,
  receiver_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies for service_providers
CREATE POLICY "Service providers are viewable by everyone"
  ON service_providers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own service provider profile"
  ON service_providers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for messages
CREATE POLICY "Users can view their own messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Insert initial service providers
INSERT INTO service_providers (user_id, business_name, category, description, address, rating)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'Elegant Cuts', 'Hair Salon', 'Premium hair styling services', '123 Fashion St, LA', 4.8),
  ('00000000-0000-0000-0000-000000000001', 'Nail Paradise', 'Nail Salon', 'Professional nail care services', '456 Beauty Ave, LA', 4.9);