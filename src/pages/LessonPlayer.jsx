import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import Stepper from '../components/Stepper';
import Quiz from '../components/Quiz';
import courseData from '../data/wild_robot_data';

/**
 * JournalInput Sub-Component
 * Handles saving brainstormed problems (School, Community, Country) 
 * directly to the 'student_submissions' table.
 */
function JournalInput({ session, lessonId, category, placeholder }) {
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!text.trim()) return;
    setIsSaving(true);
    
    const { error } = await supabase
      .from('student_submissions')
      .insert([
        { 
          user_id: session.user.id, 
          lesson_id: lessonId, 
          problem_list: `[${category.toUpperCase()}]: ${text}` 
        }
      ]);

    if (error) {
      alert("Error saving: " + error.message);
    } else {
      alert("Observation added to your Hunter List!");
      setText(''); 
    }
    setIsSaving(false);
  };

  return (
    <div className="journal-input-container" style={{ marginTop: '20px' }}>
      <textarea 
        className="journal-textarea"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ 
            width: '100%', 
            minHeight: '120px', 
            padding: '15px', 
            borderRadius: '8px', 
            border: '2px solid var(--color-border)',
            fontFamily: 'inherit'
        }}
      />
      <button 
        onClick={handleSave} 
        className="button button-primary"
        disabled={isSaving || !text}
        style={{ marginTop: '10px' }}
      >
        {isSaving ? "Saving..." : "Save Observation"}
      </button>
    </div>
  );
}

