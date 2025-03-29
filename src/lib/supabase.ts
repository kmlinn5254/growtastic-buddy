
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// For development, we'll provide fallback values if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database schema
export type Tables = {
  users: {
    id: string;
    email: string;
    name: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
    created_at: string;
  };
  plants: {
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
    created_at: string;
    user_id?: string;
  };
  plant_care_steps: {
    id: number;
    plant_id: number;
    title: string;
    description: string;
    order: number;
  };
  fertilizer_shops: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    website: string;
    image: string;
    rating: number;
    latitude: number;
    longitude: number;
  };
  posts: {
    id: number;
    user_id: string;
    content: string;
    image_url: string;
    created_at: string;
  };
  comments: {
    id: number;
    post_id: number;
    user_id: string;
    content: string;
    created_at: string;
  };
  reactions: {
    id: number;
    post_id: number;
    user_id: string;
    type: string;
    created_at: string;
  };
  user_plants: {
    id: number;
    user_id: string;
    plant_id: number;
    planted_date: string;
    status: string;
    notes: string;
  };
  faqs: {
    id: number;
    question: string;
    answer: string;
    category: string;
  };
  seasonal_guides: {
    id: number;
    season: string;
    title: string;
    description: string;
    image: string;
  };
  seasonal_guide_content: {
    id: number;
    guide_id: number;
    heading: string;
    text: string;
    order: number;
  };
  notifications: {
    id: number;
    user_id: string;
    title: string;
    body: string;
    type: string;
    read: boolean;
    created_at: string;
  };
  user_settings: {
    id: string;
    user_id: string;
    plant_reminders: boolean;
    community_activity: boolean;
    new_features: boolean;
    marketing: boolean;
    language: string;
    theme: string;
  };
};
