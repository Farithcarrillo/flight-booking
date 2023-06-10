import React, { useState, useEffect } from 'react';

export default function Preloader() {
  // Set up state to track loading status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer to simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    // Render the preloader with conditional class
    <div className={`preloader ${isLoading ? 'active' : ''}`}>
      <div className="loader"></div>
    </div>
  );
}
