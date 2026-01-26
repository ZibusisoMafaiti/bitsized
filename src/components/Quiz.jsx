import { useState, useEffect } from 'react';
import '../Quiz.css'; // Import the new styles

export default function Quiz({ data }) {
  const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'
  const [selectedIndex, setSelectedIndex] = useState(null);
useEffect(() => {
    setFeedback(null);
    setSelectedIndex(null);
  }, [data]); // Runs every time a new slide/question is loaded
  
  const handleAnswer = (index) => {
    setSelectedIndex(index);
    if (index === data.correctAnswerIndex) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  return (
    <div className="quiz-container">
      <p className="quiz-question">{data.question}</p>
      
      <div className="quiz-options">
        {data.options.map((option, index) => {
          // Determine the class based on the current state
          let statusClass = '';
          if (selectedIndex === index) {
            statusClass = feedback === 'correct' ? 'correct' : 'wrong';
          }

          return (
            <button
              key={index}
              className={`quiz-option-button ${statusClass}`}
              onClick={() => handleAnswer(index)}
              disabled={feedback === 'correct'} 
            >
              {option}
              {selectedIndex === index && feedback === 'correct' && " (Correct!)"}
              {selectedIndex === index && feedback === 'wrong' && " (Try Again)"}
            </button>
          );
        })}
      </div>
    </div>
  );
}