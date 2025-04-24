
import { useNavigate, useParams } from "react-router-dom";
import { restaurants } from "@/data/restaurants";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { RestaurantHeader } from "@/components/restaurant/RestaurantHeader";
import { RestaurantInfo } from "@/components/restaurant/RestaurantInfo";
import { ReviewsList } from "@/components/restaurant/ReviewsList";
import { ReviewForm } from "@/components/restaurant/ReviewForm";

// Define the same rating type to ensure consistency
type RatingFields = {
  food: number;
  drinks: number;
  price: number;
  ambience: number;
  service: number;
  time: number;
  infrastructure: number;
};

const RestaurantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState<RatingFields>({
    food: 5,
    drinks: 5,
    price: 5,
    ambience: 5,
    service: 5,
    time: 5,
    infrastructure: 5
  });
  const [reviewText, setReviewText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags] = useState([
    "Ambiente Familiar", 
    "Romântico", 
    "Vista Mar", 
    "Preço Justo", 
    "Música ao Vivo", 
    "Bom Atendimento",
    "Área Kids",
    "Pet Friendly",
    "Wi-Fi Grátis",
    "Estacionamento"
  ]);

  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return <div className="p-4">Restaurante não encontrado</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorite ? `${restaurant.name} foi removido da sua lista de favoritos` : `${restaurant.name} foi adicionado à sua lista de favoritos`,
    });
  };

  const handleCheckIn = () => {
    toast({
      title: "Check-in realizado!",
      description: `Você está em ${restaurant.name}. Boa refeição!`,
    });
    setShowReviewForm(true);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    );
  };

  const handleSubmitReview = () => {
    toast({
      title: "Avaliação enviada!",
      description: "Obrigado pelo seu feedback. Você ganhou 25 pontos!",
    });
    setShowReviewForm(false);
    setReviewText("");
    setSelectedTags([]);
  };

  const renderPriceRange = () => {
    return "$".repeat(restaurant.priceRange);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i <= fullRating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col min-h-full pb-16">
      <RestaurantHeader
        restaurant={restaurant}
        onBack={handleBack}
        onCheckIn={handleCheckIn}
        renderPriceRange={renderPriceRange}
        renderStars={renderStars}
      />

      <Tabs defaultValue="info" className="mt-6 px-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          <TabsTrigger value="menu">Cardápio</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <RestaurantInfo restaurant={restaurant} />
        </TabsContent>
        <TabsContent value="reviews">
          {restaurant.comments && restaurant.comments.length > 0 ? (
            <ReviewsList comments={restaurant.comments} renderStars={renderStars} />
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              Ainda não há avaliações para este restaurante.
            </p>
          )}
        </TabsContent>
        <TabsContent value="menu">
          <p className="text-center py-8 text-muted-foreground">
            Cardápio em breve disponível.
          </p>
        </TabsContent>
      </Tabs>

      <ReviewForm
        showReviewForm={showReviewForm}
        setShowReviewForm={setShowReviewForm}
        reviewRating={reviewRating}
        setReviewRating={setReviewRating}
        reviewText={reviewText}
        setReviewText={setReviewText}
        selectedTags={selectedTags}
        handleTagToggle={handleTagToggle}
        handleSubmitReview={handleSubmitReview}
        allTags={allTags}
        restaurantName={restaurant.name}
        renderStars={renderStars}
      />

      {/* Favorite Button */}
      <div className="fixed bottom-20 right-4">
        <Button
          size="icon"
          onClick={handleFavoriteClick}
          className={`rounded-full w-14 h-14 shadow-lg ${
            isFavorite 
              ? "bg-primary text-primary-foreground" 
              : "bg-card text-muted-foreground border"
          }`}
        >
          <Heart className={isFavorite ? "fill-current" : ""} />
        </Button>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
