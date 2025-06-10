import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');

        if (confirmLogout) {
            localStorage.removeItem('token');
            alert('You have been logged out.');
            navigate('/login');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
        >
            Logout
        </button>
    );
}

export default Logout;
