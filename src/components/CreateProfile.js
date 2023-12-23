import React from "react";
import PartnerPick from "./PartnerPick";
import AvatarPick from "./AvatarPick"
import Header from "./Header";
import "../css/create-profile.css"


export default function CreateProfile() {
    return (
        <div className="PageContainer">
            <Header />
            <h1>Create Your Profile</h1>
            <div className="CreateProfileContainer">
                <div className="Profile-AvatarContainer">
                    <AvatarPick />
                </div>

                <div className="Profile-PartnerContainer">
                    <PartnerPick />
                </div>
            </div>
        </div>
    )
}