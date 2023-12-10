import React, { useState, useEffect, useRef } from "react"
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
    const [errorMessage, setErrorMessage] = useState({ type: "", message: "" });
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const registerRef = useRef(null);


    useEffect(() => {
        // Delay the animation by a short period (e.g., 100 milliseconds)
        const delay = setTimeout(() => {
            setIsRegisterVisible(true);
        }, 100);

        return () => clearTimeout(delay); // Clear the timeout on unmount
    }, []);

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setErrorMessage(prevErrorMessage => {
            return {
                ...prevErrorMessage,
                message: ""
            }
        })
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
        if (!formData.username || !formData.username) {
            setErrorMessage(prevErrorMessage => {
                return {
                    type: "warning",
                    message: "Please fill out all fields"
                }
            })
            return toggleModal();
        }
        setLoading(true);

        registerUser(formData)
            .then(response => {
                console.log('Registration successful:', response);
                // Handle success...
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.error('Registration failed:', error.response.data); //this works for some reason
                    setErrorMessage(prevErrorMessage => {
                        return {
                            type:"error",
                            message: error.response.data
                        }
                    })
                    toggleModal();
                }
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
                nodeRef={registerRef}
            >
                <div className="register-login" ref={registerRef}>
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
                            type={errorMessage.type}
                            show={showModal}
                            toggleModal={toggleModal}
                            heading="Warning!"
                            message={errorMessage.message}
                        />
                    )}
                </div>
            </CSSTransition>
        </div>

    )
}