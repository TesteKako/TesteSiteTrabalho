import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  onAddToCart?: (product: any) => void;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  category,
  onAddToCart,
}: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    onAddToCart?.({ id, name, description, price, image, category });
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-hover transition-smooth cursor-pointer">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-2 right-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-foreground bg-primary/90 backdrop-blur-sm rounded-full">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            R$ {price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isLoading}
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
