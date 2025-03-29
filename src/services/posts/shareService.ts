
import { supabase } from '@/integrations/supabase/client';

// Share a post
export const sharePost = async (postId: number, userId: string) => {
  try {
    if (!userId) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('shares')
      .insert([{
        post_id: postId,
        user_id: userId
      }])
      .select();
      
    if (error) throw error;
    
    return data[0];
  } catch (error) {
    console.error('Error sharing post:', error);
    throw error;
  }
};
