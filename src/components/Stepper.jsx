export default function Stepper({ lessons, currentIndex }) {
  return (
    <div className="progress-bar-steps">
      {lessons.map((lesson, index) => {
        // Determine the status of this step
        let statusClass = '';
        if (index < currentIndex) statusClass = 'completed';
        else if (index === currentIndex) statusClass = 'current';

        return (
          <div key={index} className={`step ${statusClass}`}>
            <span className="step-label">
              {/* Truncate long titles  */}
              {lesson.title.length > 10 ? lesson.title.substring(0, 8) + '...' : lesson.title}
            </span>
            
            <div className="step-icon">
              {/* Show Checkmark if completed, otherwise show Number */}
              {statusClass === 'completed' ? (
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