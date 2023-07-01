// VocabularyDay.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VocabularyDay = () => {
    const { day } = useParams();
    const vocabData = useSelector(state => state.vocabulary.vocabData);

    // Use a fallback value in case there's no matching vocab for the day
    const vocabObject = vocabData.find(vocab => vocab.day === parseInt(day)) || {vocab: []};

    // Access vocab property from the vocabObject
    const vocab = vocabObject.vocab;

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
