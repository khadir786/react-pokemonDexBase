import React, { useState, useEffect } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ListGroup, Button, Fade } from "react-bootstrap";
import AvatarPick from "./AvatarPick";
import PartnerPick from "./PartnerPick";
import RegionSelect from "./RegionSelect";
import { getUser, logoutUser } from "../apiService.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UseContext.js";
import '../css/update-profile.css';

export default function Profile() {
    const [activeComponent, setActiveComponent] = useState("Avatar");
    const [showFade, setShowFade] = useState(true);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const { isLoading, user, logout } = useUser();

    console.log(userData);
    useEffect(() => {
        if (!isLoading) {
            if (user) {
                const userID = user.id;
                getUser(userID)
                    .then(response => {
                        // Handle success...
                        console.log(response);
                        setUserData(user);
                    })
                    .catch(error => {
                        if (error.response && error.response.data) {
                            console.error('Error getting user details...:', error.response.data);
                            logout();
                        }
                    })
            } else {
                logoutUser()
                    .then(response => {
                        console.log(response)
                        console.log("logout success");
                    })
                    .catch(error => { console.log(error.toString()) })
                    .finally(() => {
                        logout();
                        navigate("/login");
                    })
            }
        }
    }, [user, isLoading])

    const handleClick = (component) => {
        setShowFade(false);
        setTimeout(() => {
            setActiveComponent(component);
            setShowFade(true);
        }, 200);
    }

    return (
        <div className="ProfilePage-Container">
            <Fade in={showFade}>

                <div className="ProfileContent">
                    <Offcanvas show={true} backdrop={false} data-bs-theme="dark">
                        <Offcanvas.Header>
                            <Offcanvas.Title>Edit Profile</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ padding: 0 }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item action onClick={() => {
                                    handleClick("Avatar");
                                }}>Avatar
                                </ListGroup.Item>
                                <ListGroup.Item action onClick={() => {
                                    handleClick("DoB");
                                }}>Date of Birth
                                </ListGroup.Item>
                                <ListGroup.Item action onClick={() => {
                                    handleClick("Region");
                                }}>Region
                                </ListGroup.Item>
                                <ListGroup.Item action onClick={() => {
                                    handleClick("Partner");
                                }}>Partner Pokemon
                                </ListGroup.Item>
                            </ListGroup>
                        </Offcanvas.Body>
                    </Offcanvas>

                    <div
                        className={`UpdateProfileContainer ${activeComponent === 'Age' ? 'age'
                            : activeComponent === 'Avatar' ? 'avatar'
                                : activeComponent === 'Region' ? 'region'
                                    : activeComponent === 'Partner' ? 'partner'
                                        : 'confirmation'}`}
                    >
                        {activeComponent === 'Avatar' && <div><AvatarPick userData={userData} setUserData={setUserData} /></div>}
                        {activeComponent === 'Partner' && <div><PartnerPick userData={userData} setUserData={setUserData} /></div>}
                        {activeComponent === 'Region' && <div><RegionSelect userData={userData} setUserData={setUserData} /></div>}
                    <Button>Update</Button>
                    </div>
                </div>
            </Fade>
        </div>
    );
}
