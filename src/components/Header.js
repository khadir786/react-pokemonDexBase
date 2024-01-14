import React from "react"
import logo from '../img/logo.png'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
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
                            <OverlayTrigger
                                trigger="click"
                                placement="bottom"
                                overlay={
                                    <Popover id={`popover-positioned-bottom`}>
                                        <Popover.Body style={{padding: '5px'}}>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item action className="menu-items">Edit Profile</ListGroup.Item>
                                            </ListGroup>
                                        </Popover.Body>
                                    </Popover>
                                }
                            >
                                <img className="profile-pic" src={`https://play.pokemonshowdown.com/sprites/trainers/${userData.avatar}.png`} alt="profile pic"
                                />
                            </OverlayTrigger>
                        </div>
                    }
                    <Button variant="secondary" className="LogoutButton" onClick={handleLogout}>Logout</Button>
                </div>
            }

        </nav>


    )
}