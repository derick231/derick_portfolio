"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const text = "Say Hello ";
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setError(false)
    setSuccess(false)

    emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, form.current, {
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    }).then(
        () => {
          setSuccess(true)
          form.current.reset()
        },
        (error) => {
          setError(false)
        },
      );
  };

  return (
    <motion.div
      className="h-full overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="h-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 flex flex-col lg:flex-row">
        {/* Text Container */}
        <div className="h-1/3 lg:h-full lg:w-1/2 flex items-center justify-center text-6xl">
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
        <form
          ref={form}
          onSubmit={sendEmail}
          className="h-2/3 lg:h-full lg:w-1/2 flex flex-col justify-center gap-4 lg:gap-8 p-24 bg-red-50 rounded-xl text-xl"
        >
          <span>Dear Derick,</span>
          <textarea
            name="user_message"
            id=""
            rows={6}
            className="bg-transparent border-b-2 border-black resize-none outline-none"
          />
          <span>My Email Address is:</span>
          <input
            type="email"
            name="user_email"
            className="border-b-2 border-black bg-transparent outline-none"
          />
          <span>Regards</span>
          <button className=" bg-purple-200 px-4 py-3 rounded-full shadow-lg text-gray-600 font-semibold">
            Send
          </button>
          {success && (
            <span className="text-green-600">Message Sent Successfully!</span>
          )}
          {error && (
            <span className="text-red-600">Error sending message</span>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;
