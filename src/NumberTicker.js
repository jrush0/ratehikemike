import React, { useEffect, useState, useRef, useCallback } from 'react';

const NumberTicker = ({ start, end, duration, delay, prefix = '', suffix = '' }) => {
  const [number, setNumber] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const tickerRef = useRef(null);

  const observerCallback = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });

    if (tickerRef.current) {
      observer.observe(tickerRef.current);
    }

    return () => {
      if (tickerRef.current) {
        observer.unobserve(tickerRef.current);
      }
    };
  }, [observerCallback]);

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

  return <span ref={tickerRef} className="number-ticker">{prefix}{number.toLocaleString()}{suffix}</span>;
};

export default NumberTicker;