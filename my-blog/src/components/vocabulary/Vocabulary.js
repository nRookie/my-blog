import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from "axios";
import serverAddress from "../../config";

const Vocabulary = () => {
    const [vocabulary, setVocabulary] =  useState(null);

    // Display data when it's available
    useEffect(() => {
        axios.get(`${serverAddress}/vocabulary_day/`)
            .then(res => {
                setVocabulary(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h1>Vocabulary Camp</h1>
            {/* If you want to display the vocabData on the page */}
            {vocabulary ? (
                // Replace this with how you want to render your data
                <div>{JSON.stringify(vocabulary)}</div>
            ) : (
                <div>Loading...</div>
            )}
            <Outlet />
        </div>
    );
}

export default Vocabulary;
