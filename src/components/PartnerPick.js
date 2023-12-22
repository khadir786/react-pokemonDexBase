import React from "react";
import Selection from "./sub_components/Selection";
import PartnerSprites from "./data/PartnerData.js";

export default function PartnerPick() {
    const partners = PartnerSprites.data.partner
    return (
            <Selection images={partners} />
    )
}