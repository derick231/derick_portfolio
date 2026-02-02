import { Inter } from "next/font/google";
import "./globals.css";
import TranstitionProvider from "@/components/TranstitionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Derick's Portfolio",
  description: "My Portfolio",
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
