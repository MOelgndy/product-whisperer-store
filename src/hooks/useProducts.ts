
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';

// Convert Supabase product to our app's product type
const mapToProduct = (item: any): Product => ({
  id: item.id,
  title: item.title,
  description: item.description,
  price: item.price,
  originalPrice: item.original_price || undefined,
  images: item.images,
  source: item.source,
  category: item.category || undefined,
  inStock: item.in_stock,
  specifications: item.specifications || undefined,
  createdAt: item.created_at,
});

export function useProducts() {
  const queryClient = useQueryClient();

  const fetchProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []).map(mapToProduct);
  };

  const fetchProductById = async (id: string): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return mapToProduct(data);
  };

  const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    // Convert our product type to Supabase format
    const supabaseProduct = {
      title: product.title,
      description: product.description,
      price: product.price,
      original_price: product.originalPrice,
      images: product.images,
      source: product.source,
      category: product.category,
      in_stock: product.inStock,
      specifications: product.specifications,
    };

    const { data, error } = await supabase
      .from('products')
      .insert(supabaseProduct)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapToProduct(data);
  };

  const updateProduct = async (product: Product): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .update({
        title: product.title,
        description: product.description,
        price: product.price,
        original_price: product.originalPrice,
        images: product.images,
        source: product.source,
        category: product.category,
        in_stock: product.inStock,
        specifications: product.specifications,
      })
      .eq('id', product.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapToProduct(data);
  };

  const deleteProduct = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  };

  // Create queries and mutations
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const productByIdQuery = (id: string) => useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,
    getProductById: productByIdQuery,
    addProduct: addProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
  };
}
