
import { supabase } from '@/lib/supabase';
import { Plant } from '@/types/plants';
import { useToast } from '@/hooks/use-toast';

// Fetch all plants from Supabase
export const fetchPlants = async (): Promise<Plant[]> => {
  try {
    // Get plants from Supabase
    const { data, error } = await supabase
      .from('plants')
      .select(`
        *,
        plant_care_steps (*)
      `)
      .order('name');
      
    if (error) throw error;
    
    // Map Supabase data to our Plant type
    return (data || []).map(plant => ({
      id: plant.id,
      name: plant.name,
      image: plant.image,
      difficulty: plant.difficulty,
      light: plant.light,
      water: plant.water,
      temperature: plant.temperature,
      growTime: plant.grow_time,
      description: plant.description,
      edible: plant.edible,
      edibleParts: plant.edible_parts,
      careSteps: plant.plant_care_steps?.map(step => ({
        title: step.title,
        description: step.description
      })) || [],
      isExternal: false
    }));
  } catch (error) {
    console.error('Error fetching plants:', error);
    return [];
  }
};

// Fetch a specific plant by ID
export const fetchPlantById = async (id: number): Promise<Plant | null> => {
  try {
    const { data, error } = await supabase
      .from('plants')
      .select(`
        *,
        plant_care_steps (*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    if (!data) return null;
    
    return {
      id: data.id,
      name: data.name,
      image: data.image,
      difficulty: data.difficulty,
      light: data.light,
      water: data.water,
      temperature: data.temperature,
      growTime: data.grow_time,
      description: data.description,
      edible: data.edible,
      edibleParts: data.edible_parts,
      careSteps: data.plant_care_steps?.map(step => ({
        title: step.title,
        description: step.description
      })) || [],
      isExternal: false
    };
  } catch (error) {
    console.error('Error fetching plant:', error);
    return null;
  }
};

// Search plants by name
export const searchPlantsInDb = async (query: string): Promise<Plant[]> => {
  if (!query.trim()) return fetchPlants();
  
  try {
    const { data, error } = await supabase
      .from('plants')
      .select(`
        *,
        plant_care_steps (*)
      `)
      .ilike('name', `%${query}%`)
      .order('name');
      
    if (error) throw error;
    
    return (data || []).map(plant => ({
      id: plant.id,
      name: plant.name,
      image: plant.image,
      difficulty: plant.difficulty,
      light: plant.light,
      water: plant.water,
      temperature: plant.temperature,
      growTime: plant.grow_time,
      description: plant.description,
      edible: plant.edible,
      edibleParts: plant.edible_parts,
      careSteps: plant.plant_care_steps?.map(step => ({
        title: step.title,
        description: step.description
      })) || [],
      isExternal: false
    }));
  } catch (error) {
    console.error('Error searching plants:', error);
    return [];
  }
};

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

// Update the searchPlants function to use Supabase + fallback
export const searchPlants = async (query: string): Promise<Plant[]> => {
  // First try to search plants in Supabase
  const dbPlants = await searchPlantsInDb(query);
  
  if (dbPlants.length > 0) {
    return dbPlants;
  }
  
  // If no plants found in database, try the external API
  const { fetchPlantFromExternalAPI } = await import('./plantApiService');
  const externalPlant = await fetchPlantFromExternalAPI(query);
  
  if (externalPlant) {
    // Save to Supabase for future queries (omitting id as it will be generated)
    await savePlant({
      name: externalPlant.name,
      image: externalPlant.image,
      difficulty: externalPlant.difficulty, 
      light: externalPlant.light,
      water: externalPlant.water,
      temperature: externalPlant.temperature,
      growTime: externalPlant.growTime,
      description: externalPlant.description,
      edible: externalPlant.edible,
      edibleParts: externalPlant.edibleParts,
      careSteps: externalPlant.careSteps,
      isExternal: externalPlant.isExternal
    });
    
    return [externalPlant];
  }
  
  return [];
};
