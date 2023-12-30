import React from "react";

export default function Confirmation({ userData, username, activeIndex, setActiveIndex }) {


  const avatar = userData.avatar;
  console.log(userData);

  return (
    <div className="Confirmation-Container">
      <div className="selected-avatar">
        <img
          src={`https://play.pokemonshowdown.com/sprites/trainers/${avatar}.png`}
          alt={avatar}
          onClick={() => (setActiveIndex(0))}
        />
      </div>
      <div className="Confirmation-username">
        <h1>{username}</h1>
      </div>
      <div className="Confirmation-spriteContainer">
        <img
          src={userData.partnerPokemon?.image}
          alt={userData.partnerPokemon?.name}
          onClick={() => (setActiveIndex(1))}
        />
      </div>
      <>
        <p>{userData.partnerPokemon?.name}</p>
      </>
      <div className="Confirmation-officialImageContainer">
        <img
          className="Confirmation-officialImage"
          src={userData.partnerPokemon?.officialImage}
          alt={userData.partnerPokemon?.name}
        />
      </div>
    </div>
  )
}