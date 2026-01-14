import { useState } from 'react';
import { supabase } from '../supabaseClient'; // Import the connection we made

export default function Contact() {
  // 1. STATE: Keeps track of what the user types
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // STATE: Keeps track of the submission status (loading, success, error)
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  // 2. HELPER: Updates state when user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. LOGIC: Sends data to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page refresh
    setStatus('submitting');

    // The Magic: Sending data to the 'messages' table
    const { error } = await supabase
      .from('Messages')
      .insert([
        { 
          name: formData.name, 
          email: formData.email, 
          message: formData.message 
        }
      ]);

    if (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    } else {
      setStatus('success');
      // Clear form
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <main>
      <section className="section-padding full-screen-section">
        <div className="container">
          <h2>Contact Us</h2>
          <p className="section-lead">Have a question? We'd love to hear from you!</p>

          <div className="adventure-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
            
            {/* SUCCESS MESSAGE */}
            {status === 'success' ? (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'green' }}>Message Sent! 🚀</h3>
                <p>Thank you for reaching out. We will get back to you soon.</p>
                <button 
                  className="button button-secondary" 
                  onClick={() => setStatus('idle')}
                  style={{ marginTop: '20px' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              /* THE FORM */
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Name Field */}
                <div style={{ textAlign: 'left' }}>
                  <label htmlFor="name" style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                  />
                </div>

                {/* Email Field */}
                <div style={{ textAlign: 'left' }}>
                  <label htmlFor="email" style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="parent@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                  />
                </div>

                {/* Message Field */}
                <div style={{ textAlign: 'left' }}>
                  <label htmlFor="message" style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="button button-primary"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'error' && <p style={{ color: 'red', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
