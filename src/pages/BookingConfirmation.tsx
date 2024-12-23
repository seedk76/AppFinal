import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    navigate('/bookings');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#121212] text-white px-4 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Booking Confirmation</h1>
      </div>

      <div className="p-4 flex flex-col items-center">
        <div className="w-20 h-20 bg-[#FFA733] rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-xl font-semibold mb-2">Booking Successful!</h2>
        <p className="text-gray-500 text-center mb-8">
          Your appointment has been scheduled successfully.
        </p>

        <div className="w-full bg-gray-50 rounded-xl p-4 mb-8">
          <h3 className="font-medium mb-4">Booking Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Service</span>
              <span className="font-medium">{booking.service_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">{booking.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Time</span>
              <span className="font-medium">{booking.time}</span>
            </div>
          </div>
        </div>

        <Button onClick={() => navigate('/bookings')} className="w-full">
          View My Bookings
        </Button>
      </div>
    </div>
  );
}