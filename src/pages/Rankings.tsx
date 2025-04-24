
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { topRestaurants } from "@/data/restaurants";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const RankingPage = () => {
  const [filter, setFilter] = useState<"rating" | "price" | "distance">("rating");
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  const getFilteredRestaurants = () => {
    switch (filter) {
      case "price":
        return [...topRestaurants].sort((a, b) => a.priceRange - b.priceRange);
      case "distance":
        return [...topRestaurants].sort((a, b) => 
          parseFloat(a.distance.replace(',', '.')) - parseFloat(b.distance.replace(',', '.'))
        );
      case "rating":
      default:
        return topRestaurants;
    }
  };

  const filteredRestaurants = getFilteredRestaurants();

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Melhores Restaurantes</h1>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Button 
          variant={filter === "rating" ? "default" : "outline"}
          onClick={() => setFilter("rating")}
          className="rounded-full"
        >
          Melhor Nota
        </Button>
        <Button 
          variant={filter === "price" ? "default" : "outline"}
          onClick={() => setFilter("price")}
          className="rounded-full"
        >
          Menor Preço
        </Button>
        <Button 
          variant={filter === "distance" ? "default" : "outline"}
          onClick={() => setFilter("distance")}
          className="rounded-full"
        >
          Mais Próximos
        </Button>
      </div>

      <div className="space-y-4">
        {filteredRestaurants.slice(0, 10).map((restaurant, index) => (
          <div 
            key={restaurant.id}
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer animate-fade-in ${
              index < 3 
                ? 'bg-gradient-to-r from-sabormap-purple/20 to-transparent dark:from-sabormap-purple/40 border border-sabormap-purple/20' 
                : 'bg-card'
            }`}
            onClick={() => handleCardClick(restaurant.id)}
          >
            <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full ${
              index < 3 
                ? 'bg-sabormap-purple text-white' 
                : 'bg-muted text-foreground'
            }`}>
              {index + 1}
            </div>
            
            <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold truncate">{restaurant.name}</h3>
              <p className="text-sm text-muted-foreground">{restaurant.type}</p>
              
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="text-sm ml-1">{restaurant.rating}</span>
                </div>
                
                <Badge variant="outline" className="text-xs">
                  {"$".repeat(restaurant.priceRange)}
                </Badge>
                
                <Badge variant="outline" className="text-xs">
                  {restaurant.distance}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingPage;
