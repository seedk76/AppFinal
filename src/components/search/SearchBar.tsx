import React from 'react';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  onClick?: () => void;
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search services...",
  readOnly,
  onClick
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <div 
        className={`flex items-center bg-[#1A1A1A] rounded-full overflow-hidden border border-gray-800 ${
          onClick ? 'cursor-pointer' : ''
        }`}
        onClick={onClick}
      >
        <div className="flex-shrink-0 pl-4">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full py-3 px-3 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none"
          readOnly={readOnly}
        />
        <button 
          type="button"
          className="px-4 py-3"
          onClick={(e) => {
            e.stopPropagation();
            // Handle filters click
          }}
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}