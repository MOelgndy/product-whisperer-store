
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartProduct } from '@/types/product';

interface CartContextProps {
  cartItems: CartProduct[];
  addToCart: (product: Product, quantity?: number) => void;
  removeCartItem: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        const newItem: CartProduct = {
          ...product,
          quantity: quantity
        };
        return [...prevItems, newItem];
      }
    });
  };
  
  const removeCartItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeCartItem,
      updateCartItemQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
