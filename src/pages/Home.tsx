import React from 'react';
import { UserHeader } from '../components/home/UserHeader';
import { PromotionalSlider } from '../components/promotions/PromotionalSlider';
import { ServiceCategories } from '../components/categories/ServiceCategories';
import { UpcomingAppointments } from '../components/appointments/UpcomingAppointments';

export default function Home() {
  return (
    <div className="bg-gray-50">
      <UserHeader />
      <PromotionalSlider />
      <ServiceCategories />
      <UpcomingAppointments />
    </div>
  );
}