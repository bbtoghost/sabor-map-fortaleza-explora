
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Restaurant } from "@/types";
import { History } from "lucide-react";

interface VisitedPlacesProps {
  visitedRestaurants: Array<{
    restaurant: Restaurant;
    lastVisit: string;
    visitCount: number;
    hasReviewed: boolean;
  }>;
}

const VisitedPlaces = ({ visitedRestaurants }: VisitedPlacesProps) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Lugares Visitados</CardTitle>
        <span className="text-2xl font-bold">{visitedRestaurants.length}</span>
      </CardHeader>
      <CardContent className="space-y-4">
        {visitedRestaurants.map((visit) => (
          <div 
            key={visit.restaurant.id} 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <img 
              src={visit.restaurant.image} 
              alt={visit.restaurant.name} 
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-medium">{visit.restaurant.name}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <History className="w-4 h-4" />
                <span>Última visita: {visit.lastVisit}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {visit.visitCount} {visit.visitCount === 1 ? 'visita' : 'visitas'}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default VisitedPlaces;
