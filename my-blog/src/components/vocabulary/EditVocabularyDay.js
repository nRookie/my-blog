import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import serverAddress from "../../config"; 
import axios from 'axios';

const EditVocabularyDay = () => {
    const [vocabularyDay, setVocabularyDay] = useState({});
    const { day } = useParams();
    console.log(day)
    // Fetch the vocabulary day when the component mounts
    useEffect(() => {
        axios.get(`${serverAddress}/vocabularyday/${day}`)
            .then(response => setVocabularyDay(response.data))
            .catch(error => console.error(`There was an error retrieving the vocabulary day: ${error}`));
    }, []);

    // Handle the changes of the form
    const handleChange = (event) => {
        setVocabularyDay({...vocabularyDay, [event.target.name]: event.target.value});
    }

    // Handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`${serverAddress}/vocabularyday/${day}`, vocabularyDay)
            .then(() => console.log('Vocabulary Day Updated'))
            .catch(error => console.error(`There was an error updating the vocabulary day: ${error}`));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="word">Day</label>
            <input id="word" name="word" value={vocabularyDay.Day || ''} onChange={handleChange} />

            <label htmlFor="definition">Description</label>
            <input id="definition" name="Description" value={vocabularyDay.definition || ''} onChange={handleChange} />

            <button type="submit">Update Vocabulary Day</button>
        </form>
    )
}

export default EditVocabularyDay;
