import React from "react";

export default function Confirmation( {userData, username, activeIndex, setActiveIndex} ) {


    const avatar = userData.avatar;

    return (
        <div className="Confirmation-Container">
            <div className="selected-avatar">
        <img
          src={`https://play.pokemonshowdown.com/sprites/trainers/${avatar}.png`}
          alt={avatar}
          onClick={() => (setActiveIndex(0))}
        />
      </div>
      <h1>{username}</h1>   
        </div>
    )
}