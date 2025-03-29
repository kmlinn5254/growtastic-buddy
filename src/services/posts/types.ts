
import { User } from "@/hooks/auth/types";

export interface SupabasePost {
  id: number;
  user_id: string;
  content: string;
  image_url: string;
  created_at: string;
  user: {
    name: string;
    avatar_url: string;
  };
  comments_count: number;
  reactions_count: number;
  shares_count: number;
}

export interface SupabaseComment {
  id: number;
  post_id: number;
  user_id: string;
  content: string;
  created_at: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

export interface ReactionType {
  id: number;
  post_id: number;
  user_id: string;
  type: 'like' | 'heart' | 'celebrate' | 'support';
}

export interface ShareType {
  id: number;
  post_id: number;
  user_id: string;
  created_at: string;
}
