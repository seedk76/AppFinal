import React, { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Booking } from '../types/bookings';
import { useAuthContext } from '../components/auth/AuthProvider';
import { BookingStatusBadge } from '../components/bookings/BookingStatusBadge';

export default function Bookings() {
  const { user } = useAuthContext();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          service_providers (
            business_name,
            address
          )
        `)
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching bookings:', error);
        return;
      }

      setBookings(data || []);
      setLoading(false);
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#121212] text-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <Calendar className="w-6 h-6" />
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No bookings found</div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{booking.service_name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>
                  </div>
                  <BookingStatusBadge status={booking.status} />
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>
                    {booking.service_providers?.business_name} - {booking.service_providers?.address}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}