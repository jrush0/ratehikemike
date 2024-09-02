import React, { useState, useEffect, useRef } from 'react';
import './Tooltip.css';

const Tooltip = ({ content }) => {
  const [isActive, setIsActive] = useState(false);
  const tooltipRef = useRef(null);

  const processedContent = content.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActive(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <i className="info-icon" onClick={handleClick}>i</i>
      {isActive && (
        <div className="tooltip-window" ref={tooltipRef}>
          <div 
            className="tooltip-content"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Tooltip;