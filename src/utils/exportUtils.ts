
import { Product } from "@/types/product";

/**
 * Convert products to CSV format
 */
export const productsToCSV = (products: Product[]): string => {
  const headers = ['id', 'title', 'description', 'originalPrice', 'price', 'source', 'category', 'inStock'];
  const csvRows = [
    headers.join(','),
    ...products.map(product => {
      return [
        product.id,
        `"${product.title.replace(/"/g, '""')}"`,
        `"${product.description.replace(/"/g, '""')}"`,
        product.originalPrice,
        product.price || '',
        product.source,
        product.category || '',
        product.inStock
      ].join(',');
    })
  ];
  
  return csvRows.join('\n');
};

/**
 * Convert products to JSON format
 */
export const productsToJSON = (products: Product[]): string => {
  return JSON.stringify(products, null, 2);
};

/**
 * Create and trigger download of export file
 */
export const downloadExportFile = (
  data: string, 
  format: 'csv' | 'json',
  fileName?: string
): void => {
  const timestamp = new Date().toISOString().split('T')[0];
  const defaultFileName = `products_export_${timestamp}.${format}`;
  
  const blob = new Blob(
    [data], 
    { type: format === 'csv' ? 'text/csv' : 'application/json' }
  );
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = fileName || defaultFileName;
  link.click();
  
  URL.revokeObjectURL(url);
};
