import React, { useState, useEffect, useRef } from 'react';
import '../../css/selection.css';

const Selection = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  const handlePreviewClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveIndex(null);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  console.log(activeIndex);

  return (
    <div className="selection-container" ref={containerRef}>
      <div className="previews">
        {images.map((image, index) => (
          <div
            key={index}
            className={`preview ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handlePreviewClick(index)}
          >
            <img src={image} alt={`${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selection;
