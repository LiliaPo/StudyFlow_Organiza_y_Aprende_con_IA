import React from 'react';
import '../styles/StudyPlan.css'; // Asegúrate de que el CSS esté importado

function StudyPlan({ plan, onStartExam }) {
  return (
    <div className="study-plan">
      <h1>Plan de Estudio</h1>
      <h2>Plan de Estudios: {plan.topic}</h2>
      {plan.modules.map((module, index) => (
        <div key={index}>
          <h3>{module.level}</h3>
          <p>{module.content}</p>
          <button onClick={() => onStartExam(module.level)}>
            Comenzar Examen
          </button>
        </div>
      ))}
    </div>
  );
}

export default StudyPlan;
