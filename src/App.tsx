
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/hooks/useAuth";

// Pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetailPage";
import ImportPage from "./pages/ImportPage";
import CartPage from "./pages/CartPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/import" element={<ImportPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
