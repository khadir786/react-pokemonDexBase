import React from "react";
import Selection from "./sub_components/Selection";
import PartnerSprites from "./data/PartnerSprites.js";

export default function PartnerPick() {
    const partners = PartnerSprites.data.partner
    return (
        <div className="partners">
            <Selection images={partners} />
        </div>
    )
}