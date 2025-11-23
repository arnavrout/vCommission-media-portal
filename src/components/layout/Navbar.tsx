import { ShoppingCart, Moon, Sun, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoriteContext';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from 'framer-motion';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { items, itemCount, total, removeFromCart } = useCart();
  const { favorites, favoriteCount, removeFavorite } = useFavorites();


  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="w-full flex h-16 items-center justify-between px-[25px] shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="rounded-lg lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-lg">vCommission Media</span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-lg"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          {/* For Favorites */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-lg">
                <Heart className="h-5 w-5" />
                {favoriteCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {favoriteCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Favorites</SheetTitle>
                <SheetDescription>
                  {favoriteCount === 0 ? 'No favorites added' : `${favoriteCount} items`}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                {favorites.map(f => (
                  <div key={f.id} className="flex items-center gap-4 border-b pb-4">
                    <img
                      src={f.image}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{f.name}</h4>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFavorite(f.id)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>


          {/* For Add To Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-lg">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>
                  {itemCount === 0 ? 'Your cart is empty' : `${itemCount} items in cart`}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.price.toLocaleString('en-IN')} × {item.quantity}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {itemCount > 0 && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="rounded-lg"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
