
import { Restaurant } from "../types";

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Brigadeiro Mágico",
    type: "Doceria",
    description: "Especializada em brigadeiros gourmet com mais de 30 sabores diferentes, este café aconchegante surpreende com suas criações únicas.",
    rating: 4.8,
    reviews: 387,
    priceRange: 2,
    distance: "1,2 km",
    address: "Av. Beira Mar, 1765 - Meireles, Fortaleza",
    phone: "(85) 3242-1234",
    openHours: "12:00 - 22:00",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    tags: ["Melhor Sobremesa", "Ambiente Familiar", "Preço Justo"],
    location: {
      lat: -3.7264,
      lng: -38.4901
    },
    famousDish: "Brigadeiro de Pistache",
    comments: [
      {
        id: "c1",
        author: {
          name: "Mariana C.",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        rating: 5,
        text: "Os brigadeiros são simplesmente perfeitos! O de pistache é meu favorito.",
        date: "12/03/2023"
      },
      {
        id: "c2",
        author: {
          name: "João S.",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg"
        },
        rating: 4,
        text: "Ambiente muito agradável, preço justo. Os doces são uma delícia!",
        date: "05/04/2023"
      }
    ]
  },
  {
    id: "2",
    name: "Coco Bambu",
    type: "Frutos do Mar",
    description: "Restaurante especializado em frutos do mar com ambiente sofisticado e vista para o mar. Camarões e peixes frescos todos os dias.",
    rating: 4.6,
    reviews: 1256,
    priceRange: 3,
    distance: "0,8 km",
    address: "Av. Beira Mar, 3960 - Mucuripe, Fortaleza",
    phone: "(85) 3198-6000",
    openHours: "11:30 - 00:00",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    tags: ["Vista Mar", "Romântico", "Frutos do Mar"],
    location: {
      lat: -3.7296,
      lng: -38.4769
    },
    famousDish: "Camarão Internacional",
    comments: [
      {
        id: "c3",
        author: {
          name: "Ana P.",
          avatar: "https://randomuser.me/api/portraits/women/63.jpg"
        },
        rating: 5,
        text: "Melhor camarão da cidade! O lugar é lindo e o atendimento é excelente.",
        date: "25/04/2023"
      }
    ]
  },
  {
    id: "3",
    name: "Forneria Samurai",
    type: "Pizza e Sushi",
    description: "Conceito inovador que une pizzas artesanais e sushi em um mesmo espaço. Ideal para grupos com diferentes preferências culinárias.",
    rating: 4.3,
    reviews: 629,
    priceRange: 2,
    distance: "2,5 km",
    address: "Rua Torres Câmara, 71 - Aldeota, Fortaleza",
    phone: "(85) 3224-8976",
    openHours: "18:00 - 23:00",
    image: "https://images.unsplash.com/photo-1564436872-f6d81182df12?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    tags: ["Fusion", "Para Grupos", "Delivery"],
    location: {
      lat: -3.7423,
      lng: -38.5012
    },
    famousDish: "Pizza de Salmão com Cream Cheese"
  },
  {
    id: "4",
    name: "Sabor da Terra",
    type: "Comida Regional",
    description: "Autêntica culinária nordestina em ambiente rústico e acolhedor. Pratos tradicionais preparados com ingredientes locais.",
    rating: 4.7,
    reviews: 842,
    priceRange: 2,
    distance: "3,1 km",
    address: "Rua dos Tabajaras, 540 - Praia de Iracema, Fortaleza",
    phone: "(85) 3219-3456",
    openHours: "11:00 - 16:00",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    tags: ["Típico", "Baião de Dois", "Música ao Vivo"],
    location: {
      lat: -3.7201,
      lng: -38.5134
    },
    famousDish: "Baião de Dois com Paçoca de Carne de Sol"
  },
  {
    id: "5",
    name: "Café Tortuga",
    type: "Cafeteria",
    description: "Café artesanal com ambiente descolado, frequentado por artistas locais. Grãos selecionados e bolos caseiros.",
    rating: 4.5,
    reviews: 315,
    priceRange: 1,
    distance: "1,9 km",
    address: "Rua Dragão do Mar, 207 - Centro, Fortaleza",
    phone: "(85) 3091-7865",
    openHours: "09:00 - 22:00",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    tags: ["Wi-Fi Grátis", "Espaço Coworking", "Brunch"],
    location: {
      lat: -3.7254,
      lng: -38.5218
    },
    famousDish: "Cold Brew com Bolo de Cenoura"
  },
  {
    id: "6",
    name: "Peixada do Meio",
    type: "Peixes e Frutos do Mar",
    description: "Restaurante tradicional especializado em pratos à base de peixe e frutos do mar. Famoso pelo caldo de peixe e pela peixada cearense.",
    rating: 4.6,
    reviews: 753,
    priceRange: 2,
    distance: "4,2 km",
    address: "Rua Alberto Feitosa Lima, 246 - Joaquim Távora, Fortaleza",
    phone: "(85) 3067-2378",
    openHours: "11:00 - 15:00, 18:00 - 23:00",
    image: "https://images.unsplash.com/photo-1622037022788-6fe60e334908?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    tags: ["Tradicional", "Prato Farto", "Melhor Peixada"],
    location: {
      lat: -3.7437,
      lng: -38.5176
    },
    famousDish: "Peixada Cearense Completa"
  },
  {
    id: "7",
    name: "Lupita Cocina",
    type: "Mexicana",
    description: "Culinária mexicana autêntica em ambiente descontraído. Tacos, burritos e margaritas premiadas.",
    rating: 4.3,
    reviews: 527,
    priceRange: 2,
    distance: "2,7 km",
    address: "Av. Monsenhor Tabosa, 825 - Meireles, Fortaleza",
    phone: "(85) 3235-7643",
    openHours: "18:00 - 00:00",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    tags: ["Happy Hour", "Música Latina", "Tequila"],
    location: {
      lat: -3.7278,
      lng: -38.5021
    },
    famousDish: "Tacos de Carnitas"
  },
  {
    id: "8",
    name: "Mangue Azul",
    type: "Contemporânea",
    description: "Gastronomia contemporânea com ingredientes locais e técnicas modernas. Apresentação impecável e drinks autorais.",
    rating: 4.9,
    reviews: 286,
    priceRange: 4,
    distance: "1,5 km",
    address: "Rua Maria Tomásia, 454 - Aldeota, Fortaleza",
    phone: "(85) 3192-5567",
    openHours: "19:00 - 00:00",
    image: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    tags: ["Gourmet", "Menu Degustação", "Chef Premiado"],
    location: {
      lat: -3.7376,
      lng: -38.4976
    },
    famousDish: "Risoto de Camarão com Leite de Coco"
  },
  {
    id: "9",
    name: "Vegan Garden",
    type: "Vegetariano/Vegano",
    description: "Restaurante 100% plant-based com pratos criativos e saborosos. Opções sem glúten e orgânicas.",
    rating: 4.7,
    reviews: 192,
    priceRange: 2,
    distance: "3,3 km",
    address: "Rua Frederico Borges, 545 - Varjota, Fortaleza",
    phone: "(85) 3224-1976",
    openHours: "11:30 - 15:00, 18:30 - 22:00",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    tags: ["Vegano", "Saudável", "Orgânico"],
    location: {
      lat: -3.7385,
      lng: -38.4862
    },
    famousDish: "Moqueca de Banana da Terra e Palmito"
  },
  {
    id: "10",
    name: "Boteco Praia",
    type: "Bar e Petiscos",
    description: "Bar descontraído com petiscos cearenses, cervejas artesanais locais e vista para o mar. Ponto de encontro aos fins de semana.",
    rating: 4.4,
    reviews: 675,
    priceRange: 2,
    distance: "0,7 km",
    address: "Av. Historiador Raimundo Girão, 800 - Praia de Iracema, Fortaleza",
    phone: "(85) 3267-3212",
    openHours: "17:00 - 01:00",
    image: "https://images.unsplash.com/photo-1623944887244-2822d3954e81?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000",
    tags: ["Vista para o Mar", "Petiscos", "Cerveja Artesanal"],
    location: {
      lat: -3.7213,
      lng: -38.4988
    },
    famousDish: "Isca de Peixe com Molho de Maracujá"
  }
];

export const topRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating);
