
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Star, MapPin, Clock } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock user data - in a real app this would come from a database
const mockUser = {
  id: "u1",
  name: "Amanda Silva",
  email: "amanda.silva@email.com",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  points: 245,
  visitedRestaurants: [
    { restaurantId: "1", date: "10/04/2023", hasReviewed: true },
    { restaurantId: "3", date: "15/04/2023", hasReviewed: false },
    { restaurantId: "6", date: "22/04/2023", hasReviewed: true },
  ],
  reviews: ["c1", "c3"],
  favorites: ["2", "8"]
};

const UserProfilePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const lastVisits = mockUser.visitedRestaurants.map(visit => {
    const restaurant = restaurants.find(r => r.id === visit.restaurantId);
    return {
      ...visit,
      restaurant
    };
  });

  const pointsToNextReward = 300 - mockUser.points;
  const progressPercentage = (mockUser.points / 300) * 100;

  return (
    <div className="flex flex-col min-h-full pb-16">
      <div className="relative bg-primary h-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/60 to-primary"></div>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleBack}
          className="absolute top-4 left-4 bg-background/40 backdrop-blur-sm text-white hover:bg-background/60 z-10"
        >
          <ArrowLeft size={20} />
        </Button>
      </div>

      <div className="px-4 -mt-16 relative z-10">
        <div className="bg-card rounded-xl shadow-lg p-4 flex flex-col items-center">
          <Avatar className="w-24 h-24 border-4 border-background">
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
            <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-bold mt-2">{mockUser.name}</h1>
          <p className="text-muted-foreground">{mockUser.email}</p>

          <div className="mt-4 flex items-center gap-2">
            <Award className="text-yellow-500" size={20} />
            <span className="font-bold">{mockUser.points} pontos</span>
          </div>

          <div className="w-full mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Próximo cupom</span>
              <span>{pointsToNextReward} pontos restantes</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 w-full mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{lastVisits.length}</div>
              <div className="text-xs text-muted-foreground">Visitados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockUser.reviews.length}</div>
              <div className="text-xs text-muted-foreground">Avaliações</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockUser.favorites.length}</div>
              <div className="text-xs text-muted-foreground">Favoritos</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="history" className="mt-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="rewards">Cupons</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-4 space-y-4">
            {lastVisits.map((visit) => (
              <div 
                key={visit.restaurantId} 
                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer"
                onClick={() => navigate(`/restaurant/${visit.restaurantId}`)}
              >
                <img 
                  src={visit.restaurant?.image} 
                  alt={visit.restaurant?.name} 
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{visit.restaurant?.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>{visit.date}</span>
                  </div>
                </div>
                {!visit.hasReviewed && (
                  <Button size="sm" variant="outline">
                    Avaliar
                  </Button>
                )}
              </div>
            ))}
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <p className="text-center py-8 text-muted-foreground">
              Você fez 2 avaliações recentemente. Continue contribuindo para ganhar mais pontos!
            </p>
          </TabsContent>
          <TabsContent value="rewards" className="mt-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold">Cupom de 10% off</h3>
              <p className="text-sm text-muted-foreground mb-2">Boteco Praia</p>
              <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full inline-block">
                Necessário 300 pontos
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Continue avaliando restaurantes para desbloquear novos cupons!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;
