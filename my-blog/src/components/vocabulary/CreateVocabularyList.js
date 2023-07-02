import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const CreateVocabularyList = () => {
    const dispatch = useDispatch();

    const [vocabData, setVocabData] = useState({ day: "", vocab: [] });

    const handleChange = (event) => {
        setVocabData({ ...vocabData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        console.log("handle submit called")
        event.preventDefault();
        // Dispatch the action to add the new vocabData
        const a = dispatch({ type: 'ADD_VOCAB_DATA', payload: vocabData });
        console.log("after dispatch")
        console.log(a)
        // Clear the input fields
        setVocabData({ day: "", vocab: [] });
    }

    return (
        <div>
            <h2>Add New Vocabulary List</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Day:
                    <input type="text" name="day" value={vocabData.day} onChange={handleChange} required />
                </label>
                <label>
                    Vocabulary:
                    <input type="text" name="vocab" value={vocabData.vocab} onChange={handleChange} required />
                </label>
                <button type="submit">Add</button>
            </form>
            <Link to="/vocabulary">Back to Vocabulary</Link>
        </div>
    );
}

export default CreateVocabularyList;
