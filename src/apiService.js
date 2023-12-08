import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