export default function LessonPlayer() {
  const { courseId, lessonId, slideId } = useParams();
  const navigate = useNavigate();
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [session, setSession] = useState(null);
  const [userProblems, setUserProblems] = useState([]);
  
  const currentIndex = parseInt(slideId) || 0;
  const currentLessonGroup = courseData.lessons[lessonId];
  const lessons = currentLessonGroup?.slides || []; 
  const currentSlide = lessons[currentIndex];

  // 1. Fetch Session for Auth-protected saving
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  // 2. Fetch all entries for this lesson when reaching the summary_list slide
  useEffect(() => {
    const fetchUserList = async () => {
        if (currentSlide?.type === 'summary_list' && session) {
            const { data, error } = await supabase
                .from('student_submissions')
                .select('problem_list')
                .eq('user_id', session.user.id)
                .eq('lesson_id', lessonId);
            
            if (!error) setUserProblems(data || []);
        }
    };
    fetchUserList();
  }, [currentSlide, session, lessonId]);

  // 3. Track progress locally and scroll to top
  useEffect(() => {
    const storageKey = `bitsized-progress-${courseId}-${lessonId}`;
    if (courseId && lessonId && slideId && currentLessonGroup) {
        localStorage.setItem(storageKey, slideId);
        window.scrollTo(0, 0);
    }
  }, [courseId, lessonId, slideId, currentLessonGroup]); 

  const goToNext = () => {
    if (currentIndex < lessons.length - 1) {
      navigate(`/adventures/${courseId}/${lessonId}/${currentIndex + 1}`);
    } else {
      setShowSuccess(true);
    } 
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      navigate(`/adventures/${courseId}/${lessonId}/${currentIndex - 1}`);
    }
  };

  const startNextLesson = () => {
    const lessonNumber = parseInt(lessonId.split('-')[1]);
    const nextLessonId = `lesson-${lessonNumber + 1}`;
    
    if (courseData.lessons[nextLessonId]) {
        setShowSuccess(false);
        navigate(`/adventures/${courseId}/${nextLessonId}/0`);
    } else {
        navigate('/adventures');
    }
  };

  if (!currentLessonGroup) {
      return (
        <div className="container section-padding">
            <h2>Lesson not found!</h2>
            <p>Please return to the Adventures page.</p>
        </div>
      );
  }

  if (!currentSlide) return null;

  return (
    <main style={{ position: 'relative' }}>
        {showSuccess && (
            <div className="success-overlay">
                <div className="success-card">
                    <h2>Mission Accomplished! 🏆</h2>
                    <p>You've mastered {currentLessonGroup.title}.</p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                        <button className="button button-primary" onClick={startNextLesson}>
                            Next Lesson
                        </button>
                        <button className="button button-secondary" onClick={() => navigate('/adventures')}>
                            Back to Map
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className="lesson-progress-container container">
            <section className="lesson-progress">
               <Stepper lessons={lessons} currentIndex={currentIndex} onStepClick={(i) => navigate(`/adventures/${courseId}/${lessonId}/${i}`)} />
               <button className="button-help" type="button">Help</button>
            </section>
        </div>
        
        <section className="lesson-content-layout container section-padding slide-container" style={{ position: 'relative' }}>
            <button 
                className="arrow-nav left-nav" 
                onClick={goToPrev}
                style={{ visibility: currentIndex === 0 ? 'hidden' : 'visible' }}
            >
                <span className="arrow left"></span>
            </button>

            <button className="arrow-nav right-nav" onClick={goToNext}>
                <span className="arrow right"></span>
            </button>
            
            <article className="lesson-text-column">
                <h2 className="lesson-title">{currentSlide.title}</h2>
                <div className="lesson-txt">
                    
                    {/* TYPE 1: INPUT SLIDE (Lesson 2 Brainstorming) */}
                    {currentSlide.type === 'input' ? (
                        <div className="input-slide-layout">
                            <p style={{ marginBottom: "15px" }}>{currentSlide.bodyText}</p>
                            <JournalInput 
                              session={session} 
                              lessonId={lessonId} 
                              category={currentSlide.category || 'general'} 
                              placeholder={currentSlide.placeholder}
                            />
                        </div>
                    ) : 
                    
                    /* TYPE 2: SUMMARY LIST (Lesson 2 Recap) */
                    currentSlide.type === 'summary_list' ? (
                        <div className="summary-list-layout">
                            <p style={{ marginBottom: "20px" }}>{currentSlide.bodyText}</p>
                            <div className="problem-journal-grid" style={{ display: 'grid', gap: '15px' }}>
                                {userProblems.length > 0 ? (
                                    userProblems.map((item, i) => (
                                        <div key={i} className="problem-card" style={{ 
                                            background: '#f9f9f9', 
                                            padding: '15px', 
                                            borderRadius: '8px', 
                                            borderLeft: '5px solid var(--color-accent-secondary)',
                                            textAlign: 'left'
                                        }}>
                                            <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-accent-secondary)' }}>
                                                OBSERVATION #{i + 1}
                                            </strong>
                                            <p>{item.problem_list}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Your journal is empty! Go back and add some observations.</p>
                                )}
                            </div>
                        </div>
                    ) : 
                    
                    /* TYPE 3: QUIZ SLIDE */
                    currentSlide.type === 'quiz' ? (
                        <Quiz data={currentSlide.quizDetails} />
                    ) : (
                        
                        /* TYPE 4: STANDARD LESSON SLIDE */
                        <>
                            <p style={{ marginBottom: "20px" }}>{currentSlide.bodyText}</p>
                            {currentSlide.mediaSource && (
                                <div className="video-container" style={{ marginTop: '20px' }}>
                                    {currentSlide.mediaSource.includes('youtube') || currentSlide.mediaSource.includes('drive.google.com') ? (
                                        <iframe 
                                            src={currentSlide.mediaSource} 
                                            title="Lesson Video"
                                            style={{ width: '100%', height: 'auto', border: 'none', aspectRatio: '16/9', borderRadius: '8px' }}
                                            allowFullScreen
                                        />
                                    ) : currentSlide.mediaSource.endsWith('.mp4') ? (
                                        <video key={currentSlide.mediaSource} src={currentSlide.mediaSource} controls style={{ width: '100%', borderRadius: '8px' }} />
                                    ) : (
                                        <img src={currentSlide.mediaSource} alt={currentSlide.title} style={{ width: '100%', borderRadius: '8px' }} />
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