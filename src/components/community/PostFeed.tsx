
import { useState } from "react";
import PostItem, { Post } from "./PostItem";
import { useToast } from "@/hooks/use-toast";

interface PostFeedProps {
  initialPosts: Post[];
}

const PostFeed = ({ initialPosts }: PostFeedProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const { toast } = useToast();
  
  const handleLike = (postId: number) => {
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
  };

  const handleComment = (postId: number, comment: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          user: {
            name: "You",
            avatar: "https://i.pravatar.cc/150?img=1"
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
  };

  const handleShare = (postId: number) => {
    // In a real app, this might open a share dialog or generate a shareable link
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    ));
    
    toast({
      title: "Post shared",
      description: "This post has been shared successfully!",
    });
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem 
          key={post.id} 
          post={post} 
          isLiked={likedPosts.includes(post.id)}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      ))}
    </div>
  );
};

export default PostFeed;
