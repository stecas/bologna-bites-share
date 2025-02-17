
import { Star, MapPin, Utensils } from "lucide-react";

interface RestaurantCardProps {
  name: string;
  rating: number;
  cuisine: string;
  address: string;
  image: string;
  recommendations: string[];
  onAddRecommendation: (recommendation: string) => void;
}

const RestaurantCard = ({
  name,
  rating,
  cuisine,
  address,
  image,
  recommendations,
  onAddRecommendation,
}: RestaurantCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-glass transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-neutral-dark">{name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-accent text-accent" />
            <span className="font-medium text-neutral-dark">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2 text-secondary">
          <Utensils className="h-4 w-4" />
          <span className="text-sm">{cuisine}</span>
        </div>
        <div className="mb-6 flex items-start gap-2 text-secondary">
          <MapPin className="h-4 w-4 shrink-0 translate-y-1" />
          <span className="text-sm">{address}</span>
        </div>
        <div className="space-y-3">
          <h4 className="font-medium text-neutral-dark">Recommended Dishes:</h4>
          <div className="flex flex-wrap gap-2">
            {recommendations.map((dish, index) => (
              <span
                key={index}
                className="rounded-full bg-neutral px-3 py-1 text-sm text-secondary"
              >
                {dish}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
