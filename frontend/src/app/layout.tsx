import type { Metadata } from "next";
import "./globals.css";
import { Red_Hat_Display } from "next/font/google";
import { WalletProvider } from "@/context/WalletContext";
import { NotificationProvider } from "@/components/NotificationSystem";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const redHat = Red_Hat_Display({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "BitMarket.bet",
  description: "On-chain prediction markets for Bitcoin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${redHat.className} bg-[#09080A] text-white min-h-screen flex flex-col`}>
        <WalletProvider>
          <NotificationProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </NotificationProvider>
        </WalletProvider>
      </body>
    </html>
  );
} 