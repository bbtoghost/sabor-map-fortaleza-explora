
import { restaurants } from "@/data/restaurants";
import RestaurantCard from "@/components/RestaurantCard";
import { useEffect, useState } from "react";
import { Restaurant } from "@/types";

const FavoritesPage = () => {
  // In a real app, this would be fetched from a database
  // For now, let's just show a few random restaurants as favorites
  const [favorites, setFavorites] = useState<Restaurant[]>([]);

  useEffect(() => {
    // Simulate fetching favorites (random selection for demo purposes)
    const randomFavorites = [...restaurants]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setFavorites(randomFavorites);
  }, []);

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Seus Favoritos</h1>

      {favorites.length > 0 ? (
        <div className="space-y-6">
          {favorites.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4">
            ❤️
          </div>
          <h2 className="text-xl font-semibold mb-2">Nenhum favorito ainda</h2>
          <p className="text-muted-foreground">
            Marque restaurantes como favoritos para encontrá-los facilmente aqui.
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
