import React, { useEffect, useState } from 'react';
import { getProgress } from '../services/aiService';
// import progressImage from '../assets/progressImage.png'; // Comentado

function Progress({ results, onContinue }) {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const userProgress = getProgress('user123');
    setProgress(userProgress);
  }, []);

  if (!progress) {
    return <div>Cargando progreso...</div>;
  }

  const lastExam = results.length > 0 ? results[results.length - 1] : null;

  return (
    <div className="progress">
      <h2>Tu Progreso</h2>
      <p>Exámenes completados: {progress.completedExams}</p>
      <p>Puntuación promedio: {progress.averageScore}%</p>
      <h3>Temas estudiados:</h3>
      <ul>
        {progress.topicsStudied.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
      {lastExam && (
        <>
          <h3>Último examen:</h3>
          <p>Tema: {lastExam.topic}</p>
          <p>Puntuación: {lastExam.score * 100}%</p>
          <p>Fecha: {new Date(progress.lastExam.date).toLocaleDateString()}</p>
        </>
      )}
      <button onClick={onContinue}>Continuar</button>
    </div>
  );
}

export default Progress;
