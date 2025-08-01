import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "../styles/globals.css";

const inter = Inter({subsets:["latin"]})

export const metadata: Metadata = {
  title: "ระบบขายหน้าร้าน",
  description: "Point of sale System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
