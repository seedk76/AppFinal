import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import Messages from './pages/Messages';
import ChatRoom from './pages/ChatRoom';
import Service from './pages/Service';
import Search from './pages/Search';
import BookingConfirmation from './pages/BookingConfirmation';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Main routes with layout */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/chat/:providerId" element={<ChatRoom />} />
          <Route path="/service/:id" element={<Service />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        </Route>
      </Routes>
    </Router>
  );
}