import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Calendar, label: 'Bookings', path: '/bookings' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: User, label: 'Profile', path: '/profile' },
] as const;

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between py-2">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="flex flex-col items-center px-3 py-2"
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? 'text-[#FFA733]' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-xs mt-1 ${
                    isActive ? 'text-[#FFA733] font-medium' : 'text-gray-500'
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}