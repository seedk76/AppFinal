import React from 'react';
import { SearchBar } from '../search/SearchBar';

export function Header() {
  return (
    <div className="bg-gray-900 pb-6">
      <div className="bg-gray-800 px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Find Services</h1>
        <p className="text-gray-300">Discover and book local services</p>
      </div>
      <div className="px-4 -mb-12 relative z-10">
        <SearchBar />
      </div>
    </div>
  );
}