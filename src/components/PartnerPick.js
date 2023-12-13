import React from "react";
import Selection from "./sub_components/Selection";
import eevee from "../img/eevee.gif"
import oshawott from "../img/oshawott.gif"
import pikachu from "../img/pikachu.gif"
import riolu from "../img/riolu.gif"
import rotom from "../img/rotom.gif"


const pokemon = [
    eevee,
    oshawott,
    pikachu,
    riolu,
    rotom
]

export default function PartnerPick() {
    return (
        <div className="partners">
            <h1>Partners in Crime</h1>
            <Selection images={pokemon} />
        </div>
    )
}