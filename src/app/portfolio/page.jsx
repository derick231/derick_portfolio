"use client";
import { ScrollContext } from "@/components/ScrollContext";
import { useTransform } from "framer-motion";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useRef } from "react";

const items = [
  {
    id: 1,
    color: "from-red-800 to-blue-800",
    title: "Task Management System",
    desc: "A full-stack task management system built with React, Node.js, and MongoDB. It features task creation, editing, deletion, and status tracking.",
    img: "https://images.pexels.com/photos/6804091/pexels-photo-6804091.jpeg",
  },
  {
    id: 2,
    color: "from-blue-800 to-gray-800",
    title: "Next.js Ecommerce Website",
    desc: "A fully functional e-commerce website built with Next.js, featuring product listings, shopping cart, and secure checkout.",
    img: "https://images.pexels.com/photos/29502370/pexels-photo-29502370.jpeg",
  },
  {
    id: 3,
    color: "from-gray-800 to-purple-800",
    title: "React Native Movie App",
    desc: "A mobile application built with React Native that allows users to browse and search for movies. It features a modern UI, smooth animations, and offline support.",
    img: "https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg"
  },
  {
    id: 4,
    color: "from-purple-800 to-red-800",
    title: "Bookstore",
    desc: "A fully functional bookstore website built with React, Node.js, and MongoDB. It features book listings, shopping cart, and secure checkout.",
    img: "https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg",
  },
];

