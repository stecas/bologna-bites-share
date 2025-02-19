import { Star, MapPin, Utensils, StickyNote, Settings2, X } from "lucide-react";
import { useState, useEffect } from "react";

interface RestaurantCardProps {
  id: number;
  name: string;
  rating: number;
  cuisine: string;
  address: string;
  image: string;
  recommendations: string[];
  notes?: string;
  onUpdateCard: (id: number, field: string, value: any) => void;
  onDelete: (id: number) => void;
}

const RestaurantCard = ({
  id,
  name,
  rating,
  cuisine,
  address,
  image,
  recommendations,
  notes = "",
  onUpdateCard,
  onDelete,
}: RestaurantCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name,
    rating,
    cuisine,
    address,
    image,
    recommendations,
    notes,
  });
  const [newRecommendation, setNewRecommendation] = useState("");

  useEffect(() => {
    setEditedData({
      name,
      rating,
      cuisine,
      address,
      image,
      recommendations,
      notes,
    });
  }, [name, rating, cuisine, address, image, recommendations, notes]);

  const handleSave = () => {
    Object.entries(editedData).forEach(([field, value]) => {
      onUpdateCard(id, field, value);
    });
    setIsEditing(false);
  };

  const handleAddRecommendation = () => {
    if (newRecommendation.trim()) {
      setEditedData({
        ...editedData,
        recommendations: [...editedData.recommendations, newRecommendation.trim()],
      });
      setNewRecommendation("");
    }
  };

  const handleRemoveRecommendation = (index: number) => {
    setEditedData({
      ...editedData,
      recommendations: editedData.recommendations.filter((_, i) => i !== index),
    });
  };

  const getGoogleMapsUrl = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + " Bologna")}`;
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-glass transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={isEditing ? editedData.image : image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute right-2 top-2 rounded-full bg-white/80 p-2 text-neutral-dark shadow-sm hover:bg-white"
        >
          <Settings2 className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-dark">Nome</label>
              <input
                type="text"
                value={editedData.name}
                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                className="w-full rounded-md border border-neutral-200 p-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-dark">Valutazione</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={editedData.rating}
                onChange={(e) => setEditedData({ ...editedData, rating: parseFloat(e.target.value) })}
                className="w-full rounded-md border border-neutral-200 p-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-dark">Cucina</label>
              <input
                type="text"
                value={editedData.cuisine}
                onChange={(e) => setEditedData({ ...editedData, cuisine: e.target.value })}
                className="w-full rounded-md border border-neutral-200 p-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-dark">Indirizzo</label>
              <input
                type="text"
                value={editedData.address}
                onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                className="w-full rounded-md border border-neutral-200 p-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-dark">URL Immagine</label>
              <input
                type="url"
                value={editedData.image}
                onChange={(e) => setEditedData({ ...editedData, image: e.target.value })}
                className="w-full rounded-md border border-neutral-200 p-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-dark">Piatti Consigliati</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRecommendation}
                  onChange={(e) => setNewRecommendation(e.target.value)}
                  className="flex-1 rounded-md border border-neutral-200 p-2 text-sm"
                  placeholder="Aggiungi un piatto..."
                />
                <button
                  onClick={handleAddRecommendation}
                  className="rounded-md bg-primary px-3 py-1 text-sm text-white hover:bg-primary-hover"
                >
                  Aggiungi
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editedData.recommendations.map((dish, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 rounded-full bg-neutral px-3 py-1 text-sm text-secondary"
                  >
                    {dish}
                    <button
                      onClick={() => handleRemoveRecommendation(index)}
                      className="ml-1 text-secondary hover:text-neutral-dark"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-dark">Note</label>
              <textarea
                value={editedData.notes}
                onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
                className="w-full rounded-lg border border-neutral p-2 text-sm text-neutral-dark"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="rounded-md bg-primary px-3 py-1 text-sm text-white hover:bg-primary-hover"
              >
                Salva
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedData({ name, rating, cuisine, address, image, recommendations, notes });
                }}
                className="rounded-md bg-neutral-dark px-3 py-1 text-sm text-white hover:opacity-90"
              >
                Annulla
              </button>
              <button
                onClick={() => onDelete(id)}
                className="ml-auto rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
              >
                Elimina
              </button>
            </div>
          </div>
        ) : (
          <>
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
              <a
                href={getGoogleMapsUrl(address)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary hover:underline"
              >
                {address}
              </a>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-neutral-dark">Piatti Consigliati:</h4>
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
            {notes && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-secondary">
                  <StickyNote className="h-4 w-4" />
                  <h4 className="font-medium text-neutral-dark">Note:</h4>
                </div>
                <p className="text-sm text-neutral-dark">{notes}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
