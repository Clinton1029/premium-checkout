import { Product } from "../constants/products";
import { Zap, ShoppingBag } from "lucide-react";

interface ProductListProps {
  products: Product[];
  onBuyNow: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onBuyNow }) => (
  <div className="space-y-8">
    <h2 className="text-4xl font-extrabold text-gray-800 flex items-center border-b pb-3 border-indigo-100">
      <ShoppingBag className="w-8 h-8 mr-3 text-indigo-600"/>
      Our Featured Products
    </h2>
    <div className="space-y-6">
      {products.map(product => (
        <div key={product.id} className="p-6 bg-white border-2 border-gray-100 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center hover:shadow-2xl hover:border-indigo-300 transition">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-20 h-20 rounded-lg mr-6 object-cover mb-4 sm:mb-0"
            onError={(e) => { e.currentTarget.src="https://placehold.co/100x100/cccccc/000000?text=Item"; }}
          />
          <div className="flex-1 min-w-0 sm:text-left text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-3">{product.description}</p>
          </div>
          <div className="flex flex-col items-center sm:items-end mt-4 sm:mt-0 ml-4">
            <span className="text-3xl font-black text-indigo-600 mb-2">${product.price.toFixed(2)}</span>
            <button
              onClick={() => onBuyNow(product)}
              className="py-3 px-6 w-full sm:w-auto bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition flex items-center justify-center"
            >
              <Zap className="w-4 h-4 mr-2"/> Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
    <p className="text-center text-xs text-gray-400 pt-4">Your selections are saved locally using localStorage.</p>
  </div>
);
