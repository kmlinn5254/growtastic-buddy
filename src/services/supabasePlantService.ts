
// This file is deprecated and has been refactored into smaller modules
// Its functionality has been moved to the src/services/plants/ directory

import { 
  fetchPlants,
  fetchPlantById,
  searchPlantsInDb,
  savePlant,
  searchPlants
} from './plants';

// Re-export for backward compatibility
export {
  fetchPlants,
  fetchPlantById,
  searchPlantsInDb,
  savePlant,
  searchPlants
};
