import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios base URL
    axios.defaults.baseURL = 'http://localhost:5000';

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUser(userInfo);
            // Set default headers for all requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            return data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
