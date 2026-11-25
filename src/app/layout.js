import "./globals.css";
import TranstitionProvider from "@/components/TranstitionProvider";

export const metadata = {
  title: "Derick Subedi — Full-Stack MERN Developer",
  description: "Derick Subedi — Full-Stack MERN Developer based in Kathmandu, Nepal. Working with React, Node.js, Express, MongoDB, and PostgreSQL.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#08080a] text-[#f4f4f5] antialiased selection:bg-white selection:text-black">
        <TranstitionProvider>{children}</TranstitionProvider>
      </body>
    </html>
  );
}
