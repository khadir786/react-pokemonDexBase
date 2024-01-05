import React, { useState, useEffect } from "react";
import Avatars from "./data/TrainerSpriteNames.js";
import Partners from "./data/PartnerData.js";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { getUser, logoutUser } from "../apiService.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UseContext.js";
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import '../css/home-user.css';

export default function HomeUser({ isLoggedIn, setIsLoggedIn }) {
    const [userData, setUserData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const avatars = Avatars.data.trainers;
    const partners = Partners.data.partner;
    const navigate = useNavigate();
    const { isLoading, user, logout } = useUser();

    useEffect(() => {
        if (!isLoading) {
            if (user) {
                const userID = user.id;
                getUser(userID)
                    .then(response => {
                        // Handle success...
                        console.log(response);
                        setUserData(response);
                        if (!response.avatar || !response.partnerPokemon) {
                            navigate("/create-profile", { state: { id: userID, username: location.state?.username } });
                        }
                    })
                    .catch(error => {
                        if (error.response && error.response.data) {
                            console.error('Error getting user details...:', error.response.data);
                            setErrorMessage("Error getting user details...");
                        }
                    })
            } else {
                logoutUser()
                    .then(response => {
                        console.log(response)
                        console.log("logout success");
                    })
                    .catch(error => { console.log(error.toString()) })
                    .finally(() => {
                        logout();
                        setIsLoggedIn(false);
                        navigate("/login");
                    })
            }
        }
    }, [user, isLoading])

    const foundAvatar = avatars.find(avatar => avatar.name === userData.avatar);
    const foundPartner = partners.find(partner => partner.name === userData.partnerPokemon);

    return (
        <div className="home-user">
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className="user-content">
                <h1 className="user-welcome">Welcome!</h1>
                {isLoading === false ? 
                    <div className="user-info-container">
                        <div className="user-info">
                            {foundAvatar && (
                                <div className="user-avatar">
                                    <img src={`https://play.pokemonshowdown.com/sprites/trainers/${foundAvatar.name}.png`} alt="Avatar" />
                                    <p className="avatar-caption">{userData.username}</p>
                                </div>
                            )}
                            {foundPartner && (
                                <div className="user-partner">
                                    <img className="preview" src={foundPartner.image} alt="Partner Pokemon" />
                                    <p className="avatar-caption">{foundPartner.name}</p>
                                </div>
                            )}
                        </div>
                    </div> : <Dots />

                }
                {errorMessage && <div className="error">{errorMessage}</div>}
            </div>
        </div>
    );
}
