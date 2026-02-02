"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Homepage = () => {
  return (
    <motion.div
      className="h-full overflow-hidden"
      initial={{ y: "-200vh"}}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="h-full flex flex-col md:flex-row px-4 m:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* Image */}
        <div className=" relative h-1/2 w-full md:h-full md:w-1/2  ">
          <Image
            src="/me_animated.png"
            fill
            className="object-contain"
            alt="potrait"
          />
        </div>

        {/* Text container */}
        <div className="h-1/2 flex flex-col gap-6 items-center justify-center md:h-full md:w-1/2 md:items-start">
          <h1 className="text-3xl lg:text-5xl font-semibold">
            Full-stack developer crafting real-world products
          </h1>
          <p className="text-sm font-medium lg:text-lg">
            Welcome to my digital space, where I build real-world web
            applications from concept to deployment. I work across the full
            stack to create scalable, high-performance products with clean
            architecture and user-focused design.
          </p>
          {/* buttons */}
          <div className="flex gap-4 text-sm ">
            <button className="bg-black text-white rounded-md shadow-lg px-2 py-1 hover:bg-white hover:text-black border border-gray-500 duration-300 transition">
              View My Work
            </button>
            <button className="border border-gray-500 rounded-md shadow-lg px-2 py-1 hover:bg-black hover:text-white duration-300 transition">
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Homepage;
