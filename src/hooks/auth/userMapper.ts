
import { User } from "./types";

type SupabaseUser = {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
  app_metadata?: any;
};

// Convert Supabase user to our app's user model
export const mapSupabaseUser = (supabaseUser: SupabaseUser | null): User | null => {
  if (!supabaseUser) return null;
  
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
    photoURL: supabaseUser.user_metadata?.avatar_url || null,
    emailVerified: supabaseUser.app_metadata?.email_confirmed || false
  };
};
