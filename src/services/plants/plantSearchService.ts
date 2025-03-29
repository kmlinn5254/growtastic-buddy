
import { Plant } from '@/types/plants';
import { allPlants } from '@/data/plantFAQ';
import { searchPlantsInDb } from './plantFetchService';
import { savePlant } from './plantSaveService';

// Search plants with fallback to external API
export const searchPlants = async (query: string): Promise<Plant[]> => {
  // First try to search plants in Supabase
  const dbPlants = await searchPlantsInDb(query);
  
  if (dbPlants.length > 0) {
    return dbPlants;
  }
  
  // If no plants found in database, try the local cache
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return allPlants;
  }
  
  // Try exact matches first in local data
  const exactMatches = allPlants.filter(plant => 
    plant.name.toLowerCase() === normalizedQuery
  );
  
  if (exactMatches.length > 0) {
    return exactMatches;
  }
  
  // Then try partial matches in local data
  const partialMatches = allPlants.filter(plant => 
    plant.name.toLowerCase().includes(normalizedQuery)
  );
  
  if (partialMatches.length > 0) {
    return partialMatches;
  }
  
  // If no plants found in local cache, try the external API
  try {
    const { fetchPlantFromExternalAPI } = await import('../plantApiService');
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
  } catch (error) {
    console.error('Error fetching from external API:', error);
  }
  
  // If no plants found anywhere, return empty array
  return [];
};
