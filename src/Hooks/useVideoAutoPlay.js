import { useEffect, useRef } from 'react';

export function useVideoAutoplay(options = { threshold: 0.5 }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      
      if (entry.isIntersecting) {
        // Video is 50% visible: Play it
        // We use a promise to prevent errors if the user scrolls too fast
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Autoplay prevented (browser blocked it):", error);
          });
        }
      } else {
        // Video is hidden: Pause it
        videoElement.pause();
      }
    }, options);

    observer.observe(videoElement);

    // Cleanup when leaving the page
    return () => observer.disconnect();
  }, [options]);

  return videoRef;
}