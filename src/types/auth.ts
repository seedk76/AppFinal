export type UserRole = 'client' | 'provider' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  role?: UserRole;
}

export interface UserProfile {
  id: string;
  role: UserRole;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

export interface AuthError {
  message: string;
}