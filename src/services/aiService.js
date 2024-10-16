import axios from 'axios';

// Función para obtener información del tema desde Wikipedia
export async function obtenerInformacionTema(topic) {
  const url = `https://es.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=&explaintext=&titles=${encodeURIComponent(topic)}`;
  
  try {
    const response = await axios.get(url);
    const page = response.data.query.pages;
    const pageId = Object.keys(page)[0];
    return page[pageId].extract || "No se encontró información.";
  } catch (error) {
    console.error('Error al obtener información del tema:', error);
    return "Error al obtener información.";
  }
}

// Función para generar preguntas basadas en el tema
export async function generateQuestions(topic, count = 10) {
  const questions = [];

  for (let i = 0; i < count; i++) {
    questions.push({
      question: `¿Qué puedes decir sobre ${topic}?`,
      options: [
        `Información incorrecta relacionada con ${topic} ${i + 1}`,
        `Información correcta sobre ${topic}`, // Respuesta correcta
        `Otra información incorrecta sobre ${topic} ${i + 2}`,
        `Más información incorrecta sobre ${topic} ${i + 3}`
      ],
      correct: 1 // La respuesta correcta es la segunda opción (índice 1)
    });
  }

  return questions;
}

export function validateAnswer(question, selectedOption) {
  const isCorrect = selectedOption === question.correct;
  let feedback = isCorrect ? "¡Correcto!" : "Incorrecto.";
  feedback += ` La respuesta correcta es: ${question.options[question.correct]}`;
  return { isCorrect, feedback };
}

export function generateStudyPlan(topic) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        topic,
        modules: [
          { level: 'Fácil', content: `Contenido básico sobre ${topic}` },
          { level: 'Medio', content: `Contenido intermedio sobre ${topic}` },
          { level: 'Difícil', content: `Contenido avanzado sobre ${topic}` },
        ]
      });
    }, 1000);
  });
}

export function saveProgress(userId, topic, difficulty, score) {
  console.log(`Progreso guardado para el usuario ${userId}: Tema - ${topic}, Dificultad - ${difficulty}, Puntuación - ${score}`);
}

export function getProgress(userId) {
  return {
    completedExams: 5,
    averageScore: 75,
    topicsStudied: ['Matemáticas', 'Historia', 'Ciencias'],
    lastExam: {
      topic: 'Biología',
      score: 80,
      date: new Date().toISOString()
    }
  };
}

export async function generateSummary(topic, difficulty) {
  let summary = '';

  // Simulación de resúmenes basados en el nivel de dificultad
  switch (difficulty) {
    case 'easy':
      summary = `Resumen básico sobre ${topic}: Este es un resumen simple.`;
      break;
    case 'medium':
      summary = `Resumen intermedio sobre ${topic}: Este resumen proporciona más detalles sobre el tema.`;
      break;
    case 'hard':
      summary = `Resumen avanzado sobre ${topic}: Este es un resumen detallado que cubre aspectos complejos del tema.`;
      break;
    default:
      summary = `Resumen sobre ${topic}: Información general.`;
  }

  return summary;
}
