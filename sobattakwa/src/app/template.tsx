"use client";

import { motion } from "framer-motion";

export default function Transition({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
