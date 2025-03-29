
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { SupabaseComment } from './types';

// Fetch comments for a post
export const fetchComments = async (postId: number): Promise<SupabaseComment[]> => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        user:user_id (
          name,
          avatar_url
        )
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

// Add a comment to a post
export const addComment = async (postId: number, content: string) => {
  try {
    const { user } = useAuth();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        post_id: postId,
        user_id: user.id,
        content
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};
