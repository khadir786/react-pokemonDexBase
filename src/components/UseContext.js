import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserInfo } from '../apiService';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            setIsLoading(true);
            try {
                const response = await getUserInfo();
                if (response && response.data) {
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            }
            setIsLoading(false);
        };

        if (localStorage.getItem('isLoggedIn') === 'true') {
            fetchUserInfo();
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <UserContext.Provider value={{ isLoading, user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
