import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../apiService";
import Header from "./Header";
import AvatarPick from "./AvatarPick";
import PartnerPick from "./PartnerPick";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Confirmation from "./Confirmation";

import "../css/create-profile.css";
import "../css/carousel.css";

export default function CreateProfile({ isLoggedIn, setIsLoggedIn }) {
    const location = useLocation();
    const userID = location.state?.id;
    const navigate = useNavigate();
    const [dob, setDob] = useState('2000-01-01');;
    const [activeIndex, setActiveIndex] = useState(0);
    const [userData, setUserData] = useState(
        {
            avatar: 'red-gen2',
            partnerPokemon: null,
            DoB: null
        })

    console.log(userData);
    console.log(dob)


    const handleSelectSlide = (selectedIndex) => {
        console.log('Selected Index:', selectedIndex);
        setActiveIndex(selectedIndex);
    };

    const goNext = () => {
        console.log("go next");
        setActiveIndex(prevActiveIndex => prevActiveIndex + 1)
        console.log(activeIndex);
    }

    const goBack = () => {
        console.log("go back");
        setActiveIndex(prevActiveIndex => prevActiveIndex - 1)
    }

    const handleDateChange = (event) => {
        const newDob = event.target.value;
        setDob(newDob);
        setUserData(prevUserData => ({
            ...prevUserData,
            DoB: newDob
        }))

    };

    function findNullProperties(obj) {
        const nullProperties = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] === null) {
                nullProperties.push(key);
            }
        }
        return nullProperties;
    }

    const handleConfirm = async (userID, userData) => {
        if (userData.avatar === null || userData.partnerPokemon === null || userData.DoB === null) {
            const nullProperties = findNullProperties(userData);
            console.log("Null properties:", nullProperties.join(", "));
            return console.log("At least one of the values is null");
        } else {
            const request = { "avatar": userData.avatar, "partnerPokemon": userData.partnerPokemon.name, "dob": userData.dob }
            updateUser(userID, request)
                .then((response) => {
                    console.log(response);
                    navigate('/home');
                }
                )
                .catch(error => {
                    console.log("Update failed: ", error)
                })
        }
    }

    console.log("Active index:" + activeIndex);
    return (
        <div className={`PageContainer`}>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} logged={true} />
            <div
                className={`CreateProfileContainer ${activeIndex === 0 ? 'age'
                    : activeIndex === 1 ? 'avatar'
                        : activeIndex === 2 ? 'partner'
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
                            <div className="Profile-AgeContainer">
                                <h2 className="SectionTitle">How old are you?</h2>
                                <label htmlFor="dobInput">Date of Birth:</label>
                                <input
                                    className="input-dob"
                                    type="date"
                                    id="dobInput"
                                    name="dob"
                                    value={dob}
                                    min="1900-01-01"
                                    max={new Date().toISOString().split('T')[0]} // Set the max to the current date
                                    onChange={handleDateChange}
                                />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item key={1}>
                            <div className="Profile-AvatarContainer">
                                <h2 className="SectionTitle">Select Your Avatar</h2>
                                <AvatarPick userData={userData} setUserData={setUserData} />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item key={2}>
                            <div className="Profile-PartnerContainer">
                                <h2 className="SectionTitle">Select Your Partner Pokemon</h2>
                                <PartnerPick userData={userData} setUserData={setUserData} />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item key={3}>
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
                <div className="button-container">
                    {activeIndex === 0 ? (
                        <Button variant="primary" onClick={goNext}>Next</Button>
                    ) : (
                        <div className="ProfileButtons">
                            <Button variant="outline-secondary" onClick={goBack}>Back</Button>
                            {activeIndex === 1 || activeIndex === 2 ? (
                                <Button variant="primary" onClick={goNext}>Next</Button>
                            ) : (
                                <Button variant="primary" onClick={() => { handleConfirm(userID, userData); }}>Confirm</Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
