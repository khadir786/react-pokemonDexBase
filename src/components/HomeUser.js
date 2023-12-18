import React, { useState, useEffect } from "react";
import Header from "./Header";
import '../css/home-user.css';
import { useLocation } from "react-router-dom";
import Partners from "./data/PartnerData.js";
import { getUser } from "../apiService.js";


export default function HomeUser() {
    const [userData, setUserData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const userID = location.state?.user.id;
    const partners = Partners.data.partner;

    useEffect(() => {
        getUser(userID)
            .then(response => {
                //Handle success...
                console.log(response);
                setUserData(response);
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.error('Error getting user details...:', error.response.data);
                    setErrorMessage("Error getting user details...");
                }
            })
    }, [])
    

    const foundPartner = partners.find(partner => partner.name === userData.partnerPokemon);


    return (
        <div>
            <Header />
            <div className="user-content">
                {userData && <h1>Welcome, {userData.username}</h1>}
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
