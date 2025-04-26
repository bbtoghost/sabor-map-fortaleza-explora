import React from 'react';
import FriendRecommendation from "./FriendRecommendation";

// Mock data for friend recommendations
const feedPosts = [
  {
    friendName: "João Silva",
    friendAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    restaurantId: "7",
    restaurantName: "Lupita Cocina",
    restaurantImage: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d",
    rating: 4.8,
    comment: "Melhor restaurante mexicano da cidade! Os tacos são incríveis e a margarita é perfeita! 🌮🍹"
  },
  {
    friendName: "Maria Costa",
    friendAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    restaurantId: "8",
    restaurantName: "Mangue Azul",
    restaurantImage: "https://images.unsplash.com/photo-1496412705862-e0088f16f791",
    rating: 5.0,
    comment: "Uma experiência gastronômica incrível! O menu degustação é imperdível 😍"
  },
  {
    friendName: "Pedro Santos",
    friendAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    restaurantId: "2",
    restaurantName: "Coco Bambu",
    restaurantImage: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
    rating: 4.7,
    comment: "Melhor camarão da cidade! A vista para o mar é linda demais 🦐🌊"
  }
];

const FeedView = () => {
  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Feed de Amigos</h1>
      <div className="space-y-4">
        {feedPosts.map((post, index) => (
          <FriendRecommendation
            key={index}
            friendName={post.friendName}
            friendAvatar={post.friendAvatar}
            restaurantId={post.restaurantId}
            restaurantName={post.restaurantName}
            restaurantImage={post.restaurantImage}
            rating={post.rating}
            comment={post.comment}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedView;
