import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import AvatarPick from "./AvatarPick";
import PartnerPick from "./PartnerPick";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Confirmation from "./Confirmation";

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

    const goNext = () => {
        console.log("go next");
        if (activeIndex === 0) {
            return setActiveIndex(1);

        } else {
            return setActiveIndex(2);
        }
    }

    const goBack = () => {
        console.log("go back");
        if (activeIndex === 2) {
            return setActiveIndex(1);

        } else {
            return setActiveIndex(0);
        }
    }

    console.log("Active index:" + activeIndex);
    return (
        <div className={`PageContainer`}>
            <Header />
            <div
                className={`CreateProfileContainer ${activeIndex === 0 ? 'avatar'
                    : activeIndex === 1 ? 'partner'
                        : 'confirmation'}`}
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
                        <Carousel.Item key={2}>
                            <div className="Profile-ConfirmContainer">
                                <h2 className="SectionTitle">Confirm</h2>
                                <Confirmation
                                    userData={userData}
                                    username={location.state?.username}
                                    activeIndex={activeIndex}
                                    setActiveIndex={setActiveIndex} />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
                {
                    activeIndex === 0 ? <Button variant="primary" onClick={goNext}>Next</Button> :
                        <div className="ProfileButtons">
                            <Button variant="outline-secondary" onClick={goBack}>Back</Button>
                            {activeIndex === 1 ? <Button variant="primary" onClick={goNext}>Next</Button>
                                : <Button variant="primary" onClick={() => {}}>Confirm</Button>}
                        </div>
                }
            </div>
        </div>
    );
}
