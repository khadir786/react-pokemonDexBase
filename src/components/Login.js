import React, { useState } from "react"

export default function Login() {
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
        <div className="login">
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
                    placeholder="Username"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                />
            </form>
        </div>
    )
}