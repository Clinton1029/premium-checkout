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
    name: "Pro Suite License",
    price: 129.0,
    description: "Unlock advanced automation tools, AI analytics, and 1-year exclusive updates.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Starter Access",
    price: 49.0,
    description: "Perfect for individuals—includes essential core features for personal projects.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Elite Support Plan",
    price: 299.0,
    description: "24/7 VIP technical support with instant response and lifetime assistance.",
    image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=300&q=80",
  },
];
