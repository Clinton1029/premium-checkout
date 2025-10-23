import { useState, useEffect, useMemo, useCallback } from "react";
import { PRODUCTS, Product } from "../constants/products";

export type CartItem = {
  id: number;
  quantity: number;
};

export type CartItemWithDetails = CartItem & Product & { subtotal: number };

export type CheckoutViewType = "product_list" | "checkout";

export type StatusType = "idle" | "processing" | "success" | "error";

export const useCheckoutLogic = (initialView: CheckoutViewType = "product_list") => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("ecom_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [view, setView] = useState<CheckoutViewType>(initialView);
  const [status, setStatus] = useState<StatusType>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("Jane Doe");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("ecom_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const getProductById = useCallback((id: number) => PRODUCTS.find(p => p.id === id), []);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [cart, getProductById]);

  const cartItemsWithDetails: CartItemWithDetails[] = useMemo(() => {
    return cart.map(item => {
      const product = getProductById(item.id);
      return {
        ...item,
        ...product!,
        subtotal: product ? product.price * item.quantity : 0,
      };
    });
  }, [cart, getProductById]);

  const cardType = useMemo(() => {
    const digits = cardNumber.replace(/\s/g, '');
    if (digits.startsWith('4')) return 'Visa';
    if (digits.startsWith('5')) return 'Mastercard';
    if (digits.startsWith('34') || digits.startsWith('37')) return 'Amex';
    return 'Generic';
  }, [cardNumber]);

  const handleBuyNow = useCallback((product: Product) => {
    setCart([{ id: product.id, quantity: 1 }]);
    setView("checkout");
  }, []);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 16);
    return cleaned.match(/.{1,4}/g)?.join(' ') ?? '';
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 4);
    if (cleaned.length >= 3) return `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
    return cleaned;
  };

  const validateInputs = () => {
    if (cartTotal <= 0) return "Cart is empty.";
    if (cardNumber.replace(/\s/g, '').length !== 16) return "Invalid card number.";
    const [month] = expiry.split('/');
    if (expiry.length !== 5 || !/^\d{2}\/\d{2}$/.test(expiry) || parseInt(month) < 1 || parseInt(month) > 12) {
      return "Invalid expiry date (MM/YY).";
    }
    if (cvv.length !== 3) return "Invalid CVV.";
    return null;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      setStatus("error");
      setTimeout(() => { setStatus("idle"); setErrorMessage(''); }, 3000);
      return;
    }

    setErrorMessage('');
    setStatus("processing");
    await new Promise(r => setTimeout(r, 2500));
    const success = Math.random() < 0.85;

    if (success) {
      setTransactionAmount(cartTotal);
      setStatus("success");
      setCart([]);
    } else {
      setStatus("error");
      setErrorMessage("Transaction failed.");
    }
  };

  return {
    view, setView, cartTotal, cartItemsWithDetails, status, setStatus, errorMessage,
    handleBuyNow, 
    cardNumber, setCardNumber, cardHolder, setCardHolder, expiry, setExpiry, cvv, setCvv,
    formatCardNumber, formatExpiry, cardType, handlePayment, transactionAmount
  };
};
