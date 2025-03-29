
// Plant interface for consistent type checking
export interface Plant {
  id: number;
  name: string;
  image: string;
  difficulty: string;
  light: string;
  water: string;
  temperature: string;
  growTime?: string;  // Optional to maintain compatibility with both usages
  description?: string;
  edible?: boolean;   // Indicates if plant is edible
  edibleParts?: string; // Describes which parts are edible
  careSteps?: {
    title: string;
    description: string;
  }[];
  // Flag to identify if this is from external API
  isExternal?: boolean;
}
