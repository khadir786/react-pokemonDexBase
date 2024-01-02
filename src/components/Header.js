import React from "react"
import logo from '../img/logo.png'
import Button from 'react-bootstrap/Button';
import { logoutUser } from "../apiService";
import { useNavigate } from "react-router-dom";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

export default function Header({ isLoggedIn, setIsLoggedIn, logged }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        logoutUser()
            .then(response => {
                console.log(response)
                console.log("logout success");
                localStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
                
                logged = false;
                navigate("/login");
            })
            .catch(error => {console.log(error.toString())})
    };

    return (
        <nav style={{ width: '100%' }} className={isLoggedIn ? "headerLogged" : "header"}>
            <img className="Logo" alt="logo" src={logo} />
            {isLoggedIn &&
                <Button variant="secondary" className="LogoutButton" onClick={handleLogout}>Logout</Button>}
        </nav>

    )
}