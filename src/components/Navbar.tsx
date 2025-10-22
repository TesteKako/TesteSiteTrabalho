import { ShoppingCart, Menu as MenuIcon, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface NavbarProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

const Navbar = ({ cartItemsCount = 0, onCartClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">MenuDigital</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
              Início
            </a>
            <a href="#menu" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
              Cardápio
            </a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
              Sobre
            </a>
          </div>

          {/* Cart Button */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="#home"
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </a>
              <a
                href="#menu"
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Cardápio
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
