
import { Plant } from '@/types/plants';

// Supabase database plant type (matches database schema)
export interface SupabasePlant {
  id: number;
  name: string;
  image: string;
  difficulty: string;
  light: string;
  water: string;
  temperature: string;
  grow_time?: string;
  description?: string;
  edible?: boolean;
  edible_parts?: string;
  created_at?: string;
  user_id?: string;
}

// Supabase database plant care step type
export interface SupabasePlantCareStep {
  id: number;
  plant_id: number;
  title: string;
  description: string;
  order: number;
}

// Interface for seasonal guides
export interface SeasonalGuide {
  id: number;
  season: string;
  title: string;
  description: string;
  image: string;
  content: Array<{
    heading: string;
    text: string;
  }>;
}

// Mapper function to convert Supabase plant data to our Plant type
export const mapSupabasePlantToPlant = (
  plant: SupabasePlant, 
  careSteps: SupabasePlantCareStep[] = []
): Plant => {
  return {
    id: plant.id,
    name: plant.name,
    image: plant.image,
    difficulty: plant.difficulty,
    light: plant.light,
    water: plant.water,
    temperature: plant.temperature,
    growTime: plant.grow_time,
    description: plant.description,
    edible: plant.edible,
    edibleParts: plant.edible_parts,
    careSteps: careSteps.map(step => ({
      title: step.title,
      description: step.description
    })),
    isExternal: false
  };
};
