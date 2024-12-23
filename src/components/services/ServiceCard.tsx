import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';

interface ServiceCardProps {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  duration: string;
  location: string;
}

export function ServiceCard({
  imageUrl,
  title,
  description,
  price,
  rating,
  duration,
  location
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center">
          <Star className="w-4 h-4 text-[#FFD700] fill-current" />
          <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-secondary">{title}</h3>
        <p className="text-sm text-secondary-light mt-1">{description}</p>
        
        <div className="flex items-center mt-3 text-sm text-secondary-light">
          <Clock className="w-4 h-4 mr-1" />
          <span>{duration}</span>
          <MapPin className="w-4 h-4 ml-4 mr-1" />
          <span>{location}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}