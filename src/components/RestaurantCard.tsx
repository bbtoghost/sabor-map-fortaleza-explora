
import { Restaurant } from "@/types";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const renderPriceRange = () => {
    return "$".repeat(restaurant.priceRange);
  };

  const renderStars = () => {
    const stars = [];
    const rating = Math.round(restaurant.rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div
      className="rounded-xl overflow-hidden bg-card text-card-foreground card-shadow cursor-pointer animate-fade-in"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <button
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isFavorite 
              ? "bg-primary text-primary-foreground" 
              : "bg-background/80 text-foreground"
          }`}
          onClick={handleFavoriteClick}
        >
          <Heart
            size={18}
            className={isFavorite ? "fill-current" : ""}
          />
        </button>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars()}</div>
            <span className="text-white text-sm">
              {restaurant.rating} ({restaurant.reviews})
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{restaurant.name}</h3>
            <p className="text-muted-foreground text-sm">
              {restaurant.type} • {renderPriceRange()}
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            {restaurant.distance}
          </Badge>
        </div>

        {restaurant.tags && (
          <div className="flex flex-wrap gap-1 mt-3">
            {restaurant.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-0"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
