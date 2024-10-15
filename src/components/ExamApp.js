import React, { useState } from 'react';
import { fetchOpenAIQuestions } from '../services/aiService';  // Importa la función de OpenAI

function ExamApp() {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('fácil');
    const [exam, setExam] = useState(null);

    const generateExam = async () => {
        const generatedExam = await fetchOpenAIQuestions(topic, difficulty);
        setExam(generatedExam);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Generador de Exámenes</h1>
            <label>Tema:</label>
            <input 
                type="text" 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)} 
                placeholder="Escribe el tema"
            />
            
            <label>Dificultad:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="fácil">Fácil</option>
                <option value="media">Media</option>
                <option value="difícil">Difícil</option>
            </select>
            
            <button onClick={generateExam}>Generar Examen</button>

            {exam && (
                <div style={{ marginTop: '20px' }}>
                    <h2>{exam.question}</h2>
                    <ul>
                        {exam.options.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ExamApp;
