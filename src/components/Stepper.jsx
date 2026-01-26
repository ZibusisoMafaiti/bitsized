// Inside Stepper.jsx
export default function Stepper({ lessons, currentIndex, onStepClick }) {
  return (
    <div className="progress-bar-steps">
      {lessons.map((lesson, index) => {
        // Determine status
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLocked = index > currentIndex;

        let statusClass = '';
        if (isCompleted) statusClass = 'completed';
        else if (isCurrent) statusClass = 'current';
        else statusClass = 'locked';

        return (
          <div 
            key={index} 
            className={`step ${statusClass}`}
            style={{ 
              /* Only show pointer for unlocked steps */
              cursor: isLocked ? 'not-allowed' : 'pointer',
              opacity: isLocked ? 0.5 : 1 
            }}
            onClick={() => onStepClick(index)} 
          >
            <span className="step-label">
               {lesson.title.length > 10 ? lesson.title.substring(0, 8) + '...' : lesson.title}
            </span>
            
            <div className="step-icon">
              {isLocked ? (
                <i className="fas fa-lock" style={{ fontSize: '10px' }}></i>
              ) : isCompleted ? (
                <i className="fas fa-check"></i>
              ) : (
                index + 1
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}