
import { supabase } from '@/lib/supabase';
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
    
    return (data || []) as SupabaseComment[];
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

// Add a comment to a post
export const addComment = async (postId: number, content: string, userId: string) => {
  try {
    if (!userId) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        post_id: postId,
        user_id: userId,
        content
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return data as SupabaseComment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};
