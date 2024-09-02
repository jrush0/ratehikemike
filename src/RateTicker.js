import React, { useState, useEffect, useRef } from 'react';

const RateTicker = () => {
  const [count, setCount] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const tickerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = tickerRef.current;
    if (currentRef) {
      setTimeout(() => {
        observer.observe(currentRef);
      }, 2000);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && count < 6) {
      const timer = setTimeout(() => {
        setCount((prevCount) => prevCount + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, count]);

  return (
    <div ref={tickerRef} className="stats-number">
      {count}
    </div>
  );
};

export default RateTicker;
