import React, { useState, useEffect, useRef } from "react"
import LoadingButton from "./sub_components/LoadingButton"
import ModalComp from "./sub_components/ModalComp";
import Header from "./Header";
import Collapse from 'react-bootstrap/Collapse';
import { registerUser } from "../apiService"
import { CSSTransition } from 'react-transition-group';
import { Link } from "react-router-dom";
import '../css/register-login.css';
import '../css/rl-transitions.css';

export default function Register(props) {
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);
    const [formData, setFormData] = useState(
        { username: "", password: "" }
    )
    const [errorMessage, setErrorMessage] = useState({ type: "", message: "", heading: "" });
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
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

    function handleSubmit(event) {
        event.preventDefault();
        if (!formData.username || !formData.username) {
            setErrorMessage(prevErrorMessage => {
                return {
                    type: "warning",
                    message: "Please fill out all fields",
                    heading: "Warning!"
                }
            })
            return setErrorOpen(true);
        }
        setLoading(true);

        registerUser(formData)
            .then(response => {
                console.log('Registration successful:', response);
                // Handle success...
                setErrorMessage(prevErrorMessage => {
                    return {
                        type: "success",
                        message: `User: ${response.username} has been registered!!!`,
                        heading: "Success!"
                    }
                })
                setErrorOpen(true);

            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.error('Registration failed:', error.response.data); //this works for some reason
                    setErrorMessage(prevErrorMessage => {
                        return {
                            type: "error",
                            message: error.response.data,
                            heading: "Registration failed..."
                        }
                    })
                    setErrorOpen(true);
                }
            })
            .finally(() => setLoading(false));
    }



    return (
        <div className="Landing">
            <Header />

            <CSSTransition
                in={isRegisterVisible}
                timeout={300}
                classNames="welcome-fade"
                unmountOnExit
                nodeRef={registerRef}
            >
                <div className="register-login" ref={registerRef}
                    aria-controls="errorMessage"
                    aria-expanded={errorOpen}
                >
                    <h1 className="register-login-title">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="rl-input-container" onClick={() => setErrorOpen(false)}>
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
                    <Collapse in={errorOpen}>
                        <div id="errorMessage" style={{
                            color: errorMessage.type === 'error' ? 'red' :
                                errorMessage.type === 'success' ? 'green' : 'yellow'
                        }}>
                            {errorMessage.message}
                        </div>
                    </Collapse>
                    <p className="link-reg-log">Already have an account? <span><Link to="/login">Login here </Link></span></p>

                </div>
            </CSSTransition>
        </div>

    )
}