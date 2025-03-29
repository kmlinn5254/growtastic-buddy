
import { supabase } from '@/integrations/supabase/client';
import { Plant } from '@/types/plants';
import { fetchPlantById } from './plantFetchService';

// Save a plant to Supabase
export const savePlant = async (plant: Omit<Plant, 'id'>): Promise<Plant | null> => {
  try {
    // Try to insert data, falling back to mock data on failure
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
        }] as any)
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
          .insert(careStepsData as any);
          
        if (stepsError) throw stepsError;
      }
      
      // Return the newly created plant
      return await fetchPlantById(data.id);
    } catch (dbError) {
      // Handle saving to localStorage as fallback
      console.error('Error saving to database, using local storage instead:', dbError);
      const { saveExternalPlant } = await import('@/services/plantStorage');
      const newPlant: Plant = {
        id: Date.now(),
        name: plant.name,
        image: plant.image,
        difficulty: plant.difficulty,
        light: plant.light,
        water: plant.water,
        temperature: plant.temperature,
        growTime: plant.growTime,
        description: plant.description,
        edible: plant.edible,
        edibleParts: plant.edibleParts,
        careSteps: plant.careSteps,
        isExternal: true
      };
      saveExternalPlant(newPlant);
      return newPlant;
    }
  } catch (error) {
    console.error('Error saving plant:', error);
    return null;
  }
};
