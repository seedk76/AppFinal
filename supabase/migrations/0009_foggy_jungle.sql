/*
  # Add User Roles System

  1. New Tables
    - `user_roles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `role` (text, enum of roles)
      - `created_at` (timestamp)

  2. Changes
    - Add role validation check
    - Add default role policy
    - Add role-based access policies

  3. Security
    - Enable RLS
    - Add policies for role management
*/

-- Create enum type for roles
CREATE TYPE user_role AS ENUM ('client', 'provider', 'admin');

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id)
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Policies for user_roles
CREATE POLICY "Users can view their own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Function to automatically create user role on signup
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'client');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user role on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create initial admin user
DO $$
DECLARE
  admin_id uuid;
BEGIN
  -- Create admin user
  INSERT INTO auth.users (id, email)
  VALUES (gen_random_uuid(), 'admin@servicebook.com')
  RETURNING id INTO admin_id;

  -- Set admin role
  INSERT INTO user_roles (user_id, role)
  VALUES (admin_id, 'admin');

  -- Update existing service providers to have provider role
  INSERT INTO user_roles (user_id, role)
  SELECT DISTINCT user_id, 'provider'
  FROM service_providers
  ON CONFLICT (user_id) DO UPDATE
  SET role = EXCLUDED.role;
END $$;