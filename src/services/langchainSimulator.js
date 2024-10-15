export function simulateLangchainValidation(question, topic) {
  // Aquí simularíamos la validación de Langchain
  // En una implementación real, esto se conectaría a un servicio de IA
  
  // Verificamos si la pregunta contiene el tema
  if (!question.question.toLowerCase().includes(topic.toLowerCase())) {
    question.question = `Relacionado con ${topic}: ${question.question}`;
  }

  // Aseguramos que las opciones sean distintas
  const uniqueOptions = [...new Set(question.options)];
  if (uniqueOptions.length < 4) {
    while (uniqueOptions.length < 4) {
      uniqueOptions.push(`Otra opción relacionada con ${topic}`);
    }
    question.options = uniqueOptions;
  }

  return question;
}
