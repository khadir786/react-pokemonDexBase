import React from 'react';
import { useUser } from "./UseContext.js";

import '../css/trainer-card.css';

const TrainerCard = ({ username, avatar, dob, region }) => {
  
  const { user } = useUser();

  function calculateAge(dob) {
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const dobDate = new Date(`${dob.split('-')[2]}-${dob.split('-')[1]}-${dob.split('-')[0]}`);
  const age = calculateAge(dobDate);

  return (
    <div className="trainer-card">
      <img className="trainer-image" src={`https://play.pokemonshowdown.com/sprites/trainers/${avatar}.png`} alt={username} />
      <div className="trainer-info">
        <h2 className="trainer-id">ID: {user.id}</h2>
        <h2 className="trainer-name">Name: {username}</h2>
        <p className="trainer-age">Age: {age}</p>
        <p className="trainer-location">Location: {region}</p>
      </div>
    </div>
  );
};

export default TrainerCard;
