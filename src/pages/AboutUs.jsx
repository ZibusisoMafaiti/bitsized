import { Link } from 'react-router-dom';
import { useScrollReveal } from '../Hooks/useScrollReveal';
import { useVideoAutoplay } from '../Hooks/useVideoAutoPlay';

// Import Images
import whyRoboticsPic from '../assets/images/why-robotics-pic.jpg';

export default function AboutUs() {
  useScrollReveal();
  const videoRef = useVideoAutoplay();

  return (
    <main>
      <article>
        {/* MY STORY SECTION */}
        <section className="mystory-mywhy container section-padding full-screen-section">
            <img 
                src={whyRoboticsPic} 
                alt="Why Robotics" 
                className="hidden-on-scroll delay-1" 
            />
            <h1 className="hidden-on-scroll delay-2">About Us?</h1>
            <p className="hidden-on-scroll delay-3">
              While the term "About Us" might suggest a team, Bitsized Education is currently run as a passionate solo endeavor—although I frequently lean on the collective wisdom of brilliant minds around the globe, thanks to the power of the internet.
              <br /><br />
              My motivation for creating this platform stems from my deep love for technology and the transformative impact it has on our world, particularly in education. I am inspired by the countless possibilities technology presents for enhancing learning experiences, making them engaging, accessible, and fun for children.
              <br /><br />
              Bitsized Education blends two of my greatest passions: literature and robotics. This unique fusion is designed not just to teach coding and technical skills, but to ignite creativity, curiosity, and experimentation in students.
            </p>
        </section>
        
        {/* WHY BITSIZED SECTION */}
        <section className="meet-me section-gray section-padding full-screen-section">
            <div className="container hidden-on-scroll delay-1">
                <h2>Why Bitsized</h2>
                <div className="cards">
                    {/* Video from public folder */}
                    <video 
                        ref={videoRef}
                        src="/images/Kids Learning 4K Video.mp4" 
                        controls 
                        muted 
                        playsInline
                        className="content-image" // Using your generic image class for sizing
                    ></video>
                </div>
            </div>
        </section>
      </article>
    </main>
  );
}