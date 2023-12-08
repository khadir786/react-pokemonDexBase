import React, { useState, useEffect } from "react"
import LoadingButton from "./sub_components/LoadingButton"
import { CSSTransition } from 'react-transition-group';
import '../css/register-login.css';
import '../css/rl-transitions.css';
import Header from "./Header";
import { Link } from "react-router-dom";

export default function Login(props) {
    const [isLoginVisible, setIsLoginVisible] = useState(false);


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
    return (

        <div className="Landing">
            <Header />
            <CSSTransition
                in={isLoginVisible}
                timeout={0}
                classNames="welcome-fade"
                unmountOnExit
            >
                <div className="register-login">

                    <h1 className="register-login-title">Login</h1>
                    <form>
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
                    <LoadingButton />
                    <p>Don't have an account? <span><Link to="/register">Register here </Link></span></p>

                </div>
            </CSSTransition>
        </div>

    )
}