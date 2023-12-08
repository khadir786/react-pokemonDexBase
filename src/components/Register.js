import React, { useState, useEffect } from "react"
import LoadingButton from "./sub_components/LoadingButton"
import { registerUser } from "../apiService"
import ModalComp from "./sub_components/ModalComp";
import { CSSTransition } from 'react-transition-group';
import '../css/register-login.css';
import '../css/rl-transitions.css';
import Header from "./Header";
import { Link } from "react-router-dom";

export default function Register(props) {
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);
    const [formData, setFormData] = useState(
        { username: "", password: "" }
    )
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Delay the animation by a short period (e.g., 100 milliseconds)
        const delay = setTimeout(() => {
            setIsRegisterVisible(true);
        }, 100);

        return () => clearTimeout(delay); // Clear the timeout on unmount
    }, []);

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function toggleModal() {
        setShowModal(!showModal);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!formData.username || !formData.password) {
            setShowModal(true); // Show the modal when fields are empty
            return;
        }

        setLoading(true);

        registerUser(formData)
            .then((response) => {
                console.log("Registration successful:", response);
                // Handle success
            })
            .catch((error) => {
                console.error("Registration failed:", error);
                // Handle error
            })
            .finally(() => setLoading(false));
    }


    return (
        <div className="Landing">
            <Header />

            <CSSTransition
                in={isRegisterVisible}
                timeout={0}
                classNames="welcome-fade"
                unmountOnExit
            >
                <div className="register-login">
                    <h1 className="register-login-title">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="rl-input-container">
                            <input
                                className="input-username"
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                name="username"
                                value={formData.username}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                name="password"
                                value={formData.password}
                            />
                        </div>
                    </form>
                    <LoadingButton onClick={handleSubmit} isLoading={isLoading} />
                    <p><Link to="/login">Login here</Link></p>
                    {showModal && (
                        <ModalComp
                            show={showModal}
                            toggleModal={toggleModal}
                            heading="Warning!"
                            message="Please fill out all fields"
                        />
                    )}
                </div>
            </CSSTransition>
        </div>

    )
}