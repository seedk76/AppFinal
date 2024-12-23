import React from 'react';

interface CategoryCardProps {
  icon: string;
  name: string;
  onClick?: () => void;
}

export function CategoryCard({ icon, name, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center space-y-2"
    >
      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3">
        <img src={icon} alt={name} className="w-full h-full object-contain" />
      </div>
      <span className="text-sm font-medium text-secondary">{name}</span>
    </button>
  );
}