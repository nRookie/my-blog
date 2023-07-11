import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditVocabularyDay = (props) => {
    const [vocabularyDay, setVocabularyDay] = useState({});
    console.log("in edit vocabularyday")

    console.log(props)
    // Fetch the vocabulary day when the component mounts
    useEffect(() => {
        axios.get(`/api/vocabularyday/${props.match.params.id}`)
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
        axios.put(`/api/vocabularyday/${props.match.params.id}`, vocabularyDay)
            .then(() => console.log('Vocabulary Day Updated'))
            .catch(error => console.error(`There was an error updating the vocabulary day: ${error}`));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="word">Word</label>
            <input id="word" name="word" value={vocabularyDay.word || ''} onChange={handleChange} />

            <label htmlFor="definition">Definition</label>
            <input id="definition" name="definition" value={vocabularyDay.definition || ''} onChange={handleChange} />

            <button type="submit">Update Vocabulary Day</button>
        </form>
    )
}

export default EditVocabularyDay;
