import React, { useState } from 'react';
import Home from './components/Home';
import StudyPlan from './components/StudyPlan';
import Exam from './components/Exam';
import Progress from './components/Progress';
import { generateStudyPlan, saveProgress } from './services/aiService';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [studyPlan, setStudyPlan] = useState(null);
  const [examResults, setExamResults] = useState([]);
  const [currentDifficulty, setCurrentDifficulty] = useState('');
  const [topic, setTopic] = useState('');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home 
          onGeneratePlan={async (selectedTopic, difficulty) => {
            setTopic(selectedTopic);
            setCurrentDifficulty(difficulty);
            const plan = await generateStudyPlan(selectedTopic);
            setStudyPlan(plan);
            setCurrentView('studyPlan');
          }}
          onShowProgress={() => setCurrentView('progress')}
        />;
      case 'studyPlan':
        return <StudyPlan 
          plan={studyPlan} 
          onStartExam={() => setCurrentView('exam')}
        />;
      case 'exam':
        return <Exam 
          topic={topic} 
          difficulty={currentDifficulty}
          onComplete={(result) => {
            setExamResults([...examResults, { difficulty: currentDifficulty, score: result }]);
            saveProgress('user123', topic, currentDifficulty, result);
            setCurrentView('progress');
          }} 
        />;
      case 'progress':
        return <Progress 
          results={examResults} 
          onContinue={(view) => setCurrentView(view)}
        />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {renderView()}
    </div>
  );
}

export default App;
