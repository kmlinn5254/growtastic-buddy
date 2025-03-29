
import { useState, useEffect } from "react";
import PostItem, { Post } from "./PostItem";
import { useToast } from "@/hooks/use-toast";
import { addReaction } from "@/services/posts/reactionService";
import { addComment } from "@/services/posts/commentService";
import { sharePost } from "@/services/posts/shareService";
import { useAuth } from "@/hooks/useAuth";

interface PostFeedProps {
  initialPosts: Post[];
  onRefresh?: () => void;
}

const PostFeed = ({ initialPosts, onRefresh }: PostFeedProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Update posts when initialPosts changes
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);
  
  const handleLike = async (postId: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to like posts.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await addReaction(postId, user.id, 'like');
      
      if (likedPosts.includes(postId)) {
        // Unlike
        setLikedPosts(likedPosts.filter(id => id !== postId));
        setPosts(posts.map(post => 
          post.id === postId ? { ...post, likes: post.likes - 1 } : post
        ));
      } else {
        // Like
        setLikedPosts([...likedPosts, postId]);
        setPosts(posts.map(post => 
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update reaction.",
        variant: "destructive"
      });
    }
  };

  const handleComment = async (postId: number, comment: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to comment on posts.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await addComment(postId, comment, user.id);
      
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: Date.now(),
            user: {
              name: user.name || "You",
              avatar: user.photoURL || "https://i.pravatar.cc/150?img=1"
            },
            content: comment,
            timestamp: "Just now"
          };
          
          const newCommentList = post.commentList ? [...post.commentList, newComment] : [newComment];
          
          return {
            ...post,
            comments: post.comments + 1,
            commentList: newCommentList
          };
        }
        return post;
      }));
      
      toast({
        title: "Comment added",
        description: "Your comment has been added to the post.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment.",
        variant: "destructive"
      });
    }
  };

  const handleShare = async (postId: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to share posts.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await sharePost(postId, user.id);
      
      // Update UI
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      ));
      
      toast({
        title: "Post shared",
        description: "This post has been shared successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share post.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem 
            key={post.id} 
            post={post} 
            isLiked={likedPosts.includes(post.id)}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        ))
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500 mb-4">No posts yet. Be the first to share your plant journey!</p>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
