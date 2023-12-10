import React, { useState, useEffect } from "react";
import Header from "./Header";
import '../css/home-user.css';
import { useLocation } from "react-router-dom";

// this page will be generated from server-side data
// the page before this, (probably Login.js) will pass an object in state that contains the user's information
// might be a better idea to save the data in localstorage
// so far, there is nothing in the user's information thats really custom except for their username
// so we will just use the username as the title

export default function HomeUser() {
    const location = useLocation();
    const userData = location.state?.user;
    console.log(userData);
    return (
        <div className="Home-container">
            <div className="user-header"><Header /></div>
            <div className="user-content">
                {userData && <h1>Welcome, {userData.username}</h1>}
            </div>
        </div>

    )
}