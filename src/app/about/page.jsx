"use client";

import Brain from "@/components/Brain";
import { ScrollContext } from "@/components/ScrollContext";
import { useInView } from "framer-motion";
import { useScroll, motion } from "framer-motion";
import { useContext, useRef } from "react";

const skills = [
  { id: 1, title: "Javascript" },
  { id: 2, title: "React" },
  { id: 3, title: "Mongodb" },
  { id: 4, title: "Node" },
  { id: 5, title: "Express" },
  { id: 6, title: "NextJs" },
  { id: 7, title: "React Native" },
  { id: 8, title: "Postgres" },
];

const skillsContainerVariants = {
  hidden: {
    x: -300,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const skillItemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      // ease: "easeOut",
    },
  },
};

const AboutPage = () => {
  const containerRef = useRef();
  const scrollContainer = useContext(ScrollContext);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer,
  });

  const skillRef = useRef();
  const isSkillInView = useInView(skillRef, {
    margin: "-100px",
    // root: scrollContainer,
  });

  const experienceRef = useRef();
  const isExperienceInView = useInView(experienceRef, {
    margin: "-100px",
  });

  return (
    <motion.div
      className=""
      initial={{ y: "-200vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* containter */}
      <div className="lg:flex" ref={containerRef}>
        {/* text container */}
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 xl:p-48 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-54 lg:w-2/3 xl:w-1/2">
          {/* Biography container */}
          <div className="flex flex-col gap-12 justify-center">
            <h1 className="uppercase text-2xl font-bold">Biography</h1>
            <p className="text-lg ">
              Hi I am Derick, I’m a full-stack developer working with the MERN
              stack, Next.js, and React Native. I’m passionate about building
              modern applications that balance performance, usability, and clean
              design.
            </p>
            <span className="italic ">
              - Building clean, scalable solutions with purpose.
            </span>
            {/* signature */}
            <div className="self-end">
              <svg
                width="150"
                height="163"
                viewBox="0 0 285 163"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M80.0003 32.3892C75.3803 42.9492 66.8953 58.6192 55.9128 75.6867C44.4089 93.5644 26.5803 97.3592 13.8753 97.7292C11.1453 97.8087 8.88028 96.5692 7.03028 94.9092C5.18028 93.2492 3.86028 90.6092 3.59278 88.6717C3.32528 86.7342 4.15028 85.5792 5.56528 84.4892C6.98028 83.3992 8.96028 82.4092 10.8053 82.0642C12.6503 81.7192 14.3003 82.0492 25.7103 86.9217C37.1203 91.7942 58.2403 101.199 73.5753 107.199C108.208 120.75 114.49 118.224 116.485 117.479C118.864 116.591 122.965 108.784 129.37 96.8942C135.179 86.1118 137.495 76.9242 138.163 69.9417C138.827 62.9908 136.185 53.9442 132.198 43.7142C128.601 34.4871 123.02 29.0742 117.463 25.4992C109.61 20.4476 98.2203 19.3992 87.8278 17.8992C78.0188 16.4834 65.7403 18.2142 53.0903 20.1242C44.1747 21.4703 37.7003 25.7042 30.1428 31.0117C19.729 38.3251 12.8603 49.1792 8.11778 57.9892C3.46369 66.6349 2.50528 78.1592 2.25028 90.5467C2.00421 102.5 6.81028 111.194 12.4553 116.847C19.1624 123.563 29.6153 125.884 41.6553 126.139C48.5829 126.286 57.1603 124.909 68.3453 122.254C79.5303 119.599 93.0603 115.309 103.825 111.284C114.59 107.259 122.18 103.629 130.215 98.2942C138.25 92.9592 146.5 86.0292 153.143 78.2517C166.014 63.1812 171.315 48.2742 174.478 37.7192C177.71 26.9314 177.335 18.5792 176.838 14.4192C176.449 11.1661 173.85 8.23916 169.288 5.32666C156.853 -2.61118 141.57 2.21916 133.108 5.28916C129.133 6.73124 126.685 14.5092 123.523 24.6442C119.953 36.0837 120.665 47.1792 121.823 58.8767C123.597 76.8116 126.335 90.5242 125.343 96.9242C123.226 110.576 109.205 115.204 103.62 116.552C101.822 116.986 102.16 113.279 103.32 110.762C105.673 105.656 110.315 103.229 114.055 102.229C121.235 100.31 128.13 105.369 140.95 110.289C143.909 111.425 145.96 111.549 148.053 110.894C156.343 108.299 158.81 102.569 174.018 101.642C187.497 100.82 197.29 92.9292 212.84 90.4767C226.074 88.3895 237.795 87.0692 244.288 84.1617C249.209 81.958 251.155 76.4142 253.318 68.9517C260.137 45.42 255.01 31.2692 252.438 24.9292C251.028 21.4553 240.56 35.9542 229.663 55.4942C224.454 64.8335 220.91 73.5492 216.15 89.5192C211.39 105.489 205.78 128.589 202.808 142.057C199.835 155.524 199.67 158.659 199.5 161.389"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M1.00027 145.389C1.99027 145.059 3.49027 144.229 33.6178 137.454C62.6646 130.922 120.01 119.789 150.413 113.757C180.815 107.724 182.63 107.559 199.57 104.257C216.51 100.954 248.52 94.5192 283.5 87.3892"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            {/* scroll */}

            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="80"
              height="50"
            >
              <rect width="256" height="256" fill="none" />
              <rect
                x="56"
                y="24"
                width="144"
                height="208"
                rx="56"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <polyline
                points="152 88 128 64 104 88"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <polyline
                points="152 168 128 192 104 168"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="128"
                y1="64"
                x2="128"
                y2="192"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
            </motion.svg>
          </div>
         
          {/* skills container */}
          <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
            <motion.h1
              initial={{ x: -300 }}
              animate={isSkillInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="uppercase text-2xl font-bold"
            >
              Skills
            </motion.h1>

            {/* skills list */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={skillsContainerVariants}
              initial="hidden"
              animate={isSkillInView ? "visible" : "hidden"}
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  variants={skillItemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="p-2 rounded-md bg-black text-white hover:bg-white hover:text-black transition-colors"
                >
                  {skill.title}
                </motion.div>
              ))}
            </motion.div>
             <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="80"
              height="50"
            >
              <rect width="256" height="256" fill="none" />
              <rect
                x="56"
                y="24"
                width="144"
                height="208"
                rx="56"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <polyline
                points="152 88 128 64 104 88"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <polyline
                points="152 168 128 192 104 168"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="128"
                y1="64"
                x2="128"
                y2="192"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
            </motion.svg>
          </div>

          {/* Experience container */}
          <div
            className="flex flex-col gap-12 justify-center"
            ref={experienceRef}
          >
            <motion.h1
              initial={{ x: -300 }}
              animate={isExperienceInView ? { x: "0" } : {}}
              transition={{ delay: 0.2 }}
              className="uppercase text-2xl font-bold"
            >
              Experience
            </motion.h1>
            <div>
              {/* Experience List */}
              <motion.div
                initial={{ x: "-300px" }}
                animate={isExperienceInView ? { x: "0" } : {}}
                transition={{ delay: 0.2 }}
                className=""
              >
                {/* Experience List Items */}
                <div className="flex justify-between h-48 ">
                  {/* left */}
                  <div className="w-1/3 ">
                    <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg shadow-lg w-fit">
                      Junior MERN developer
                    </div>
                    <div className="italic py-3 text-sm">
                      Current Position better than before
                    </div>
                    <div className="pb-3 text-sm text-red-400 font-semibold">
                      2025 - Present
                    </div>
                    <div className="bg-white p-1 w-max text-sm rounded-lg shadow-lg">
                      Legacy IT
                    </div>
                  </div>
                  {/* center */}
                  <div className="w-1/6 flex item-center justify-center">
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      <div className="w-5 h-5 absolute -left-2 ring-4 ring-red-400 bg-white rounded-full"></div>
                    </div>
                  </div>
                  {/* right */}
                  <div className="w-1/3"></div>
                </div>
                {/* Experience List Items */}
                <div className="flex justify-between h-48">
                  {/* left */}
                  <div className="w-1/3 "></div>
                  {/* center */}
                  <div className="w-1/6 flex items-center justify-center">
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      <div className="w-5 h-5 absolute -left-2 ring-4 ring-red-400 bg-white rounded-full"></div>
                    </div>
                  </div>
                  {/* right */}
                  <div className="w-1/3">
                    <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg shadow-lg w-max">
                      MERN Intern
                    </div>
                    <div className="italic py-3 text-sm">First Internship</div>
                    <div className="pb-3 text-sm text-red-400 font-semibold">
                      2023
                    </div>
                    <div className="bg-white p-1 w-max text-sm rounded-lg shadow-lg">
                      Evolve IT Hub
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        {/* svg container */}
        <div className="hidden lg:block sticky top-0 z-30 lg:w-1/3 xl:w-1/2 h-screen">
          <Brain scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
