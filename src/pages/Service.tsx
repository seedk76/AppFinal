import React, { useEffect, useState } from 'react';
import { Star, Clock, MapPin, ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

interface ServiceProvider {
  id: string;
  business_name: string;
  category: string;
  description: string;
  address: string;
  rating: number;
  services: Service[];
}

export default function Service() {
  const { id } = useParams();
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvider = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('service_providers')
          .select(`
            *,
            services (
              id,
              name,
              description,
              price,
              duration
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setProvider(data);
      } catch (error) {
        console.error('Error fetching provider:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white animate-pulse">
        <div className="h-[300px] bg-gray-200" />
        <div className="p-4">
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Service provider not found</p>
          <Link to="/" className="text-[#FFA733] hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Image */}
      <div className="relative h-[300px]">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop"
          alt={provider.business_name}
          className="w-full h-full object-cover"
        />
        <Link
          to="/"
          className="absolute top-12 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 pb-24">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{provider.business_name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-[#FFD700] fill-current" />
                <span className="ml-1 text-sm font-medium">{provider.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">Open</span>
              </div>
            </div>
          </div>
          <div className="bg-[#FFA733] text-white px-3 py-1 rounded-full text-sm">
            Popular
          </div>
        </div>

        <div className="flex items-center text-gray-500 mb-6">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{provider.address}</span>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Services</h2>
          {provider.services?.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ServiceCardProps {
  name: string;
  duration: string;
  price: number;
  description?: string;
}

function ServiceCard({ name, duration, price, description }: ServiceCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
      <div>
        <h3 className="font-medium text-gray-900">{name}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        <p className="text-sm text-gray-500 mt-1">{duration}</p>
      </div>
      <button className="bg-[#FFA733] text-white px-4 py-2 rounded-full text-sm font-medium">
        ${price}
      </button>
    </div>
  );
}