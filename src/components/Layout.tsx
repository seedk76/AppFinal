import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './navigation/BottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}