
import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import PostForm from "@/components/community/PostForm";
import CommunityChallenge from "@/components/community/CommunityChallenge";
import PostFeed from "@/components/community/PostFeed";
import { Post } from "@/components/community/PostItem";
import { fetchPosts, createPost } from "@/services/posts/postService";
import { useSearchParams } from "react-router-dom";
import { RefreshCw } from "lucide-react";

const Community = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParams] = useSearchParams();
  const [initialContent, setInitialContent] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastRefreshTime = useRef<number>(Date.now());
  
  // Get challenge parameter from URL if present
  useEffect(() => {
    const challenge = searchParams.get('challenge');
    if (challenge === 'weekly') {
      setInitialContent("#PlantSpace ");
    }
  }, [searchParams]);
  
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
  
  // Pull to refresh functionality
  const handleScroll = useCallback(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || isRefreshing) return;
    
    // Check if user has scrolled to top
    if (scrollElement.scrollTop < -50) {
      // Throttle refreshes to prevent multiple calls
      if (Date.now() - lastRefreshTime.current > 3000) {
        loadPosts(true);
      }
    }
  }, [isRefreshing, loadPosts]);
  
  // Initial fetch of posts
  useEffect(() => {
    loadPosts();
    
    // Setup an interval to refresh posts (every 30 seconds)
    const refreshInterval = setInterval(() => {
      loadPosts();
    }, 30000);
    
    return () => clearInterval(refreshInterval);
  }, [loadPosts]);
  
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
      
      // Clear the initial content after posting
      setInitialContent("");
      
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-plant-dark">Plant Community</h1>
          
          {/* Pull to refresh indicator */}
          {isRefreshing && (
            <div className="flex justify-center mb-4 text-plant-primary animate-pulse">
              <RefreshCw className="h-6 w-6 animate-spin" />
              <span className="ml-2">Refreshing...</span>
            </div>
          )}
          
          <ScrollArea 
            ref={scrollRef} 
            className="h-[calc(100vh-180px)] pr-4 overflow-y-auto" 
            onScroll={handleScroll}
          >
            <div className="space-y-8 pb-8">
              {/* Post creation */}
              <Card className="plant-section">
                <CardContent className="pt-6">
                  <PostForm 
                    onSubmitPost={handleSubmitPost} 
                    initialContent={initialContent}
                  />
                </CardContent>
              </Card>
              
              {/* Community challenges */}
              <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white plant-section">
                <CardContent className="pt-6">
                  <CommunityChallenge />
                </CardContent>
              </Card>
              
              {/* Feed */}
              <PostFeed initialPosts={posts} onRefresh={loadPosts} />
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
};

export default Community;
