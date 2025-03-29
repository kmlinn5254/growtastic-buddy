
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/auth/useAuth';
import { ReactionType } from './types';

// Add a reaction to a post
export const addReaction = async (postId: number, type: 'like' | 'heart' | 'celebrate' | 'support' = 'like') => {
  try {
    const { user } = useAuth();
    if (!user) throw new Error('User not authenticated');
    
    // Check if user already reacted
    const { data: existingReaction } = await supabase
      .from('reactions')
      .select('id, type')
      .eq('post_id', postId)
      .eq('user_id', user.id)
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
        return data;
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
        user_id: user.id,
        type
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error adding reaction:', error);
    throw error;
  }
};

// Check if user has reacted to a post
export const hasUserReacted = async (postId: number): Promise<boolean> => {
  try {
    const { user } = useAuth();
    if (!user) return false;
    
    const { data, error } = await supabase
      .from('reactions')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    
    return !!data;
  } catch (error) {
    console.error('Error checking reaction:', error);
    return false;
  }
};
