import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    // 1. Setup the "Observer" (The Security Guard)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the element is visible on the screen...
        if (entry.isIntersecting) {
          // Add the "show" class to trigger the CSS animation
          entry.target.classList.add('show');
          // Stop watching it (we only need to fade in once)
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the item is visible

    // 2. Find all elements that want to be animated
    // (We look for anything with the class 'hidden-on-scroll')
    const hiddenElements = document.querySelectorAll('.hidden-on-scroll');
    
    // 3. Tell the observer to watch them
    hiddenElements.forEach((el) => observer.observe(el));

    // 4. Cleanup: If the user leaves the page, stop the observer
    return () => observer.disconnect();
    
  }); // Run this every time the component renders
}