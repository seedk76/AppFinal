import React from 'react';
import { Message } from '../../types/services';
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../auth/AuthProvider';

interface MessageCardProps {
  message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
  const { user } = useAuthContext();
  const isOwn = message.sender_id === user?.id;

  return (
    <div className={`p-4 ${message.read ? 'bg-white' : 'bg-blue-50'}`}>
      <div className={`flex gap-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[80%] ${isOwn ? 'bg-[#FFA733] text-white' : 'bg-gray-100'} p-3 rounded-xl`}>
          <p className="text-sm">{message.content}</p>
          <span className="text-xs opacity-70 mt-1 block">
            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
}