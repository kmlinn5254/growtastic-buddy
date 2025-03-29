
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, Send, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

interface PostFormProps {
  onSubmitPost: (content: string) => void;
}

const PostForm = ({ onSubmitPost }: PostFormProps) => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [newPost, setNewPost] = useState("");

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to create posts.",
        variant: "destructive"
      });
      return;
    }
    
    onSubmitPost(newPost);
    setNewPost("");
  };

  return (
    <form onSubmit={handleSubmitPost}>
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.photoURL} alt={user?.name || "Avatar"} />
          <AvatarFallback>{user?.name ? user.name.charAt(0) : "U"}</AvatarFallback>
        </Avatar>
        <div className="flex-1 relative">
          <Input
            placeholder={isAuthenticated ? "Share your plant journey..." : "Sign in to share your plant journey..."}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="plant-input border-b-2 border-x-0 border-t-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-plant-primary"
            disabled={!isAuthenticated}
          />
          {!isAuthenticated && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Button type="button" variant="ghost" className="text-gray-500" disabled={!isAuthenticated}>
          <ImageIcon className="h-5 w-5 mr-2" />
          Add Photo
        </Button>
        <Button 
          type="submit" 
          className="bg-plant-primary hover:bg-plant-dark"
          disabled={!isAuthenticated || !newPost.trim()}
        >
          <Send className="h-5 w-5 mr-2" />
          Post
        </Button>
      </div>
      {!isAuthenticated && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 mb-2">You need to sign in to create posts</p>
          <Link to="/login">
            <Button variant="outline" className="mx-auto">
              Sign In
            </Button>
          </Link>
        </div>
      )}
    </form>
  );
};

export default PostForm;
