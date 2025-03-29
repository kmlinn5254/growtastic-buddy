
import { supabase } from '@/integrations/supabase/client';
import { SeasonalGuide } from './plantTypes';

// Fetch all seasonal guides
export const fetchSeasonalGuides = async (): Promise<SeasonalGuide[]> => {
  try {
    // First fetch the guides basic info
    const { data: guidesData, error: guidesError } = await supabase
      .from('seasonal_guides')
      .select('*')
      .order('season');
      
    if (guidesError) throw guidesError;
    
    // Then fetch all guide content
    const { data: contentData, error: contentError } = await supabase
      .from('seasonal_guide_content')
      .select('*')
      .order('order');
      
    if (contentError) throw contentError;
    
    // Map and combine the data
    return (guidesData || []).map(guide => ({
      id: guide.id,
      season: guide.season,
      title: guide.title,
      description: guide.description,
      image: guide.image,
      content: contentData
        .filter(content => content.guide_id === guide.id)
        .map(item => ({
          heading: item.heading,
          text: item.text
        }))
    }));
  } catch (error) {
    console.error('Error fetching seasonal guides:', error);
    return [];
  }
};

// Fetch a specific seasonal guide by ID
export const fetchSeasonalGuideById = async (id: number): Promise<SeasonalGuide | null> => {
  try {
    // Fetch the guide basic info
    const { data: guide, error: guideError } = await supabase
      .from('seasonal_guides')
      .select('*')
      .eq('id', id)
      .single();
      
    if (guideError) throw guideError;
    if (!guide) return null;
    
    // Fetch guide content
    const { data: content, error: contentError } = await supabase
      .from('seasonal_guide_content')
      .select('*')
      .eq('guide_id', id)
      .order('order');
      
    if (contentError) throw contentError;
    
    // Return the guide with its content
    return {
      id: guide.id,
      season: guide.season,
      title: guide.title,
      description: guide.description,
      image: guide.image,
      content: (content || []).map(item => ({
        heading: item.heading,
        text: item.text
      }))
    };
  } catch (error) {
    console.error('Error fetching seasonal guide:', error);
    return null;
  }
};
