import { useState } from 'react';

export default function Quiz({ data }) {
  const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'
  const [selectedIndex, setSelectedIndex] = useState(null);

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
          // Determine button color based on state
          let btnStyle = {};
          if (selectedIndex === index) {
            if (feedback === 'correct') btnStyle = { backgroundColor: 'green', color: 'white', borderColor: 'green' };
            if (feedback === 'wrong') btnStyle = { backgroundColor: 'red', color: 'white', borderColor: 'red' };
          }

          return (
            <button
              key={index}
              className="button button-secondary"
              style={{ display: 'block', marginBottom: '10px', width: '100%', ...btnStyle }}
              onClick={() => handleAnswer(index)}
              disabled={feedback === 'correct'} // Disable clicks after getting it right
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
