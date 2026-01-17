import { Link } from "react-router-dom";
import { useScrollReveal } from "../Hooks/useScrollReveal";
import { useVideoAutoplay } from "../Hooks/useVideoAutoPlay";

// 1. IMPORT IMAGE FROM ASSETS
import heroBg from "../assets/images/adorable-girl-being-passionate-about-robotics.jpg";

// 2. IMPORT API COMPONENT
// This replaces the static mBot video with live data from NASA
import MarsRover from "../components/Marsrover";

export default function Home() {
  // Activate the scroll animation logic
  useScrollReveal();
  
  // We only need one video ref now, as the first video is replaced by the API
  const video2Ref = useVideoAutoplay();

  return (
    <main>
      {/* =========================================
          HERO SECTION 
          Uses inline style for the background image
          ========================================= */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero-overlay"></div>
        <div className="container section-content">
          <div className="hero-details">
            <h1 className="title">Bitsized</h1>
            <h3 className="subtitle">Learning one bit at a time!</h3>
            <p className="description">
              Welcome to a space where you can learn tech at your own pace in a
              fun way
            </p>
            <div className="buttons">
              <Link
                to="/adventures"
                className="button button-primary adventures"
              >
                Adventures
              </Link>
              <Link
                to="/contact"
                className="button button-secondary contact-us"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          ABOUT FEATURE SECTION
          ========================================= */}
      <section className="about-feature container section-padding full-screen-section">
        <div className="about-feature-heading hidden-on-scroll delay-1">
          <h2>Bit-sized Description</h2>

          <Link to="/about" className="discover-link">
            Discover More About Us <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="about-feature-content hidden-on-scroll delay-3">
          <p>
            Bitsized are bite-sized delicious tech-based educational granola
            bites covered in a yummy yoghurt coating—delicious and nutritional.
            We offer a unique space where technology and literacy meet, allowing
            your child to bring their favorite book characters to life, choose
            their own adventure, and experience others' creations. Here, kids
            get to tinker, learn to persevere, and celebrate creativity and
            wins.
          </p>
          <p className="mt-20 hidden-on-scroll delay-2">
            Our platform is dedicated to fostering curiosity and critical
            thinking in a fun, pressure-free environment, making tech education
            accessible and exciting for every child.
          </p>
        </div>
      </section>

      {/* =========================================
          ADVENTURE & ROBOTICS SHOWCASE
          ========================================= */}
      <section className="adventure-snippets section-gray section-padding">
        <div className="container hidden-on-scroll delay-3">
          
          
          <div className="adventure-snippets-list">
            
           

            {/* CARD 1: ADVENTURES PROMO (VIDEO)
               This remains unchanged, showing the 'Kids Learning' video.
            */}
            <div className="video-snippet-card adventure-card-vertical full-screen-section hidden-on-scroll delay-2">
              <video
                ref={video2Ref}
                className="adventure-video"
                src="/images/Kids Learning 4K Video.mp4"
                muted
                loop
                playsInline
              ></video>
              <div className="video-content-overlay">
                <h4>Explore Your First Adventure</h4>
                <p>See what it is like to bring stories to life with code.</p>
                <Link to="/adventures" className="button button-primary">
                  See All Adventures
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}