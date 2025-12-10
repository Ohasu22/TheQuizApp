import { motion } from 'framer-motion';

export default function ProgressBar({ currentQuestion, totalQuestions }) {
  return (
    <div className="w-full mb-8">
      <div className="flex gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-teal-400"
              initial={{ width: 0 }}
              animate={{
                width: index < currentQuestion ? '100%' : '0%'
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
