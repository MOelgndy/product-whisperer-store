
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { CartProduct } from '@/types/product';

interface CartSummaryProps {
  items: CartProduct[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate summary values
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // This would normally connect to a payment processor
      toast({
        title: "Feature Note",
        description: "This feature requires Supabase integration for payment processing.",
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    } catch (error) {
      console.error('Error processing checkout:', error);
      toast({
        title: "Error",
        description: "Failed to process checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Tax (estimated)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <Button 
          className="w-full mt-4" 
          size="lg"
          onClick={handleCheckout}
          disabled={isProcessing || items.length === 0}
        >
          {isProcessing ? "Processing..." : "Checkout"}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-2">
          Taxes and shipping calculated at checkout
        </p>
      </div>
    </div>
  );
}
