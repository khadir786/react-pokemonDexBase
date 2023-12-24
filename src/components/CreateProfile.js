import React, { useState } from "react";
import Header from "./Header";
import AvatarPick from "./AvatarPick";
import PartnerPick from "./PartnerPick";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

import "../css/create-profile.css";
import "../css/carousel.css";

export default function CreateProfile() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSelectSlide = (selectedIndex) => {
        console.log('Selected Index:', selectedIndex);
        setActiveIndex(selectedIndex);
        handleToggleExpansion();
    };

    const toggleActiveIndex = () => {
        if (activeIndex === 1) {
            handleToggleExpansion();
            return setActiveIndex(0);

        } else {
            handleToggleExpansion();
            return setActiveIndex(1);
        }
    }

    console.log("Active index:" + activeIndex);
    return (
        <div className={`PageContainer ${isExpanded ? 'expanded' : ''}`}>
            <Header />
            <div
                className={`CreateProfileContainer ${isExpanded ? 'expanded' : ''}`}
            >
                <h1 className="ProfileTitle">Create Your Profile</h1>
                <div className="carousel-container">
                    <Carousel
                        activeIndex={activeIndex}
                        onSelect={handleSelectSlide}
                        interval={null}
                        indicators={false}
                        keyboard={true}
                        controls={false}
                    >
                        <Carousel.Item key={0}>
                            <div className="Profile-AvatarContainer">
                                <h2 className="SectionTitle">Select Your Avatar</h2>
                                <AvatarPick />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item key={1}>
                            <div className="Profile-PartnerContainer">
                                <h2 className="SectionTitle">Select Your Partner Pokemon</h2>
                                <PartnerPick />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
                {activeIndex === 0 ? <Button variant="primary" onClick={toggleActiveIndex}>Next</Button> :
                <Button variant="outline-secondary" onClick={toggleActiveIndex}>Back</Button>}
            </div>
        </div>
    );
}
