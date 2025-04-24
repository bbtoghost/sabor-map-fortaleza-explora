
import { restaurants } from "@/data/restaurants";
import RestaurantCard from "./RestaurantCard";
import { ads } from "@/data/ads";
import AdBanner from "./AdBanner";

const ListView = () => {
  return (
    <div className="p-4 space-y-4 pb-20">
      <h2 className="text-2xl font-bold mb-6">Descobrir restaurantes</h2>
      
      <div className="space-y-6">
        {restaurants.slice(0, 3).map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      
        <AdBanner ad={ads[0]} />
        
        {restaurants.slice(3, 5).map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default ListView;
