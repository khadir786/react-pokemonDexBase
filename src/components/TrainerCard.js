import React from 'react';
import '../css/trainer-card.css'; 

const TrainerCard = ({ username, avatar }) => {
  return (
    <div className="trainer-card">
      <img className="trainer-image" src={`https://play.pokemonshowdown.com/sprites/trainers/${avatar.name}.png`} alt={username} />
      <div className="trainer-info">
        <h2 className="trainer-name">{username}</h2>
        <p className="trainer-age">Age: 20</p>
        <p className="trainer-location">Location: Sinnoh</p>
      </div>
    </div>
  );
};

export default TrainerCard;
