import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
      {message}
    </div>
  );
}