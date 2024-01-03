import React, { useState, useEffect, useRef } from "react"
import LoadingButton from "./sub_components/LoadingButton"
import ModalComp from "./sub_components/ModalComp";
import Header from "./Header";
import { CSSTransition } from 'react-transition-group';
import { Link } from "react-router-dom";
import { loginUser } from "../apiService";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UseContext";
import '../css/register-login.css';
import '../css/rl-transitions.css';


export default function Login({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ type: "", message: "", heading: "" });
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const loginRef = useRef(null);
    const { login } = useUser();


    const [formData, setFormData] = useState(
        { username: "", password: "" }
    )

    useEffect(() => {
        // Delay the animation by a short period (e.g., 100 milliseconds)
        const delay = setTimeout(() => {
            setIsLoginVisible(true);
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
            return toggleModal();
        }
        setLoading(true);

        loginUser(formData.username, formData.password)
            .then(response => {
                console.log('Login successful:', response);
                // Handle success...
                login(response);
                setIsLoggedIn(true);
                navigate('/home')
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.error('Login failed:', error.response.data);
                    setErrorMessage(prevErrorMessage => {
                        return {
                            type: "error",
                            message: error.response.data,
                            heading: "Login failed..."
                        }
                    })
                    toggleModal();
                }
            })
            .finally(() => setLoading(false));
    }

    function toggleModal() {
        setShowModal(!showModal);
    }

    return (
        <div className="Landing">
            <Header />
            <CSSTransition
                in={isLoginVisible}
                timeout={300}
                classNames="welcome-fade"
                unmountOnExit
                nodeRef={loginRef}
            >
                <div className="register-login" ref={loginRef}>
                    <h1 className="register-login-title">Login</h1>
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
                        <LoadingButton type="submit" />
                    </form>
                    <p>Don't have an account? <span><Link to="/register">Register here </Link></span></p>
                    {showModal && (
                        <ModalComp
                            type={errorMessage.type}
                            show={showModal}
                            toggleModal={toggleModal}
                            heading={errorMessage.heading}
                            message={errorMessage.message}
                        />
                    )}
                </div>
            </CSSTransition>
        </div>
    );
}