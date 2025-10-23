export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Premium Software License",
    price: 129.0,
    description: "Full feature set with 1 year of free updates.",
    image: "https://placehold.co/100x100/4F46E5/ffffff?text=PRO",
  },
  {
    id: 2,
    name: "Standard Software Access",
    price: 49.0,
    description: "Essential features for personal projects.",
    image: "https://placehold.co/100x100/818CF8/ffffff?text=STD",
  },
  {
    id: 3,
    name: "Lifetime Support Plan",
    price: 299.0,
    description: "Dedicated 24/7 priority support.",
    image: "https://placehold.co/100x100/10B981/ffffff?text=VIP",
  },
];
