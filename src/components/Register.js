import React, { useState, useEffect, useRef } from "react"
import LoadingButton from "./sub_components/LoadingButton"
import Alert from 'react-bootstrap/Alert';
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
    const [showPasswordRules, setShowPasswordRules] = useState(false);
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

    const validateInput = () => {
        const usernameRegex = /^[a-zA-Z0-9_]+$/; // Allow only alphanumeric and underscore characters
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; // Example password regex

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

        if (!passwordRegex.test(formData.password)) {
            setErrorMessage({
                type: "warning",
                message: "Password does not meet complexity requirements",
                heading: "Warning!"
            });
            setShowPasswordRules(true);
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

        registerUser(formData)
            .then(response => {
                console.log('Registration successful:', response);
                // Handle success...
                setErrorMessage({
                    type: "success",
                    message: `User: ${response.username} has been registered!`,
                    heading: "Success!"
                });
                setErrorOpen(true);
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.error('Registration failed:', error.response.data);
                    setErrorMessage({
                        type: "error",
                        message: error.response.data,
                        heading: "Registration failed..."
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
                        <div className="rl-input-container" onClick={() => {
                            setErrorOpen(false);
                            setShowPasswordRules(false);
                        }}>
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
                        <div>
                            <div id="errorMessage" style={{
                                color: errorMessage.type === 'error' ? 'red' :
                                    errorMessage.type === 'success' ? 'green' : 'yellow'
                            }}>
                                {errorMessage.message}
                            </div>
                            {showPasswordRules && (<div className="passwordRules-Alert">
                                <Alert variant="warning">
                                    <Alert.Heading>Your Password Must:</Alert.Heading>
                                    <hr />
                                    <li className="passwordRules">Contain at least one uppercase or lowercase letter</li>
                                    <li className="passwordRules">Contain at least one digit</li>
                                    <li className="passwordRules">Contain at least one of the specified special characters (@$!%*#?&)</li>
                                    <li className="passwordRules">Be at least 8 characters in length</li>
                                </Alert>
                            </div>)}
                        </div>

                    </Collapse>
                    <p className="link-reg-log">Already have an account? <span><Link to="/login">Login here </Link></span></p>

                </div>
            </CSSTransition>
        </div>

    )
}