import { useScrollReveal } from '../Hooks/useScrollReveal';
import { useVideoAutoplay } from '../Hooks/useVideoAutoPlay';

// Import Images
import easyBuildImg from '../assets/images/easy_to_build.jpg';
import easyAssembleImg from '../assets/images/easy_to_assemble.jpg';
import mblockAppImg from '../assets/images/CS 600x400 36x24.png';
import cyberPiImg from '../assets/images/CyberPi Overview.png';

export default function Bots() {
  useScrollReveal();
  const heroVideoRef = useVideoAutoplay();
  const detailVideoRef = useVideoAutoplay();

  return (
    <main>
        {/* HERO VIDEO SECTION */}
        <section className="section-padding full-screen-section">
            <div className="video-hero-section adventure-card-vertical">
                <video 
                    ref={heroVideoRef}
                    className="adventure-video" 
                    muted 
                    loop 
                    playsInline 
                    src="/images/mBot2 Coding Robot Video.mp4"
                ></video>
                
                <div className="video-content-overlay">
                    <h1>Meet the mBot2</h1>
                </div>
            </div>
        </section>
        
        {/* FEATURES LIST */}
        <section className="section-gray section-padding">
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {/* Feature 1 */}
                <div className="container full-screen-section hidden-on-scroll delay-3">
                    <li>
                        <h2>Easy to build<img src={easyBuildImg} alt="mBot 2 easy to build" /></h2>
                    </li>
                </div>

                {/* Feature 2 */}
                <div className="container full-screen-section hidden-on-scroll delay-3">
                    <li>
                        <h2>Multiple Sensors to encourage creativity<img src={easyAssembleImg} alt="mBot 2 simple assembly" /></h2>
                    </li>
                </div>

                {/* Feature 3 */}
                <div className="container full-screen-section hidden-on-scroll delay-3">
                    <li>
                        <h2>mBlock app easily available on all kinds of mobile devices<img src={mblockAppImg} alt="Makecode app devices" /></h2>
                    </li>
                </div>

                {/* Feature 4 (Video) */}
                <div className="video-hero-section adventure-card-vertical">
                    <li>
                        <video 
                            ref={detailVideoRef}
                            className="adventure-video" 
                            muted 
                            loop 
                            playsInline 
                            src="/images/mBot2 Coding Robot Kit HD.mp4"
                        ></video>
                        <div className="video-content-overlay"><h1>A great tool to introduce AI and Machine learning</h1></div>
                    </li>
                </div>

                {/* Feature 5 */}
                <div className="container full-screen-section hidden-on-scroll delay-3">
                    <li>
                        <h2>Powerful Micro-controller Cyber-pi<img src={cyberPiImg} alt="CyberPi diagram" /></h2>
                    </li>
                </div>
            </ul>
        </section>
    </main>
  );
}