import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export interface FavoriteItem {
  id: number;
  name: string;
  image: string;
}

interface FavoriteContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  favoriteCount: number;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.find(f => f.id === item.id)) {
        toast({
          title: "Already added",
          description: `${item.name} is already in your favorites`,
        });
        return prev;
      }

      toast({
        title: "Added to favorites",
        description: `${item.name} added to favorites`,
      });

      return [...prev, item];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
    toast({
      title: "Removed",
      description: "Item removed from favorites",
    });
  };

  const isFavorite = (id: number) => favorites.some(f => f.id === id);

  const favoriteCount = favorites.length;

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, favoriteCount }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoriteProvider");
  return ctx;
};
