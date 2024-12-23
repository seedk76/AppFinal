import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryIconProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function CategoryIcon({ icon: Icon, label, onClick }: CategoryIconProps) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center"
    >
      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
        <Icon className="w-6 h-6 text-[#FFDF94]" />
      </div>
      <span className="text-xs text-gray-800">{label}</span>
    </button>
  );
}