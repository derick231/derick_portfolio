"use client";
import { motion } from "framer-motion";

const PortfolioPage = () => {
  return (
    <motion.div
      className="h-full overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      About
    </motion.div>
  );
};

export default PortfolioPage;
