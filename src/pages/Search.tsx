import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/search/SearchBar';
import { SearchResults } from '../components/search/SearchResults';
import { useSearch } from '../hooks/useSearch';
import { ChevronLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { ServiceProvider } from '../types/services';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [allProviders, setAllProviders] = useState<ServiceProvider[]>([]);
  const { results, loading, error } = useSearch(query);

  useEffect(() => {
    const fetchAllProviders = async () => {
      const { data } = await supabase
        .from('service_providers')
        .select(`
          *,
          services (
            name,
            description,
            price
          )
        `)
        .order('rating', { ascending: false });
      
      if (data) {
        setAllProviders(data);
      }
    };

    fetchAllProviders();
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    setSearchParams(value ? { q: value } : {});
  };

  const displayResults = query.trim() ? results : allProviders;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#121212] text-white px-4 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Search</h1>
        </div>
        <SearchBar 
          value={query}
          onChange={handleSearch}
          placeholder="Search services, categories..."
        />
      </div>

      <div className="p-4">
        <SearchResults 
          results={displayResults}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}