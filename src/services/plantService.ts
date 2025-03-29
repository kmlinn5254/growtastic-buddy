
import { allPlants } from "@/data/plantFAQ";
import { Leaf } from "lucide-react";

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
  // This simulates the ability to search for any plant and uses query-relevant images
  const plantName = query.charAt(0).toUpperCase() + query.slice(1);
  
  // Try to get an image via Unsplash but use a placeholder icon name in the alt text
  // for better accessibility and to indicate the use of a generic placeholder
  const imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(plantName)},plant`;
  
  return [{
    id: 9999,
    name: plantName,
    image: imageUrl,
    difficulty: "Unknown",
    light: "Research needed",
    water: "Research needed",
    temperature: "Check local conditions"
  }];
};
