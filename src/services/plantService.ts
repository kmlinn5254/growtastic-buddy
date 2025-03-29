
import { allPlants } from "@/data/plantFAQ";
import { Leaf } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  // Flag to identify if this is from external API
  isExternal?: boolean;
}

// Storage key for imported plants
const IMPORTED_PLANTS_KEY = 'imported_plants';
// Storage key for externally fetched plants
const EXTERNAL_PLANTS_KEY = 'external_plants';

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

// Get externally fetched plants from localStorage
export const getExternalPlants = (): Plant[] => {
  try {
    const storedPlants = localStorage.getItem(EXTERNAL_PLANTS_KEY);
    return storedPlants ? JSON.parse(storedPlants) : [];
  } catch (error) {
    console.error("Error loading external plants:", error);
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

// Save externally fetched plant to localStorage
export const saveExternalPlant = (plant: Plant): boolean => {
  try {
    const externalPlants = getExternalPlants();
    
    // Check if plant with same name already exists
    const existingIndex = externalPlants.findIndex(p => 
      p.name.toLowerCase() === plant.name.toLowerCase()
    );
    
    // Generate a unique ID for the new plant
    const newPlant = {
      ...plant,
      id: existingIndex >= 0 ? externalPlants[existingIndex].id : Date.now(),
      isExternal: true
    };
    
    // Replace if exists, otherwise add
    if (existingIndex >= 0) {
      externalPlants[existingIndex] = newPlant;
    } else {
      externalPlants.push(newPlant);
    }
    
    localStorage.setItem(EXTERNAL_PLANTS_KEY, JSON.stringify(externalPlants));
    return true;
  } catch (error) {
    console.error("Error saving external plant:", error);
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

// Delete an external plant
export const deleteExternalPlant = (plantId: number): boolean => {
  try {
    const externalPlants = getExternalPlants();
    const filteredPlants = externalPlants.filter(p => p.id !== plantId);
    localStorage.setItem(EXTERNAL_PLANTS_KEY, JSON.stringify(filteredPlants));
    return true;
  } catch (error) {
    console.error("Error deleting external plant:", error);
    return false;
  }
};

// Fetch plant data from external API
export const fetchPlantFromExternalAPI = async (plantName: string): Promise<Plant | null> => {
  try {
    // Using Perenual API as an example - you would need to replace with your preferred plant API
    const response = await fetch(`https://perenual.com/api/species-list?key=sk-L2g7645b8bd22a8ea2246&q=${encodeURIComponent(plantName)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch plant data');
    }
    
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      const plantData = data.data[0];
      
      // Map the external API response to our Plant interface
      const plant: Plant = {
        id: Date.now(),
        name: plantData.common_name || plantName,
        image: plantData.default_image?.medium_url || plantData.default_image?.regular_url || 
               `https://source.unsplash.com/featured/?${encodeURIComponent(plantName)},plant`,
        difficulty: plantData.care_level || "Moderate",
        light: getWaterRequirement(plantData.watering),
        water: getLightRequirement(plantData.sunlight),
        temperature: `${plantData.hardiness.min || "Unknown"} - ${plantData.hardiness.max || "Unknown"}`,
        description: plantData.description,
        careSteps: [
          {
            title: "Watering",
            description: getWaterRequirement(plantData.watering)
          },
          {
            title: "Light",
            description: getLightRequirement(plantData.sunlight)
          },
          {
            title: "Temperature",
            description: `Preferred temperature range: ${plantData.hardiness.min || "Unknown"} - ${plantData.hardiness.max || "Unknown"}`
          }
        ],
        isExternal: true
      };
      
      // Save to localStorage and return
      saveExternalPlant(plant);
      toast({
        title: "Plant Guide Found",
        description: `Successfully imported care guide for ${plant.name}`,
      });
      return plant;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching plant data:", error);
    toast({
      title: "Error",
      description: "Failed to fetch plant data from external source",
      variant: "destructive",
    });
    return null;
  }
};

// Helper function to map water requirement
function getWaterRequirement(watering: string | undefined): string {
  if (!watering) return "Moderate watering";
  
  switch(watering.toLowerCase()) {
    case "frequent":
      return "Keep soil moist, water when top inch of soil is dry";
    case "average":
      return "Water when top 2 inches of soil are dry";
    case "minimum":
      return "Allow soil to dry between waterings";
    case "none":
      return "Very drought tolerant, minimal watering required";
    default:
      return "Moderate watering";
  }
}

// Helper function to map light requirement
function getLightRequirement(sunlight: string[] | undefined): string {
  if (!sunlight || sunlight.length === 0) return "Medium light";
  
  const light = sunlight[0].toLowerCase();
  
  if (light.includes("full")) return "Full sun";
  if (light.includes("part")) return "Partial sun";
  if (light.includes("shade")) return "Shade";
  
  return "Medium light";
}

// Plant search service
export const searchPlants = async (query: string): Promise<Plant[]> => {
  if (!query.trim()) {
    // Return combined list of predefined, imported, and external plants
    return [...allPlants, ...getImportedPlants(), ...getExternalPlants()];
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  const importedPlants = getImportedPlants();
  const externalPlants = getExternalPlants();
  const allAvailablePlants = [...allPlants, ...importedPlants, ...externalPlants];
  
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
  
  // If no local matches found, try to fetch from external API
  const externalPlant = await fetchPlantFromExternalAPI(query);
  if (externalPlant) {
    return [externalPlant];
  }
  
  // If no matches found anywhere, create a "placeholder" plant with the search query
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
