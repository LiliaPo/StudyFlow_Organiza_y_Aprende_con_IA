import React, { useState } from 'react';
import '../styles/Home.css';
// import homeImage from '../assets/homeImage.png'; // Comentado

function Home({ onGeneratePlan, onStartExam, onShowProgress }) {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');

  return (
    <div className="home">
      <h1>Plan de Estudios Interactivo</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Introduce el tema que quieres estudiar"
        />
      </div>
      <div className="button-container">
        <button 
          className="difficulty-button easy" 
          onClick={() => setDifficulty('easy')}
        >
          Básico
        </button>
        <button 
          className="difficulty-button medium" 
          onClick={() => setDifficulty('medium')}
        >
          Intermedio
        </button>
        <button 
          className="difficulty-button hard" 
          onClick={() => setDifficulty('hard')}
        >
          Avanzado
        </button>
      </div>
      <button 
        className="generate-button" 
        onClick={() => onGeneratePlan(topic, difficulty)}
        disabled={!topic || !difficulty}
      >
        Generar Plan de Estudios
      </button>
      <button 
        className="progress-button" 
        onClick={onShowProgress}
      >
        Ver Progreso
      </button>
    </div>
  );
}

export default Home;
