import React from "react"
import logo from '../img/logo.png'
export default function Header() {
    return (

        <nav style={{width: '100%'}} className="header">
            <img className="Logo" alt="logo" src={logo} />
        </nav>

    )
}