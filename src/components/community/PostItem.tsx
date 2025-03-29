
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";

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
}

interface PostItemProps {
  post: Post;
  isLiked: boolean;
  onLike: (postId: number) => void;
}

const PostItem = ({ post, isLiked, onLike }: PostItemProps) => {
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
      
      <CardFooter className="border-t pt-4 pb-2">
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
  );
};

export default PostItem;
