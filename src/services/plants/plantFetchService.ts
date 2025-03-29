
import { supabase } from '@/integrations/supabase/client';
import { Plant } from '@/types/plants';
import { SupabasePlant, SupabasePlantCareStep, mapSupabasePlantToPlant } from './plantTypes';

// Fetch all plants from Supabase
export const fetchPlants = async (): Promise<Plant[]> => {
  try {
    // Try to fetch from the database first
    try {
      const { data: plantsData, error: plantsError } = await supabase
        .from('plants')
        .select('*');
        
      if (plantsError) throw plantsError;
      
      // Get care steps for all plants
      const { data: careStepsData, error: careStepsError } = await supabase
        .from('plant_care_steps')
        .select('*');
        
      if (careStepsError) throw careStepsError;
      
      // Map Supabase data to our Plant type
      return (plantsData as unknown as SupabasePlant[] || []).map(plant => {
        const plantCareSteps = (careStepsData as unknown as SupabasePlantCareStep[] || [])
          .filter(step => step.plant_id === plant.id)
          .sort((a, b) => a.order - b.order);
        
        return mapSupabasePlantToPlant(plant, plantCareSteps);
      });
    } catch (dbError) {
      // If database fetch fails, use the allPlants mock data
      console.error('Error fetching plants from database:', dbError);
      const { allPlants } = await import('@/data/plantFAQ');
      return allPlants;
    }
  } catch (error) {
    console.error('Error fetching plants:', error);
    return [];
  }
};

// Fetch a specific plant by ID
export const fetchPlantById = async (id: number): Promise<Plant | null> => {
  try {
    try {
      const { data: plant, error: plantError } = await supabase
        .from('plants')
        .select('*')
        .eq('id', id)
        .single();
        
      if (plantError) throw plantError;
      if (!plant) return null;
      
      // Get care steps for this plant
      const { data: careSteps, error: careStepsError } = await supabase
        .from('plant_care_steps')
        .select('*')
        .eq('plant_id', id)
        .order('order');
        
      if (careStepsError) throw careStepsError;
      
      return mapSupabasePlantToPlant(
        plant as unknown as SupabasePlant,
        careSteps as unknown as SupabasePlantCareStep[]
      );
    } catch (dbError) {
      // If database fetch fails, try to find in mock data
      console.error('Error fetching plant from database:', dbError);
      const { allPlants } = await import('@/data/plantFAQ');
      return allPlants.find(p => p.id === id) || null;
    }
  } catch (error) {
    console.error('Error fetching plant:', error);
    return null;
  }
};

// Search plants by name in database
export const searchPlantsInDb = async (query: string): Promise<Plant[]> => {
  if (!query.trim()) return fetchPlants();
  
  try {
    try {
      const { data: plantsData, error: plantsError } = await supabase
        .from('plants')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('name');
        
      if (plantsError) throw plantsError;
      
      // Get care steps for all found plants
      const plantIds = (plantsData as unknown as SupabasePlant[] || []).map(p => p.id);
      
      let careStepsData: SupabasePlantCareStep[] = [];
      if (plantIds.length > 0) {
        const { data: careSteps, error: careStepsError } = await supabase
          .from('plant_care_steps')
          .select('*')
          .in('plant_id', plantIds);
          
        if (careStepsError) throw careStepsError;
        careStepsData = careSteps as unknown as SupabasePlantCareStep[] || [];
      }
      
      // Map Supabase data to our Plant type
      return (plantsData as unknown as SupabasePlant[] || []).map(plant => {
        const plantCareSteps = careStepsData
          .filter(step => step.plant_id === plant.id)
          .sort((a, b) => a.order - b.order);
        
        return mapSupabasePlantToPlant(plant, plantCareSteps);
      });
    } catch (dbError) {
      // If database search fails, search in mock data
      console.error('Error searching plants in database:', dbError);
      const { allPlants } = await import('@/data/plantFAQ');
      return allPlants.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  } catch (error) {
    console.error('Error searching plants:', error);
    return [];
  }
};
