import React from 'react';
import { MapPin, Bell } from 'lucide-react';
import { SearchBar } from '../search/SearchBar';
import { useAuthContext } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

export function UserHeader() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const firstName = user?.email?.split('@')[0] || 'Guest';

  return (
    <div className="bg-[#121212] text-white px-4 pt-12 pb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Hi, {firstName}</h1>
          <div className="flex items-center text-gray-300">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">California, US</span>
          </div>
        </div>
        <button className="relative p-2">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFA733] rounded-full"></span>
        </button>
      </div>
      <SearchBar 
        value=""
        onChange={() => {}}
        placeholder="Search services..."
        readOnly
        onClick={() => navigate('/search')}
      />
    </div>
  );
}