const PortfolioPage = () => {
  const ref = useRef();
  const containerRef = useRef();
  const scrollContainer = useContext(ScrollContext);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.1, 1], ["0%", "-80%"]);

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="flex justify-end ">
        {/* <div className="fixed top-96 right-5 lg:right-10 bg-white z-50 shadow-lg w-10 h-10 lg:w-20 lg:h-20 rounded-full flex items-center justify-center">
          <Link href="/portfolio">
            <motion.svg
              animate={{ y: "-15px" }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              fill="#000000"
              className="w-4 h-4 lg:w-[30px] lg:h-[30px]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.293,1.293a1,1,0,0,1,1.414,0l5,5a1,1,0,0,1-1.414,1.414L13,4.414V22a1,1,0,0,1-2,0V4.414L7.707,7.707A1,1,0,0,1,6.293,6.293Z" />
            </motion.svg>
          </Link>
        </div> */}
      </div>
      <div className="h-[600vh] xl:h-[800vh] relative" ref={ref}>
        <div className="  h-[calc(100vh-6rem)]  mb-10 w-screen flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50px" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="mt-10"
          >
            <div className="">
              <Image
                src="/working.svg"
                width={300}
                height={300}
                alt="works"
              />
            </div>
          </motion.div>
          <div className="flex gap-2 items-center justify-center">
            <h1 className=" text-5xl text-center font-light">
              My Works
            </h1>
            <motion.svg
              initial={{ opacity: 0.5, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
              width="60px"
              height="60px"
              viewBox="0 0 72 72"
              id="emoji"
              xmlns="http://www.w3.org/2000/svg"
              // className="w-16 h-16 lg:w-24 lg:h-24"
            >
              <g id="color">
                <path
                  fill="#D0CFCE"
                  stroke="none"
                  d="M37.2971,16.7728h-2.472c-5.8763,0-10.6842,4.8079-10.6842,10.6842v16.9332 c0,5.8763,4.8079,10.6842,10.6842,10.6842h2.472c5.8763,0,10.6842-4.8079,10.6842-10.6842V27.457 C47.9813,21.5807,43.1734,16.7728,37.2971,16.7728z"
                />
                <path
                  fill="#3F3F3F"
                  stroke="none"
                  d="M36.0611,22.1118L36.0611,22.1118c-1.1405,0-2.0737,0.9332-2.0737,2.0737v5.8343 c0,1.1405,0.9332,2.0737,2.0737,2.0737h0c1.1405,0,2.0737-0.9332,2.0737-2.0737v-5.8343 C38.1348,23.045,37.2016,22.1118,36.0611,22.1118z"
                />
                <path
                  fill="#9B9B9A"
                  stroke="none"
                  d="M35.1358,18.1769c3.0267,1.2986,5.904,3.1629,6.2392,7.8732c0.3881,5.455-1.6305,15.6686-2.2795,20.8566 c-0.4538,3.6277-2.248,5.3071-4.6299,7.2111c-1.2013,0.9603,5.2663,0.8427,7.9297-0.7139 c2.2852-1.3355,4.4994-3.6288,4.5264-2.9039l0.3229-25.8045c0,0-0.9367-6.9377-8.5654-6.9401 C38.6792,17.7555,31.0272,17.3615,35.1358,18.1769z"
                />
              </g>
              <g id="hair" />
              <g id="skin" />
              <g id="skin-shadow" />
              <g id="line">
                <path
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M38.8294,54.5013h-5.5367c-4.9688,0-9.0342-4.0654-9.0342-9.0342V26.38c0-4.9688,4.0654-9.0342,9.0342-9.0342h5.5367 c4.9688,0,9.0342,4.0654,9.0342,9.0342v19.0871C47.8636,50.4359,43.7982,54.5013,38.8294,54.5013z"
                />
                <path
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M36.1449,32.1553h-0.1677c-1.1161,0-2.0294-0.9132-2.0294-2.0294v-6.0465c0-1.1161,0.9132-2.0294,2.0294-2.0294h0.1677 c1.1161,0,2.0294,0.9132,2.0294,2.0294v6.0465C38.1743,31.2421,37.2611,32.1553,36.1449,32.1553z"
                />
                <line
                  x1="41.3312"
                  x2="36.1155"
                  y1="60.0161"
                  y2="65.2318"
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <line
                  x1="30.8574"
                  x2="36.073"
                  y1="60.0161"
                  y2="65.2318"
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <line
                  x1="30.8574"
                  x2="36.073"
                  y1="11.892"
                  y2="6.6763"
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <line
                  x1="41.3312"
                  x2="36.1155"
                  y1="11.892"
                  y2="6.6763"
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
              </g>
            </motion.svg>
          </div>
        </div>
        <div className=" sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex" ref={containerRef}>
            <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-800 to-red-800" />
            {items.map((item) => (
              <div
                key={item.id}
                className={`h-screen w-screen flex items-center justify-center flex-none bg-gradient-to-r ${item.color}`}
              >
                <div className="flex flex-col text-white gap-2 md:gap-4 lg:gap-6 max-h-[85vh] justify-center items-center p-4">
                  <h1 className="text-xl font-bold md:text-3xl lg:text-5xl xl:text-7xl 2xl:text-8xl text-center">
                    {item.title}
                  </h1>
                  <div className="relative w-80 h-48 md:w-96 md:h-64 lg:w-[45vw] lg:h-[40vh] xl:w-[45vw] xl:h-[40vh] 2xl:w-[50vw] 2xl:h-[50vh] max-h-[40vh] lg:max-h-[50vh]">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="w-80 md:w-96 lg:w-[45vw] xl:w-[45vw] 2xl:w-[50vw] lg:text-lg 2xl:text-xl text-center">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="h-screen w-screen flex flex-col  justify-center items-center">
        <h1 className="  text-center text-4xl">
          See My Resume
        </h1>
        <div className="relative">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            viewBox="0 0 300 300"
            className="w-[300px] h-[300px] "
          >
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="#000">
              <textPath xlinkHref="#circlePath" className="text-xl">
                Full stack Designer and Developer
              </textPath>
            </text>
          </motion.svg>
          <a
            href="/derick_mern_resume.pdf"
            download
            className="w-24 h-24 absolute text-sm top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex flex-col items-center justify-center gap-2 p-2"
          >
            Download
            <svg
              width="200px"
              height="20px"
              viewBox="0 0 24 24"
              fill=""
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V12.9726L14.4306 11.0119C14.7001 10.6974 15.1736 10.661 15.4881 10.9306C15.8026 11.2001 15.839 11.6736 15.5694 11.9881L12.5694 15.4881C12.427 15.6543 12.2189 15.75 12 15.75C11.7811 15.75 11.573 15.6543 11.4306 15.4881L8.43056 11.9881C8.16099 11.6736 8.19741 11.2001 8.51191 10.9306C8.8264 10.661 9.29988 10.6974 9.56944 11.0119L11.25 12.9726V2C11.25 1.58579 11.5858 1.25 12 1.25ZM6.99583 8.25196C7.41003 8.24966 7.74768 8.58357 7.74999 8.99778C7.7523 9.41199 7.41838 9.74964 7.00418 9.75194C5.91068 9.75803 5.1356 9.78643 4.54735 9.89448C3.98054 9.99859 3.65246 10.1658 3.40901 10.4092C3.13225 10.686 2.9518 11.0746 2.85315 11.8083C2.75159 12.5637 2.75 13.5648 2.75 15.0002V16.0002C2.75 17.4356 2.75159 18.4367 2.85315 19.1921C2.9518 19.9259 3.13225 20.3144 3.40901 20.5912C3.68577 20.868 4.07435 21.0484 4.80812 21.1471C5.56347 21.2486 6.56458 21.2502 8 21.2502H16C17.4354 21.2502 18.4365 21.2486 19.1919 21.1471C19.9257 21.0484 20.3142 20.868 20.591 20.5912C20.8678 20.3144 21.0482 19.9259 21.1469 19.1921C21.2484 18.4367 21.25 17.4356 21.25 16.0002V15.0002C21.25 13.5648 21.2484 12.5637 21.1469 11.8083C21.0482 11.0746 20.8678 10.686 20.591 10.4092C20.3475 10.1658 20.0195 9.99859 19.4527 9.89448C18.8644 9.78643 18.0893 9.75803 16.9958 9.75194C16.5816 9.74964 16.2477 9.41199 16.25 8.99778C16.2523 8.58357 16.59 8.24966 17.0042 8.25196C18.0857 8.25799 18.9871 8.28387 19.7236 8.41916C20.4816 8.55839 21.1267 8.82364 21.6517 9.34857C22.2536 9.95048 22.5125 10.7084 22.6335 11.6085C22.75 12.4754 22.75 13.5778 22.75 14.9453V16.0551C22.75 17.4227 22.75 18.525 22.6335 19.392C22.5125 20.2921 22.2536 21.0499 21.6517 21.6519C21.0497 22.2538 20.2919 22.5127 19.3918 22.6337C18.5248 22.7503 17.4225 22.7502 16.0549 22.7502H7.94513C6.57754 22.7502 5.47522 22.7503 4.60825 22.6337C3.70814 22.5127 2.95027 22.2538 2.34835 21.6519C1.74643 21.0499 1.48754 20.2921 1.36652 19.392C1.24996 18.525 1.24998 17.4227 1.25 16.0551V14.9453C1.24998 13.5778 1.24996 12.4754 1.36652 11.6085C1.48754 10.7084 1.74643 9.95048 2.34835 9.34857C2.87328 8.82363 3.51835 8.55839 4.27635 8.41916C5.01291 8.28387 5.9143 8.25798 6.99583 8.25196Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
