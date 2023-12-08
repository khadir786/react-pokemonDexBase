import React, { useState } from "react"
import LoadingButton from "./sub_components/LoadingButton"
import { registerUser } from "../apiService"
import ModalComp from "./sub_components/ModalComp";

export default function Register(props) {
    const [formData, setFormData] = useState(
        { username: "", password: "" }
    )
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function handleChange(event) {
        const { name, value, type, checked } = event.target
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
    
        if (!formData.username || !formData.password) {
          setShowModal(true); // Show the modal when fields are empty
          return;
        }
    
        setLoading(true);
    
        registerUser(formData)
          .then((response) => {
            console.log("Registration successful:", response);
            // Handle success
          })
          .catch((error) => {
            console.error("Registration failed:", error);
            // Handle error
          })
          .finally(() => setLoading(false));
      }
    

    return (
        <div className="register-login">
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
            <p onClick={props.toggleRegister}>Login here</p>
            {showModal && (
                <ModalComp
                    show={showModal}
                    toggleModal={toggleModal}
                    heading="Warning!"
                    message="Please fill out all fields"
                />
            )}

        </div>
    )
}