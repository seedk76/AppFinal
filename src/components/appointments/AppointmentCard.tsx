import React from 'react';
import { Switch } from '../ui/Switch';

interface AppointmentCardProps {
  date: string;
  image: string;
  name: string;
  address: string;
  services: string[];
}

export function AppointmentCard({ date, image, name, address, services }: AppointmentCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">{date}</span>
        <Switch label="Remind me" />
      </div>
      
      <div className="flex gap-4">
        <img 
          src={image}
          alt={name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{address}</p>
          <p className="text-sm text-[#FFA733] mt-1">
            Services: {services.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}