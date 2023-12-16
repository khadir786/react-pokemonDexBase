import React from "react";
import Selection from "./sub_components/Selection";
import PartnerSprites from "./data/PartnerData.js";
import Header from "./Header.js"
import "../css/partner.css"

export default function PartnerPick() {
    const partners = PartnerSprites.data.partner
    return (
        <>
            <Header />
            <div className="partners">
                <Selection images={partners} />
            </div>
        </>
    )
}