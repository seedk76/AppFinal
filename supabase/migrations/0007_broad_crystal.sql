/*
  # Fix Messages Schema

  1. Changes
    - Add provider_id to messages table to link with service_providers
    - Update messages policies to work with provider relationship
    - Add index for better query performance

  2. Security
    - Maintain RLS policies for messages
    - Ensure proper access control
*/

-- Add provider_id column to messages
ALTER TABLE messages 
ADD COLUMN provider_id uuid REFERENCES service_providers(id);

-- Update existing messages to set provider_id (if any exist)
UPDATE messages m
SET provider_id = sp.id
FROM service_providers sp
WHERE sp.user_id = m.receiver_id;

-- Add index for better query performance
CREATE INDEX messages_provider_id_idx ON messages(provider_id);

-- Update messages policies
DROP POLICY IF EXISTS "Users can view their own messages" ON messages;
CREATE POLICY "Users can view their own messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = sender_id 
    OR EXISTS (
      SELECT 1 FROM service_providers sp
      WHERE sp.id = messages.provider_id
      AND sp.user_id = auth.uid()
    )
  );