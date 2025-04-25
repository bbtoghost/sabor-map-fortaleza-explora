
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { restaurants } from "@/data/restaurants";
import RestaurantCard from "@/components/RestaurantCard";
import FriendRecommendation from "@/components/FriendRecommendation";

// Mock friend recommendations data
const friendRecommendations = [
  {
    friendName: "João Silva",
    friendAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    restaurantId: "7",
    restaurantName: "Lupita Cocina",
    restaurantImage: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    rating: 4.8,
    comment: "Melhor restaurante mexicano da cidade! Os tacos são incríveis e a margarita é perfeita! 🌮🍹"
  },
  {
    friendName: "Maria Costa",
    friendAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    restaurantId: "8",
    restaurantName: "Mangue Azul",
    restaurantImage: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    rating: 5.0,
    comment: "Uma experiência gastronômica incrível! O menu degustação é imperdível 😍"
  },
  {
    friendName: "Pedro Santos",
    friendAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    restaurantId: "2",
    restaurantName: "Coco Bambu",
    restaurantImage: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    rating: 4.7,
    comment: "Melhor camarão da cidade! A vista para o mar é linda demais 🦐🌊"
  }
];

const RankingPage = () => {
  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Descobrir os melhores</h1>
      
      <Tabs defaultValue="ranking" className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
          <TabsTrigger value="friends">Feed de Amigos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ranking" className="space-y-4">
          {restaurants
            .sort((a, b) => b.rating - a.rating)
            .map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </TabsContent>

        <TabsContent value="friends" className="space-y-4">
          {friendRecommendations.map((rec, index) => (
            <FriendRecommendation
              key={index}
              friendName={rec.friendName}
              friendAvatar={rec.friendAvatar}
              restaurantId={rec.restaurantId}
              restaurantName={rec.restaurantName}
              restaurantImage={rec.restaurantImage}
              rating={rec.rating}
              comment={rec.comment}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RankingPage;
