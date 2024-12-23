import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import type { ServiceProvider } from '../../types/services';

interface SearchResultsProps {
  results: ServiceProvider[];
  loading: boolean;
  error: string | null;
}

export function SearchResults({ results, loading, error }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-100 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
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

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No results found</p>
        <p className="text-sm mt-2">Try searching for a different service or category</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((provider) => (
        <Link
          key={provider.id}
          to={`/service/${provider.id}`}
          className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">{provider.business_name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-[#FFA733]">{provider.category}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-700">
                    {provider.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {provider.description}
          </p>

          {provider.address && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{provider.address}</span>
            </div>
          )}

          {provider.services && provider.services.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>Services from ${Math.min(...provider.services.map(s => s.price))}</span>
              </div>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}