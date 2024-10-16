import React, { useEffect, useState } from 'react';
import { generateSummary } from '../services/aiService';
import '../styles/Summary.css';

function Summary({ topic, difficulty, onBack }) {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    async function fetchSummary() {
      const generatedSummary = await generateSummary(topic, difficulty);
      setSummary(generatedSummary);
    }
    fetchSummary();
  }, [topic, difficulty]);

  return (
    <div className="summary">
      <h2>Resumen sobre {topic}</h2>
      <p>{summary}</p>
      <button onClick={onBack}>Volver</button>
    </div>
  );
}

export default Summary;
