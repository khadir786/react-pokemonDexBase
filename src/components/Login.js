import React, { useState, useEffect, useRef } from "react"
import LoadingButton from "./sub_components/LoadingButton"
import { CSSTransition } from 'react-transition-group';
import '../css/register-login.css';
import '../css/rl-transitions.css';
import Header from "./Header";
import { Link } from "react-router-dom";
import { loginUser } from "../apiService";
import ModalComp from "./sub_components/ModalComp";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();

    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ type: "", message: "" });
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const loginRef = useRef(null);


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
                    message: "Please fill out all fields"
                }
            })
            return toggleModal();
        }
        setLoading(true);

        loginUser(formData.username, formData.password)
            .then(response => {
                console.log('Login successful:', response);
                // Handle success...
                navigate('/home', { state: { user: response } })
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.error('Login failed:', error.response.data);
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
                    <Link to="/home">Go to user home</Link>
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
    );
}