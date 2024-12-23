import React from 'react';
import { AppointmentCard } from './AppointmentCard';

const appointments = [
  {
    id: 1,
    date: 'Dec 22, 2024',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop',
    name: 'Captain Barbershop',
    address: '123 Main Street, Anytown, USA',
    services: ['Haircut', 'Beard Trim'],
  },
];

export function UpcomingAppointments() {
  return (
    <div className="px-4 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
        <button className="text-sm font-medium text-[#FFA733]">See All</button>
      </div>
      
      {appointments.map(appointment => (
        <AppointmentCard key={appointment.id} {...appointment} />
      ))}
    </div>
  );
}