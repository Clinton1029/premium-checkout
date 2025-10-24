import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce Checkout Demo",
  description: "All-in-one Next.js 13 TypeScript checkout demo with TailwindCSS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 font-sans min-h-screen flex flex-col`}
      >
        {/* Premium Navbar */}
        <header className="w-full py-5 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 flex justify-center">
          <h1 className="text-2xl font-bold text-indigo-600 tracking-tight hover:text-indigo-700 transition duration-200">
            🛒 My Shop
          </h1>
        </header>

        {/* Main container */}
        <main className="flex-grow flex justify-center items-start px-6 py-12">
          <div className="w-full max-w-7xl">{children}</div>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 text-center text-gray-500 text-sm border-t border-gray-200 bg-white/70 backdrop-blur-md">
          &copy; {new Date().getFullYear()} My Shop. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
