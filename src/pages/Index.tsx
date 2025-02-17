
import { useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";

const restaurants = [
  {
    id: 1,
    name: "Trattoria Anna Maria",
    rating: 4.8,
    cuisine: "Cucina Bolognese Tradizionale",
    address: "Via delle Belle Arti, 17/A, 40126 Bologna",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    recommendations: ["Tagliatelle al Ragù", "Tortellini in Brodo"],
  },
  {
    id: 2,
    name: "Osteria dell'Orsa",
    rating: 4.6,
    cuisine: "Cucina Tipica Bolognese",
    address: "Via Mentana, 1, 40126 Bologna",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop",
    recommendations: ["Gramigna alla Salsiccia", "Cotoletta alla Bolognese"],
  },
  {
    id: 3,
    name: "Oltre",
    rating: 4.7,
    cuisine: "Cucina Creativa Bolognese",
    address: "Via Majani, 1, 40125 Bologna",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop",
    recommendations: ["Tortelloni di Ricotta", "Tagliata di Manzo"],
  },
  // Add more restaurants here...
];

const Index = () => {
  const [restaurantData, setRestaurantData] = useState(restaurants);

  const handleAddRecommendation = (id: number, recommendation: string) => {
    setRestaurantData((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id
          ? {
              ...restaurant,
              recommendations: [...restaurant.recommendations, recommendation],
            }
          : restaurant
      )
    );
  };

  return (
    <div className="min-h-screen bg-neutral pb-20">
      <header className="mb-12 bg-white py-8 shadow-sm">
        <div className="container">
          <h1 className="animate-fade-up text-center text-4xl font-bold text-neutral-dark">
            Sapori di Bologna
          </h1>
          <p className="animate-fade-up text-center text-lg text-secondary">
            I migliori ristoranti tradizionali vicino alla Fiera
          </p>
        </div>
      </header>

      <main className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {restaurantData.map((restaurant) => (
            <div key={restaurant.id} className="animate-fade-in">
              <RestaurantCard
                {...restaurant}
                onAddRecommendation={(recommendation) =>
                  handleAddRecommendation(restaurant.id, recommendation)
                }
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
