import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Vocabulary = () => {
    // Access vocabulary data from Redux store
    const vocabData = useSelector(state => state.vocabulary.vocabData);

    console.log(vocabData)
    // Display data when it's available
    useEffect(() => {
        console.log(vocabData);
    }, [vocabData]);

    return (
        <div>
            <h1>Vocabulary Camp</h1>
            {/* If you want to display the vocabData on the page */}
            {vocabData && vocabData.map((vocab, index) => (
                <div key={index}>
                    <h2>Day {vocab.day}</h2>
                    <ul>
                    </ul>
                </div>
            ))}
            <Outlet />
        </div>
    );
}

export default Vocabulary;
