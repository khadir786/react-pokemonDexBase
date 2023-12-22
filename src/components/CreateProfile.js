import React from "react";
import PartnerPick from "./PartnerPick";
import AvatarPick from "./AvatarPick"
import "../css/create-profile.css"

export default function CreateProfile() {
    return (
        <div className="CreateProfileContainer">
            <PartnerPick />
            <AvatarPick />
        </div>
    )
}