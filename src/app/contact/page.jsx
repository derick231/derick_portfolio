"use client";
import { motion } from "framer-motion";

const ContactPage = () => {
  const text = "Say Hello ";
  return (
    <motion.div
      className="h-full overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="h-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 ">
        {/* Text Container */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex items-center justify-center text-6xl">
          <div>
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
           <span>😊</span>
        </div>
        {/* Form Container */}
        <div className="h-1/2 lg:h-full lg:w-1/2"></div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
