import React from 'react';
import { ServiceCard } from './ServiceCard';
import { SERVICES } from '../../data/services';

export function ServiceList() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {SERVICES.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  );
}