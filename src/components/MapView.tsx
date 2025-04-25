
import { useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Locate, ZoomIn, ZoomOut } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const MapView = () => {
  const [filter, setFilter] = useState("distance");
  const [filterType, setFilterType] = useState("all");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.8));
  };

  const handleRestaurantClick = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  const handleLocationClick = () => {
    toast({
      title: "Localização",
      description: "Buscando sua localização atual...",
    });
    setTimeout(() => {
      toast({
        title: "Localização encontrada",
        description: "Você está próximo ao Dragão do Mar!",
      });
    }, 1500);
  };

  const uniqueTypes = [...new Set(restaurants.map(r => r.type))];
  const allTags = [...new Set(restaurants.flatMap(r => r.tags || []))];

  return (
    <div className="relative w-full h-full">
      {/* Filter Section - Mobile Optimized */}
      <div className="absolute top-2 left-2 right-2 z-10 flex gap-2 overflow-x-auto pb-1">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[110px] bg-background/95 backdrop-blur-sm text-sm">
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
          <SelectTrigger className="w-[110px] bg-background/95 backdrop-blur-sm text-sm">
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

      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="absolute top-16 left-2 right-2 z-10 flex flex-wrap gap-1 bg-background/95 backdrop-blur-sm p-2 rounded-lg">
          {selectedTags.map(tag => (
            <div
              key={tag}
              className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs flex items-center gap-1"
              onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
            >
              {tag}
              <span className="cursor-pointer">×</span>
            </div>
          ))}
        </div>
      )}

      {/* Floating Buttons - Mobile Optimized */}
      <div className="absolute bottom-4 right-2 flex flex-col gap-2 z-10">
        <Button
          size="icon"
          className="rounded-full bg-background/95 backdrop-blur-sm text-foreground shadow-lg h-10 w-10"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-background/95 backdrop-blur-sm text-foreground shadow-lg h-10 w-10"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-background/95 backdrop-blur-sm text-foreground shadow-lg h-10 w-10"
          onClick={handleLocationClick}
        >
          <Locate className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-primary text-primary-foreground shadow-lg h-10 w-10"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Map Container with Zoom */}
      <div 
        className="absolute inset-0 bg-muted overflow-hidden"
        ref={mapRef}
      >
        <div 
          className="relative w-full h-full transition-transform duration-300 ease-out origin-center"
          style={{ 
            transform: `scale(${zoomLevel})`,
          }}
        >
          <img
            src="/lovable-uploads/ad84066a-0453-425b-b53b-7aeeef46dc57.png"
            alt="Mapa de Fortaleza"
            className="w-full h-full object-cover"
          />
          
          {/* Restaurant pins - Mobile Optimized */}
          {restaurants
            .filter(r => filterType === "all" || r.type.toLowerCase() === filterType)
            .map((restaurant) => (
              <div 
                key={restaurant.id}
                className="absolute transition-all duration-200 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110"
                style={{
                  top: `${restaurant.location.lat / -4 * 100}%`,
                  left: `${restaurant.location.lng / -38.6 * 100}%`,
                }}
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <div className={`flex items-center justify-center shadow-lg ${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-background/95 backdrop-blur-sm rounded-full animate-pulse`}>
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
                <div className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-background/95 backdrop-blur-sm ${isMobile ? 'text-[10px] px-1.5' : 'text-xs px-2'} py-1 rounded-full shadow-sm`}>
                  {restaurant.name}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
