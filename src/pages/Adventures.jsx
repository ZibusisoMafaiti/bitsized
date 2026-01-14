import { Link } from "react-router-dom";

/**
 * Adventures Component
 * * I designed this component to act as the "Mission Control" or "Course Catalog" for the application.
 * Its primary responsibility is to present the available learning modules and manage the
 * entry points into the specific LessonPlayer environment.
 * * * My Architectural Decision:
 * I implemented a "Resume vs. Restart" logic here that interfaces directly with the browser's
 * LocalStorage. This ensures that users can seamlessly jump back into a lesson exactly where
 * they left off, without requiring a complex backend database.
 */
export default function Adventures() {
  // -------------------------------------------------------
  // 1. STATE & STORAGE HELPERS
  // -------------------------------------------------------
  // I created this helper function to read the user's progress for any specific lesson.
  // It returns the saved slide index if it exists, or defaults to 0 (Start) if it does not.
  const getProgress = (courseId, lessonId) => {
    const storageKey = `bitsized-progress-${courseId}-${lessonId}`;
    const savedSlide = localStorage.getItem(storageKey);
    return savedSlide ? parseInt(savedSlide) : 0;
  };

  // -------------------------------------------------------
  // 2. STYLING STRATEGY
  // -------------------------------------------------------
  // I defined this style object here to ensure the "Restart" button visually aligns
  // with the application's primary theme, rather than using a generic "danger" style.
  // This maintains a cohesive look while indicating a secondary action.
  const restartButtonStyle = {
    borderColor: "var(--color-accent-primary)",
    color: "var(--color-accent-primary)",
    backgroundColor: "transparent",
    fontSize: "0.8rem",
    padding: "8px 12px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "var(--border-radius-btn, 30px)",
    fontWeight: "600",
    transition: "all 0.3s ease",
  };

  return (
    <main>
      <section className="section-padding">
        <div className="container">
          <h2>Begin Your Robotics Adventure! 🤖</h2>
          <p className="section-lead">
            Choose a lesson below to reveal your mission objectives. Master each
            skill one bit at a time!
          </p>

          <div className="wrapper">
            <div className="adventure-list-container">
              {/* -----------------------------------------------------------
                  UI PATTERN: CSS-Only Accordion
                  I chose to use hidden <input type="radio"> elements to manage the 
                  expanded/collapsed state of the cards. This approach allows me to 
                  handle complex UI animations purely with CSS, avoiding unnecessary 
                  React re-renders and keeping the component performant.
              ------------------------------------------------------------ */}

              {/* === CARD 1: Introduction === */}
              <input type="radio" name="slide" id="c1" defaultChecked />
              <label htmlFor="c1" className="card">
                <div className="column">
                  <div
                    className="icon"
                    style={{ backgroundColor: "var(--color-accent-primary)" }}
                  >
                    <i className="fas fa-book-open"></i>
                  </div>
                  <div className="description">
                    <h4>Wild Robot Series: Lesson 1 - Introduction</h4>
                    <p>
                      Mission: Meet Roz and learn about your mBot's main
                      components. This is where your journey begins! 🗺️
                    </p>

                    {/* BUTTON LAYOUT WRAPPER */}
                    <div
                      className="adventure-buttons"
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      {/* Primary Action: Resume or Start
                            I dynamically check the progress to update the button text 
                            and the destination URL. */}
                      <Link
                        to={`/adventures/wild-robot/lesson-1/${getProgress(
                          "wild-robot",
                          "lesson-1"
                        )}`}
                        className="button button-primary start-btn"
                      >
                        {getProgress("wild-robot", "lesson-1") > 0
                          ? "Resume Mission"
                          : "Start Mission"}
                      </Link>

                      {/* Secondary Action: Restart
                            I only render this button if the user has actual progress to lose. */}
                      {getProgress("wild-robot", "lesson-1") > 0 && (
                        <Link
                          to="/adventures/wild-robot/lesson-1/0"
                          style={restartButtonStyle}
                        >
                          Restart
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </label>

              {/* === CARD 2: Movement Basics === */}
              <input type="radio" name="slide" id="c2" />
              <label htmlFor="c2" className="card">
                <div className="column">
                  <div
                    className="icon"
                    style={{ backgroundColor: "var(--color-accent-secondary)" }}
                  >
                    <i className="fas fa-code"></i>
                  </div>
                  <div className="description">
                    <h4>Wild Robot Series: Lesson 2 - Movement Basics</h4>
                    <p>
                      Mission: Learn how to program the mBot to move forward,
                      turn, and stop. Get ready to code! 💻
                    </p>

                    <div
                      className="adventure-buttons"
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      <Link
                        to={`/adventures/wild-robot/lesson-2/${getProgress(
                          "wild-robot",
                          "lesson-2"
                        )}`}
                        className="button button-primary start-btn"
                      >
                        {getProgress("wild-robot", "lesson-2") > 0
                          ? "Resume Mission"
                          : "Start Mission"}
                      </Link>

                      {getProgress("wild-robot", "lesson-2") > 0 && (
                        <Link
                          to="/adventures/wild-robot/lesson-2/0"
                          style={restartButtonStyle}
                        >
                          Restart
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </label>

              {/* === CARD 3: Sensing === */}
              <input type="radio" name="slide" id="c3" />
              <label htmlFor="c3" className="card">
                <div className="column">
                  <div
                    className="icon"
                    style={{ backgroundColor: "var(--color-accent-primary)" }}
                  >
                    <i className="fas fa-compass"></i>
                  </div>
                  <div className="description">
                    <h4>Wild Robot Series: Lesson 3 - Sensing the World</h4>
                    <p>
                      Mission: Use the ultrasonic sensor to make your robot
                      avoid obstacles and navigate the wild! ⚠️
                    </p>

                    <div
                      className="adventure-buttons"
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      <Link
                        to={`/adventures/wild-robot/lesson-3/${getProgress(
                          "wild-robot",
                          "lesson-3"
                        )}`}
                        className="button button-primary start-btn"
                      >
                        {getProgress("wild-robot", "lesson-3") > 0
                          ? "Resume Mission"
                          : "Start Mission"}
                      </Link>

                      {getProgress("wild-robot", "lesson-3") > 0 && (
                        <Link
                          to="/adventures/wild-robot/lesson-3/0"
                          style={restartButtonStyle}
                        >
                          Restart
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
