import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import serverAddress from "../../config";

const CreateVocabularyDay = () => {

    /**TODO: get the day from the database by default*/
    const [day, setDay] = useState(0)
    const [description, setDescription] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newVocabularyDay = {
            day,
            description,
        };

        await axios.post(`${serverAddress}/vocabulary_day`, newVocabularyDay);

        navigate("/Vocabulary")
    };

    return (
        <div>
            <h2>Add New Vocabulary Day</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Day:
                    <input type="text" name="day" value={day} onChange={(event) => {
                        setDay(event.target.value)
                    }} required />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={description} onChange={(event) => {
                        setDescription(event.target.value)
                    }} required />
                </label>
                <button type="submit">Add</button>
            </form>
            <Link to="/vocabulary">Back to Vocabulary</Link>
        </div>
    );
}

export default CreateVocabularyDay;
