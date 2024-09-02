import React, { useState, useEffect, useRef } from 'react';

const NumberTicker = ({ endValue, duration }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = parseInt(endValue.replace(/,/g, ''));
    const incrementTime = (duration / end) * 1000;

    const timer = setInterval(() => {
      start += 250;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [endValue, duration, isVisible]);

  return (
    <div ref={ref} className="number-ticker">
      ${count >= 250000 ? '250,000+' : count.toLocaleString()}
    </div>
  );
};

export default NumberTicker;