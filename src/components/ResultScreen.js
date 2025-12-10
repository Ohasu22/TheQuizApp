import { motion } from "framer-motion";
import FlipCounter from "./FlipCounter";

export default function ResultScreen({ score, onRestart }) {
  const percentage = Math.round((score / 5) * 100);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#eef9fc] text-center px-4">
      
      {/* Top Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 px-4 py-2 bg-white text-gray-700 rounded-full shadow-sm border"
      >
        Keep Learning!
      </motion.button>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl md:text-3xl font-semibold text-[#0f4c63]"
      >
        Your Final Score is
      </motion.h1>

      {/* Flip Counter */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 mb-10"
      >
        <FlipCounter value={percentage} />
      </motion.div>

      {/* Restart Button */}
      <motion.button
        onClick={onRestart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-[#d7f1ff] text-[#0a3d52] rounded-full shadow-sm border border-[#b5e4ff]"
      >
        Start Again
      </motion.button>
    </div>
  );
}
