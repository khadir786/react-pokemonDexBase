import React, { useState } from "react"

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
            <h1>Login</h1>
            <form>
                <input
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
            </form>
            <button onClick={e => console.log("clicked")}>Submit</button>
            <button onClick={props.toggleRegister}>Haven't registered yet?</button>

        </div>
    )
}