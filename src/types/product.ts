
export interface Product {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  price?: number;
  images: string[];
  source: 'amazon' | 'alibaba';
  category?: string;
  createdAt?: string;
  inStock: boolean;
  specifications?: Record<string, string>;
}

export interface CartProduct extends Product {
  quantity: number;
}
