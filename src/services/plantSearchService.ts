
import { Plant } from "@/types/plants";
import { allPlants } from "@/data/plantFAQ";
import { getExternalPlants } from "@/services/plantStorage";
import { fetchPlantFromExternalAPI } from "@/services/plantApiService";

// Plant search service
export const searchPlants = async (query: string): Promise<Plant[]> => {
  // Get all plants from our internal database first
  const internalPlants = [...allPlants, ...getExternalPlants()];
  
  if (!query.trim()) {
    // Return all plants if no query provided
    return internalPlants;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // First check for matches in our internal database
  // Try exact matches first
  const exactMatches = internalPlants.filter(plant => 
    plant.name.toLowerCase() === normalizedQuery
  );
  
  if (exactMatches.length > 0) {
    return exactMatches;
  }
  
  // Then try partial matches
  const partialMatches = internalPlants.filter(plant => 
    plant.name.toLowerCase().includes(normalizedQuery)
  );
  
  if (partialMatches.length > 0) {
    return partialMatches;
  }
  
  // If no matches found in internal database, try to fetch from external API
  const externalPlant = await fetchPlantFromExternalAPI(query);
  if (externalPlant) {
    return [externalPlant];
  }
  
  // If no matches found anywhere, return empty array
  return [];
};
