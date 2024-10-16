import React, { useState, useEffect } from 'react';
import { generateQuestions, validateAnswer } from '../services/aiService';
import '../styles/Exam.css'; // Asegúrate de que el CSS esté importado

function Exam({ topic, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [examFinished, setExamFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const generatedQuestions = await generateQuestions(topic);
        setQuestions(generatedQuestions);
      } catch (error) {
        console.error('Error al generar preguntas:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [topic]);

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    const { isCorrect, feedback } = validateAnswer(questions[currentQuestion], selectedOption);
    setShowResult(true);
    setFeedback(feedback);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setFeedback('');
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setExamFinished(true);
    }
  };

  const handleFinishExam = () => {
    onComplete(score / questions.length);
  };

  if (loading) {
    return <div>Cargando preguntas...</div>;
  }

  if (questions.length === 0) {
    return <div>No se pudieron cargar las preguntas. Por favor, intenta de nuevo.</div>;
  }

  if (examFinished) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="exam-results">
        <h2>Resultados del Examen</h2>
        <p>Puntuación: {score} de {questions.length}</p>
        <p>Porcentaje de aciertos: {percentage.toFixed(2)}%</p>
        <button onClick={handleFinishExam}>Finalizar</button>
      </div>
    );
  }

  return (
    <div className="exam">
      <h2>Examen sobre {topic}</h2>
      <p className="question">{questions[currentQuestion]?.question}</p>
      <ul className="options-list">
        {questions[currentQuestion]?.options.map((option, index) => (
          <li key={index}>
            <button 
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={showResult 
                ? index === questions[currentQuestion].correct 
                  ? 'correct' 
                  : selectedAnswer === index 
                    ? 'incorrect' 
                    : ''
                : ''}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      {showResult && (
        <div>
          <p className="feedback">{feedback}</p>
          <button onClick={nextQuestion}>
            {currentQuestion + 1 < questions.length ? 'Siguiente pregunta' : 'Finalizar examen'}
          </button>
        </div>
      )}
      <p>Pregunta {currentQuestion + 1} de {questions.length}</p>
    </div>
  );
}

export default Exam;
