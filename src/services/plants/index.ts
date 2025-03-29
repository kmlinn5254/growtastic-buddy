
// Re-export all plant service functionality
export * from './plantTypes';
export * from './plantFetchService';
export * from './plantSaveService';
export * from './plantSearchService';
export * from './seasonalGuidesService';

// Export the Plant type from the main type definition
export type { Plant } from '@/types/plants';
