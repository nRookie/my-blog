// VocabularyDay.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VocabularyDay = () => {
    const { day } = useParams();

    // Get the vocabData from the Redux store
    const vocabData = useSelector(state => state.vocabulary.vocabData);

    // Find the vocab for the current day
    const vocab = vocabData.find(vocab => vocab.day === parseInt(day)).vocab;

    return (
        <div>
            <h2>Day {day}</h2>
            <ul>
                {vocab.map((word, index) => <li key={index}>{word}</li>)}
            </ul>
        </div>
    );
}

export default VocabularyDay;
