import { ShoppingCart, Moon, Sun, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoriteContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

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
        <TooltipProvider delayDuration={200}>
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-lg"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Change Theme</TooltipContent>
          </Tooltip>

          {/* Favorites */}
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>Favorites</TooltipContent>
          </Tooltip>

          {/* Cart */}
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>Shopping Cart</TooltipContent>
          </Tooltip>

          {/* Logout */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="rounded-lg"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Logout</TooltipContent>
          </Tooltip>

        </div>
      </TooltipProvider>

      </div>
    </motion.header>
  );
};
