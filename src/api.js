import axios from 'axios';

const BASE_URL = 'https://my-backend-nrvl.onrender.com/api'; 

export const registerUser = async (username, email, password) => {
    const payload = { username, email, password };
    console.log('Register payload:', payload); // Log the payload for debugging
    const response = await axios.post(`${BASE_URL}/user/auth/register`, payload);
    return response.data;
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/auth/login`, { username, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            throw new Error('Incorrect Password');
        } else if (err.response && err.response.status === 404) {
            throw new Error('Invalid User');
        } else {
            throw new Error('Login failed');
        }
    }
};

export const getProtectedData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/protected`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};