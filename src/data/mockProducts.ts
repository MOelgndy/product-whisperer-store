
import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Wireless Bluetooth Earbuds with Charging Case",
    description: "High-quality sound with noise cancellation technology. Water-resistant and perfect for workouts. Includes charging case with 24-hour battery life.",
    originalPrice: 89.99,
    price: 92.69,
    images: [
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "amazon",
    category: "Electronics",
    createdAt: "2025-04-01T14:30:00Z",
    inStock: true,
    specifications: {
      "Battery Life": "6 hours (24 hours with case)",
      "Bluetooth Version": "5.2",
      "Water Resistance": "IPX5",
      "Weight": "5.6g per earbud"
    }
  },
  {
    id: "2",
    title: "Smart Watch with Heart Rate Monitor",
    description: "Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, sleep tracking, and notifications from your phone.",
    originalPrice: 149.99,
    price: 154.49,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "amazon",
    category: "Electronics",
    createdAt: "2025-04-02T10:15:00Z",
    inStock: true,
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery Life": "Up to 14 days",
      "Water Resistance": "5 ATM",
      "Sensors": "Heart rate, accelerometer, gyroscope"
    }
  },
  {
    id: "3",
    title: "Portable Bluetooth Speaker",
    description: "Powerful sound in a compact design. This waterproof speaker is perfect for outdoor adventures and pool parties.",
    originalPrice: 59.99,
    price: 61.79,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "amazon",
    category: "Electronics",
    createdAt: "2025-04-03T16:45:00Z",
    inStock: false,
    specifications: {
      "Output Power": "20W",
      "Battery Life": "12 hours",
      "Water Resistance": "IPX7",
      "Connectivity": "Bluetooth 5.0, AUX"
    }
  },
  {
    id: "4",
    title: "Ergonomic Office Chair",
    description: "Comfortable and supportive office chair with adjustable height, armrests, and lumbar support. Perfect for long work days.",
    originalPrice: 249.99,
    price: 257.49,
    images: [
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "amazon",
    category: "Furniture",
    createdAt: "2025-04-04T09:20:00Z",
    inStock: true,
    specifications: {
      "Material": "Mesh and plastic",
      "Weight Capacity": "300 lbs",
      "Adjustable Height": "Yes",
      "Assembly Required": "Yes"
    }
  },
  {
    id: "5",
    title: "LED Desk Lamp with Wireless Charging",
    description: "Modern desk lamp with adjustable brightness and color temperature. Features a built-in wireless charging pad for your phone.",
    originalPrice: 45.99,
    price: 47.37,
    images: [
      "https://images.unsplash.com/photo-1573798630989-87199e863f48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1543432315-f7d6680f82f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "alibaba",
    category: "Home",
    createdAt: "2025-04-05T11:10:00Z",
    inStock: true,
    specifications: {
      "Brightness Levels": "5",
      "Color Temperature": "2700K-6500K",
      "Charging Output": "10W",
      "Power": "12W"
    }
  },
  {
    id: "6",
    title: "Stainless Steel Water Bottle",
    description: "Double-walled vacuum insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    originalPrice: 29.99,
    price: 30.89,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "alibaba",
    category: "Kitchen",
    createdAt: "2025-04-06T14:55:00Z",
    inStock: true,
    specifications: {
      "Capacity": "20 oz",
      "Material": "18/8 Stainless Steel",
      "Insulation": "Double-walled vacuum",
      "Dishwasher Safe": "No"
    }
  },
  {
    id: "7",
    title: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and anti-slip surface.",
    originalPrice: 25.99,
    price: 26.77,
    images: [
      "https://images.unsplash.com/photo-1622954174661-5973681e5294?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1610294793735-bd47f7d6015d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "alibaba",
    category: "Electronics",
    createdAt: "2025-04-07T12:30:00Z",
    inStock: true,
    specifications: {
      "Output": "10W/7.5W/5W",
      "Input": "QC 3.0/2.0",
      "Compatibility": "Qi-enabled devices",
      "Cable Length": "1m"
    }
  },
  {
    id: "8",
    title: "Electric Coffee Grinder",
    description: "Compact coffee grinder with stainless steel blades. Adjustable grind size from fine to coarse for perfect coffee every time.",
    originalPrice: 39.99,
    price: 41.19,
    images: [
      "https://images.unsplash.com/photo-1632627191749-ea50a0d11e08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1635371240349-45765e6003d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "amazon",
    category: "Kitchen",
    createdAt: "2025-04-08T08:40:00Z",
    inStock: true,
    specifications: {
      "Capacity": "60g",
      "Power": "150W",
      "Blade Material": "Stainless Steel",
      "Operation": "One-touch"
    }
  },
  {
    id: "9",
    title: "Bamboo Laptop Stand",
    description: "Eco-friendly bamboo laptop stand with adjustable height. Improves posture and prevents overheating with ventilation slots.",
    originalPrice: 35.50,
    price: 36.57,
    images: [
      "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1611850698562-06b17c9b1f4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "alibaba",
    category: "Office",
    createdAt: "2025-04-09T15:05:00Z",
    inStock: true,
    specifications: {
      "Material": "Natural Bamboo",
      "Compatibility": "Up to 17-inch laptops",
      "Height Levels": "6",
      "Weight": "1.2 kg"
    }
  },
  {
    id: "10",
    title: "Yoga Mat with Alignment Lines",
    description: "Non-slip yoga mat with alignment markings to help with proper positioning. Made from eco-friendly TPE material.",
    originalPrice: 42.99,
    price: 44.28,
    images: [
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "alibaba",
    category: "Sports",
    createdAt: "2025-04-10T13:15:00Z",
    inStock: true,
    specifications: {
      "Material": "TPE",
      "Thickness": "6mm",
      "Dimensions": "72\" x 24\"",
      "Non-Slip": "Yes"
    }
  },
  {
    id: "11",
    title: "Smart LED Light Bulbs (4-Pack)",
    description: "WiFi-enabled LED bulbs that can be controlled via app or voice assistants. Change colors and set schedules for automated lighting.",
    originalPrice: 49.99,
    price: 51.49,
    images: [
      "https://images.unsplash.com/photo-1585503418537-88331351ad99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "amazon",
    category: "Smart Home",
    createdAt: "2025-04-11T10:50:00Z",
    inStock: true,
    specifications: {
      "Wattage": "9W",
      "Brightness": "800 lumens",
      "Color Temperature": "2700K-6500K",
      "Lifespan": "25,000 hours"
    }
  },
  {
    id: "12",
    title: "Portable External SSD (1TB)",
    description: "Ultra-fast external SSD with USB-C connection. Compact size and durable aluminum casing for on-the-go storage.",
    originalPrice: 159.99,
    price: 164.79,
    images: [
      "https://images.unsplash.com/photo-1627844570296-7498a2973843?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "amazon",
    category: "Electronics",
    createdAt: "2025-04-12T14:05:00Z",
    inStock: false,
    specifications: {
      "Capacity": "1TB",
      "Interface": "USB 3.2 Gen 2",
      "Read Speed": "Up to 1,050 MB/s",
      "Dimensions": "4.02\" x 2.11\" x 0.38\""
    }
  },
  {
    id: "13",
    title: "Sustainable Bamboo Cutting Board Set",
    description: "Set of 3 bamboo cutting boards in different sizes. Eco-friendly, durable, and naturally antimicrobial.",
    originalPrice: 32.99,
    price: 33.98,
    images: [
      "https://images.unsplash.com/photo-1594731804133-4f80d8f3ef95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1619725711220-1681e1271c0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "alibaba",
    category: "Kitchen",
    createdAt: "2025-04-13T09:30:00Z",
    inStock: true,
    specifications: {
      "Material": "100% Bamboo",
      "Sizes": "Small, Medium, Large",
      "Thickness": "0.75 inches",
      "Care": "Hand wash only"
    }
  },
  {
    id: "14",
    title: "Digital Kitchen Scale",
    description: "Precise digital scale for cooking and baking. Measures in grams, ounces, pounds, and milliliters with a capacity of 11 pounds.",
    originalPrice: 19.99,
    price: 20.59,
    images: [
      "https://images.unsplash.com/photo-1545231551-5babbac96b5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "alibaba",
    category: "Kitchen",
    createdAt: "2025-04-14T11:20:00Z",
    inStock: true,
    specifications: {
      "Capacity": "5kg/11lbs",
      "Precision": "1g/0.1oz",
      "Power": "2 AAA batteries",
      "Display": "LCD"
    }
  },
  {
    id: "15",
    title: "Ceramic Plant Pots (Set of 3)",
    description: "Minimalist ceramic plant pots in varying sizes with bamboo trays. Perfect for succulents, herbs, and small houseplants.",
    originalPrice: 28.50,
    price: 29.36,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1528699633788-424224dc89b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "alibaba",
    category: "Home",
    createdAt: "2025-04-15T16:40:00Z",
    inStock: true,
    specifications: {
      "Material": "Ceramic with bamboo base",
      "Sizes": "Small, Medium, Large",
      "Drainage": "Holes with removable plug",
      "Colors": "White, Gray, Beige"
    }
  },
  {
    id: "16",
    title: "Wireless Gaming Mouse",
    description: "Ergonomic gaming mouse with programmable buttons and RGB lighting. Ultra-fast response time and long battery life.",
    originalPrice: 79.99,
    price: 82.39,
    images: [
      "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1586349906319-43f4e02246b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    source: "amazon",
    category: "Gaming",
    createdAt: "2025-04-16T13:25:00Z",
    inStock: true,
    specifications: {
      "DPI": "Up to 16,000",
      "Buttons": "6 programmable",
      "Battery Life": "Up to 60 hours",
      "Weight": "92g"
    }
  }
];
