
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';

// Calculate markup price (3% increase)
const calculateMarkupPrice = (originalPrice: number): number => {
  return originalPrice * 1.03;
};

export interface ImportProductResult {
  success: boolean;
  product?: Product;
  error?: string;
}

// Function that will call Supabase Edge Functions to import a product
export async function importProductByUrl(url: string, source: 'amazon' | 'alibaba'): Promise<ImportProductResult> {
  try {
    // Call Supabase Edge Function to scrape product details
    const { data, error } = await supabase.functions.invoke('import-product', {
      body: { url, source },
    });

    if (error) throw new Error(error.message);
    if (!data) throw new Error('No product data returned');

    // Calculate markup price (3% increase)
    const price = calculateMarkupPrice(data.price);

    // Save to database
    const { data: product, error: saveError } = await supabase
      .from('products')
      .insert({
        title: data.title,
        description: data.description,
        price: price,
        original_price: data.price,
        images: data.images,
        source: source,
        category: data.category,
        in_stock: data.inStock,
        specifications: data.specifications,
      })
      .select('*')
      .single();

    if (saveError) throw new Error(saveError.message);

    // Map to our Product type
    const importedProduct: Product = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      originalPrice: product.original_price,
      images: product.images,
      source: product.source,
      category: product.category || undefined,
      inStock: product.in_stock,
      specifications: product.specifications || undefined,
      createdAt: product.created_at,
    };

    return {
      success: true,
      product: importedProduct
    };
  } catch (error: any) {
    console.error('Import product error:', error);
    return {
      success: false,
      error: error.message || 'Failed to import product'
    };
  }
}

export async function searchProducts(
  keyword: string, 
  source: 'amazon' | 'alibaba',
  markupPercentage: number = 3
): Promise<ImportProductResult[]> {
  try {
    // Call Supabase Edge Function to search for products
    const { data, error } = await supabase.functions.invoke('search-products', {
      body: { 
        keyword, 
        source,
        markupPercentage 
      },
    });

    if (error) throw new Error(error.message);
    if (!data || !data.products) throw new Error('No search results returned');

    const results: ImportProductResult[] = [];

    // Process each product in the search results
    for (const item of data.products) {
      results.push({
        success: true,
        product: {
          id: item.id || 'temp-' + Math.random().toString(36).substring(2, 11),
          title: item.title,
          description: item.description,
          price: calculateMarkupPrice(item.price),
          originalPrice: item.price,
          images: item.images,
          source: source,
          category: item.category,
          inStock: item.inStock !== false, // Default to true if not specified
          specifications: item.specifications,
          createdAt: new Date().toISOString(),
        }
      });
    }

    return results;
  } catch (error: any) {
    console.error('Search products error:', error);
    return [{
      success: false,
      error: error.message || 'Failed to search products'
    }];
  }
}
