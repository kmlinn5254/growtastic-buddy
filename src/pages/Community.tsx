
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import PostForm from "@/components/community/PostForm";
import CommunityChallenge from "@/components/community/CommunityChallenge";
import PostFeed from "@/components/community/PostFeed";
import { Post } from "@/components/community/PostItem";
import { fetchPosts, createPost } from "@/services/posts/postService";
import { SupabasePost } from "@/services/posts/types";
import { useSearchParams } from "react-router-dom";

const Community = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParams] = useSearchParams();
  const [initialContent, setInitialContent] = useState<string>("");
  
  // Get challenge parameter from URL if present
  useEffect(() => {
    const challenge = searchParams.get('challenge');
    if (challenge === 'weekly') {
      setInitialContent("#PlantSpace ");
    }
  }, [searchParams]);
  
  // Add an event listener for custom events from the CommunityChallenge component
  useEffect(() => {
    const handleTagEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.tag) {
        setInitialContent(customEvent.detail.tag);
      }
    };
    
    window.addEventListener('plant:tag', handleTagEvent);
    
    return () => {
      window.removeEventListener('plant:tag', handleTagEvent);
    };
  }, []);
  
  // Fetch posts from Supabase
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const supabasePosts = await fetchPosts();
        
        // Transform Supabase posts to the format expected by the PostFeed component
        const transformedPosts = supabasePosts.map(post => ({
          id: post.id,
          user: {
            name: post.user?.name || "Unknown User",
            avatar: post.user?.avatar_url || "https://i.pravatar.cc/150?img=0",
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
        
        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };
    
    loadPosts();
  }, []);
  
  const handleSubmitPost = (content: string, imageUrl: string) => {
    // Add new post to the top
    const newPost: Post = {
      id: Date.now(),
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
    
    setPosts([newPost, ...posts]);
    
    toast({
      title: "Post created",
      description: "Your post has been shared with the community!",
    });
    
    // Clear the initial content after posting
    setInitialContent("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-plant-dark">Plant Community</h1>
          
          {/* Post creation */}
          <Card className="mb-8 plant-section">
            <CardContent className="pt-6">
              <PostForm 
                onSubmitPost={handleSubmitPost} 
                initialContent={initialContent}
              />
            </CardContent>
          </Card>
          
          {/* Community challenges */}
          <Card className="mb-8 bg-gradient-to-r from-green-500 to-teal-500 text-white plant-section">
            <CardContent className="pt-6">
              <CommunityChallenge />
            </CardContent>
          </Card>
          
          {/* Feed */}
          <PostFeed initialPosts={posts} />
        </div>
      </main>
    </div>
  );
};

export default Community;
