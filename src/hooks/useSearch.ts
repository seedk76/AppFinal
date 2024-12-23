import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ServiceProvider } from '../types/services';

export function useSearch(query: string) {
  const [results, setResults] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchProviders = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const searchQuery = query.trim().toLowerCase();
        const { data, error } = await supabase
          .from('service_providers')
          .select(`
            *,
            services (
              name,
              description,
              price
            )
          `)
          .or(
            `business_name.ilike.%${searchQuery}%,` +
            `category.ilike.%${searchQuery}%,` +
            `description.ilike.%${searchQuery}%,` +
            `services.name.ilike.%${searchQuery}%,` +
            `services.description.ilike.%${searchQuery}%`
          )
          .order('rating', { ascending: false });

        if (error) throw error;
        setResults(data || []);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to perform search');
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchProviders, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return { results, loading, error };
}