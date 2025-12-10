import React from "react";
import { motion } from "framer-motion";

export default function CatPaw({ state = "idle", onAnimationComplete }) {
  const pawVariants = {
    idle: {
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        x: { repeat: Infinity, repeatType: "reverse", duration: 1.5, ease: "easeInOut" },
        y: { repeat: Infinity, repeatType: "reverse", duration: 2, ease: "easeInOut" },
        rotate: { repeat: Infinity, repeatType: "reverse", duration: 2.5, ease: "easeInOut" }
      }
    },
    extend: {
      x: 80,
      y: -40,
      rotate: -10,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    },
    holding: {
      x: 80,
      y: -40,
      rotate: -5,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const yarnVariants = {
    hidden: { y: -200, opacity: 0, scale: 0.5 },
    dropping: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 360,
      transition: { type: "spring", stiffness: 200, damping: 12 }
    },
    bounce: {
      y: [-5, 0, -3, 0],
      transition: { duration: 0.6, times: [0, 0.3, 0.6, 1] }
    }
  };

  const activeVariant = state === "holding" ? "holding" : state === "extend" ? "extend" : "idle";

  return (
    <div className="fixed bottom-0 left-0 pointer-events-none z-20">
      <motion.div variants={pawVariants} animate={activeVariant} className="relative">

        <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
          <path
            d="M100 20 C60 20, 35 55, 40 90 C20 110, 25 150, 55 165 C70 180, 130 180, 145 165 C175 150, 180 110, 160 90 C165 55, 140 20, 100 20"
            fill="#FFFFFF"
            stroke="#E8E8E8"
            strokeWidth="4"
          />
          <motion.path
            d="M100 115 C75 115, 58 135, 60 155 C62 178, 138 178, 140 155 C142 135, 125 115, 100 115"
            fill="#FFB5D8"
            animate={{ scale: state === "idle" ? [1, 1.03, 1] : 1 }}
            transform="translate(0 0)"
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <ellipse cx="65" cy="80" rx="22" ry="26" fill="#FFD4E8" />
          <ellipse cx="100" cy="70" rx="20" ry="24" fill="#FFD4E8" />
          <ellipse cx="135" cy="80" rx="22" ry="26" fill="#FFD4E8" />
          <circle cx="88" cy="105" r="6" fill="white" opacity="0.45" />
          <circle cx="120" cy="105" r="6" fill="white" opacity="0.45" />
        </svg>

        {(state === "extend" || state === "holding") && (
          <motion.div
            className="absolute top-8 left-16"
            variants={yarnVariants}
            initial="hidden"
            animate={state === "holding" ? ["dropping", "bounce"] : "hidden"}
            onAnimationComplete={onAnimationComplete}
          >
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
              <circle cx="25" cy="25" r="20" fill="#A78BFA" />
              <path d="M 15 15 Q 25 20, 35 15" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
              <path d="M 12 25 Q 25 22, 38 25" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
              <path d="M 15 35 Q 25 30, 35 35" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
              <circle cx="18" cy="18" r="6" fill="white" opacity="0.3" />
            </svg>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
