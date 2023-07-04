// VocabularyDayList.js
import React from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

  
const VocabularyDayList = () => {
    // Get the vocabData from the Redux store instead of local state
    const vocabData = useSelector(state => state.vocabulary.vocabData);
    return (
        <ul>
            {vocabData.map((vocab, index) => (
                <li key={index}>
                    <Link to={`day/${vocab.day}`}>
                        Day {vocab.day}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default VocabularyDayList;
