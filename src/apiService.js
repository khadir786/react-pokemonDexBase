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

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
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

export const loginUser = async (username, password) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};