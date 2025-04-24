
import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Locate } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MapView = () => {
  const [filter, setFilter] = useState("distance");
  const [filterType, setFilterType] = useState("all");
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleRestaurantClick = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  const handleLocationClick = () => {
    toast({
      title: "Localização",
      description: "Buscando sua localização atual...",
    });
    // In a real app, we would use the geolocation API
    setTimeout(() => {
      toast({
        title: "Localização encontrada",
        description: "Você está próximo ao Dragão do Mar!",
      });
    }, 1500);
  };

  const uniqueTypes = [...new Set(restaurants.map(r => r.type))];

  return (
    <div className="relative w-full h-full">
      {/* Filter Section */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2 overflow-x-auto pb-1">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[120px] bg-background/80 backdrop-blur-sm">
            <SelectValue placeholder="Distância" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Distância</SelectItem>
            <SelectItem value="price">Preço</SelectItem>
            <SelectItem value="rating">Avaliação</SelectItem>
            <SelectItem value="time">Horário</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[120px] bg-background/80 backdrop-blur-sm">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {uniqueTypes.map((type) => (
              <SelectItem key={type} value={type.toLowerCase()}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Floating Buttons */}
      <div className="absolute bottom-6 right-4 flex flex-col gap-2 z-10">
        <Button
          size="icon"
          className="rounded-full bg-secondary text-secondary-foreground shadow-lg h-12 w-12"
          onClick={handleLocationClick}
        >
          <Locate />
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-primary text-primary-foreground shadow-lg h-12 w-12"
        >
          <Search />
        </Button>
      </div>

      {/* Map Image */}
      <div className="absolute inset-0 bg-muted" ref={mapRef}>
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000"
          alt="Mapa de Fortaleza"
          className="w-full h-full object-cover"
        />
        
        {/* Restaurant pins */}
        {restaurants
          .filter(r => filterType === "all" || r.type.toLowerCase() === filterType)
          .map((restaurant) => (
            <div 
              key={restaurant.id}
              className="absolute transition-all duration-200 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110"
              style={{
                top: `${restaurant.location.lat / -4 * 100}%`,  // Simplified mapping for demo
                left: `${restaurant.location.lng / -38.6 * 100}%`,  // Simplified mapping for demo
              }}
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg animate-pulse">
                {restaurant.type === "Doceria" && "🍰"}
                {restaurant.type === "Frutos do Mar" && "🦐"}
                {restaurant.type === "Pizza e Sushi" && "🍕"}
                {restaurant.type === "Comida Regional" && "🥘"}
                {restaurant.type === "Cafeteria" && "☕"}
                {restaurant.type === "Peixes e Frutos do Mar" && "🐟"}
                {restaurant.type === "Mexicana" && "🌮"}
                {restaurant.type === "Contemporânea" && "🍽️"}
                {restaurant.type === "Vegetariano/Vegano" && "🥗"}
                {restaurant.type === "Bar e Petiscos" && "🍻"}
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
                {restaurant.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MapView;
