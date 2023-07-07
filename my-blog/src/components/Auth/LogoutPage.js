import React from 'react';

const Logout = () => {
    const logout = () => {
        // Clear the user token from local storage
        localStorage.removeItem('token');

        // Optionally, you can redirect user to login or home page
        // For this, you would need to import and use 'useNavigate' from 'react-router-dom'
        // let navigate = useNavigate();
        // navigate('/login');
    }

    return (
        <button onClick={logout}>Logout</button>
    );
};

export default Logout;
