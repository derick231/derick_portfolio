"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

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

const topVariants = {
  closed: {
    rotate: 0,
  },
  opened: {
    rotate: 45,
    backgroundColor: "rgb(255,255,255)",
  },
};
const centerVariants = {
  closed: {
    opacity: 1,
  },
  opened: {
    opacity: 0,
  },
};

const bottomVariants = {
  closed: {
    rotate: 0,
  },
  opened: {
    rotate: -45,
    backgroundColor: "rgb(255,255,255)",
  },
};

const listVariants = {
  closed: {
    x: "100vw",
  },
  opened: {
    x: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const listItemVariants = {
  closed: {
    x: -10,
    opacity: 0,
  },
  opened: {
    x: 0,
    opacity: 1,
  },
};

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
        {/* MENU BUTTON */}
        <button
          className="w-10 h-8 flex flex-col justify-between z-50 relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded origin-left"
          ></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded"
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded origin-left"
          ></motion.div>
        </button>
        {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            className="flex flex-col h-screen bg-black text-white text-4xl justify-center w-full absolute top-0 left-0 items-center gap-4 z-40"
          >
            {links.map((link) => (
              <motion.div key={link.title} variants={listItemVariants}>
                <Link href={link.url}>{link.title}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
