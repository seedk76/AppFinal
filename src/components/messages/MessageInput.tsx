import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthContext } from '../auth/AuthProvider';

interface MessageInputProps {
  providerId: string;
}

export function MessageInput({ providerId }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const { user } = useAuthContext();

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    try {
      const { data: provider } = await supabase
        .from('service_providers')
        .select('user_id')
        .eq('id', providerId)
        .single();

      if (!provider) throw new Error('Provider not found');

      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: provider.user_id,
          provider_id: providerId,
          content: message.trim()
        });

      if (error) throw error;
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={sendMessage} className="p-4 bg-white border-t">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-full focus:outline-none focus:border-[#FFA733]"
        />
        <button
          type="submit"
          className="w-10 h-10 bg-[#FFA733] text-white rounded-full flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}