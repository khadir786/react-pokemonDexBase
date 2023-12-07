import React, { useState } from "react"
import LoadingButton from "./sub_components/LoadingButton"

export default function Login(props) {
    const [formData, setFormData] = useState(
        { username: "", password: "" }
    )

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
            <p onClick={props.toggleRegister}>Haven't registered yet?</p>

        </div>
    )
}