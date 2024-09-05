import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import './Tooltip.css';

const Tooltip = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);
  const tooltipRef = useRef(null);

  const toggleTooltip = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible) {
      const updatePosition = () => {
        const iconRect = iconRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let top = iconRect.bottom + window.scrollY;
        let left = iconRect.left + window.scrollX;

        // Adjust position if tooltip goes off-screen
        if (left + 300 > viewportWidth) {
          left = viewportWidth - 310;
        }
        if (top + 200 > viewportHeight + window.scrollY) {
          top = iconRect.top + window.scrollY - 210;
        }

        setPosition({ top, left });
      };

      const handleClickOutside = (event) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
          setIsVisible(false);
        }
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isVisible]);

  const renderTooltip = () => {
    if (!isVisible) return null;

    return ReactDOM.createPortal(
      <div
        ref={tooltipRef}
        className="tooltip-content"
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
        <button className="close-button" onClick={toggleTooltip}>×</button>
      </div>,
      document.body
    );
  };

  return (
    <>
      <span ref={iconRef} className="info-icon" onClick={toggleTooltip}>i</span>
      {renderTooltip()}
    </>
  );
};

export default Tooltip;