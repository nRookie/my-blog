import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import serverAddress from '../../config';

const CreateVocabularyDay = () => {
  const [day, setDay] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVocabularyDay = {
      day,
      description,
    };

    try {
      await axios.post(`${serverAddress}/vocabulary_day`, newVocabularyDay);
      navigate('/Vocabulary');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred while adding the vocabulary day.');
      }
    }
  };

  return (
    <div>
      <h2>Add New Vocabulary Day</h2>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Day:
          <input
            type="text"
            name="day"
            value={day}
            onChange={(event) => setDay(event.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>
        <button type="submit">Add</button>
      </form>
      <Link to="/vocabulary">Back to Vocabulary</Link>
    </div>
  );
};

export default CreateVocabularyDay;
