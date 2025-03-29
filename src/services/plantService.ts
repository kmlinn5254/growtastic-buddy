
import { allPlants } from "@/data/plantFAQ";
import { Leaf } from "lucide-react";

// Plant interface for consistent type checking
export interface Plant {
  id: number;
  name: string;
  image: string;
  difficulty: string;
  light: string;
  water: string;
  temperature: string;
  description?: string;
  careSteps?: {
    title: string;
    description: string;
  }[];
  // Flag to identify if this is an imported plant
  isImported?: boolean;
}

// Storage key for imported plants
const IMPORTED_PLANTS_KEY = 'imported_plants';

// Get imported plants from localStorage
export const getImportedPlants = (): Plant[] => {
  try {
    const storedPlants = localStorage.getItem(IMPORTED_PLANTS_KEY);
    return storedPlants ? JSON.parse(storedPlants) : [];
  } catch (error) {
    console.error("Error loading imported plants:", error);
    return [];
  }
};

// Save imported plants to localStorage
export const saveImportedPlant = (plant: Plant): boolean => {
  try {
    const importedPlants = getImportedPlants();
    
    // Check if plant with same name already exists
    const existingIndex = importedPlants.findIndex(p => 
      p.name.toLowerCase() === plant.name.toLowerCase()
    );
    
    // Generate a unique ID for the new plant
    const newPlant = {
      ...plant,
      id: existingIndex >= 0 ? importedPlants[existingIndex].id : Date.now(),
      isImported: true
    };
    
    // Replace if exists, otherwise add
    if (existingIndex >= 0) {
      importedPlants[existingIndex] = newPlant;
    } else {
      importedPlants.push(newPlant);
    }
    
    localStorage.setItem(IMPORTED_PLANTS_KEY, JSON.stringify(importedPlants));
    return true;
  } catch (error) {
    console.error("Error saving imported plant:", error);
    return false;
  }
};

// Delete an imported plant
export const deleteImportedPlant = (plantId: number): boolean => {
  try {
    const importedPlants = getImportedPlants();
    const filteredPlants = importedPlants.filter(p => p.id !== plantId);
    localStorage.setItem(IMPORTED_PLANTS_KEY, JSON.stringify(filteredPlants));
    return true;
  } catch (error) {
    console.error("Error deleting imported plant:", error);
    return false;
  }
};

// Plant search service
export const searchPlants = (query: string): Plant[] => {
  if (!query.trim()) {
    // Return combined list of predefined and imported plants
    return [...allPlants, ...getImportedPlants()];
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  const importedPlants = getImportedPlants();
  const allAvailablePlants = [...allPlants, ...importedPlants];
  
  // First try exact matches
  const exactMatches = allAvailablePlants.filter(plant => 
    plant.name.toLowerCase() === normalizedQuery
  );
  
  if (exactMatches.length > 0) {
    return exactMatches;
  }
  
  // Then try partial matches
  const partialMatches = allAvailablePlants.filter(plant => 
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
