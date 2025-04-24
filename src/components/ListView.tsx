
import { restaurants } from "@/data/restaurants";
import RestaurantCard from "./RestaurantCard";
import { ads } from "@/data/ads";
import AdBanner from "./AdBanner";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

const ListView = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  // Extract unique restaurant types from the dataset
  const restaurantTypes = Array.from(new Set(restaurants.map(r => r.type)));
  
  // Collect all tags from all restaurants
  const allTags = Array.from(
    new Set(restaurants.flatMap(r => r.tags || []))
  );

  // Apply filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Check price filter
    if (priceFilter !== "all" && restaurant.priceRange !== parseInt(priceFilter)) {
      return false;
    }
    
    // Check type filter
    if (typeFilter !== "all" && restaurant.type !== typeFilter) {
      return false;
    }
    
    // Check tag filters
    if (activeFilters.length > 0) {
      const restaurantTags = restaurant.tags || [];
      return activeFilters.some(filter => restaurantTags.includes(filter));
    }
    
    return true;
  });

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Descobrir restaurantes</h2>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filtros</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Preço:</h3>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o preço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="1">$</SelectItem>
                    <SelectItem value="2">$$</SelectItem>
                    <SelectItem value="3">$$$</SelectItem>
                    <SelectItem value="4">$$$$</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Tipo de comida:</h3>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {restaurantTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={activeFilters.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleFilter(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button 
                onClick={() => {
                  setActiveFilters([]);
                  setPriceFilter("all");
                  setTypeFilter("all");
                }}
                variant="outline"
              >
                Limpar Filtros
              </Button>
              <DrawerClose asChild>
                <Button>Aplicar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {activeFilters.map(filter => (
            <Badge 
              key={filter} 
              onClick={() => toggleFilter(filter)}
              className="cursor-pointer"
            >
              {filter} ×
            </Badge>
          ))}
        </div>
      )}
      
      <div className="space-y-6">
        {filteredRestaurants.length > 0 ? (
          <>
            {filteredRestaurants.slice(0, 3).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          
            {filteredRestaurants.length > 3 && <AdBanner ad={ads[0]} />}
            
            {filteredRestaurants.slice(3).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Nenhum restaurante encontrado com esses filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListView;
