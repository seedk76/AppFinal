export interface ServiceProvider {
  id: string;
  business_name: string;
  category: string;
  description: string;
  address: string;
  rating: number;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
}