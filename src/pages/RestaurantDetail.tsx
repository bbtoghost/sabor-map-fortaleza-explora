import { useNavigate, useParams } from "react-router-dom";
import { restaurants } from "@/data/restaurants";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, MapPin, Phone, Route, Clock, Check, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const RestaurantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState({
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
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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
      {/* Header with image */}
      <div className="relative h-72">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Button
          size="icon"
          variant="ghost"
          onClick={handleBack}
          className="absolute top-4 left-4 bg-background/40 backdrop-blur-sm text-white hover:bg-background/60"
        >
          <ArrowLeft size={20} />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 -mt-16 relative z-10">
        <div className="bg-card rounded-t-xl shadow-lg p-4">
          <h1 className="text-2xl font-bold mb-1">{restaurant.name}</h1>
          <p className="text-muted-foreground">{restaurant.type}</p>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex">{renderStars(restaurant.rating)}</div>
            <span className="text-sm">
              {restaurant.rating} ({restaurant.reviews} avaliações)
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline">{restaurant.openHours}</Badge>
            <Badge variant="outline">{renderPriceRange()}</Badge>
            <Badge variant="outline">{restaurant.distance}</Badge>
          </div>

          {restaurant.tags && (
            <div className="flex flex-wrap gap-1 mt-4">
              {restaurant.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="mr-1 mb-1">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 mt-6">
            <Button variant="outline" className="flex items-center gap-1 h-auto py-2">
              <MapPin size={16} />
              <span>Ver no mapa</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-1 h-auto py-2">
              <Phone size={16} />
              <span>Ligar</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-1 h-auto py-2">
              <Route size={16} />
              <span>Rotas</span>
            </Button>
          </div>

          {/* Check-in Button */}
          <div className="mt-4">
            <Button 
              variant="default" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleCheckIn}
            >
              <MapPin className="h-5 w-5" />
              <span>Estou aqui agora!</span>
            </Button>
          </div>

          <Tabs defaultValue="info" className="mt-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              <TabsTrigger value="menu">Cardápio</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Descrição</h3>
                  <p className="text-muted-foreground">{restaurant.description}</p>
                </div>
                {restaurant.famousDish && (
                  <div>
                    <h3 className="font-semibold mb-2">Prato Famoso</h3>
                    <p className="text-muted-foreground">{restaurant.famousDish}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold mb-2">Endereço</h3>
                  <p className="text-muted-foreground">{restaurant.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Horário de Funcionamento</h3>
                  <p className="text-muted-foreground">{restaurant.openHours}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Telefone</h3>
                  <p className="text-muted-foreground">{restaurant.phone}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              {restaurant.comments && restaurant.comments.length > 0 ? (
                <div className="space-y-6">
                  {restaurant.comments.map((comment) => (
                    <div key={comment.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{comment.author.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">{renderStars(comment.rating)}</div>
                            <span className="text-sm text-muted-foreground">
                              {comment.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-3">{comment.text}</p>
                      {comment.tags && comment.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {comment.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  Ainda não há avaliações para este restaurante.
                </p>
              )}
            </TabsContent>
            <TabsContent value="menu" className="mt-4">
              <p className="text-center py-8 text-muted-foreground">
                Cardápio em breve disponível.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Review Form Dialog */}
      <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Avaliar {restaurant.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Rating Criteria */}
            <div className="space-y-4">
              {[
                { key: 'food', label: 'Comidas' },
                { key: 'drinks', label: 'Drinks' },
                { key: 'price', label: 'Preço' },
                { key: 'ambience', label: 'Ambiente' },
                { key: 'service', label: 'Atendimento' },
                { key: 'time', label: 'Tempo' },
                { key: 'infrastructure', label: 'Estrutura' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <h3 className="text-sm font-medium mb-2">{label}:</h3>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[reviewRating[key as keyof typeof reviewRating]]}
                      min={1}
                      max={5}
                      step={0.5}
                      onValueChange={([value]) => 
                        setReviewRating(prev => ({
                          ...prev,
                          [key]: value
                        }))
                      }
                      className="w-full"
                    />
                    <div className="flex ml-2">
                      {renderStars(reviewRating[key as keyof typeof reviewRating])}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Seu comentário:</h3>
              <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Como foi sua experiência?"
                className="min-h-20"
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Selecione as tags que se aplicam:</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {selectedTags.includes(tag) && <Check className="mr-1 h-3 w-3" />}
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>Cancelar</Button>
              <Button onClick={handleSubmitReview}>Enviar Avaliação</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
