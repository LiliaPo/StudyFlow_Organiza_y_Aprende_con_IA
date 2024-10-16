import React, { useState } from 'react';
import '../styles/Home.css';
// import homeImage from '../assets/homeImage.png'; // Comentado

function Home({ onGenerateTest, onGenerateSummary, onShowProgress }) {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [error, setError] = useState('');

  const handleGenerateTest = () => {
    if (!topic.trim() || !/[a-zA-Z0-9]/.test(topic)) {
      setError('Por favor, introduce un tema válido.');
    } else {
      setError('');
      onGenerateTest(topic, difficulty);
    }
  };

  const handleGenerateSummary = () => {
    if (!topic.trim() || !/[a-zA-Z0-9]/.test(topic)) {
      setError('Por favor, introduce un tema válido.');
    } else {
      setError('');
      onGenerateSummary(topic, difficulty); // Llama a la función para generar resumen
    }
  };

  return (
    <div className="home">
      <h1>Plan de Estudios Interactivo</h1>
      {error && <p className="error-message">{error}</p>}
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
        onClick={handleGenerateTest}
        disabled={!difficulty}
      >
        Generar Tests
      </button>
      <button 
        className="generate-button" 
        onClick={handleGenerateSummary}
      >
        Generar Resumen del Tema
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
