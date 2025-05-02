
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartProduct } from '@/types/product';

interface CartItemProps {
  item: CartProduct;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { id, title, price, images, quantity } = item;
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    // In a real app, you would wait for the API call to complete
    await new Promise(resolve => setTimeout(resolve, 300));
    onUpdateQuantity(id, newQuantity);
    setIsUpdating(false);
  };

  return (
    <div className="flex items-start space-x-4 py-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={images[0] || '/placeholder.svg'}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <Link to={`/products/${id}`} className="text-base font-medium text-foreground hover:underline">
            {title}
          </Link>
          <p className="ml-4 text-base font-medium text-foreground">
            ${price.toFixed(2)}
          </p>
        </div>
        
        <div className="mt-1 flex items-end justify-between">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || isUpdating}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isUpdating}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemove(id)} 
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
