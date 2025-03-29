
import { supabase } from '@/integrations/supabase/client';
import { Plant } from '@/types/plants';
import { fetchPlantById } from './plantFetchService';

// Save a plant to Supabase
export const savePlant = async (plant: Omit<Plant, 'id'>): Promise<Plant | null> => {
  try {
    // Insert plant data
    const { data, error } = await supabase
      .from('plants')
      .insert([{
        name: plant.name,
        image: plant.image,
        difficulty: plant.difficulty,
        light: plant.light,
        water: plant.water,
        temperature: plant.temperature,
        grow_time: plant.growTime,
        description: plant.description,
        edible: plant.edible,
        edible_parts: plant.edibleParts
      }])
      .select()
      .single();
      
    if (error) throw error;
    if (!data) return null;
    
    // Insert care steps if provided
    if (plant.careSteps && plant.careSteps.length > 0) {
      const careStepsData = plant.careSteps.map((step, index) => ({
        plant_id: data.id,
        title: step.title,
        description: step.description,
        order: index
      }));
      
      const { error: stepsError } = await supabase
        .from('plant_care_steps')
        .insert(careStepsData);
        
      if (stepsError) throw stepsError;
    }
    
    // Return the newly created plant
    return await fetchPlantById(data.id);
  } catch (error) {
    console.error('Error saving plant:', error);
    return null;
  }
};
