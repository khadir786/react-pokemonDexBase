import React, { useState } from "react";
import Header from "./Header";
import AvatarPick from "./AvatarPick";
import PartnerPick from "./PartnerPick";
import Carousel from 'react-bootstrap/Carousel';

import "../css/create-profile.css";
import "../css/carousel.css";

export default function CreateProfile() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectSlide = (selectedIndex) => {
        console.log('Selected Index:', selectedIndex);
        setActiveIndex(selectedIndex);
    };

    return (
        <div className="PageContainer">
            <Header />
            <div className="CreateProfileContainer">
                <h1 className="ProfileTitle">Create Your Profile</h1>
                <div className="carousel-container">
                    <Carousel
                        activeIndex={activeIndex}
                        onSelect={handleSelectSlide}
                        interval={null}
                        indicators={true}
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
            </div>
        </div>
    );
}
