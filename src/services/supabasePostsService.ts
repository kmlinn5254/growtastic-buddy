
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

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

// Fetch posts from Supabase
export const fetchPosts = async () => {
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

// Fetch comments for a post
export const fetchComments = async (postId: number) => {
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

// Check if user has reacted to a post
export const hasUserReacted = async (postId: number) => {
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
