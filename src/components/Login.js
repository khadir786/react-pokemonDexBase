import React, { useState, useEffect, useRef } from "react"
import LoadingButton from "./sub_components/LoadingButton"
import Header from "./Header";
import Collapse from 'react-bootstrap/Collapse';
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
    const [errorOpen, setErrorOpen] = useState(false);
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

    const validateInput = () => {
        const usernameRegex = /^[a-zA-Z0-9_]+$/; // Allow only alphanumeric and underscore characters

        if (!formData.username) {
            setErrorMessage({
                type: "warning",
                message: "Username is required",
                heading: "Warning!"
            });
            return false;
        }

        if (!usernameRegex.test(formData.username)) {
            setErrorMessage({
                type: "warning",
                message: "Username contains invalid characters",
                heading: "Warning!"
            });
            return false;
        }

        if (!formData.password) {
            setErrorMessage({
                type: "warning",
                message: "Password is required",
                heading: "Warning!"
            });
            return false;
        }

        return true;
    };

    function handleSubmit(event) {
        event.preventDefault();

        // Validate the input
        if (!validateInput()) {
            setErrorOpen(true);
            return;
        }

        setLoading(true);

        loginUser(formData.username, formData.password)
            .then(response => {
                console.log('Login successful:', response);
                // Handle success...
                login(response);
                setIsLoggedIn(true);
                navigate('/home');
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.error('Login failed:', error.response.data);
                    setErrorMessage({
                        type: "error",
                        message: error.response.data,
                        heading: "Login failed..."
                    });
                    setErrorOpen(true);
                }
            })
            .finally(() => setLoading(false));
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
                <div className="register-login" ref={loginRef}
                    aria-controls="errorMessage"
                    aria-expanded={errorOpen}
                >
                    <h1 className="register-login-title">Login</h1>
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
                        <LoadingButton type="submit" />
                    </form>
                    <Collapse in={errorOpen}>
                        <div id="errorMessage" style={{
                            color: errorMessage.type === 'error' ? 'red' :
                                errorMessage.type === 'success' ? 'green' : 'yellow'
                        }}>
                            {errorMessage.message}
                        </div>
                    </Collapse>
                    <p className="link-reg-log">Don't have an account? <span><Link to="/register">Register here </Link></span></p>
                </div>
            </CSSTransition>
        </div>
    );
}