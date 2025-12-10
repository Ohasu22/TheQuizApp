import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import ResultScreen from './ResultScreen';
import CatPaw from './CatPaw';

export default function QuizContainer({ questions, onRestart, onQuestionChange }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(10);
  const [isAnswered, setIsAnswered] = useState(false);
  const [pawState, setPawState] = useState('idle');

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  // Notify parent of question change
  useEffect(() => {
    if (onQuestionChange) {
      onQuestionChange(currentQuestionIndex);
    }
  }, [currentQuestionIndex, onQuestionChange]);

  // Timer countdown
  useEffect(() => {
    if (showResults || isAnswered) return;

    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          handleNext();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestionIndex, showResults, isAnswered]);

  // Reset timer when question changes
  useEffect(() => {
    setTimer(10);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  const handleSelectOption = index => {
    setSelectedOption(index);
    setPawState('extend');

    setTimeout(() => setPawState('holding'), 600);
    setTimeout(() => setPawState('idle'), 2000);
  };

  const handleNext = () => {
    if (selectedOption === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    setPawState('idle');

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleKeepLearning = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
  };

  const handleRestartQuiz = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    onRestart();
  };

  if (showResults) {
    return (
      <ResultScreen
        score={score}
        totalQuestions={totalQuestions}
        onRestart={handleRestartQuiz}
        onKeepLearning={handleKeepLearning}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl"
    >
      {/* Cute Cat Paw Animation */}
      <CatPaw state={pawState} />

      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-5xl mb-2 font-serif italic bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          Test Your Knowledge
        </h1>
        <p className="opacity-70 text-sm">Answer all questions to see your results</p>
      </motion.div>

      {/* Timer */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Clock className="w-5 h-5 text-blue-500" />

        <motion.span
          key={timer}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-lg"
        >
          {timer}s
        </motion.span>

        <div className="flex-1 max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden ml-2">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-teal-500"
            initial={{ width: '100%' }}
            animate={{ width: `${(timer / 10) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Progress Bar */}
      <ProgressBar
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentQuestionIndex}
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedOption={selectedOption}
          onSelectOption={handleSelectOption}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          isAnswered={isAnswered}
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
            currentQuestionIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
          }`}
          whileHover={currentQuestionIndex !== 0 ? { scale: 1.05 } : {}}
          whileTap={currentQuestionIndex !== 0 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
            selectedOption === null
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:shadow-lg'
          }`}
          whileHover={selectedOption !== null ? { scale: 1.05 } : {}}
          whileTap={selectedOption !== null ? { scale: 0.95 } : {}}
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
