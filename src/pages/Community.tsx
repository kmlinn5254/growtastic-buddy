
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Sparkles, Image as ImageIcon, Send } from "lucide-react";
import Navigation from "@/components/Navigation";

// Mock data for community posts
const initialPosts = [
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
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");
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
  
  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    // Add new post to the top
    const newPostObj = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "https://i.pravatar.cc/150?img=1",
        username: "me"
      },
      content: newPost,
      image: "", // No image in this simplified version
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: "Just now"
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
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
              <form onSubmit={handleSubmitPost}>
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Your avatar" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Share your plant journey..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="plant-input border-b-2 border-x-0 border-t-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-plant-primary"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button type="button" variant="ghost" className="text-gray-500">
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Add Photo
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-plant-primary hover:bg-plant-dark"
                    disabled={!newPost.trim()}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Post
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Community challenges */}
          <Card className="mb-8 bg-gradient-to-r from-green-500 to-teal-500 text-white plant-section">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Weekly Challenge
                  </h3>
                  <p>Show us your most creative plant arrangement! Use #PlantSpace to participate.</p>
                </div>
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  Join
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="plant-section">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={post.user.avatar} alt={post.user.name} />
                      <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{post.user.name}</p>
                      <p className="text-sm text-gray-500">@{post.user.username} · {post.timestamp}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4">{post.content}</p>
                  
                  {post.image && (
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="border-t pt-4 pb-2">
                  <div className="flex justify-between w-full">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={likedPosts.includes(post.id) ? "text-pink-500" : "text-gray-500 hover:text-pink-500"}
                    >
                      <Heart className={`h-5 w-5 mr-1 ${likedPosts.includes(post.id) ? "fill-pink-500" : ""}`} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <MessageCircle className="h-5 w-5 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Share2 className="h-5 w-5 mr-1" />
                      {post.shares}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
