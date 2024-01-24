import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Nav from 'react-bootstrap/Nav';
import Regions from "./data/RegionData"

import '../css/region.css'

const regions = Regions.data.regions;

export default function RegionSelect({ userData, setUserData, edit }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState(null);

    console.log(selectedRegion)

    const handleSelectSlide = (selectedIndex) => {
        console.log('Selected Index:', selectedIndex);
        console.log('Image Name:', regions);
        setActiveIndex(selectedIndex);
        setSelectedRegion(regions[selectedIndex].name);
        if (edit) {
            setUserData({ region: regions[selectedIndex].name })
        } else {
            setUserData(prevUserData => ({
                ...prevUserData,
                region: regions[selectedIndex].name,
            }))
        }
    };

    const region = regions.find(region => region.name === userData.region);
    return (
        <div className="Region-Select">
            <div className='Region-Nav'>
                <Nav fill variant="tabs">
                    {regions.map((region, index) => (
                        <Nav.Item key={index}>
                            <Nav.Link onClick={() => (handleSelectSlide(index))}>{region.name}</Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>

            <Carousel
                activeIndex={activeIndex}
                onSelect={handleSelectSlide}
                interval={null}
                indicators={false}
                keyboard={true}
            >
                {regions.map((region, index) => (
                    <Carousel.Item key={index}>
                        <img className="Region-Image" key={index} src={region.image} alt={`${index}`} />
                        <p>{region.name}</p>
                    </Carousel.Item>
                ))}
            </Carousel>

        </div>
    )
}