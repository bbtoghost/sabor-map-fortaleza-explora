import { restaurants } from "@/data/restaurants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import VisitedPlaces from "@/components/profile/VisitedPlaces";
import GamificationSection from "@/components/profile/GamificationSection";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, Star, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const mockUser = {
  id: "u1",
  name: "Amanda Silva",
  email: "amanda.silva@email.com",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  points: 245,
  visitedRestaurants: [
    { restaurantId: "1", date: "10/04/2023", hasReviewed: true, visitCount: 3 },
    { restaurantId: "3", date: "15/04/2023", hasReviewed: false, visitCount: 1 },
    { restaurantId: "6", date: "22/04/2023", hasReviewed: true, visitCount: 2 },
  ],
  reviews: [
    { 
      id: "c1", 
      restaurantId: "1",
      date: "10/04/2023",
      ratings: {
        food: 4.5,
        drinks: 4.0,
        price: 3.5,
        ambience: 5.0,
        service: 4.0,
        time: 3.5,
        infrastructure: 4.5
      },
      comment: "Excelente experiência gastronômica!",
      tags: ["Ambiente Familiar", "Vista Mar", "Preço Justo"]
    },
    { 
      id: "c3", 
      restaurantId: "6",
      date: "22/04/2023",
      ratings: {
        food: 5.0,
        drinks: 4.5,
        price: 4.0,
        ambience: 4.5,
        service: 5.0,
        time: 4.0,
        infrastructure: 4.5
      },
      comment: "Serviço impecável e comida maravilhosa",
      tags: ["Romântico", "Bom Atendimento", "Música ao Vivo"]
    }
  ],
  favorites: ["2", "8"]
};

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
    navigate("/login");
  };

  const handleEditReview = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
    toast({
      description: "Você pode editar sua avaliação na página do restaurante",
    });
  };

  const lastVisits = mockUser.visitedRestaurants.map(visit => {
    const restaurant = restaurants.find(r => r.id === visit.restaurantId);
    return {
      restaurant: restaurant!,
      lastVisit: visit.date,
      visitCount: visit.visitCount,
      hasReviewed: visit.hasReviewed,
    };
  });

  const achievements = [
    {
      title: "Crítico Iniciante",
      description: "5 avaliações realizadas",
      icon: "star" as const,
    },
    {
      title: "Explorador Bronze",
      description: "10 lugares visitados",
      icon: "medal" as const,
    }
  ];

  return (
    <div className="flex flex-col min-h-full pb-16">
      <ProfileHeader 
        user={mockUser} 
        onLogout={handleLogout}
      />

      <Tabs defaultValue="history" className="mt-6 px-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          <TabsTrigger value="rewards">Cupons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="mt-4">
          <VisitedPlaces visitedRestaurants={lastVisits} />
        </TabsContent>

        <TabsContent value="achievements" className="mt-4">
          <GamificationSection
            points={mockUser.points}
            level="Explorador Iniciante"
            nextLevelPoints={300}
            achievements={achievements}
          />
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
  );
};

export default UserProfilePage;
