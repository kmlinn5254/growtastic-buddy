
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/auth/useAuth';

// Share a post
export const sharePost = async (postId: number) => {
  try {
    const { user } = useAuth();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('shares')
      .insert([{
        post_id: postId,
        user_id: user.id
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error sharing post:', error);
    throw error;
  }
};
