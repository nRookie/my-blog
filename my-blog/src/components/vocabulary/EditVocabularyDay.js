import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import serverAddress from "../../config"; 
import axios from 'axios';
const EditVocabularyDay = () => {
    const [vocabularyDay, setVocabularyDay] = useState({day: '', description: ''});
    const { day } = useParams();
    // Fetch the vocabulary day when the component mounts
    useEffect(() => {
        axios.get(`${serverAddress}/vocabulary_day/${day}`)
            .then(response => setVocabularyDay(response.data))
            .catch(error => console.error(`There was an error retrieving the vocabulary day: ${error}`));
    }, [day]);

    // Handle the changes of the form
    const handleChange = (event) => {
        setVocabularyDay({...vocabularyDay, [event.target.name]: event.target.value});
    }

    // Handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`${serverAddress}/vocabulary_day/${day}`, vocabularyDay)
            .then(() => console.log('Vocabulary Day Updated'))
            .catch(error => console.error(`There was an error updating the vocabulary day: ${error}`));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="day">Day</label>
            <input id="day" name="day" value={vocabularyDay.day || ''} onChange={handleChange} />

            <label htmlFor="description">Description</label>
            <input id="description" name="description" value={vocabularyDay.description || ''} onChange={handleChange} />

            <button type="submit">Update Vocabulary Day</button>
        </form>
    )
}
 

export default EditVocabularyDay;
