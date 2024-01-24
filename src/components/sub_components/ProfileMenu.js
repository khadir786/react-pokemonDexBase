import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu({ userData, handleLogout }) {
    const navigate = useNavigate()


    return (
        <div className="profile-pic-Container">
            <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={
                    <Popover id={`popover-positioned-bottom`}>
                        <Popover.Body style={{ padding: '5px' }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item eventKey={1} action onClick={() => {navigate("/profile")}}className="menu-items">Edit Profile</ListGroup.Item>
                                <ListGroup.Item eventKey={2} action onClick={handleLogout} className="menu-items">Logout</ListGroup.Item>
                            </ListGroup>
                        </Popover.Body>
                    </Popover>
                }
            >
                <img className="profile-pic" src={`https://play.pokemonshowdown.com/sprites/trainers/${userData.avatar}.png`} alt="profile pic"
                />
            </OverlayTrigger>
        </div>
    )
}