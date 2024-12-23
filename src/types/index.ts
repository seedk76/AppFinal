export interface User {
  id: string;
  email: string;
  role: 'client' | 'provider' | 'admin';
  name: string;
  created_at: string;
}

export interface Service {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  created_at: string;
}

export interface Booking {
  id: string;
  service_id: string;
  client_id: string;
  provider_id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}