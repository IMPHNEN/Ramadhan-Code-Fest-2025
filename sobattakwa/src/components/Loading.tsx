"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingIslami = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Durasi loading 5 detik

    return () => clearTimeout(timer);
  }, []);

  return (
    isLoading && (
      <motion.div
        className="flex flex-col items-center justify-center h-screen "
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="relative w-16 h-16"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
        ></motion.div>
        <motion.h1
          className="mt-6 text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
        >
          بسم الله الرحمن الرحيم
        </motion.h1>
      </motion.div>
    )
  );
};

export default LoadingIslami;
