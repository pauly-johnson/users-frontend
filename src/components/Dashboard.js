// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getProtectedData, logoutUser } from '../api';

const Dashboard = ({ onLogout }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getProtectedData()
            .then(setData)
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading protected data...</p>}
            <button onClick={() => { logoutUser(); onLogout(); }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
