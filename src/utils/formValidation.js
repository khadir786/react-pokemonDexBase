const usernameRegex = /^[a-zA-Z0-9_]+$/; 
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const validateInput = (formData, setErrorMessage, setShowPasswordRules, inputType) => {
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

    if (inputType === "REGISTER") {
        if (!passwordRegex.test(formData.password)) {
            setErrorMessage({
                type: "warning",
                message: "Password does not meet complexity requirements",
                heading: "Warning!"
            });
            setShowPasswordRules(true);
            return false;
        }
    }

    return true; // Validation passed
};

