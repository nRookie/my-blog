import React from 'react';
import { Outlet } from 'react-router-dom';

const Vocabulary = () => {
    return (
        <div>
            <h1>Vocabulary Camp</h1>
            <Outlet />
        </div>
    );
}

export default Vocabulary;
