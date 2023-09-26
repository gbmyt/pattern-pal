import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Grid from "@/components/Grid";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pattern Pal - A Fiber Artist's Best Friend",
  description: "Create custom pixel grids, save and share them with friends!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
