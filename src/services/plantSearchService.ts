
import { Plant } from "@/types/plants";
import { allPlants } from "@/data/plantFAQ";
import { searchPlantsInDb } from "@/services/supabasePlantService";
import { fetchPlantFromExternalAPI } from "@/services/plantApiService";

// Plant search service - uses Supabase with fallback to local data and external API
export const searchPlants = async (query: string): Promise<Plant[]> => {
  // First try to search in Supabase
  try {
    const supabasePlants = await searchPlantsInDb(query);
    
    if (supabasePlants.length > 0) {
      return supabasePlants;
    }
  } catch (error) {
    console.error("Error searching Supabase:", error);
    // Continue to fallbacks if Supabase search fails
  }
  
  // Fallback to local data if Supabase is empty or fails
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    // Return all plants if no query provided
    return allPlants;
  }
  
  // Try exact matches first
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
  
  // If no matches found in our database, try to fetch from external API
  const externalPlant = await fetchPlantFromExternalAPI(query);
  if (externalPlant) {
    return [externalPlant];
  }
  
  // If no matches found anywhere, return empty array
  return [];
};
