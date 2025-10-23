import { StatusType, CartItemWithDetails } from "../hooks/useCheckoutLogic";
import { Loader2, CheckCircle } from "lucide-react";

interface StatusViewProps {
  status: StatusType;
  transactionAmount: number;
  onNewOrder: () => void;
}

export const StatusView: React.FC<StatusViewProps> = ({ status, transactionAmount, onNewOrder }) => {
  if (status === "processing") return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center bg-white rounded-3xl shadow-2xl">
      <Loader2 className="w-16 h-16 text-indigo-500 animate-spin"/>
      <h2 className="text-2xl font-bold text-gray-800">Processing Payment...</h2>
      <p className="text-gray-500">Please wait while your transaction is confirmed securely.</p>
    </div>
  );

  if (status === "success") return (
    <div className="flex flex-col items-center p-6 space-y-8 text-center bg-white rounded-3xl shadow-2xl">
      <div className="p-4 bg-green-100 rounded-full shadow-lg">
        <CheckCircle className="w-12 h-12 text-green-600 stroke-2 animate-bounce-slow"/>
      </div>
      <h2 className="text-3xl font-extrabold text-gray-800">Payment Successful!</h2>
      <div className="w-full space-y-3 p-4 border border-green-200 bg-green-50 rounded-xl">
        <p className="text-sm font-semibold text-green-700">Amount Paid:</p>
        <span className="text-4xl font-black text-green-800">${transactionAmount.toFixed(2)}</span>
      </div>
      <button onClick={onNewOrder} className="w-full mt-4 py-3 px-6 text-lg font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex justify-center">
        Make Another Purchase
      </button>
    </div>
  );

  return null;
};
