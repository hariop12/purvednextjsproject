"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  show: boolean;
  onFinish?: () => void;
  durationMs?: number;
  logoSrc?: string;
};

export default function ArmouryIntro({
  show,
  onFinish,
  durationMs = 1400,
  logoSrc = "/logo2.png",
}: Props) {
  useEffect(() => {
    if (!show) return;

    const t = setTimeout(() => {
      onFinish?.();
    }, durationMs);

    return () => clearTimeout(t);
  }, [show, durationMs, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* ✅ Home page visible behind */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

          {/* ✅ Rotating Logo */}
          <motion.img
            src={logoSrc}
            alt="Loading Logo"
            draggable={false}
            className="relative w-[170px] h-[170px] sm:w-[210px] sm:h-[210px] md:w-[250px] md:h-[250px] object-contain select-none"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 360,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              rotate: { repeat: Infinity, duration: 1.1, ease: "linear" },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
