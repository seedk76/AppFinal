import React, { useRef, useEffect } from 'react';
import { Message } from '../../types/services';
import { MessageCard } from './MessageCard';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
      
      {messages.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No messages yet
        </div>
      )}
      
      <div ref={bottomRef} />
    </div>
  );
}