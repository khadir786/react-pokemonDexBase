import React, { useState, useEffect, useRef } from 'react';
import '../../css/selection.css';
import Carousel from 'react-bootstrap/Carousel';

const Selection = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [activePokemon, setActivePokemon] = useState(null);
  const containerRef = useRef(null);

  const handlePreviewClick = (index, pokemon) => {
    setActiveIndex(index);
    setActivePokemon(pokemon.name);
  };

  const handleSelectSlide = (selectedIndex) => {
    console.log('Selected Index:', selectedIndex);
    console.log('Image Name:', images[selectedIndex].name);

    setActiveIndex(selectedIndex);
  };

  console.log(activePokemon);

  return (
    <div className="Selection" ref={containerRef}>
      <div className="selection-container">
        <div className="previews">
          {images.map((image, index) => (
            <div
              key={index}
              className={`preview ${index === activeIndex ? 'active' : 'notActive'}`}
              onClick={() => handlePreviewClick(index, image)}
            >
              <img src={image.image} alt={`${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-container">
      </div >
      <Carousel activeIndex={activeIndex}
        onSelect={handleSelectSlide}
        interval={null}
        indicators={false}
        keyboard={true}
        controls={false}>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img src={image.officialImage} alt={`${image.name}`} />
            <Carousel.Caption><div>
              <h3>{image.name}</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

    </div>
  );
};

export default Selection;
