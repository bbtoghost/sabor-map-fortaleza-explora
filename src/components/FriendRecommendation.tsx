
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Heart, MessageSquare, Share2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface FriendRecommendationProps {
  friendName: string;
  friendAvatar: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  rating: number;
  comment: string;
  likes?: number;
  comments?: number;
}

const FriendRecommendation = ({
  friendName,
  friendAvatar,
  restaurantId,
  restaurantName,
  restaurantImage,
  rating,
  comment,
  likes = Math.floor(Math.random() * 50) + 5, // Placeholder likes
  comments = Math.floor(Math.random() * 10) // Placeholder comments
}: FriendRecommendationProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
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
        {/* Friend header */}
        <div className="flex items-center gap-3 p-4">
          <Avatar>
            <AvatarImage src={friendAvatar} alt={friendName} />
            <AvatarFallback>{friendName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-semibold">{friendName}</h3>
              <span className="text-xs text-muted-foreground">recomendou este lugar</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
              <span className="text-xs ml-1">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        {/* Restaurant image */}
        <div 
          className="relative cursor-pointer"
          onClick={() => navigate(`/restaurant/${restaurantId}`)}
        >
          <img 
            src={restaurantImage} 
            alt={restaurantName} 
            className="w-full h-60 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h4 className="text-white font-semibold text-lg">{restaurantName}</h4>
          </div>
        </div>

        {/* Comment */}
        <div className="p-4">
          <p className="text-sm mb-4">{comment}</p>
          
          {/* Social actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 px-0 hover:bg-transparent hover:text-primary"
                onClick={handleLike}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-primary text-primary' : ''} transition-colors`} />
                <span className="text-sm">{likeCount}</span>
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

export default FriendRecommendation;
