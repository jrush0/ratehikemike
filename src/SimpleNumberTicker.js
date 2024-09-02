import React, { useEffect, useState, useRef } from 'react';

const SimpleNumberTicker = ({ start = 1, end, duration = 0.3, delay }) => {
  const [number, setNumber] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const tickerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (tickerRef.current) {
      observer.observe(tickerRef.current);
    }

    return () => {
      if (tickerRef.current) {
        observer.unobserve(tickerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeoutId = setTimeout(() => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setNumber(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [isVisible, start, end, duration, delay]);

  return <span ref={tickerRef} className="number-ticker">{number}</span>;
};

export default SimpleNumberTicker;