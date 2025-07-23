'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizComponentProps {
  title: string
  questions: QuizQuestion[]
  onComplete?: (score: number, passed: boolean) => void
}

export default function QuizComponent({ title, questions, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    if (hasAnswered) return
    
    setSelectedAnswer(answerIndex)
    setHasAnswered(true)
    
    // Update selected answers array
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(selectedAnswers[currentQuestion + 1] ?? null)
      setHasAnswered(selectedAnswers[currentQuestion + 1] !== undefined)
    } else {
      setShowResults(true)
      
      // Calculate score
      const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0)
      }, 0)
      
      const score = Math.round((correctAnswers / questions.length) * 100)
      const passed = score >= 70
      
      if (onComplete) {
        onComplete(score, passed)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(selectedAnswers[currentQuestion - 1] ?? null)
      setHasAnswered(selectedAnswers[currentQuestion - 1] !== undefined)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setSelectedAnswer(null)
    setHasAnswered(false)
  }

  const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correctAnswer ? 1 : 0)
  }, 0)
  
  const score = Math.round((correctAnswers / questions.length) * 100)
  const passed = score >= 70

  if (showResults) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <Trophy className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {passed ? 'Congratulations! 🎉' : 'Keep Learning! 📚'}
          </h3>
          
          <p className="text-gray-600 mb-4">
            You scored {correctAnswers} out of {questions.length} questions correctly
          </p>
          
          <div className={`text-3xl font-bold mb-4 ${
            passed ? 'text-green-600' : 'text-red-600'
          }`}>
            {score}%
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            {passed 
              ? 'Great job! You have a solid understanding of this topic.'
              : 'You need 70% to pass. Review the material and try again.'
            }
          </p>
          
          <button
            onClick={resetQuiz}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </button>
        </div>
        
        {/* Detailed Results */}
        <div className="mt-8 space-y-4">
          <h4 className="font-semibold text-gray-900 mb-4">Review Your Answers</h4>
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[index]
            const isCorrect = userAnswer === question.correctAnswer
            
            return (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{question.question}</p>
                    {!isCorrect && (
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-red-600">
                          Your answer: {question.options[userAnswer]}
                        </p>
                        <p className="text-sm text-green-600">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-gray-600 mt-2">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Quiz Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h4>
        
        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={hasAnswered}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                hasAnswered
                  ? index === question.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : index === selectedAnswer && index !== question.correctAnswer
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : 'border-gray-200 bg-gray-50 text-gray-600'
                  : selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-semibold ${
                  hasAnswered
                    ? index === question.correctAnswer
                      ? 'border-green-500 bg-green-500 text-white'
                      : index === selectedAnswer && index !== question.correctAnswer
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-gray-300'
                    : selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {hasAnswered && index === question.correctAnswer ? '✓' : 
                   hasAnswered && index === selectedAnswer && index !== question.correctAnswer ? '✗' :
                   String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Explanation */}
        {hasAnswered && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Explanation:</strong> {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!hasAnswered}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  )
} 