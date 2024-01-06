import React from "react";
import Collapse from 'react-bootstrap/Collapse';

export default function PartnerPokemon({ openEntry, setOpenEntry, foundPartner }) {
    return (
        <div className="user-partner"
            onClick={() => setOpenEntry(!openEntry)}
            aria-controls="dexEntry"
            aria-expanded={openEntry}
        >
            <img className="preview"
                src={foundPartner.image}
                alt="Partner Pokemon"
            />
            <p className="avatar-caption">{foundPartner.name}</p>
            <Collapse in={openEntry}>
                <div id={`dexEntry${openEntry === true ? '-active' : ''}`}>
                    {foundPartner.dexEntry}
                    <p className="dex-footer">
                        From the <cite title="PokeDex">PokeDex</cite>
                    </p>
                </div>
            </Collapse>
        </div>
    )
}