import React, { useState, useEffect } from "react";
import TrainerCard from "./TrainerCard";

export default function TrainerCardSelect({ userData, setUserData }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const cards = [
        'defaultCard.jpg',
        'charizardCard.jpg',
        'mismagiusCard.jpg',
        'ho-ohCard.jpg',
        'panchamCard.png',
        'drifloonCard.jpg',
        'ursaringCard.jpg',
        'duskullCard.jpg',
    ];

    useEffect(() => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            cardImage: cards[activeIndex],
        }));
    }, [activeIndex, setUserData]);

    const handleBackOrNext = (backOrNext) => {
        if (backOrNext === "back") {
            setActiveIndex((prevActiveIndex) => prevActiveIndex - 1);
        } else {
            setActiveIndex((prevActiveIndex) => prevActiveIndex + 1);
        }
    };

    return (
        <div className="TrainerCardSelect-Container">
            {activeIndex > 0 && (
                <h1 className="Card-Back" onClick={() => handleBackOrNext("back")}>
                    {"<"}
                </h1>
            )}

            <TrainerCard
                username={userData.username}
                avatar={userData.avatar}
                dob={userData.dob}
                region={userData.region}
                cardImage={cards[activeIndex]}
            />
            {activeIndex < cards.length - 1 && (
                <h1 className="Card-Next" onClick={() => handleBackOrNext("next")}>
                    {">"}
                </h1>
            )}
        </div>
    );
}
