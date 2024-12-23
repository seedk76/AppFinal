export interface Database {
  public: {
    Tables: {
      service_providers: {
        Row: {
          id: string;
          user_id: string;
          business_name: string;
          category: string;
          description: string | null;
          address: string | null;
          rating: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['service_providers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['service_providers']['Insert']>;
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          provider_id: string;
          content: string;
          created_at: string;
          read: boolean;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      bookings: {
        Row: {
          id: string;
          service_provider_id: string;
          user_id: string;
          service_name: string;
          date: string;
          time: string;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
      };
      services: {
        Row: {
          id: string;
          provider_id: string;
          name: string;
          description: string | null;
          price: number;
          duration: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
      };
    };
  };
}