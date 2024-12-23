import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Message, ServiceProvider } from '../types/services';
import { useAuthContext } from '../components/auth/AuthProvider';
import { Link } from 'react-router-dom';

interface Conversation {
  provider: ServiceProvider;
  lastMessage: Message;
  unreadCount: number;
}

export default function Messages() {
  const { user } = useAuthContext();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchConversations = async () => {
      try {
        const { data: messages, error } = await supabase
          .from('messages')
          .select(`
            *,
            provider:provider_id (
              id,
              business_name,
              category,
              description,
              address,
              rating
            )
          `)
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Group messages by provider
        const conversationMap = new Map<string, Conversation>();
        
        messages?.forEach((message) => {
          const providerId = message.provider.id;
          
          if (!conversationMap.has(providerId)) {
            conversationMap.set(providerId, {
              provider: message.provider,
              lastMessage: message,
              unreadCount: message.sender_id !== user.id && !message.read ? 1 : 0
            });
          } else if (message.sender_id !== user.id && !message.read) {
            const conv = conversationMap.get(providerId)!;
            conv.unreadCount += 1;
          }
        });

        setConversations(Array.from(conversationMap.values()));
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#121212] text-white px-4 pt-12 pb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>
      
      {loading ? (
        <div className="p-4 text-center text-gray-500">Loading conversations...</div>
      ) : conversations.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No messages yet</div>
      ) : (
        <div className="divide-y divide-gray-100">
          {conversations.map((conversation) => (
            <Link
              key={conversation.provider.id}
              to={`/chat/${conversation.provider.id}`}
              className="flex items-center gap-4 p-4 bg-white hover:bg-gray-50"
            >
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">
                    {conversation.provider.business_name}
                  </h3>
                  {conversation.unreadCount > 0 && (
                    <span className="bg-[#FFA733] text-white text-xs px-2 py-1 rounded-full">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {conversation.lastMessage.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}