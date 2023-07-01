// VocabularyList.js

import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VocabularyList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3000/vocabulary');
            dispatch({ type: 'SET_VOCAB_DATA', payload: response.data });
        }
        fetchData();
    }, [dispatch]);

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

export default VocabularyList;
