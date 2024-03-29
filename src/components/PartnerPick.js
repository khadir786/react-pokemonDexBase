import React, { useState, useEffect, useRef } from 'react';
import PartnerSprites from "./data/PartnerData.js";
import '../css/selection.css';
import Carousel from 'react-bootstrap/Carousel';

export default function PartnerPick({ userData, setUserData, edit }) {
    const partners = PartnerSprites.data.partner
    {
        const [activeIndex, setActiveIndex] = useState(2);
        const [activePokemon, setActivePokemon] = useState(null);
        const [activeEntry, setActiveEntry] = useState("");
        const containerRef = useRef(null);

        const handlePreviewClick = (index, pokemon) => {
            setActiveIndex(index);
            setActivePokemon(pokemon.name);
            if (edit) {
                setUserData({ partnerPokemon: pokemon })
            } else {
                setUserData(prevUserData => ({
                    ...prevUserData,
                    partnerPokemon: pokemon
                }))
            }
            setActiveEntry(pokemon.dexEntry);
        };

        const handleSelectSlide = (selectedIndex) => {
            console.log('Selected Index:', selectedIndex);
            console.log('Image Name:', partners[selectedIndex].name);
            setActiveIndex(selectedIndex);
        };

        const typeWriter = (text) => {
            let i = 0;
            const speed = 20;
            const dexEntryElement = document.querySelector('.dexEntry.active'); // Select the .dexEntry element

            const type = () => {
                if (i < text.length) {
                    dexEntryElement.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            };

            type();
        };

        useEffect(() => {
            // Clear the dexEntry text when the activeEntry changes
            document.querySelectorAll('.dexEntry').forEach(element => {
                element.innerHTML = '';
                element.classList.remove('active');
            });

            const dexEntryElements = document.querySelectorAll('.dexEntry');
            dexEntryElements[activeIndex].classList.add('active');
            typeWriter(activeEntry); // Start the animation with the new dexEntry text
        }, [activePokemon]);

        return (
            <div className="Selection" ref={containerRef}>
                <div className="selection-container">
                    <div className="previews">
                        {partners.map((pokemon, index) => (
                            <div
                                key={index}
                                className={`preview ${index === activeIndex ? 'active' : 'notActive'}`}
                                onClick={() => handlePreviewClick(index, pokemon)}
                            >
                                <img src={pokemon.image} alt={`${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pokemon-carousel-container">
                    <Carousel
                        activeIndex={activeIndex}
                        onSelect={handleSelectSlide}
                        interval={null}
                        indicators={false}
                        keyboard={true}
                        controls={false}
                    >
                        {partners.map((pokemon, index) => (
                            <Carousel.Item key={index}>
                                <img className="pokemonImage" src={pokemon.officialImage} alt={`${pokemon.name}`} />
                                <h3 className='pokemonName'>{pokemon.name}</h3>
                                <div className="dexContainer">
                                    <p className={`dexEntry ${index === activeIndex ? 'active' : ''}`}></p>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
        );
    };
};