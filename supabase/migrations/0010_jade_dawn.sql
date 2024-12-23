/*
  # Fix User Roles Policies

  1. Changes
    - Remove circular dependency in admin policies
    - Add separate admin check function
    - Update existing policies to use the new function

  2. Security
    - Maintain role-based access control
    - Fix infinite recursion issue
*/

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM user_roles 
    WHERE user_id = user_uuid 
    AND role = 'admin'::user_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON user_roles;

-- Create new policies
CREATE POLICY "Users can view their own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    is_admin(auth.uid())
  );

CREATE POLICY "Admins can insert roles"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    is_admin(auth.uid())
  );

CREATE POLICY "Admins can update roles"
  ON user_roles
  FOR UPDATE
  TO authenticated
  USING (
    is_admin(auth.uid())
  )
  WITH CHECK (
    is_admin(auth.uid())
  );

CREATE POLICY "Admins can delete roles"
  ON user_roles
  FOR DELETE
  TO authenticated
  USING (
    is_admin(auth.uid())
  );