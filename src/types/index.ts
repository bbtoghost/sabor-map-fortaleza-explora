
export interface Restaurant {
  id: string;
  name: string;
  type: string;
  description: string;
  rating: number;
  reviews: number;
  priceRange: number; // 1-4 ($-$$$$)
  distance: string;
  address: string;
  phone: string;
  openHours: string;
  image: string;
  tags: string[];
  location: {
    lat: number;
    lng: number;
  };
  famousDish?: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  text: string;
  date: string;
  tags?: string[]; // Tags that the user selected for this restaurant
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  visitedRestaurants: UserVisit[];
  reviews: string[]; // IDs of reviews made by this user
  favorites: string[]; // IDs of favorite restaurants
}

export interface UserVisit {
  restaurantId: string;
  date: string;
  hasReviewed: boolean;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}
