import { useState, useEffect } from 'react';

export default function NasaCareers() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    // New State: Track which video is currently showing
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
                const playlistId = 'PLTUZypZ67cdu_T8tlPUSdbyyfKDwJL_6E'; 
                const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.items) {
                    const shuffledVideos = [...data.items].sort(() => 0.5 - Math.random());
                    // We can keep more videos in the chamber now since we show 1 at a time
                    setVideos(shuffledVideos.slice(0, 10));
                }
            } catch (error) {
                console.error("Error fetching NASA playlist:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchVideos();
    }, []);

    // --- NAVIGATION FUNCTIONS ---
    const nextVideo = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    };

    if (loading) {
        return <p style={{textAlign: 'center'}}>📡 Loading NASA Career Playlist...</p>;
    }

    // Safety check if API fails
    if (videos.length === 0) return null;

    const currentVideo = videos[currentIndex];

    return (
        <div className="career-theater" style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            {/* 1. THE VIDEO PLAYER */}
            <div style={{ 
                position: 'relative', 
                paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
                height: 0, 
                background: '#000',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
                <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed/${currentVideo.snippet.resourceId.videoId}`}
                    title={currentVideo.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* 2. VIDEO DETAILS & CONTROLS */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginTop: '20px',
                padding: '20px',
                background: '#fff',
                borderRadius: '15px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}>
                
                {/* Previous Button */}
                <button 
                    onClick={prevVideo}
                    className="button button-secondary"
                    style={{ padding: '10px 20px' }}
                >
                    <i className="fas fa-chevron-left"></i> Prev
                </button>

                {/* Title Info */}
                <div style={{ textAlign: 'center', flex: 1, padding: '0 20px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', color: '#252525' }}>
                        {currentVideo.snippet.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>
                        Career Spotlight {currentIndex + 1} of {videos.length}
                    </p>
                </div>

                {/* Next Button */}
                <button 
                    onClick={nextVideo}
                    className="button button-primary"
                    style={{ padding: '10px 20px' }}
                >
                    Next <i className="fas fa-chevron-right"></i>
                </button>

            </div>
        </div>
    );
}