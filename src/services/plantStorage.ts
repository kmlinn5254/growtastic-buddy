
import { Plant } from "@/types/plants";
import { toast } from "@/hooks/use-toast";

// Storage key for externally fetched plants
export const EXTERNAL_PLANTS_KEY = 'external_plants';

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
