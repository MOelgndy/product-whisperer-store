
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateCartItemQuantity, removeCartItem, clearCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleContinueShopping = () => {
    navigate('/products');
  };
  
  const isEmpty = cartItems.length === 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="flex-grow container px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {isEmpty ? (
          <div className="text-center py-16 space-y-6">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
            <Button onClick={handleContinueShopping} className="mt-4">
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg border">
                <div className="p-6 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  </h2>
                  <Button 
                    variant="ghost"
                    onClick={clearCart}
                    className="text-sm text-muted-foreground"
                  >
                    Clear Cart
                  </Button>
                </div>
                
                <Separator />
                
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="px-6">
                      <CartItem 
                        item={item}
                        onUpdateQuantity={updateCartItemQuantity}
                        onRemove={removeCartItem}
                      />
                      <Separator className="last:hidden" />
                    </div>
                  ))}
                </div>
                
                <div className="p-6 border-t">
                  <Button variant="outline" onClick={handleContinueShopping}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <CartSummary items={cartItems} />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
