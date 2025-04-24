
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Phone, Route } from "lucide-react";
import { Restaurant } from "@/types";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
  onBack: () => void;
  onCheckIn: () => void;
  renderPriceRange: () => string;
  renderStars: (rating: number) => JSX.Element[];
}

export const RestaurantHeader = ({
  restaurant,
  onBack,
  onCheckIn,
  renderPriceRange,
  renderStars,
}: RestaurantHeaderProps) => {
  return (
    <>
      <div className="relative h-72">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Button
          size="icon"
          variant="ghost"
          onClick={onBack}
          className="absolute top-4 left-4 bg-background/40 backdrop-blur-sm text-white hover:bg-background/60"
        >
          <ArrowLeft size={20} />
        </Button>
      </div>

      <div className="p-4 -mt-16 relative z-10">
        <div className="bg-card rounded-t-xl shadow-lg p-4">
          <h1 className="text-2xl font-bold mb-1">{restaurant.name}</h1>
          <p className="text-muted-foreground">{restaurant.type}</p>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex">{renderStars(restaurant.rating)}</div>
            <span className="text-sm">
              {restaurant.rating} ({restaurant.reviews} avaliações)
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline">{restaurant.openHours}</Badge>
            <Badge variant="outline">{renderPriceRange()}</Badge>
            <Badge variant="outline">{restaurant.distance}</Badge>
          </div>

          {restaurant.tags && (
            <div className="flex flex-wrap gap-1 mt-4">
              {restaurant.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="mr-1 mb-1">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 mt-6">
            <Button variant="outline" className="flex items-center gap-1 h-auto py-2">
              <MapPin size={16} />
              <span>Ver no mapa</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-1 h-auto py-2">
              <Phone size={16} />
              <span>Ligar</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-1 h-auto py-2">
              <Route size={16} />
              <span>Rotas</span>
            </Button>
          </div>

          <div className="mt-4">
            <Button 
              variant="default" 
              className="w-full flex items-center justify-center gap-2"
              onClick={onCheckIn}
            >
              <MapPin className="h-5 w-5" />
              <span>Estou aqui agora!</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
