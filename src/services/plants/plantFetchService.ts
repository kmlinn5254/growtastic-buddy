
import { supabase } from '@/integrations/supabase/client';
import { Plant } from '@/types/plants';
import { SupabasePlant, SupabasePlantCareStep, mapSupabasePlantToPlant } from './plantTypes';

// Fetch all plants from Supabase
export const fetchPlants = async (): Promise<Plant[]> => {
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
    return (plantsData as SupabasePlant[] || []).map(plant => {
      const plantCareSteps = (careStepsData as SupabasePlantCareStep[] || [])
        .filter(step => step.plant_id === plant.id)
        .sort((a, b) => a.order - b.order);
      
      return mapSupabasePlantToPlant(plant, plantCareSteps);
    });
  } catch (error) {
    console.error('Error fetching plants:', error);
    return [];
  }
};

// Fetch a specific plant by ID
export const fetchPlantById = async (id: number): Promise<Plant | null> => {
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
    
    return mapSupabasePlantToPlant(plant as SupabasePlant, careSteps as SupabasePlantCareStep[]);
  } catch (error) {
    console.error('Error fetching plant:', error);
    return null;
  }
};

// Search plants by name in database
export const searchPlantsInDb = async (query: string): Promise<Plant[]> => {
  if (!query.trim()) return fetchPlants();
  
  try {
    const { data: plantsData, error: plantsError } = await supabase
      .from('plants')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('name');
      
    if (plantsError) throw plantsError;
    
    // Get care steps for all found plants
    const plantIds = (plantsData as SupabasePlant[] || []).map(p => p.id);
    
    let careStepsData: SupabasePlantCareStep[] = [];
    if (plantIds.length > 0) {
      const { data: careSteps, error: careStepsError } = await supabase
        .from('plant_care_steps')
        .select('*')
        .in('plant_id', plantIds);
        
      if (careStepsError) throw careStepsError;
      careStepsData = careSteps as SupabasePlantCareStep[] || [];
    }
    
    // Map Supabase data to our Plant type
    return (plantsData as SupabasePlant[] || []).map(plant => {
      const plantCareSteps = careStepsData
        .filter(step => step.plant_id === plant.id)
        .sort((a, b) => a.order - b.order);
      
      return mapSupabasePlantToPlant(plant, plantCareSteps);
    });
  } catch (error) {
    console.error('Error searching plants:', error);
    return [];
  }
};
