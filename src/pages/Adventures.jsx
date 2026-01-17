import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../adventure-cards2.css"; 

/**
 * Adventures Component
 * * * My Architectural Decisions:
 * 1. Horizontal Layout: Uses a horizontal accordion pattern overlapping the Hero image.
 * 2. Unified Glass Styling: I used a shared style object to force all cards to have 
 * the exact same transparency and layout, bypassing CSS inconsistencies.
 * 3. Persistence: "Resume" logic interfaces with LocalStorage.
 */
export default function Adventures() {
  const [heroImage, setHeroImage] = useState(null);
  const [heroTitle, setHeroTitle] = useState("Loading Mars Data...");

  useEffect(() => {
    async function fetchHeroImage() {
      try {
        const QUERY = "Mars Rover";
        const MEDIA_TYPE = "image";
        const response = await fetch(
          `https://images-api.nasa.gov/search?q=${QUERY}&media_type=${MEDIA_TYPE}`
        );
        const json = await response.json();
        const items = json.collection.items;

        if (items && items.length > 0) {
          const randomIndex = Math.floor(Math.random() * items.length);
          const randomHit = items[randomIndex];
          setHeroImage(randomHit.links[0].href);
          setHeroTitle(randomHit.data[0].title);
        } else {
          setHeroTitle("Begin Your Robotics Adventure");
        }
      } catch (err) {
        console.error("Failed to load Mars background", err);
        setHeroTitle("Begin Your Robotics Adventure");
      }
    }
    fetchHeroImage();
  }, []);

  const getProgress = (courseId, lessonId) => {
    const storageKey = `bitsized-progress-${courseId}-${lessonId}`;
    const savedSlide = localStorage.getItem(storageKey);
    return savedSlide ? parseInt(savedSlide) : 0;
  };

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

  // --- THE UNIFIED GLASS STYLE ---
  // This guarantees ALL cards look exactly like the "Good" one.
  const glassCardStyle = {
    opacity: 1,                          /* ALWAYS VISIBLE */
    transform: 'translateY(0)',
    display: 'flex',
    flexDirection: 'row',                /* Number Left, Text Right */
    alignItems: 'flex-start',
    gap: '20px',
    
    /* TRANSPARENCY FIX: 0.8 is 'Glassy', 0.95 was 'Solid' */
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    backdropFilter: 'blur(10px)',
    
    padding: '20px',
    width: '100%',
    minHeight: '100px'
  };

  const numberStyle = {
    flexShrink: 0,
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2.5rem',
    fontWeight: '800',
    fontFamily: 'sans-serif'
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* HERO SECTION */}
      <section
        className="adventure-hero"
        style={{
          backgroundImage: heroImage ? `url(${heroImage})` : "var(--color-primary-text)",
          backgroundColor: "#252525",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          color: "white",
          textAlign: "center",
          zIndex: 1 
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)" }}></div>
        <div className="container" style={{ position: "relative", zIndex: 2, transform: 'translateY(-50px)' }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "5px", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>Adventures</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", textShadow: "0 1px 5px rgba(0,0,0,0.5)" }}>
            {heroTitle}
          </p>
        </div>
      </section>

      {/* CARD SECTION */}
      <section style={{ 
          flexGrow: 1, 
          backgroundColor: 'transparent', 
          position: 'relative',
          zIndex: 10 
      }}>
        <div className="wrapper" style={{ marginTop: '-150px' }}>
          
          <div className="adventure-list-container">
            
            {/* === CARD 1 === */}
            <input type="radio" name="slide" id="c1" />
            <label htmlFor="c1" className="card">
              <div className="column" style={glassCardStyle}>
                <div className="icon" style={{ ...numberStyle, color: "var(--color-accent-primary)" }}>
                  1
                </div>
                <div className="description">
                  <h4>Lesson 1: Introduction</h4>
                  <p>Mission: Meet Roz and learn about your mBot. 🗺️</p>
                  <div className="adventure-buttons" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <Link to={`/adventures/wild-robot/lesson-1/${getProgress("wild-robot","lesson-1")}`} className="button button-primary start-btn">
                      {getProgress("wild-robot", "lesson-1") > 0 ? "Resume" : "Start"}
                    </Link>
                    {getProgress("wild-robot", "lesson-1") > 0 && (
                      <Link to="/adventures/wild-robot/lesson-1/0" style={restartButtonStyle}>Restart</Link>
                    )}
                  </div>
                </div>
              </div>
            </label>

            {/* === CARD 2 === */}
            <input type="radio" name="slide" id="c2" />
            <label htmlFor="c2" className="card">
              <div className="column" style={glassCardStyle}>
                <div className="icon" style={{ ...numberStyle, color: "var(--color-accent-secondary)" }}>
                  2
                </div>
                <div className="description">
                  <h4>Lesson 2: Movement</h4>
                  <p>Mission: Program the mBot to move and turn. 💻</p>
                  <div className="adventure-buttons" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <Link to={`/adventures/wild-robot/lesson-2/${getProgress("wild-robot","lesson-2")}`} className="button button-primary start-btn">
                      {getProgress("wild-robot", "lesson-2") > 0 ? "Resume" : "Start"}
                    </Link>
                    {getProgress("wild-robot", "lesson-2") > 0 && (
                      <Link to="/adventures/wild-robot/lesson-2/0" style={restartButtonStyle}>Restart</Link>
                    )}
                  </div>
                </div>
              </div>
            </label>

            {/* === CARD 3 === */}
            <input type="radio" name="slide" id="c3" />
            <label htmlFor="c3" className="card">
              <div className="column" style={glassCardStyle}>
                <div className="icon" style={{ ...numberStyle, color: "var(--color-accent-primary)" }}>
                  3
                </div>
                <div className="description">
                  <h4>Lesson 3: Sensing</h4>
                  <p>Mission: Use the ultrasonic sensor to avoid obstacles. ⚠️</p>
                  <div className="adventure-buttons" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                     <Link to={`/adventures/wild-robot/lesson-3/${getProgress("wild-robot","lesson-3")}`} className="button button-primary start-btn">
                      {getProgress("wild-robot", "lesson-3") > 0 ? "Resume" : "Start"}
                    </Link>
                  </div>
                </div>
              </div>
            </label>

            {/* === CARD 4 === */}
            <input type="radio" name="slide" id="c4" />
            <label htmlFor="c4" className="card">
              <div className="column" style={glassCardStyle}>
                <div className="icon" style={{ ...numberStyle, color: "var(--color-accent-secondary)" }}>
                  4
                </div>
                <div className="description">
                  <h4>Lesson 4: Lights</h4>
                  <p>Mission: Program LEDs to change colors. ✨</p>
                  <div className="adventure-buttons" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button className="button button-primary start-btn">Start</button>
                  </div>
                </div>
              </div>
            </label>

            {/* === CARD 5 === */}
            <input type="radio" name="slide" id="c5" />
            <label htmlFor="c5" className="card">
              <div className="column" style={glassCardStyle}>
                <div className="icon" style={{ ...numberStyle, color: "var(--color-accent-primary)" }}>
                  5
                </div>
                <div className="description">
                  <h4>Lesson 5: Final</h4>
                  <p>Mission: Complete a complex autonomous challenge! 🏆</p>
                  <div className="adventure-buttons" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button className="button button-primary start-btn">Start</button>
                  </div>
                </div>
              </div>
            </label>

          </div>
        </div>
      </section>
    </main>
  );
}