
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ShoppingCart, Box, Truck, ShieldCheck, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';
import { calculateMarkupPrice } from '@/utils/priceUtils';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.title} (Qty: ${quantity}) has been added to your cart.`,
    });
  };
  
  const displayPrice = product.price ? product.price : calculateMarkupPrice(product.originalPrice);
  const sourceBadgeColor = product.source === 'amazon' 
    ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' 
    : 'bg-blue-100 text-blue-800 hover:bg-blue-200';

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Product Images */}
      <div className="md:w-1/2 space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg border">
          <img 
            src={product.images[selectedImage] || '/placeholder.svg'} 
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {product.images.map((image, index) => (
            <div 
              key={index} 
              className={`cursor-pointer w-20 h-20 border rounded-md overflow-hidden ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img 
                src={image} 
                alt={`${product.title} thumbnail ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="md:w-1/2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className={sourceBadgeColor}>
            {product.source === 'amazon' ? 'Amazon' : 'Alibaba'}
          </Badge>
          {product.category && (
            <Badge variant="outline">{product.category}</Badge>
          )}
        </div>
        
        <h1 className="text-3xl font-bold">{product.title}</h1>
        
        <div className="mt-4 mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">${displayPrice.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.originalPrice && (
            <p className="text-sm text-green-600 mt-1">
              Save ${(product.originalPrice - displayPrice).toFixed(2)} ({Math.round((1 - displayPrice/product.originalPrice) * 100)}% off)
            </p>
          )}
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity
              </label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={!product.inStock}
                >
                  -
                </Button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="h-9 w-12 rounded-none border-y text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  disabled={!product.inStock}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <Button 
                className="w-full"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Additional Product Information */}
        <Tabs defaultValue="shipping">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="warranty">Warranty</TabsTrigger>
          </TabsList>
          <TabsContent value="shipping" className="p-4 border rounded-md mt-2">
            <div className="flex items-start gap-2">
              <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-muted-foreground">3-5 business days</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="details" className="p-4 border rounded-md mt-2 text-sm space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-muted-foreground">SKU</span>
              <span>{product.id}</span>
              {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                <React.Fragment key={key}>
                  <span className="text-muted-foreground">{key}</span>
                  <span>{value}</span>
                </React.Fragment>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="warranty" className="p-4 border rounded-md mt-2">
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">30-Day Warranty</h4>
                <p className="text-sm text-muted-foreground">
                  All products come with a 30-day warranty against defects.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
