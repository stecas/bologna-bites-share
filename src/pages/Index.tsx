
import { useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import { Plus, Download, Send } from "lucide-react";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";

const defaultRestaurants = [
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

const emptyRestaurant = {
  name: "Nuovo Ristorante",
  rating: 0,
  cuisine: "Tipologia Cucina",
  address: "Indirizzo",
  image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
  recommendations: [],
  notes: "",
};

const Index = () => {
  const [restaurantData, setRestaurantData] = useState(defaultRestaurants);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleUpdateCard = (id: number, field: string, value: any) => {
    setRestaurantData((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id
          ? {
              ...restaurant,
              [field]: value,
            }
          : restaurant
      )
    );
  };

  const handleAddRestaurant = () => {
    const newId = Math.max(...restaurantData.map((r) => r.id)) + 1;
    setRestaurantData((prev) => [...prev, { ...emptyRestaurant, id: newId }]);
  };

  const handleDeleteRestaurant = (id: number) => {
    setRestaurantData((prev) => prev.filter((restaurant) => restaurant.id !== id));
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Crea un elemento temporaneo per il PDF
      const element = document.createElement("div");
      element.innerHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #E35A3D; text-align: center; font-size: 24px; margin-bottom: 20px;">Sapori di Bologna</h1>
          ${restaurantData
            .map(
              (restaurant) => `
            <div style="margin-bottom: 30px; page-break-inside: avoid;">
              <h2 style="color: #2D3436; font-size: 20px; margin-bottom: 10px;">${
                restaurant.name
              }</h2>
              <p style="color: #7C9082; margin: 5px 0;">⭐️ ${restaurant.rating.toFixed(
                1
              )}</p>
              <p style="color: #7C9082; margin: 5px 0;">🍽️ ${restaurant.cuisine}</p>
              <p style="color: #7C9082; margin: 5px 0;">📍 ${restaurant.address}</p>
              ${
                restaurant.recommendations.length > 0
                  ? `<p style="color: #2D3436; margin: 10px 0;">Piatti consigliati:</p>
                     <ul style="color: #7C9082; margin: 5px 0;">
                       ${restaurant.recommendations
                         .map((dish) => `<li>${dish}</li>`)
                         .join("")}
                     </ul>`
                  : ""
              }
              ${
                restaurant.notes
                  ? `<p style="color: #2D3436; margin: 10px 0;">Note:</p>
                     <p style="color: #7C9082; margin: 5px 0;">${restaurant.notes}</p>`
                  : ""
              }
            </div>
          `
            )
            .join("")}
        </div>
      `;

      const opt = {
        margin: 10,
        filename: "sapori-di-bologna.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      const pdf = await html2pdf().set(opt).from(element).save();
      toast.success("PDF generato con successo!");
      return pdf;
    } catch (error) {
      toast.error("Errore nella generazione del PDF");
      console.error("Errore nella generazione del PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const shareViaWhatsApp = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Inserisci un numero di telefono valido");
      return;
    }

    try {
      const formattedNumber = phoneNumber.replace(/\D/g, "");
      const whatsappUrl = `https://wa.me/${formattedNumber}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      toast.error("Errore nell'invio via WhatsApp");
      console.error("Errore nell'invio via WhatsApp:", error);
    }
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
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              {isGeneratingPDF ? "Generando PDF..." : "Download PDF"}
            </button>
            <div className="flex items-center gap-2">
              <input
                type="tel"
                placeholder="Numero WhatsApp"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
              />
              <button
                onClick={shareViaWhatsApp}
                className="flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:bg-[#128C7E]"
              >
                <Send className="h-4 w-4" />
                Invia
              </button>
            </div>
          </div>
          <button
            onClick={handleAddRestaurant}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" />
            Aggiungi Ristorante
          </button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {restaurantData.map((restaurant) => (
            <div key={restaurant.id} className="animate-fade-in">
              <RestaurantCard
                {...restaurant}
                onUpdateCard={handleUpdateCard}
                onDelete={handleDeleteRestaurant}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
