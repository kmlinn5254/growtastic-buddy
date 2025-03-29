
// Re-export from other files
export type { Plant } from '@/types/plants';
export { getExternalPlants, saveExternalPlant, deleteExternalPlant } from '@/services/plantStorage';
export { fetchPlantFromExternalAPI } from '@/services/plantApiService';
export { searchPlants } from '@/services/plantSearchService';
