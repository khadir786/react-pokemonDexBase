import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import AvatarPick from "./AvatarPick";
import PartnerPick from "./PartnerPick";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

import "../css/create-profile.css";
import "../css/carousel.css";

export default function CreateProfile() {
    const location = useLocation();
    const userID = location.state?.id;
    const [activeIndex, setActiveIndex] = useState(0);
    const [userData, setUserData] = useState(
        {
            id: userID,
            avatar: 'red-gen2',
            partnerPokemon: null
        })

    console.log(userData);


    const handleSelectSlide = (selectedIndex) => {
        console.log('Selected Index:', selectedIndex);
        setActiveIndex(selectedIndex);
    };

    const toggleActiveIndex = () => {
        if (activeIndex === 1) {
            return setActiveIndex(0);

        } else {
            return setActiveIndex(1);
        }
    }

    console.log("Active index:" + activeIndex);
    return (
        <div className={`PageContainer`}>
            <Header />
            <div
                className={`CreateProfileContainer ${activeIndex === 0 ? 'avatar' 
                : activeIndex === 1 ? 'partner' 
                : 'confirm'}`}
            >
                <h1 className="ProfileTitle">Who are you?</h1>
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
                                <AvatarPick userData={userData} setUserData={setUserData} />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item key={1}>
                            <div className="Profile-PartnerContainer">
                                <h2 className="SectionTitle">Select Your Partner Pokemon</h2>
                                <PartnerPick userData={userData} setUserData={setUserData} />
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
