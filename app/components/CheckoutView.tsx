import { CartItemWithDetails } from "../hooks/useCheckoutLogic";
import { CreditCard, Calendar, Lock, Zap, ArrowLeft, Truck, Loader2, XCircle } from "lucide-react";

interface CheckoutProps {
  cartTotal: number;
  cartItems: CartItemWithDetails[];
  status: string;
  errorMessage: string;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardHolder: string;
  setCardHolder: (val: string) => void;
  expiry: string;
  setExpiry: (val: string) => void;
  cvv: string;
  setCvv: (val: string) => void;
  formatCardNumber: (val: string) => string;
  formatExpiry: (val: string) => string;
  cardType: string;
}

export const CheckoutView: React.FC<CheckoutProps> = ({
  cartTotal, cartItems, status, errorMessage, onBack, onSubmit,
  cardNumber, setCardNumber, cardHolder, setCardHolder, expiry, setExpiry, cvv, setCvv,
  formatCardNumber, formatExpiry, cardType
}) => {

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value.replace(/\s/g, '')));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiry(formatExpiry(e.target.value));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <button type="button" onClick={onBack} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center transition bg-indigo-50 p-2 rounded-full">
          <ArrowLeft className="w-4 h-4 mr-1"/> Back to Products
        </button>
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <Truck className="w-6 h-6 mr-2 text-indigo-500" />
          Secure Checkout
        </h2>
      </div>

      {/* Cart Summary */}
      <div className="p-4 bg-indigo-50 rounded-xl shadow-inner border border-indigo-200">
        <h3 className="text-lg font-bold text-indigo-800 mb-2 border-b border-indigo-200 pb-1">Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between text-sm py-1">
            <span className="text-gray-600">{item.name} (x{item.quantity})</span>
            <span className="font-semibold text-gray-700">${item.subtotal.toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-2 mt-2 border-t border-indigo-300">
          <span className="text-xl font-bold text-indigo-900">Total Due:</span>
          <span className="text-3xl font-black text-indigo-900">${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Card Inputs */}
      <div>
        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input id="card-number" type="text" value={cardNumber} onChange={handleCardNumberChange} placeholder="XXXX XXXX XXXX XXXX" maxLength={19} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500" required disabled={status !== 'idle'}/>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-indigo-600">{cardType}</span>
        </div>
      </div>

      <div>
        <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
        <input id="card-holder" type="text" value={cardHolder} onChange={e => setCardHolder(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500" required disabled={status !== 'idle'}/>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input id="expiry" type="text" value={expiry} onChange={handleExpiryChange} placeholder="MM/YY" maxLength={5} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500" required disabled={status !== 'idle'}/>
          </div>
        </div>
        <div className="w-1/2">
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
            <input id="cvv" type="password" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,'').substring(0,3))} placeholder="123" maxLength={3} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500" required disabled={status !== 'idle'}/>
          </div>
        </div>
      </div>

      <button type="submit" className={`w-full flex justify-center items-center py-3 px-4 text-lg font-medium rounded-xl shadow-lg transition duration-200 ${status==='processing' ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`} disabled={status !== 'idle' || cartTotal <= 0}>
        {status==='processing' ? <><Loader2 className="animate-spin mr-2 h-5 w-5"/> Processing...</> : <><Zap className="h-5 w-5 mr-2"/> Complete Order ${cartTotal.toFixed(2)}</>}
      </button>

      {status==='error' && errorMessage && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center">
          <XCircle className="h-5 w-5 mr-2"/>
          <p className="text-sm font-semibold">{errorMessage}</p>
        </div>
      )}
    </form>
  );
};
