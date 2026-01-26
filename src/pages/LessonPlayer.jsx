import { useEffect,useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import Quiz from '../components/Quiz';
import courseData from '../data/wild_robot_data';

/**
 * LessonPlayer Component
 * * This component acts as the "Traffic Controller" for the learning experience.
 * It is responsible for:
 * 1. Reading the current state (Course, Lesson, Slide) directly from the URL.
 * 2. Fetching the correct data based on that state.
 * 3. Rendering either a Lesson View (Text/Video) or a Quiz View.
 */
export default function LessonPlayer() {
  // -------------------------------------------------------
  // 1. STATE MANAGEMENT via URL (Single Source of Truth)
  // -------------------------------------------------------
  // We define these variables FIRST so they are available for all logic below.
  const { courseId, lessonId, slideId } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  // Convert the URL string "0" into a number 0. Default to 0 if missing.
  const currentIndex = parseInt(slideId) || 0;

  // -------------------------------------------------------
  // 2. DATA RETRIEVAL (Safe Mode)
  // -------------------------------------------------------
  // We fetch the data here, but we do NOT return errors yet.
  // We use "optional chaining" (?.) to safely get data or default to an empty array.
  // This prevents the code from crashing before the "Lesson Not Found" UI can appear.
  const currentLessonGroup = courseData.lessons[lessonId];
  const lessons = currentLessonGroup?.slides || []; 
  const currentSlide = lessons[currentIndex];

  // -------------------------------------------------------
  // 3. SIDE EFFECTS (Storage & Auto-Correction)
  // -------------------------------------------------------

  // EFFECT A: Save Progress to LocalStorage
  useEffect(() => {
    const storageKey = `bitsized-progress-${courseId}-${lessonId}`;
    
    // Only save if we have valid IDs and data exists
    if (courseId && lessonId && slideId && currentLessonGroup) {
        localStorage.setItem(storageKey, slideId);
        
        // UX IMPROVEMENT: Scroll to top of page on slide change
        window.scrollTo(0, 0);
    }
  }, [courseId, lessonId, slideId, currentLessonGroup]); 

  // EFFECT B: Redirect if Slide Doesn't Exist (Auto-Correction)
  // This handles cases where user types /50 but there are only 5 slides.
  useEffect(() => {
    // Only run this check if the Lesson Group actually exists
    if (currentLessonGroup && !currentSlide) {
      console.warn("Slide not found, redirecting to start...");
      navigate(`/adventures/${courseId}/${lessonId}/0`, { replace: true });
    }
  }, [currentIndex, currentSlide, courseId, lessonId, navigate, currentLessonGroup]);

  // -------------------------------------------------------
  // 4. NAVIGATION LOGIC
  // -------------------------------------------------------
  const goToNext = () => {
    if (currentIndex < lessons.length - 1) {
      navigate(`/adventures/${courseId}/${lessonId}/${currentIndex + 1}`);
    } else
       {
      // User is on the last slide
     
      setShowSuccess(true);
    } 
  };
const startNextLesson = () => {
    // Logic to find the next lesson ID (e.g., lesson-1 -> lesson-2)
    const lessonNumber = parseInt(lessonId.split('-')[1]);
    const nextLessonId = `lesson-${lessonNumber + 1}`;
    
    if (courseData.lessons[nextLessonId]) {
        setShowSuccess(false);
        navigate(`/adventures/${courseId}/${nextLessonId}/0`);
    } else {
        // No more lessons, go back to adventure selection
        navigate('/adventures');
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      navigate(`/adventures/${courseId}/${lessonId}/${currentIndex - 1}`);
    }
  };
const handleStepNavigation = (index) => {
  // Use your existing navigate logic to update the URL
 if (index <= currentIndex) {
    navigate(`/adventures/${courseId}/${lessonId}/${index}`);
  } else {
    // Optional: Add a subtle notification or shake effect
    console.log("Slide locked. Please complete the current step first.");
  }
};
  // -------------------------------------------------------
  // 5. ERROR HANDLING / EARLY RETURNS
  // -------------------------------------------------------
  // NOW it is safe to return early because all hooks (useEffect) have been declared.
  
  // Guard Clause: If the Lesson ID is wrong (e.g. /lesson-99)
  if (!currentLessonGroup) {
      return (
        <div className="container section-padding">
            <h2>Lesson not found!</h2>
            <p>Please return to the Adventures page.</p>
        </div>
      );
  }

  // Prevent render while redirecting if slide is invalid
  if (!currentSlide) return null;

  // -------------------------------------------------------
  // 6. RENDER
  // -------------------------------------------------------
  return (
    <main style={{ position: 'relative' }}>
        {showSuccess && (
            <div className="success-overlay">
                <div className="success-card">
                    <h2>Mission Accomplished! 🏆</h2>
                    <p>You've mastered {currentLessonGroup.title}.</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="button button-primary" onClick={startNextLesson}>
                            Next Lesson
                        </button>
                       <button 
  className="button button-secondary" 
  style={{ 
    color: 'var(--color-accent-secondary)', // Forced blue text
    borderColor: 'var(--color-accent-secondary)', // Forced blue border
    backgroundColor: 'transparent' 
  }}
  onClick={() => navigate('/adventures')}
>
  Back to Map
</button>
                    </div>
                </div>
            </div>
        )}
        {/* Progress Tracker */}
        <div className="lesson-progress-container container">
            <section className="lesson-progress">
               <Stepper 
  lessons={lessons} 
  currentIndex={currentIndex} 
  onStepClick={handleStepNavigation} 
/>
                <button className="button-help" type="button">Help</button>
            </section>
        </div>
        
        {/* Main Content Area */}
        <section className="lesson-content-layout container section-padding slide-container" style={{ position: 'relative' }}>
             
            {/* Navigation Controls */}
            <button 
                className="arrow-nav left-nav" 
                onClick={goToPrev}
                style={{ visibility: currentIndex === 0 ? 'hidden' : 'visible' }}
                aria-label="Previous Slide"
            >
                <span className="arrow left"></span>
            </button>

            <button 
    className="arrow-nav right-nav" 
    onClick={goToNext}
    /* FIX: Remove the hidden visibility so it can be clicked on the last slide */
    style={{ visibility: 'visible' }} 
    aria-label="Next Slide"
>
    <span className="arrow right"></span>
</button>
            
            <article className="lesson-text-column">
                <h2 className="lesson-title">{currentSlide.title}</h2>
                <div className="lesson-txt">
                    
                    {/* Content Logic: Quiz vs Standard */}
                    {currentSlide.type === 'quiz' ? (
                        <Quiz data={currentSlide.quizDetails} />
                    ) : (
                        <>
                            <p style={{ marginBottom: "20px" }}>{currentSlide.bodyText}</p>
                            
                            {/* Media Logic */}
                            {currentSlide.mediaSource && (
    <div className="video-container" style={{ marginTop: '20px' }}>
    {/* Step 1: Check for Iframes (YouTube/Drive) */}
    {currentSlide.mediaSource.includes('youtube') || currentSlide.mediaSource.includes('drive.google.com') ? (
        <iframe 
            src={currentSlide.mediaSource} 
            title="Lesson Video"
            style={{ width: '100%', height: '400px', border: 'none', borderRadius: '8px' }}
            allow="autoplay"
            allowFullScreen
        />
    ) : 
    /* Step 2: Nested condition - Check if it's a Video file */
    currentSlide.mediaSource.endsWith('.mp4') || currentSlide.mediaSource.endsWith('.webm') ? (
        <video 
            key={currentSlide.mediaSource}
            src={currentSlide.mediaSource} 
            controls 
            style={{ width: '100%', borderRadius: '8px' }} 
        />
    ) : (
        /* Step 3: Fallback - Render as an Image */
        <img 
            src={currentSlide.mediaSource} 
            alt={currentSlide.title} 
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} 
        />
    )}
</div>
)}
                        </>
                    )}
                </div>
            </article>
        </section>
    </main>
  );
}