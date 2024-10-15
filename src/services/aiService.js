// Comentamos la definición de testBank por ahora, ya que no lo estamos usando
// const testBank = { ... };

import axios from 'axios';

// Configura la clave de la API de OpenAI
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Asegúrate de configurar esta variable de entorno

async function fetchOpenAIQuestions(topic, difficulty) {
    const prompt = `
    Crea un examen sobre el tema "${topic}". Genera una pregunta con 4 opciones, donde solo una sea correcta. La dificultad debe ser ${difficulty}. 
    Formato:
    Pregunta:
    Opciones:
    1. Opción 1
    2. Opción 2
    3. Opción 3
    4. Opción 4
    Respuesta correcta:
    `;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003', // Puedes ajustar el modelo
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const generatedText = response.data.choices[0].text.trim();
        return parseGeneratedExam(generatedText);

    } catch (error) {
        console.error('Error al obtener la pregunta:', error);
        return null;
    }
}

function parseGeneratedExam(generatedText) {
    const questionMatch = generatedText.match(/Pregunta:(.*)/);
    const optionsMatch = generatedText.match(/Opciones:(.*)(\d\.\s.*\n\d\.\s.*\n\d\.\s.*\n\d\.\s.*)/s);
    const answerMatch = generatedText.match(/Respuesta correcta:(.*)/);

    const question = questionMatch ? questionMatch[1].trim() : '';
    const options = optionsMatch ? optionsMatch[2].split('\n').map(opt => opt.trim()) : [];
    const correctAnswer = answerMatch ? answerMatch[1].trim() : '';

    return { question, options, correctAnswer };
}

export async function generateQuestions(topic, difficulty = 'medium', count = 10) {
  // Generación de preguntas simuladas
  const questions = Array.from({ length: count }, (_, i) => ({
    question: `Pregunta ${i + 1} sobre ${topic}`,
    options: [
      `Opción 1 para ${topic}`,
      `Opción 2 para ${topic}`,
      `Opción 3 para ${topic}`,
      `Opción 4 para ${topic}`
    ],
    correct: Math.floor(Math.random() * 4)
  }));
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
