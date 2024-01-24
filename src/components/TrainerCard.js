import React, { useEffect, useState } from 'react';
import { useUser } from "./UseContext.js";
import { fetchUserInfo } from '../utils/fetchUserInfo.js';

import '../css/trainer-card.css';

const TrainerCard = ({ cardImage }) => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null)
  const [age, setAge] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("fetching user...");
        const userResponse = await fetchUserInfo();
        setUserData(userResponse);
  
        const dobDate = userResponse.dob
          ? new Date(`${userResponse.dob.split('-')[2]}-${userResponse.dob.split('-')[1]}-${userResponse.dob.split('-')[0]}`)
          : null;
        setAge(calculateAge(dobDate));
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error appropriately, e.g., set an error state or show an error message
      }
    }
  
    fetchData();
  }, []);
  

  function calculateAge(dob) {
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }


  return (
    userData && (
    <div className="trainer-card" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg/trainerCards/${cardImage}` }}>
      <img className="trainer-image" src={`https://play.pokemonshowdown.com/sprites/trainers/${userData.avatar}.png`} alt={userData.username} />
      <div className="trainer-info">
        <h2 className="trainer-id">ID: {user.id}</h2>
        <h2 className="trainer-name">Name: {userData.username}</h2>
        <p className="trainer-age">Age: {age}</p>
        <p className="trainer-location">Location: {userData.region}</p>
      </div>
    </div>
    )
  );
};

export default TrainerCard;
