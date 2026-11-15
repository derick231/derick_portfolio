import "./globals.css";
import TranstitionProvider from "@/components/TranstitionProvider";

export const metadata = {
  title: "Derick Subedi — Creative Developer & MERN Specialist",
  description: "Senior Creative Frontend Developer & MERN Stack Specialist crafting immersive digital experiences.",
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
