import React from "react"
import logo from '../img/logo.png'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
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

    console.log("avatar for profile pic: ", userData.avatar);
    return (

        <nav style={{ width: '100%' }} className={isLoggedIn ? "headerLogged" : "header"}>
            <img className="Logo" alt="logo" src={logo} />
            {
                isLoggedIn &&
                <div className="header-right">
                    {userData &&
                        <div className="profile-pic-Container">
                            <img className="profile-pic" src={`https://play.pokemonshowdown.com/sprites/trainers/${userData.avatar}.png`} alt="profile pic" />
                        </div>
                    }
                    <Button variant="secondary" className="LogoutButton" onClick={handleLogout}>Logout</Button>
                </div>
            }

        </nav>


    )
}