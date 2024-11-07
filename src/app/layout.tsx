import "./globals.css";
import styles from "./page.module.css";

import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { ProviderChakra } from "@/providers/ProviderChakra";
import { ProviderApollo } from "@/providers/ProviderApollo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Technical Challenge",
  description: "Created by Morteza(Morris) Hazrati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ProviderApollo>
          <ProviderChakra>
            <main className={styles.main}>{children}</main>
          </ProviderChakra>
        </ProviderApollo>
      </body>
    </html>
  );
}
