"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const TransitionProvider = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} 
      className="w-screen h-screen bg-gradient-to-b from-blue-100 to-red-50 overflow-hidden"
      >
        
        {/* Top curtain */}
        <motion.div
          initial={{ height: "140vh" }}
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-screen bg-black z-40"
        />

        {/* Page name */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 m-auto w-fit h-fit text-white text-6xl z-50"
        >
          {pathname === "/" ? "Home" : pathname.substring(1)}
        </motion.div>

        {/* Bottom curtain */}
        <motion.div
          initial={{ height: "140vh" }}
          animate={{ height: "0vh" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="fixed bottom-0 left-0 w-screen bg-black z-30"
        />

        {/* Layout */}
        <div className="relative z-10 h-24">
          <Navbar />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative z-10 h-[calc(100vh-6rem)]"
        >
          {children}
        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
