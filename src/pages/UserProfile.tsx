import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Star, MapPin, Clock, LogOut } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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

  const handleBack = () => {
    navigate(-1);
  };

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
    const review = mockUser.reviews.find(r => r.restaurantId === visit.restaurantId);
    return {
      ...visit,
      restaurant,
      review
    };
  });

  const calculateAverageRating = (ratings: any) => {
    const values = Object.values(ratings) as number[];
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const pointsToNextReward = 300 - mockUser.points;
  const progressPercentage = (mockUser.points / 300) * 100;

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

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

          <Button 
            variant="destructive" 
            className="mt-6 w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da conta
          </Button>
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
                className="flex items-center gap-3 p-3 border rounded-lg"
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
                    <span>Última visita: {visit.date}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {visit.visitCount} {visit.visitCount === 1 ? 'visita' : 'visitas'}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="mt-4 space-y-4">
            {mockUser.reviews.map((review) => {
              const restaurant = restaurants.find(r => r.id === review.restaurantId);
              return (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{restaurant?.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditReview(review.restaurantId)}
                    >
                      Editar
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="text-sm">
                      <p className="font-medium">Comida</p>
                      <div className="flex">{renderStars(review.ratings.food)}</div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Drinks</p>
                      <div className="flex">{renderStars(review.ratings.drinks)}</div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Ambiente</p>
                      <div className="flex">{renderStars(review.ratings.ambience)}</div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Atendimento</p>
                      <div className="flex">{renderStars(review.ratings.service)}</div>
                    </div>
                  </div>

                  <p className="text-sm mb-2">{review.comment}</p>

                  <div className="flex flex-wrap gap-1">
                    {review.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
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
