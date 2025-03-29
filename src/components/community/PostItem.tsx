
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  commentList?: {
    id: number;
    user: {
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
  }[];
}

interface PostItemProps {
  post: Post;
  isLiked: boolean;
  onLike: (postId: number) => void;
  onComment: (postId: number, comment: string) => void;
  onShare: (postId: number) => void;
}

const PostItem = ({ post, isLiked, onLike, onComment, onShare }: PostItemProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const handleCommentSubmit = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to comment on posts.",
        variant: "destructive"
      });
      return;
    }

    if (!newComment.trim()) return;
    
    onComment(post.id, newComment);
    setNewComment("");
  };

  const handleShare = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to share posts.",
        variant: "destructive"
      });
      return;
    }
    
    onShare(post.id);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <Card className="plant-section">
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
      
      <CardFooter className="border-t pt-4 pb-2 flex flex-col">
        <div className="flex justify-between w-full">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onLike(post.id)}
            className={isLiked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"}
          >
            <Heart className={`h-5 w-5 mr-1 ${isLiked ? "fill-pink-500" : ""}`} />
            {post.likes}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500"
            onClick={toggleComments}
          >
            <MessageCircle className="h-5 w-5 mr-1" />
            {post.comments}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5 mr-1" />
            {post.shares}
          </Button>
        </div>

        {showComments && (
          <div className="w-full mt-4 border-t pt-4">
            <h4 className="font-medium mb-3">Comments</h4>
            
            {post.commentList && post.commentList.length > 0 ? (
              <div className="space-y-4 mb-4">
                {post.commentList.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium text-sm">{comment.user.name}</p>
                        <p className="text-xs text-gray-500">{comment.timestamp}</p>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mb-4">No comments yet. Be the first to comment!</p>
            )}
            
            <div className="flex gap-2">
              <Textarea 
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[60px]"
                disabled={!isAuthenticated}
              />
              <Button 
                size="icon" 
                className="self-end bg-plant-primary hover:bg-plant-dark"
                onClick={handleCommentSubmit}
                disabled={!isAuthenticated || !newComment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostItem;
