
import { allPlants } from "@/data/plantFAQ";

// Plant search service
export const searchPlants = (query: string) => {
  if (!query.trim()) {
    return allPlants;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // First try exact matches
  const exactMatches = allPlants.filter(plant => 
    plant.name.toLowerCase() === normalizedQuery
  );
  
  if (exactMatches.length > 0) {
    return exactMatches;
  }
  
  // Then try partial matches
  const partialMatches = allPlants.filter(plant => 
    plant.name.toLowerCase().includes(normalizedQuery)
  );
  
  if (partialMatches.length > 0) {
    return partialMatches;
  }
  
  // If no matches found, create a "placeholder" plant with the search query
  // This simulates the ability to search for any plant
  return [{
    id: 9999,
    name: query.charAt(0).toUpperCase() + query.slice(1),
    image: "https://images.unsplash.com/photo-1581300740943-cfa5f847db2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    difficulty: "Unknown",
    light: "Research needed",
    water: "Research needed",
    temperature: "Check local conditions"
  }];
};
