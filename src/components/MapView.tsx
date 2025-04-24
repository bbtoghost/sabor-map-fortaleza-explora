
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const MapView = () => {
  const [filter, setFilter] = useState("distance");

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
      </div>

      {/* Floating Buttons */}
      <div className="absolute bottom-6 right-4 flex flex-col gap-2 z-10">
        <Button
          size="icon"
          className="rounded-full bg-primary text-primary-foreground shadow-lg h-12 w-12"
        >
          <Search />
        </Button>
      </div>

      {/* Map Image */}
      <div className="absolute inset-0 bg-muted">
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000"
          alt="Mapa de Fortaleza"
          className="w-full h-full object-cover"
        />
        
        {/* Restaurant pins */}
        <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg cursor-pointer animate-pulse">
            🍕
          </div>
        </div>
        
        <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg cursor-pointer">
            🍣
          </div>
        </div>
        
        <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center shadow-lg cursor-pointer">
            🍰
          </div>
        </div>
        
        <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg cursor-pointer">
            ☕
          </div>
        </div>
        
        <div className="absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-sabormap-orange text-primary-foreground rounded-full flex items-center justify-center shadow-lg cursor-pointer">
            🥘
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
