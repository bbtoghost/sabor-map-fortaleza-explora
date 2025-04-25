
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FriendRecommendationProps {
  friendName: string;
  friendAvatar: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  rating: number;
  comment: string;
}

const FriendRecommendation = ({
  friendName,
  friendAvatar,
  restaurantId,
  restaurantName,
  restaurantImage,
  rating,
  comment
}: FriendRecommendationProps) => {
  const navigate = useNavigate();

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarImage src={friendAvatar} alt={friendName} />
            <AvatarFallback>{friendName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{friendName}</h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
        
        <div 
          className="relative h-32 rounded-md overflow-hidden cursor-pointer mb-3"
          onClick={() => navigate(`/restaurant/${restaurantId}`)}
        >
          <img 
            src={restaurantImage} 
            alt={restaurantName} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <h4 className="text-white font-semibold">{restaurantName}</h4>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{comment}</p>
      </CardContent>
    </Card>
  );
};

export default FriendRecommendation;
