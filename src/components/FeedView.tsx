
import React from 'react';
import FeedPost from './social/FeedPost';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const feedPosts = [
  {
    id: '1',
    authorName: "João Silva",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    restaurantId: "7",
    restaurantName: "Lupita Cocina",
    restaurantImage: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d",
    rating: 4.8,
    comment: "Melhor restaurante mexicano da cidade! Os tacos são incríveis e a margarita é perfeita! 🌮🍹",
    timestamp: "2h atrás"
  },
  {
    id: '2',
    authorName: "Maria Costa",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    restaurantId: "8",
    restaurantName: "Mangue Azul",
    restaurantImage: "https://images.unsplash.com/photo-1496412705862-e0088f16f791",
    rating: 5.0,
    comment: "Uma experiência gastronômica incrível! O menu degustação é imperdível 😍",
    timestamp: "4h atrás"
  },
  {
    id: '3',
    authorName: "Pedro Santos",
    authorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    restaurantId: "2",
    restaurantName: "Coco Bambu",
    restaurantImage: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
    rating: 4.7,
    comment: "Melhor camarão da cidade! A vista para o mar é linda demais 🦐🌊",
    timestamp: "6h atrás"
  },
  {
    id: '4',
    authorName: "Ana Oliveira",
    authorAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
    restaurantId: "5",
    restaurantName: "Cantina Di Paolo",
    restaurantImage: "https://images.unsplash.com/photo-1516697073-419a6b4e3882",
    rating: 4.5,
    comment: "A melhor massa da cidade sem dúvida! O tiramisu é de outro mundo! 🍝🇮🇹",
    timestamp: "9h atrás"
  }
];

const FeedView = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/restaurant/new");
  };

  return (
    <div className="p-4 pb-20 bg-background">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Feed de Amigos</h1>
        <Button 
          onClick={handleCreatePost} 
          variant="ghost" 
          size="icon" 
          className="text-primary hover:text-primary/90 hover:bg-primary/10"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Buscar no feed..." 
          className="pl-10 bg-muted/50 border-muted"
        />
      </div>

      <div className="space-y-6">
        {feedPosts.map((post) => (
          <FeedPost key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default FeedView;
