import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react';
import { AuthHeader } from './auth/AuthHeader';
import { useAuthContext } from './auth/AuthProvider';

export default function Navbar() {
  const { user } = useAuthContext();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl">ServiceBook</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/search" className="text-gray-600 hover:text-blue-600">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/bookings" className="text-gray-600 hover:text-blue-600">
              <Calendar className="w-5 h-5" />
            </Link>
            <Link to="/messages" className="text-gray-600 hover:text-blue-600">
              <MessageSquare className="w-5 h-5" />
            </Link>
            {user ? (
              <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <AuthHeader />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}