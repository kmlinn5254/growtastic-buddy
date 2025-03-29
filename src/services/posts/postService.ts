
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/auth/useAuth';
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
    
    return data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Create a new post
export const createPost = async (content: string, imageUrl: string = '') => {
  try {
    const { user } = useAuth();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        user_id: user.id,
        content,
        image_url: imageUrl
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
