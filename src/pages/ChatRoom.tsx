import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Message } from '../types/services';
import { MessageList } from '../components/messages/MessageList';
import { MessageInput } from '../components/messages/MessageInput';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChatRoom() {
  const { providerId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!providerId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${providerId},receiver_id.eq.${providerId}`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      setMessages(data || []);
      setLoading(false);
    };

    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel('chat-room')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `sender_id=eq.${providerId},receiver_id=eq.${providerId}`
      }, payload => {
        setMessages(current => [...current, payload.new as Message]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [providerId]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-[#121212] text-white px-4 pt-12 pb-6">
        <div className="flex items-center gap-4">
          <Link to="/messages">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Chat</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center">Loading messages...</div>
        ) : (
          <MessageList messages={messages} />
        )}
      </div>

      <MessageInput receiverId={providerId || ''} />
    </div>
  );
}