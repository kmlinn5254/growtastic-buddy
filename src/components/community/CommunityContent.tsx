
import { useRef, useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import PostForm from "@/components/community/PostForm";
import CommunityChallenge from "@/components/community/CommunityChallenge";
import PostFeed from "@/components/community/PostFeed";
import PullToRefresh from "@/components/community/PullToRefresh";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";
import { useSearchParams } from "react-router-dom";

const CommunityContent = () => {
  const [searchParams] = useSearchParams();
  const [initialContent, setInitialContent] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { 
    posts, 
    isRefreshing, 
    loadPosts, 
    handleSubmitPost,
    lastRefreshTime 
  } = useCommunityPosts();

  // Get challenge parameter from URL if present
  useEffect(() => {
    const challenge = searchParams.get('challenge');
    if (challenge === 'weekly') {
      setInitialContent("#PlantSpace ");
    }
  }, [searchParams]);
  
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
  }, [isRefreshing, loadPosts, lastRefreshTime]);
  
  // Initial fetch of posts
  useEffect(() => {
    loadPosts();
    
    // Setup an interval to refresh posts (every 30 seconds)
    const refreshInterval = setInterval(() => {
      loadPosts();
    }, 30000);
    
    return () => clearInterval(refreshInterval);
  }, [loadPosts]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-plant-dark">Plant Community</h1>
      
      <PullToRefresh isRefreshing={isRefreshing} />
      
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
  );
};

export default CommunityContent;
