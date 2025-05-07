import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface NavbarProps {
  cartItemCount?: number;
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
}

const Navbar = ({
  cartItemCount = 0,
  onSearchOpen = () => {},
  onCartOpen = () => {},
}: NavbarProps) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearchOpen = () => {
    setIsSearchModalOpen(true);
    onSearchOpen();
  };

  const handleSearchClose = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top navbar section */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left section - Search */}
          <div className="w-1/3 flex justify-start">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchOpen}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Center section - Logo */}
          <div className="w-1/3 flex justify-center">
            <Link to="/" className="text-2xl font-bold text-center">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80"
                alt="Joyería Góngora"
                className="h-12 object-contain"
              />
            </Link>
          </div>

          {/* Right section - User and Cart */}
          <div className="w-1/3 flex justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User menu">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/login" className="w-full">
                    Iniciar sesión
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/register" className="w-full">
                    Registrarse
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">
                    Mi perfil
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={onCartOpen}
              className="relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs"
                  variant="destructive"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom navbar section - Categories */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-8">
            <Link
              to="/"
              className="py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-900"
            >
              Home
            </Link>
            <Link
              to="/category/joyas"
              className="py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-900"
            >
              Joyas
            </Link>
            <Link
              to="/category/relojes"
              className="py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-900"
            >
              Relojes
            </Link>
          </nav>
        </div>
      </div>

      {/* Search Modal */}
      <Dialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Buscar productos</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar joyas, relojes..."
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <Button>Buscar</Button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Resultados aparecerán aquí...
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
