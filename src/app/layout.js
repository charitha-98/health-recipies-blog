import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata = { title: "NutriCraft | Healthy Meals" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-white text-slate-900 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}