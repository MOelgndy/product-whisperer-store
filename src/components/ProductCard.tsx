
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Product } from '@/types/product';
import { calculateMarkupPrice } from '@/utils/priceUtils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { id, title, description, price, originalPrice, images, source, category, inStock } = product;
  
  const sourceBadgeColor = source === 'amazon' 
    ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' 
    : 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    
  const displayPrice = price ? price : calculateMarkupPrice(originalPrice);
  
  return (
    <Card className="product-card">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={images[0] || '/placeholder.svg'} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Badge variant="outline" className={sourceBadgeColor}>
            {source === 'amazon' ? 'Amazon' : 'Alibaba'}
          </Badge>
          {!inStock && <Badge variant="destructive">Out of stock</Badge>}
        </div>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link to={`/products/${id}`} className="text-lg font-medium line-clamp-2 hover:underline">
            {title}
          </Link>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">${displayPrice.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2 border-t">
        <Button 
          onClick={() => onAddToCart(product)} 
          className="flex-1" 
          disabled={!inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        
        <Link to={`/products/${id}`}>
          <Button variant="outline" size="icon">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
