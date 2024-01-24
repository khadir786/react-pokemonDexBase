import React from "react"
import logo from '../img/logo.png'
import ProfileMenu from "./sub_components/ProfileMenu";
import { Button } from "react-bootstrap";
import { logoutUser } from "../apiService";
import { useUser } from "./UseContext";
import { useNavigate } from "react-router-dom";

export default function Header({ isLoggedIn, setIsLoggedIn, userData }) {
    const { logout } = useUser();
    const navigate = useNavigate();

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
            <img className={isLoggedIn ? "logoLogged" : "Logo"} alt="logo" src={logo} />
            {
                isLoggedIn &&
                <div className="header-right">
                    {userData ?
                        <ProfileMenu
                            userData={userData}
                            setIsLoggedIn={setIsLoggedIn}
                            handleLogout={handleLogout}
                        />
                        : <Button variant="secondary" onClick={handleLogout}>Logout</Button>
                    }
                </div>
            }
        </nav>
    )
}