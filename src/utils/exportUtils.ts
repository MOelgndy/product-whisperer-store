
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
 * Convert products to Amazon format
 */
export const productsToAmazon = (products: Product[]): string => {
  // Amazon specific headers
  const headers = [
    'item_name',
    'brand_name',
    'manufacturer',
    'feed_product_type',
    'item_description',
    'external_product_id',
    'external_product_id_type',
    'standard_price',
    'quantity',
    'main_image_url',
    'product_category'
  ];
  
  const csvRows = [
    headers.join('\t'),
    ...products.map(product => {
      // Get first image URL if available
      const mainImage = product.images && product.images.length > 0 ? product.images[0] : '';
      
      return [
        `"${product.title.replace(/"/g, '""')}"`, // item_name
        'YourBrand', // brand_name
        'YourCompany', // manufacturer
        product.category || 'general', // feed_product_type
        `"${product.description.replace(/"/g, '""')}"`, // item_description
        product.id, // external_product_id
        'CUSTOM', // external_product_id_type
        product.price || product.originalPrice, // standard_price
        product.inStock ? '100' : '0', // quantity
        mainImage, // main_image_url
        product.category || 'general' // product_category
      ].join('\t');
    })
  ];
  
  return csvRows.join('\n');
};

/**
 * Convert products to generic marketplace format for platforms like Etsy, eBay, etc.
 */
export const productsToGenericMarketplace = (products: Product[]): string => {
  const headers = [
    'Title',
    'Description',
    'Price',
    'Quantity',
    'Category',
    'ImageURL',
    'SKU'
  ];
  
  const csvRows = [
    headers.join(','),
    ...products.map(product => {
      // Get first image URL if available
      const mainImage = product.images && product.images.length > 0 ? product.images[0] : '';
      
      return [
        `"${product.title.replace(/"/g, '""')}"`, // Title
        `"${product.description.replace(/"/g, '""')}"`, // Description
        product.price || product.originalPrice, // Price
        product.inStock ? '100' : '0', // Quantity
        `"${product.category || 'General'}"`, // Category
        `"${mainImage}"`, // ImageURL
        product.id // SKU
      ].join(',');
    })
  ];
  
  return csvRows.join('\n');
};

/**
 * Create and trigger download of export file
 */
export const downloadExportFile = (
  data: string, 
  format: 'csv' | 'json' | 'amazon' | 'marketplace',
  fileName?: string
): void => {
  const timestamp = new Date().toISOString().split('T')[0];
  
  let fileExtension = 'csv';
  let mimeType = 'text/csv';
  
  if (format === 'json') {
    fileExtension = 'json';
    mimeType = 'application/json';
  } else if (format === 'amazon') {
    fileExtension = 'txt';
    mimeType = 'text/plain';
  }
  
  const defaultFileName = `products_export_${format}_${timestamp}.${fileExtension}`;
  
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = fileName || defaultFileName;
  link.click();
  
  URL.revokeObjectURL(url);
};

// Map of export format to export function
export const exportFormatMap = {
  csv: productsToCSV,
  json: productsToJSON,
  amazon: productsToAmazon,
  marketplace: productsToGenericMarketplace
};

export type ExportFormat = 'csv' | 'json' | 'amazon' | 'marketplace';

