import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "E-Commerce Checkout Demo",
  description: "All-in-one Next.js 13 TypeScript checkout demo with TailwindCSS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 font-sans">
        {/* Optional: global nav */}
        <header className="w-full py-4 bg-white shadow-sm border-b border-gray-200 flex justify-center">
          <h1 className="text-2xl font-bold text-indigo-600">🛒 My Shop</h1>
        </header>

        <main className="flex justify-center items-start min-h-screen px-6 py-12">
          {children}
        </main>

        {/* Optional: global footer */}
        <footer className="w-full py-6 mt-12 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} My Shop. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
