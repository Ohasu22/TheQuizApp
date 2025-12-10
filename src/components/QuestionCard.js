import { motion } from 'framer-motion';

export default function QuestionCard({
  question,
  options,
  selectedOption,
  onSelectOption,
  questionNumber,
  totalQuestions,
  isAnswered
}) {
  const optionColors = [
    'bg-blue-100 hover:bg-blue-200 border-blue-200',
    'bg-pink-100 hover:bg-pink-200 border-pink-200',
    'bg-purple-100 hover:bg-purple-200 border-purple-200',
    'bg-teal-100 hover:bg-teal-200 border-teal-200'
  ];

  const selectedColors = [
    'bg-blue-300 border-blue-400',
    'bg-pink-300 border-pink-400',
    'bg-purple-300 border-purple-400',
    'bg-teal-300 border-teal-400'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="w-full"
    >
      {/* Question */}
      <motion.div
        className="bg-blue-50 rounded-full px-8 py-4 mb-8 border border-blue-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-center">
          <span className="opacity-70">{questionNumber}. </span>
          {question}
        </p>
      </motion.div>

      {/* Options */}
      <div className="space-y-4">
        {options.map((option, index) => {
          const isSelected = selectedOption === index;

          return (
            <motion.button
              key={index}
              onClick={() => !isAnswered && onSelectOption(index)}
              disabled={isAnswered}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + index * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                isSelected ? selectedColors[index] : optionColors[index]
              } ${!isAnswered ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              whileHover={
                !isAnswered
                  ? {
                      scale: 1.02,
                      y: -2,
                      transition: { type: 'spring', stiffness: 400, damping: 25 }
                    }
                  : {}
              }
              whileTap={
                !isAnswered
                  ? {
                      scale: 0.98,
                      transition: { type: 'spring', stiffness: 400, damping: 25 }
                    }
                  : {}
              }
            >
              <p className="text-left">{option}</p>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
