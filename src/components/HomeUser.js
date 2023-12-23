import React, { useState, useEffect } from "react";
import Header from "./Header";
import '../css/home-user.css';
import { useLocation } from "react-router-dom";
import Partners from "./data/PartnerData.js";
import Avatars from "./data/TrainerSpriteNames.js";
import { getUser } from "../apiService.js";
import { useNavigate } from "react-router-dom";


// Any time the user is redirected, userID must be passed along with it. 
// And then in the new page, if redirected back to the original, that userID must be passed back
// This is recieved through location

export default function HomeUser() {
    const [userData, setUserData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const userID = location.state?.id;
    const avatars = Avatars.data.trainers;
    const partners = Partners.data.partner;
    const navigate = useNavigate(); 

        useEffect(() => {
            getUser(userID)
                .then(response => {
                    //Handle success...
                    console.log(response);
                    setUserData(response);
                    if (!response.avatar || !response.partnerPokemon) {
                        navigate("/create-profile", { state: { id: userID }});
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        console.error('Error getting user details...:', error.response.data);
                        setErrorMessage("Error getting user details...");
                    }
                })
        }, [])
    

    const foundAvatar = avatars.find(avatar => avatar.name === userData.avatar);
    const foundPartner = partners.find(partner => partner.name === userData.partnerPokemon);

    return (
        <div>
            <Header />
            <div className="user-content">
                {userData && <h1>Welcome, {userData.username}</h1>}
                {foundAvatar &&
                    <div className="user-avatar">
                        <h1>Avatar: {foundAvatar.name}</h1>
                        <img src={`https://play.pokemonshowdown.com/sprites/trainers/${foundAvatar.name}.png`} alt="Avatar"/>
                    </div>
                }
                {foundPartner &&
                    <div className="user-partner">
                        <h1>Partner Pokemon: {foundPartner.name}</h1>
                        <img src={foundPartner.image} alt="Partner Pokemon"/>
                    </div>
                }
                {errorMessage && <div className="error">{errorMessage}</div>}
            </div>
        </div>
    );
}
