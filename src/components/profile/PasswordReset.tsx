import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';

export function PasswordReset() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (error) throw error;
      setSuccess(true);
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>

      <Input
        label="Current Password"
        id="current"
        name="current"
        type="password"
        value={passwords.current}
        onChange={handleChange}
        required
      />

      <Input
        label="New Password"
        id="new"
        name="new"
        type="password"
        value={passwords.new}
        onChange={handleChange}
        required
      />

      <Input
        label="Confirm New Password"
        id="confirm"
        name="confirm"
        type="password"
        value={passwords.confirm}
        onChange={handleChange}
        required
      />

      <ErrorMessage message={error} />
      
      {success && (
        <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
          Password updated successfully!
        </div>
      )}

      <Button type="submit" isLoading={loading}>
        Update Password
      </Button>
    </form>
  );
}