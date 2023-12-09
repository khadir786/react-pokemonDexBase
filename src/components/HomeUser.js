import React, { useState, useEffect } from "react";
import Header from "./Header";
import '../css/home-user.css';

// this page will be generated from server-side data
// the page before this, (probably Login.js) will pass an object in state that contains the user's information
// so far, there is nothing in the user's information thats really custom except for their username
// so we will just use the username as the title

export default function Home_User(props) {
    const username = "user";
    return (
        <div className="Home-container">
            <Header />
            <div>
                <h1>Welcome to your profile page {username}!</h1>
            </div>
        </div>

    )
}