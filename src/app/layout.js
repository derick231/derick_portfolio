import { Inter } from "next/font/google";
import "./globals.css";
import TranstitionProvider from "@/components/TranstitionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Derick Subedi",
  description: "Full-stack developer crafting real-world products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TranstitionProvider>{children}</TranstitionProvider>
      </body>
    </html>
  );
}
