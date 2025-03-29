
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, Send, Image as ImageIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

interface PostFormProps {
  onSubmitPost: (content: string, imageUrl: string) => void;
  initialContent?: string;
}

const PostForm = ({ onSubmitPost, initialContent = "" }: PostFormProps) => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [newPost, setNewPost] = useState(initialContent);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // If there's initialContent, update the state
    if (initialContent) {
      setNewPost(initialContent);
    }
  }, [initialContent]);
  
  // Auto adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [newPost]);

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() && !imagePreview) return;
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to create posts.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      onSubmitPost(newPost, imagePreview || "");
      setNewPost("");
      setSelectedImage(null);
      setImagePreview(null);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create post.",
        variant: "destructive"
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClickAddPhoto = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmitPost}>
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 mt-1">
          <AvatarImage src={user?.photoURL} alt={user?.name || "Avatar"} />
          <AvatarFallback>{user?.name ? user.name.charAt(0) : "U"}</AvatarFallback>
        </Avatar>
        <div className={`flex-1 relative ${isFocused ? 'ring-2 ring-plant-primary rounded-md' : ''}`}>
          <Textarea
            ref={textareaRef}
            placeholder={isAuthenticated ? "Share your plant journey..." : "Sign in to share your plant journey..."}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="plant-input border-b-2 border-x-0 border-t-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-plant-primary min-h-[100px] resize-none overflow-hidden"
            disabled={!isAuthenticated}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={4}
          />
          {!isAuthenticated && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
      
      {/* Image preview section */}
      {imagePreview && (
        <div className="mt-4 relative">
          <div className="relative rounded-lg overflow-hidden">
            <img src={imagePreview} alt="Preview" className="w-full max-h-80 object-cover" />
            <Button 
              type="button" 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 rounded-full h-8 w-8"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button 
          type="button" 
          variant="ghost" 
          className="text-gray-500" 
          disabled={!isAuthenticated}
          onClick={handleClickAddPhoto}
        >
          <ImageIcon className="h-5 w-5 mr-2" />
          Add Photo
        </Button>
        <Button 
          type="submit" 
          className="bg-plant-primary hover:bg-plant-dark"
          disabled={!isAuthenticated || (!newPost.trim() && !imagePreview)}
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
