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
