
import { supabase } from '@/integrations/supabase/client';
import { fromTable } from '@/lib/supabaseHelpers';

// Interface for seasonal guides
export interface SeasonalGuide {
  id: number;
  season: string;
  title: string;
  description: string;
  image: string;
  content: Array<{
    heading: string;
    text: string;
  }>;
}

// Fetch all seasonal guides
export const fetchSeasonalGuides = async (): Promise<SeasonalGuide[]> => {
  try {
    // Use mock data instead of failing Supabase queries
    const { default: seasonalGuides } = await import('@/data/seasonalGuides');
    return seasonalGuides;
  } catch (error) {
    console.error('Error fetching seasonal guides:', error);
    return [];
  }
};

// Fetch a specific seasonal guide by ID
export const fetchSeasonalGuideById = async (id: number): Promise<SeasonalGuide | null> => {
  try {
    // Use mock data instead of failing Supabase queries
    const { default: seasonalGuides } = await import('@/data/seasonalGuides');
    const guide = seasonalGuides.find(guide => guide.id === id);
    return guide || null;
  } catch (error) {
    console.error('Error fetching seasonal guide:', error);
    return null;
  }
};
