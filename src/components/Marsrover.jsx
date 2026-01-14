import { useState, useEffect } from 'react';

export default function MarsRover() {
  // 1. STATE MANAGEMENT
  // I keep my standard state setup: data to hold the image, 
  // loading to show the spinner, and error for safety.
  const [roverData, setRoverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. THE EFFECT HOOK
  // As soon as the component mounts, I run this function to search NASA's library.
  useEffect(() => {
    async function fetchMarsPhoto() {
      try {
        // --- CONFIGURATION ---
        // I switched to the NASA Image and Video Library API.
        // Good news: This API does NOT require an API Key!
        // I am searching specifically for "Mars Rover" images.
        const QUERY = 'Mars Rover';
        const MEDIA_TYPE = 'image'; // I only want photos, not videos/audio

        // --- ASYNC FETCH REQUEST ---
        // I hit the 'search' endpoint. Notice there is no 'api_key' parameter needed anymore.
        const response = await fetch(
          `https://images-api.nasa.gov/search?q=${QUERY}&media_type=${MEDIA_TYPE}`
        );

        if (!response.ok) {
          throw new Error(`Failed to connect to NASA Image Library (Status: ${response.status})`);
        }

        // --- DATA PARSING ---
        const json = await response.json();

        // The structure here is different from the previous API.
        // It returns a 'collection', which contains 'items'.
        const items = json.collection.items;

        if (items && items.length > 0) {
            // I pick the first result (items[0]) to display.
            const firstHit = items[0];
            
            // I create a clean object with just the info I need.
            // 1. The Image URL lives in the 'links' array.
            // 2. The Text (Title/Description) lives in the 'data' array.
            const cleanData = {
                image: firstHit.links[0].href,
                title: firstHit.data[0].title,
                description: firstHit.data[0].description,
                date: firstHit.data[0].date_created.substring(0, 10) // Truncate to YYYY-MM-DD
            };

            setRoverData(cleanData);
        } else {
            setError("NASA found no images for that search.");
        }
        
      } catch (err) {
        console.error("Error fetching Mars photo:", err);
        setError("Could not retrieve data from NASA Library.");
      } finally {
        setLoading(false);
      }
    }

    fetchMarsPhoto();
  }, []); 

  // 3. CONDITIONAL RENDERING

  // A. Loading State
  if (loading) {
    return (
        <div className="adventure-card" style={{textAlign: 'center', padding: '40px'}}>
            <h3>📡 Searching NASA Archives...</h3>
            <p>Accessing Image Library</p>
        </div>
    );
  }

  // B. Error State
  if (error) {
    return (
        <div className="adventure-card" style={{textAlign: 'center', borderColor: 'red'}}>
            <h3 style={{color: 'red'}}>⚠️ Connection Failed</h3>
            <p>{error}</p>
        </div>
    );
  }

  // C. Success State
  return (
    <div className="adventure-card" style={{ maxWidth: '500px', margin: '20px auto' }}>
      <div className="card-image-container">
        <img 
            src={roverData.image} 
            alt={roverData.title} 
            style={{ width: '100%', borderRadius: '8px 8px 0 0' }}
        />
      </div>
      
      <div className="description" style={{ padding: '20px' }}>
        <h4>{roverData.title}</h4>
        
        <div style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#666' }}>
            <span>📅 Archived: {roverData.date}</span>
        </div>

        <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
            {/* I truncate the description if it's too long to keep the card neat */}
            {roverData.description.length > 150 
                ? roverData.description.substring(0, 150) + "..." 
                : roverData.description}
        </p>
        
        <a 
            href={roverData.image} 
            target="_blank" 
            rel="noopener noreferrer"
            className="button button-secondary"
            style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}
        >
            View High-Res
        </a>
      </div>
    </div>
  );
}