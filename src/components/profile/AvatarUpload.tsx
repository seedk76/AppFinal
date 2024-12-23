import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthContext } from '../auth/AuthProvider';
import { Upload, User } from 'lucide-react';

export function AvatarUpload() {
  const { user } = useAuthContext();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      getExistingAvatar();
    }
  }, [user]);

  async function getExistingAvatar() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      if (data?.avatar_url) setAvatarUrl(data.avatar_url);
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  }

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);

      await supabase
        .from('profiles')
        .upsert({ id: user?.id, avatar_url: data.publicUrl });

    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-24 h-24">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-full h-full rounded-full object-cover border-2 border-primary"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-2 border-primary">
            <User className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-primary-dark transition-colors">
          <Upload className="w-4 h-4" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </label>
      </div>
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}