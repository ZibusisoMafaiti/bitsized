import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Success! You can now sign in.');
    setLoading(false);
  };

  return (
    <div className="auth-container section-padding container">
      <div className="auth-card">
        <h2>Student Login</h2>
        <p>Sign in to save your robot designs and lesson progress.</p>
        
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="student-email">Email Address</label>
            <input 
              id="student-email"
              name="email"
              type="email" 
              placeholder="e.g. student@school.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="student-password">Password</label>
            <input 
              id="student-password"
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <div className="auth-button-group">
            <button type="submit" disabled={loading} className="button button-primary">
              {loading ? 'Processing...' : 'Sign In'}
            </button>
            <button type="button" onClick={handleSignUp} disabled={loading} className="button button-secondary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}