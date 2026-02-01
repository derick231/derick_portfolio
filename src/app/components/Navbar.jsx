"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/portfolio", title: "Portfolio" },
  { url: "/contact", title: "Contact" },
];

const socialLinks = [
  {
    img: "/github.png",
    url: "https://github.com/derick231",
    title: "github",
  },
  {
    img: "/linkedin.png",
    url: "https://www.linkedin.com/in/derick-subedi-9149b1358/",
    title: "linkedin",
  },
  {
    img: "/instagram.png",
    url: "https://www.instagram.com/kancha_derick/",
    title: "instagram",
  },
  {
    img: "/pinterest.png",
    url: "https://www.pinterest.com/salvationderick/",
    title: "pinterest",
  },
];
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  return (
    <div className="flex items-center h-full justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
      {/* Desktop menu */}
      <div className="hidden md:flex gap-4 w-1/3 ">
        {links.map((link) => (
          <Link
            className={`rounded p-1 ${pathName === link.url && "bg-black text-white"}`}
            href={link.url}
            key={link.title}
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* logo */}
      <Link
        href="/"
        className="flex text-sm font-semibold md:hidden lg:flex w-1/3 lg:justify-center "
      >
        <span className="flex items-center justify-center bg-black text-white p-1 rounded-s-md">
          Derick
        </span>
        <span className="felx items-center justify-center bg-white text-black p-1 rounded-e-md">
          Subedi
        </span>
      </Link>

      {/* social icons */}
      <div className="hidden md:flex gap-4 w-1/3 justify-end">
        {socialLinks.map((item) => (
          <Link href={item.url} key={item.title}>
            <Image src={item.img} alt={item.title} width={24} height={24} />
          </Link>
        ))}
      </div>

      {/* Responsive Menu */}

      <div className="md:hidden">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-col gap-[6px] z-50 relative"
        >
          <div className="w-8 h-1 rounded bg-black"></div>
          <div className="w-8 h-1 rounded bg-black"></div>
          <div className="w-8 h-1 rounded bg-black"></div>
        </button>
        {open && (
          <div className="flex flex-col h-screen bg-black text-white text-4xl justify-center w-full absolute top-0 left-0 items-center gap-4">
            {links.map((link) => (
              <Link href={link.url} key={link.title}>
                {link.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
