import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ServiceProvider } from '../../types/services';
import { Scissors, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORY_ICONS = {
  'Hair Salon': Scissors,
  'Nail Salon': Palette,
} as const;

export function ServiceCategories() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const { data, error } = await supabase
          .from('service_providers')
          .select('*')
          .order('rating', { ascending: false });

        if (error) throw error;
        setProviders(data || []);
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError('Failed to load service providers');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 mx-auto" />
              <div className="h-4 bg-gray-200 rounded w-20 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-[#FFA733]"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {providers.map((provider) => {
        const Icon = CATEGORY_ICONS[provider.category as keyof typeof CATEGORY_ICONS];
        return (
          <Link
            key={provider.id}
            to={`/service/${provider.id}`}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
              {Icon && <Icon className="w-6 h-6 text-[#FFDF94]" />}
            </div>
            <span className="text-xs text-gray-800 text-center">
              {provider.business_name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}