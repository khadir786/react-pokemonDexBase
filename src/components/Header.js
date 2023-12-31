import React from "react"
import logo from '../img/logo.png'
import Button from 'react-bootstrap/Button';
import { logoutUser } from "../apiService";
import {  useNavigate } from "react-router-dom";

export default function Header({ logged }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            console.log("logout success");
            logged = false;
            navigate("/login");
        } catch (error) {
            console.log(error.toString());
        }

    };

    return (
        <nav style={{ width: '100%' }} className={logged ? "headerLogged" : "header"}>
            <img className="Logo" alt="logo" src={logo} />
            {logged &&
                <Button variant="secondary" className="LogoutButton" onClick={handleLogout}>Logout</Button>}
        </nav>

    )
}