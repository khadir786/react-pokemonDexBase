import React, { useState } from "react";

export default function DoB({ userData, setUserData }) {
    const [dob, setDob] = useState('2000-01-01');


    const handleDateChange = (event) => {
        const newDob = event.target.value;
        setDob(newDob);
        setUserData(prevUserData => ({
            ...prevUserData,
            dob: newDob
        }))

    };
    return (

        <div className="Profile-AgeContainer">
            <h2 className="SectionTitle">How old are you?</h2>
            <label htmlFor="dobInput">Date of Birth:</label>
            <input
                className="input-dob"
                type="date"
                id="dobInput"
                name="dob"
                value={dob}
                min="1900-01-01"
                max={new Date().toISOString().split('T')[0]} // Set the max to the current date
                onChange={handleDateChange}
            />
        </div>
    );
}