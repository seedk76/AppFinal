import React from 'react';
import { useAuthContext } from '../components/auth/AuthProvider';
import { ProfileInfo } from '../components/profile/ProfileInfo';
import { PasswordReset } from '../components/profile/PasswordReset';
import { AvatarUpload } from '../components/profile/AvatarUpload';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';

export default function Profile() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-secondary mb-6">My Profile</h1>
        <AvatarUpload />
      </div>
      
      <ProfileInfo />
      <PasswordReset />
      
      <div className="pt-4">
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="!bg-red-50 !text-red-600 !border-red-100 hover:!bg-red-100"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}