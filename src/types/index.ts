
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
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}
