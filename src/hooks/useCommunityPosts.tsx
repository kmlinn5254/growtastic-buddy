
import { useState, useCallback, useRef } from "react";
import { Post } from "@/components/community/PostItem";
import { fetchPosts, createPost } from "@/services/posts/postService";
import { useToast } from "@/hooks/use-toast";

export const useCommunityPosts = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const lastRefreshTime = useRef<number>(Date.now());

  // Function to fetch posts from Supabase and deduplicate them
  const loadPosts = useCallback(async (showToast = false) => {
    try {
      setIsRefreshing(true);
      const supabasePosts = await fetchPosts();
      
      // Transform Supabase posts to the format expected by the PostFeed component
      const transformedPosts = supabasePosts.map(post => ({
        id: post.id,
        user: {
          name: post.profiles?.name || "Unknown User",
          avatar: post.profiles?.avatar_url || "https://i.pravatar.cc/150?img=0",
          username: post.user_id.substring(0, 8)
        },
        content: post.content,
        image: post.image_url,
        likes: post.reactions_count || 0,
        comments: post.comments_count || 0,
        shares: post.shares_count || 0,
        timestamp: new Date(post.created_at).toLocaleDateString(),
        commentList: []
      }));
      
      // Use a Map to deduplicate posts based on ID
      const postsMap = new Map<number, Post>();
      transformedPosts.forEach(post => {
        postsMap.set(post.id, post);
      });
      
      // Convert Map back to array and sort by most recent
      const uniquePosts = Array.from(postsMap.values()).sort((a, b) => {
        return b.id - a.id; // Sort by ID (most recent first)
      });
      
      setPosts(uniquePosts);
      
      if (showToast) {
        toast({
          title: "Feed refreshed",
          description: "Latest posts have been loaded."
        });
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      if (showToast) {
        toast({
          title: "Error refreshing",
          description: "Could not load the latest posts.",
          variant: "destructive"
        });
      }
    } finally {
      setIsRefreshing(false);
      lastRefreshTime.current = Date.now();
    }
  }, [toast]);

  const handleSubmitPost = async (content: string, imageUrl: string) => {
    try {
      // Create post in Supabase
      const newPostData = await createPost(content, "me", imageUrl);
      
      // Add new post to the top (optimistic update)
      const newPost: Post = {
        id: newPostData.id || Date.now(),
        user: {
          name: "You",
          avatar: "https://i.pravatar.cc/150?img=1",
          username: "me"
        },
        content: content,
        image: imageUrl,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: "Just now",
        commentList: []
      };
      
      setPosts(prevPosts => [newPost, ...prevPosts]);
      
      toast({
        title: "Post created",
        description: "Your post has been shared with the community!",
      });
      
      // Refresh posts to ensure consistency
      setTimeout(() => loadPosts(), 1000);
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create your post. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    posts,
    isRefreshing,
    loadPosts,
    handleSubmitPost,
    lastRefreshTime
  };
};
