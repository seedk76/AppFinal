export interface Booking {
  id: string;
  service_provider_id: string;
  user_id: string;
  service_name: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  service_providers?: {
    business_name: string;
    address: string;
  };
}