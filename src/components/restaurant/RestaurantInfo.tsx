
import { Restaurant } from "@/types";

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

export const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  return (
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
  );
};
