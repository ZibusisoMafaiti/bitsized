import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function JournalInput({ session, lessonId, category, placeholder }) {
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('student_submissions')
      .insert([
        { 
          user_id: session.user.id, 
          lesson_id: lessonId, 
          problem_list: `[${category}]: ${text}` 
        }
      ]);

    if (error) {
      alert("Error saving: " + error.message);
    } else {
      alert("Problem added to your Hunter List!");
      setText(''); // Clear for next input
    }
    setIsSaving(false);
  };

  return (
    <div className="journal-input-container">
      <textarea 
        className="journal-textarea"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button 
        onClick={handleSave} 
        className="button button-primary"
        disabled={isSaving || !text}
      >
        {isSaving ? "Saving..." : "Add to My List"}
      </button>
    </div>
  );
}