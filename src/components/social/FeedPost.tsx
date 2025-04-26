
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, Share2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FeedPostProps {
  id: string;
  authorName: string;
  authorAvatar: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  rating: number;
  comment: string;
  timestamp: string;
  likes?: number;
  comments?: number;
}

const FeedPost = ({
  authorName,
  authorAvatar,
  restaurantId,
  restaurantName,
  restaurantImage,
  rating,
  comment,
  timestamp,
  likes = Math.floor(Math.random() * 50) + 5,
  comments = Math.floor(Math.random() * 10)
}: FeedPostProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [liked, setLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/restaurant/${restaurantId}?showComments=true`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Compartilhar",
      description: `Compartilhando a recomendação de ${restaurantName}`,
    });
  };

  return (
    <Card className="mb-4 overflow-hidden animate-fade-in">
      <CardContent className="p-0">
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={authorAvatar} alt={authorName} />
            <AvatarFallback>{authorName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold">{authorName}</h3>
              <span className="text-xs text-muted-foreground">avaliou</span>
              <span className="font-medium">{restaurantName}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center text-yellow-500">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            </div>
          </div>
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => navigate(`/restaurant/${restaurantId}`)}
        >
          <img
            src={restaurantImage}
            alt={restaurantName}
            className="w-full h-60 object-cover"
          />
        </div>

        <div className="p-4">
          <p className="text-sm mb-4">{comment}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 px-0 hover:bg-transparent hover:text-primary"
                onClick={handleLike}
              >
                <Heart
                  className={`w-5 h-5 ${
                    liked ? "fill-primary text-primary" : ""
                  } transition-colors`}
                />
                <span className="text-sm">{likesCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 px-0 hover:bg-transparent hover:text-primary"
                onClick={handleComment}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm">{comments}</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent hover:text-primary p-0"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedPost;
