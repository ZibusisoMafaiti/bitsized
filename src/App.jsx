import { Routes, Route } from 'react-router-dom';

// 1. Import my persistent layout components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer';

// 2. Import my Page components that will swap in and out
import Contact from './pages/Contact';
import Home from './pages/home';
import AboutUs from './pages/AboutUs';
import Bots from './pages/Bots';
import Adventures from './pages/Adventures';
import LessonPlayer from './pages/LessonPlayer';

/**
 * App Component
 * * This is the root of my application logic. I designed this file to act as the 
 * "Traffic Controller" for the entire website.
 * * * My Architectural Decision:
 * I separated the Layout elements (Navbar, Footer) from the Dynamic Content (Routes).
 * This ensures that the navigation remains stable while the user moves between pages,
 * creating a seamless "Single Page Application" feel.
 */
function App() {
  return (
    <div className="app-layout">
      {/* I placed the Navbar OUTSIDE the <Routes>. 
         This means it stays on the screen forever, no matter what page the user clicks.
      */}
      <Navbar />

      {/* This is the "Dynamic Screen" area. 
         I configured React Router here to watch the URL bar and render only 
         the component that matches the current address.
      */}
      <Routes>
        
        {/* Landing Page: mysite.com/ */}
        <Route path="/" element={<Home />} />

        {/* Static Content Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/bots" element={<Bots />} />

        {/* The Course Catalog: mysite.com/adventures */}
        <Route path="/adventures" element={<Adventures />} />

        {/* ---------------------------------------------------------------
           MY DYNAMIC LESSON ROUTE
           ---------------------------------------------------------------
           I updated this path to accept THREE variables:
           1. :courseId -> The broad topic (e.g., 'wild-robot')
           2. :lessonId -> The specific chapter (e.g., 'lesson-1')
           3. :slideId  -> The specific step index (e.g., '0', '1', '2')
           
           This structure allows me to deeply link to any specific moment in 
           any lesson, which was critical for fixing the "Lesson Not Found" errors.
        */}
        <Route path="/adventures/:courseId/:lessonId/:slideId" element={<LessonPlayer />} />
        <Route path="/contact" element={<Contact />} />
        

      </Routes>

      {/* Like the Navbar, I keep the Footer persistent at the bottom of every view. */}
      <Footer />
    </div>
  );
}

export default App;