import React, { useState, useEffect } from "react";
import TrainerSprites from "./data/TrainerSpriteNames.js";


export default function TrainerList() {
  const trainers = TrainerSprites.data.trainers
  console.log(trainers)

  return (
    <div>
      <h1 style={{color: "red"}}>List of Trainers</h1>
      <ul>
        {trainers.map((trainer) => (
          <li key={trainer}>
            <img
              src={`https://play.pokemonshowdown.com/sprites/trainers/${trainer.name}.png`}
              alt={trainer.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
