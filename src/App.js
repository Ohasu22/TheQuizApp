import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questionBank } from './data/questionBank';
import QuizContainer from './components/QuizContainer';

export default function App() {
  const [selectedQuestions, setSelectedQuestions] = useState(() =>
    getRandomQuestions()
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Array of beautiful gradient combinations
  const gradients = [
    { from: 'from-blue-300', via: 'via-blue-200', to: 'to-teal-300', overlay: 'from-blue-400/30 to-teal-400/30' },
    { from: 'from-purple-300', via: 'via-pink-200', to: 'to-rose-300', overlay: 'from-purple-400/30 to-rose-400/30' },
    { from: 'from-emerald-300', via: 'via-teal-200', to: 'to-cyan-300', overlay: 'from-emerald-400/30 to-cyan-400/30' },
    { from: 'from-orange-300', via: 'via-amber-200', to: 'to-yellow-300', overlay: 'from-orange-400/30 to-yellow-400/30' },
    { from: 'from-indigo-300', via: 'via-violet-200', to: 'to-purple-300', overlay: 'from-indigo-400/30 to-purple-400/30' },
  ];

  const currentGradient = gradients[currentQuestionIndex % gradients.length];

  function getRandomQuestions() {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }

  const handleRestart = () => {
    setSelectedQuestions(getRandomQuestions());
    setCurrentQuestionIndex(0);
  };

  const handleQuestionChange = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <AnimatePresence>
        <motion.div
          key={currentQuestionIndex}
          className={`absolute inset-0 bg-gradient-to-br ${currentGradient.from} ${currentGradient.via} ${currentGradient.to}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* Background blur effect */}
      <AnimatePresence>
        <motion.div
          key={`overlay-${currentQuestionIndex}`}
          className={`absolute inset-0 bg-gradient-to-br ${currentGradient.overlay} backdrop-blur-3xl`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* Quiz Card */}
      <motion.div
        className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-4xl z-10"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2
        }}
      >
        <QuizContainer
          questions={selectedQuestions}
          onRestart={handleRestart}
          onQuestionChange={handleQuestionChange}
        />
      </motion.div>
    </div>
  );
}
