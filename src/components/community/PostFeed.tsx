
import { useState } from "react";
import PostItem, { Post } from "./PostItem";

interface PostFeedProps {
  initialPosts: Post[];
}

const PostFeed = ({ initialPosts }: PostFeedProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  
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

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem 
          key={post.id} 
          post={post} 
          isLiked={likedPosts.includes(post.id)}
          onLike={handleLike}
        />
      ))}
    </div>
  );
};

export default PostFeed;
