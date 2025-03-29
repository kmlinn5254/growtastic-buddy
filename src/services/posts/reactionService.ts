
import { supabase } from '@/lib/supabase';
import { ReactionType } from './types';

// Add a reaction to a post
export const addReaction = async (postId: number, userId: string, type: 'like' | 'heart' | 'celebrate' | 'support' = 'like') => {
  try {
    if (!userId) throw new Error('User not authenticated');
    
    // Check if user already reacted
    const { data: existingReaction } = await supabase
      .from('reactions')
      .select('id, type')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();
      
    if (existingReaction) {
      // Update existing reaction if different type
      if (existingReaction.type !== type) {
        const { data, error } = await supabase
          .from('reactions')
          .update({ type })
          .eq('id', existingReaction.id)
          .select()
          .single();
          
        if (error) throw error;
        return data as ReactionType;
      }
      
      // Remove reaction if same type (toggle off)
      const { error } = await supabase
        .from('reactions')
        .delete()
        .eq('id', existingReaction.id);
        
      if (error) throw error;
      return null;
    }
    
    // Create new reaction
    const { data, error } = await supabase
      .from('reactions')
      .insert([{
        post_id: postId,
        user_id: userId,
        type
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return data as ReactionType;
  } catch (error) {
    console.error('Error adding reaction:', error);
    throw error;
  }
};

// Check if user has reacted to a post
export const hasUserReacted = async (postId: number, userId: string): Promise<boolean> => {
  try {
    if (!userId) return false;
    
    const { data, error } = await supabase
      .from('reactions')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    
    return !!data;
  } catch (error) {
    console.error('Error checking reaction:', error);
    return false;
  }
};
