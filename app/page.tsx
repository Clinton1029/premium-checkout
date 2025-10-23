"use client";

import React from "react";
import { PRODUCTS } from "./constants/products";
import { useCheckoutLogic } from "./hooks/useCheckoutLogic";
import { ProductList } from "./components/ProductList";
import { CheckoutView } from "./components/CheckoutView";
import { StatusView } from "./components/StatusView";

export default function HomePage() {
  const logic = useCheckoutLogic();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-12 flex justify-center items-start">
      <div className="w-full max-w-5xl">
        {logic.view === "product_list" && (
          <ProductList products={PRODUCTS} onBuyNow={logic.handleBuyNow}/>
        )}

        {logic.view === "checkout" && logic.status !== 'success' && (
          <CheckoutView
            cartTotal={logic.cartTotal}
            cartItems={logic.cartItemsWithDetails}
            status={logic.status}
            errorMessage={logic.errorMessage}
            onBack={() => logic.setView("product_list")}
            onSubmit={logic.handlePayment}
            cardNumber={logic.cardNumber}
            setCardNumber={logic.setCardNumber}
            cardHolder={logic.cardHolder}
            setCardHolder={logic.setCardHolder}
            expiry={logic.expiry}
            setExpiry={logic.setExpiry}
            cvv={logic.cvv}
            setCvv={logic.setCvv}
            formatCardNumber={logic.formatCardNumber}
            formatExpiry={logic.formatExpiry}
            cardType={logic.cardType}
          />
        )}

        {logic.status === 'success' && (
          <StatusView 
            status={logic.status} 
            transactionAmount={logic.transactionAmount} 
            onNewOrder={() => logic.setView("product_list")}
          />
        )}
      </div>
    </main>
  );
}
