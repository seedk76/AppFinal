import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import { useAuthContext } from '../auth/AuthProvider';

interface ProfileData {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
}

export function ProfileInfo() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) {
          setProfileData({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            phone: data.phone || '',
            address: data.address || '',
          });
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile data');
      }
    }

    loadProfile();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profileData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-secondary">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          id="first_name"
          name="first_name"
          value={profileData.first_name}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Last Name"
          id="last_name"
          name="last_name"
          value={profileData.last_name}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        label="Phone Number"
        id="phone"
        name="phone"
        type="tel"
        value={profileData.phone}
        onChange={handleChange}
        required
      />

      <Input
        label="Address"
        id="address"
        name="address"
        value={profileData.address}
        onChange={handleChange}
        required
      />

      <ErrorMessage message={error} />
      
      {success && (
        <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
          Profile updated successfully!
        </div>
      )}

      <Button type="submit" isLoading={loading}>
        Save Changes
      </Button>
    </form>
  );
}