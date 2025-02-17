
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
    notes: "",
  },
  {
    id: 2,
    name: "Osteria dell'Orsa",
    rating: 4.6,
    cuisine: "Cucina Tipica Bolognese",
    address: "Via Mentana, 1, 40126 Bologna",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop",
    recommendations: ["Gramigna alla Salsiccia", "Cotoletta alla Bolognese"],
    notes: "",
  },
  {
    id: 3,
    name: "Oltre",
    rating: 4.7,
    cuisine: "Cucina Creativa Bolognese",
    address: "Via Majani, 1, 40125 Bologna",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=2070&auto=format&fit=crop",
    recommendations: ["Tortelloni di Ricotta", "Tagliata di Manzo"],
    notes: "",
  },
  {
    id: 4,
    name: "Ristorante Donatello",
    rating: 4.5,
    cuisine: "Cucina Emiliana",
    address: "Via Augusto Righi, 8, 40126 Bologna",
    image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=2070&auto=format&fit=crop",
    recommendations: ["Lasagne Verdi", "Bollito Misto"],
    notes: "",
  },
  {
    id: 5,
    name: "Trattoria da Vito",
    rating: 4.4,
    cuisine: "Cucina Casalinga Bolognese",
    address: "Via Mario Musolesi, 9, 40138 Bologna",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    recommendations: ["Tortellini alla Panna", "Crescentine"],
    notes: "",
  },
  {
    id: 6,
    name: "Ristorante Diana",
    rating: 4.9,
    cuisine: "Alta Cucina Bolognese",
    address: "Via dell'Indipendenza, 24, 40121 Bologna",
    image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?q=80&w=2070&auto=format&fit=crop",
    recommendations: ["Carrello dei Bolliti", "Filetto al Tartufo"],
    notes: "",
  },
  {
    id: 7,
    name: "All'Osteria Bottega",
    rating: 4.7,
    cuisine: "Cucina Tradizionale",
    address: "Via Santa Caterina, 51, 40123 Bologna",
    image: "https://images.unsplash.com/photo-1554679665-f5537f187268?q=80&w=2070&auto=format&fit=crop",
    recommendations: ["Tagliatelle al Ragù", "Cotoletta alla Petroniana"],
    notes: "",
  },
  {
    id: 8,
    name: "Trattoria del Rosso",
    rating: 4.5,
    cuisine: "Cucina Bolognese",
    address: "Via Augusto Righi, 30, 40126 Bologna",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=2074&auto=format&fit=crop",
    recommendations: ["Pasta alla Gricia", "Scaloppine al Limone"],
    notes: "",
  },
  {
    id: 9,
    name: "Osteria al 15",
    rating: 4.6,
    cuisine: "Cucina Regionale",
    address: "Via Mirasole, 13, 40124 Bologna",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2070&auto=format&fit=crop",
    recommendations: ["Tortelloni Burro e Salvia", "Brasato al Sangiovese"],
    notes: "",
  },
  {
    id: 10,
    name: "Vicolo Colombina",
    rating: 4.8,
    cuisine: "Cucina del Territorio",
    address: "Vicolo Colombina, 5/b, 40123 Bologna",
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2070&auto=format&fit=crop",
    recommendations: ["Tortellini in Brodo", "Zuppa Inglese"],
    notes: "",
  },
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

  const handleUpdateNotes = (id: number, notes: string) => {
    setRestaurantData((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id
          ? {
              ...restaurant,
              notes,
            }
          : restaurant
      )
    );
  };

  const handleUpdateImage = (id: number, image: string) => {
    setRestaurantData((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id
          ? {
              ...restaurant,
              image,
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
                onUpdateNotes={(notes) => handleUpdateNotes(restaurant.id, notes)}
                onUpdateImage={(image) => handleUpdateImage(restaurant.id, image)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
