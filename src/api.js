// src/api.js
import axios from 'axios';

const BASE_URL = 'https://my-backend-nrvl.onrender.com/api'; // Replace with your Render URL

export const registerUser = async (username, password) => {
    const response = await axios.post(`${BASE_URL}/user/auth/register`, { username, password });
    return response.data;
};

export const loginUser = async (username, password) => {
    console.log('loginUser');
    
    const response = await axios.post(`${BASE_URL}/user/auth/login`, { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
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
