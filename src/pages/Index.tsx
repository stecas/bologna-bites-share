import { useState, useEffect } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import { Plus, Download, Settings2 } from "lucide-react";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";
import { Auth } from "@/components/Auth";
import { supabase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Template = {
  id: string;
  title: string;
  subtitle: string;
  restaurants: typeof defaultRestaurants;
};

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
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentTemplateId, setCurrentTemplateId] = useState<string>("");
  const [restaurantData, setRestaurantData] = useState<typeof defaultRestaurants>([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Sapori di Bologna");
  const [headerSubtitle, setHeaderSubtitle] = useState("I migliori ristoranti tradizionali vicino alla Fiera");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTemplates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setTemplates([{
          id: "default",
          title: "Sapori di Bologna",
          subtitle: "I migliori ristoranti tradizionali vicino alla Fiera",
          restaurants: defaultRestaurants
        }]);
        setCurrentTemplateId("default");
        setRestaurantData(defaultRestaurants);
        return;
      }

      const { data: templatesData, error: templatesError } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: true });

      if (templatesError) throw templatesError;

      if (templatesData.length === 0) {
        const { data: newTemplate, error: createError } = await supabase
          .from('templates')
          .insert({
            title: "Sapori di Bologna",
            subtitle: "I migliori ristoranti tradizionali vicino alla Fiera",
          })
          .select()
          .single();

        if (createError) throw createError;

        const { error: restaurantsError } = await supabase
          .from('restaurants')
          .insert(
            defaultRestaurants.map(restaurant => ({
              ...restaurant,
              template_id: newTemplate.id
            }))
          );

        if (restaurantsError) throw restaurantsError;

        setTemplates([{ ...newTemplate, restaurants: defaultRestaurants }]);
        setCurrentTemplateId(newTemplate.id);
        setRestaurantData(defaultRestaurants);
      } else {
        const templatesWithRestaurants = await Promise.all(
          templatesData.map(async (template) => {
            const { data: restaurants } = await supabase
              .from('restaurants')
              .select('*')
              .eq('template_id', template.id);
            return { ...template, restaurants: restaurants || [] };
          })
        );

        setTemplates(templatesWithRestaurants);
        setCurrentTemplateId(templatesWithRestaurants[0].id);
        setRestaurantData(templatesWithRestaurants[0].restaurants);
        setHeaderTitle(templatesWithRestaurants[0].title);
        setHeaderSubtitle(templatesWithRestaurants[0].subtitle);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Errore nel caricamento dei dati");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchTemplates();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUpdateCard = async (id: number, field: string, value: any) => {
    try {
      const { error } = await supabase
        .from('restaurants')
        .update({ [field]: value })
        .eq('id', id);

      if (error) throw error;

      setRestaurantData(prev =>
        prev.map(restaurant =>
          restaurant.id === id
            ? { ...restaurant, [field]: value }
            : restaurant
        )
      );
    } catch (error) {
      console.error('Error updating restaurant:', error);
      toast.error("Errore nell'aggiornamento del ristorante");
    }
  };

  const handleAddRestaurant = async () => {
    try {
      const newRestaurant = {
        ...emptyRestaurant,
        template_id: currentTemplateId
      };

      const { data, error } = await supabase
        .from('restaurants')
        .insert(newRestaurant)
        .select()
        .single();

      if (error) throw error;

      setRestaurantData(prev => [...prev, data]);
    } catch (error) {
      console.error('Error adding restaurant:', error);
      toast.error("Errore nell'aggiunta del ristorante");
    }
  };

  const handleDeleteRestaurant = async (id: number) => {
    try {
      const { error } = await supabase
        .from('restaurants')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRestaurantData(prev => prev.filter(restaurant => restaurant.id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      toast.error("Errore nell'eliminazione del ristorante");
    }
  };

  const handleCreateNewTemplate = async () => {
    try {
      const { data: newTemplate, error } = await supabase
        .from('templates')
        .insert({
          title: "Nuovo Template",
          subtitle: "Inserisci sottotitolo"
        })
        .select()
        .single();

      if (error) throw error;

      setTemplates(prev => [...prev, { ...newTemplate, restaurants: [] }]);
      setCurrentTemplateId(newTemplate.id);
      setRestaurantData([]);
      setHeaderTitle(newTemplate.title);
      setHeaderSubtitle(newTemplate.subtitle);
    } catch (error) {
      console.error('Error creating template:', error);
      toast.error("Errore nella creazione del template");
    }
  };

  const getGoogleMapsUrl = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ", Bologna, Italy")}`;
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const element = document.createElement("div");
      element.innerHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #E35A3D; text-align: center; font-size: 24px; margin-bottom: 40px;">${headerTitle}</h1>
          <p style="text-align: center; color: #7C9082; margin-bottom: 40px;">${headerSubtitle}</p>
          ${restaurantData
            .map(
              (restaurant) => `
            <div style="
              background: white;
              border-radius: 12px;
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
              margin: 0 auto 30px;
              max-width: 500px;
              overflow: hidden;
              page-break-inside: avoid;
            ">
              <div style="
                position: relative;
                width: 100%;
                padding-top: 56.25%;
                overflow: hidden;
                background: #f8f8f8;
              ">
                <img 
                  src="${restaurant.image}"
                  alt="${restaurant.name}"
                  style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  "
                />
              </div>
              <div style="padding: 24px;">
                <div style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 8px;
                ">
                  <h2 style="
                    color: #2D3436;
                    font-size: 20px;
                    font-weight: 600;
                    margin: 0;
                  ">${restaurant.name}</h2>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 4px;
                  ">
                    <span style="color: #FFB168;">⭐</span>
                    <span style="
                      color: #2D3436;
                      font-weight: 500;
                    ">${restaurant.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  margin-bottom: 16px;
                  color: #7C9082;
                ">
                  <span>🍽️</span>
                  <span style="font-size: 14px;">${restaurant.cuisine}</span>
                </div>
                
                <div style="
                  display: flex;
                  align-items: flex-start;
                  gap: 8px;
                  margin-bottom: 24px;
                  color: #7C9082;
                ">
                  <span>📍</span>
                  <a 
                    href="${getGoogleMapsUrl(restaurant.address)}"
                    style="
                      font-size: 14px;
                      color: #E35A3D;
                      text-decoration: none;
                    "
                    target="_blank"
                  >${restaurant.address}</a>
                </div>
                
                <div>
                  <h4 style="
                    color: #2D3436;
                    font-size: 16px;
                    font-weight: 500;
                    margin: 0 0 12px 0;
                  ">Piatti Consigliati:</h4>
                  <div style="
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                  ">
                    ${restaurant.recommendations
                      .map(
                        (dish) => `
                      <span style="
                        background: #FAF7F2;
                        color: #7C9082;
                        padding: 4px 12px;
                        border-radius: 9999px;
                        font-size: 14px;
                      ">${dish}</span>
                    `
                      )
                      .join("")}
                  </div>
                </div>
                
                ${
                  restaurant.notes
                    ? `
                <div style="
                  margin-top: 16px;
                ">
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #7C9082;
                  ">
                    <span>📝</span>
                    <h4 style="
                      color: #2D3436;
                      font-size: 16px;
                      font-weight: 500;
                      margin: 0;
                    ">Note:</h4>
                  </div>
                  <p style="
                    color: #2D3436;
                    font-size: 14px;
                    margin: 8px 0 0 0;
                  ">${restaurant.notes}</p>
                </div>
                `
                    : ""
                }
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;

      const opt = {
        margin: [15, 0],
        filename: "sapori-di-bologna.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
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

  return (
    <div className="min-h-screen bg-neutral pb-20">
      <header className="mb-12 bg-white py-8 shadow-sm">
        <div className="container">
          <div className="mb-8 flex justify-end">
            <Auth />
          </div>
          <div className="relative">
            {isEditingHeader ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="text"
                    value={headerTitle}
                    onChange={(e) => setHeaderTitle(e.target.value)}
                    className="w-full max-w-md rounded-lg border border-neutral-200 px-3 py-2 text-center text-4xl font-bold text-neutral-dark"
                  />
                  <button
                    onClick={() => setIsEditingHeader(false)}
                    className="rounded-full bg-green-500 p-2 text-white hover:bg-green-600"
                  >
                    ✓
                  </button>
                </div>
                <input
                  type="text"
                  value={headerSubtitle}
                  onChange={(e) => setHeaderSubtitle(e.target.value)}
                  className="w-full max-w-md rounded-lg border border-neutral-200 px-3 py-2 text-center text-lg text-secondary"
                />
              </div>
            ) : (
              <>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-full bg-primary p-2 text-white hover:bg-primary-hover">
                      <Settings2 className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setIsEditingHeader(true)}>
                        Modifica intestazione
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleCreateNewTemplate}>
                        Nuovo template
                      </DropdownMenuItem>
                      {templates.map(template => (
                        <DropdownMenuItem
                          key={template.id}
                          onClick={() => {
                            setCurrentTemplateId(template.id);
                            setRestaurantData(template.restaurants);
                            setHeaderTitle(template.title);
                            setHeaderSubtitle(template.subtitle);
                          }}
                        >
                          {template.title}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h1 className="animate-fade-up text-center text-4xl font-bold text-neutral-dark">
                  {headerTitle}
                </h1>
                <p className="animate-fade-up text-center text-lg text-secondary">
                  {headerSubtitle}
                </p>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-secondary">Caricamento...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                {isGeneratingPDF ? "Generando PDF..." : "Download PDF"}
              </button>
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
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
