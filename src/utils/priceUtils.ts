
/**
 * Calculate the price with markup
 * @param originalPrice - The original price of the product
 * @param markupPercentage - The markup percentage (default: 3%)
 * @returns The price with markup
 */
export const calculateMarkupPrice = (originalPrice: number, markupPercentage: number = 3): number => {
  if (!originalPrice || originalPrice <= 0) return 0;
  const markup = 1 + (markupPercentage / 100);
  return originalPrice * markup;
};

/**
 * Format a number as currency
 * @param value - The number to format
 * @param currency - The currency code (default: 'USD')
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(value);
};
