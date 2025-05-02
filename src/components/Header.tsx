
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount?: number;
}

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, this would trigger a search
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand-teal">Product<span className="text-brand-purple">Whisperer</span></span>
          </Link>
        </div>
        
        <div className={`${isMobile ? 'absolute top-16 left-0 right-0 bg-white p-4 shadow-md border-b' : 'flex-1 mx-6'} ${isMobile && !isMenuOpen ? 'hidden' : 'block'}`}>
          <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-md mx-auto">
            <Input 
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          {isMobile && (
            <nav className="mt-4">
              <ul className="flex flex-col space-y-2">
                <li><Link to="/" className="block p-2 hover:bg-gray-100 rounded-md">Home</Link></li>
                <li><Link to="/products" className="block p-2 hover:bg-gray-100 rounded-md">Products</Link></li>
                <li><Link to="/import" className="block p-2 hover:bg-gray-100 rounded-md">Import Products</Link></li>
                <li><Link to="/dashboard" className="block p-2 hover:bg-gray-100 rounded-md">Dashboard</Link></li>
              </ul>
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-4 mr-4">
              <Link to="/" className="text-sm font-medium hover:text-brand-teal transition-colors">Home</Link>
              <Link to="/products" className="text-sm font-medium hover:text-brand-teal transition-colors">Products</Link>
              <Link to="/import" className="text-sm font-medium hover:text-brand-teal transition-colors">Import</Link>
              <Link to="/dashboard" className="text-sm font-medium hover:text-brand-teal transition-colors">Dashboard</Link>
            </nav>
          )}
          
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 flex items-center justify-center">{cartItemCount}</Badge>
              )}
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
