
import { supabase } from '@/lib/supabase';
import { SupabasePost } from './types';

// Fetch posts from Supabase
export const fetchPosts = async (): Promise<SupabasePost[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:user_id (
          name,
          avatar_url
        ),
        comments_count:comments(count),
        reactions_count:reactions(count),
        shares_count:shares(count)
      `)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return (data || []) as unknown as SupabasePost[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Create a new post
export const createPost = async (content: string, userId: string, imageUrl: string = '') => {
  try {
    if (!userId) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        user_id: userId,
        content,
        image_url: imageUrl
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return data as unknown as SupabasePost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
