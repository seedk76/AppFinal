import React from 'react';

interface SwitchProps {
  label?: string;
}

export function Switch({ label }: SwitchProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      {label && <span className="text-sm text-gray-600 mr-2">{label}</span>}
      <div className="relative">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFA733]"></div>
      </div>
    </label>
  );
}