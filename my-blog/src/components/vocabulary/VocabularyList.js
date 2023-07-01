import React from 'react';
import { Link } from 'react-router-dom';

// Sample vocabulary data
const vocabData = [
    { day: 1, vocab: ['word1', 'word2', 'word3'] },
    { day: 2, vocab: ['word4', 'word5', 'word6'] },
    // ...
];

const VocabularyList = () => {
    return (
        <ul>
            {vocabData.map((vocab, index) => (
                <li key={index}>
                <Link to={`day/${vocab.day}`}>Day {vocab.day}</Link>
                </li>
            ))}
        </ul>
    )
}

export default VocabularyList;
