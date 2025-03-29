
import { supabase } from '@/integrations/supabase/client';

// Type assertion helper for Supabase queries
// This helps us work around TypeScript errors when tables aren't defined in the types
export const fromTable = <T = any>(tableName: string) => {
  // @ts-ignore - We're explicitly working around type limitations
  return supabase.from(tableName) as any;
};

// Other helper functions
export const isSingleResult = <T>(data: T | T[]): data is T => {
  return !Array.isArray(data);
};

// Debug helper function to help diagnose auth issues
export const getSessionDebugInfo = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting session:", error);
      return { status: "error", error };
    }
    
    return {
      status: "success",
      hasSession: !!data.session,
      session: data.session ? {
        user: data.session.user ? {
          id: data.session.user.id,
          email: data.session.user.email,
          hasAuthProviders: !!data.session.user.app_metadata?.providers,
          providers: data.session.user.app_metadata?.providers,
        } : null,
        expires_at: data.session.expires_at,
      } : null
    };
  } catch (e) {
    console.error("Exception getting session:", e);
    return { status: "exception", error: e };
  }
};
