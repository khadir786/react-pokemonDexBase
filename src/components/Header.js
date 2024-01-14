import React from "react"
import logo from '../img/logo.png'
import Button from 'react-bootstrap/Button';
import { logoutUser } from "../apiService";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UseContext";

export default function Header({ isLoggedIn, setIsLoggedIn, logged, userData }) {
    const navigate = useNavigate();
    const { logout } = useUser();

    const handleLogout = async () => {
        logoutUser()
            .then(response => {
                console.log(response)
                console.log("logout success");
            })
            .catch(error => { console.log(error.toString()) })
            .finally(() => {
                logout();
                setIsLoggedIn(false);
                navigate("/login");
            })
    };

    return (
        <nav style={{ width: '100%' }} className={isLoggedIn ? "headerLogged" : "header"}>
            <img className="Logo" alt="logo" src={logo} />
            {isLoggedIn &&
                <Button variant="secondary" className="LogoutButton" onClick={handleLogout}>Logout</Button>}
        </nav>

    )
}