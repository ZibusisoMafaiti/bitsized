import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/Login';

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
import Applications from "./pages/Applications";

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
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for login/logout changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  
  return (
    <div className="app-layout">
      <Navbar session={session} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/bots" element={<Bots />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/applications" element={<Applications />} />
        
        {/* WE ONLY LOCK THESE TWO ROUTES */}
        <Route 
          path="/adventures" 
          element={session ? <Adventures /> : <Login />} 
        />
        <Route 
          path="/adventures/:courseId/:lessonId/:slideId" 
          element={session ? <LessonPlayer session={session} /> : <Login />} 
        />

        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;