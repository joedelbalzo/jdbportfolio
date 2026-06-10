import React from "react";
import { motion } from "framer-motion";

export const FadeComponent = ({ children }) => (
  <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
    {children}
  </motion.div>
);
