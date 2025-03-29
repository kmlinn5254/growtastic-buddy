
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import PostForm from "@/components/community/PostForm";
import CommunityChallenge from "@/components/community/CommunityChallenge";
import PostFeed from "@/components/community/PostFeed";
import { Post } from "@/components/community/PostItem";

// Mock data for community posts
const initialPosts: Post[] = [
  {
    id: 1,
    user: {
      name: "Emma Watson",
      avatar: "https://i.pravatar.cc/150?img=3",
      username: "plant_lover"
    },
    content: "My monstera grew three new leaves this week! The proper light and humidity really makes a difference.",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&q=80",
    likes: 87,
    comments: 12,
    shares: 5,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    user: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=8",
      username: "urban_gardener"
    },
    content: "Does anyone know what's causing these brown spots on my peace lily? I've tried adjusting the watering schedule but no luck so far.",
    image: "https://images.unsplash.com/photo-1616500121620-5c9a1db0bbe3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    likes: 34,
    comments: 28,
    shares: 2,
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    user: {
      name: "Sophie Chen",
      avatar: "https://i.pravatar.cc/150?img=5",
      username: "succulent_queen"
    },
    content: "Just reorganized my plant shelf! What do you think of this arrangement? Tips for keeping them all happy in the same space are welcome!",
    image: "https://images.unsplash.com/photo-1545165375-8be534458ba9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    likes: 142,
    comments: 45,
    shares: 18,
    timestamp: "1 day ago"
  }
];

const Community = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  
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
      image: imageUrl, // Now using the image URL from the form
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: "Just now"
    };
    
    setPosts([newPost, ...posts]);
    
    toast({
      title: "Post created",
      description: "Your post has been shared with the community!",
    });
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
              <PostForm onSubmitPost={handleSubmitPost} />
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
