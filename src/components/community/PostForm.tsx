
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, Send, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PostFormProps {
  user: {
    isAuthenticated: boolean;
    name: string;
    avatar: string;
    username: string;
  };
  onSubmitPost: (content: string) => void;
}

const PostForm = ({ user, onSubmitPost }: PostFormProps) => {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState("");

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    if (!user.isAuthenticated) {
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
          <AvatarImage src={user.avatar} alt="Your avatar" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 relative">
          <Input
            placeholder={user.isAuthenticated ? "Share your plant journey..." : "Sign in to share your plant journey..."}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="plant-input border-b-2 border-x-0 border-t-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-plant-primary"
            disabled={!user.isAuthenticated}
          />
          {!user.isAuthenticated && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Button type="button" variant="ghost" className="text-gray-500" disabled={!user.isAuthenticated}>
          <ImageIcon className="h-5 w-5 mr-2" />
          Add Photo
        </Button>
        <Button 
          type="submit" 
          className="bg-plant-primary hover:bg-plant-dark"
          disabled={!user.isAuthenticated || !newPost.trim()}
        >
          <Send className="h-5 w-5 mr-2" />
          Post
        </Button>
      </div>
      {!user.isAuthenticated && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 mb-2">You need to sign in to create posts</p>
          <Button variant="outline" className="mx-auto">
            Sign In
          </Button>
        </div>
      )}
    </form>
  );
};

export default PostForm;
