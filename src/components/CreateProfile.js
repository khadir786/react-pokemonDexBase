import React from "react";
import Header from "./Header";
import AvatarPick from "./AvatarPick";
import PartnerPick from "./PartnerPick";
import "../css/create-profile.css";

export default function CreateProfile() {
  return (
    <div className="PageContainer">
      <Header />
      <div className="CreateProfileContainer">
        <h1 className="ProfileTitle">Create Your Profile</h1>
        <div className="Profile-AvatarContainer">
          <h2 className="SectionTitle">Select Your Avatar</h2>
          <AvatarPick />
        </div>
        <div className="Profile-PartnerContainer">
          <h2 className="SectionTitle">Select Your Partner Pokemon</h2>
          <PartnerPick />
        </div>
      </div>
    </div>
  );
}
