import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import serverAddress from '../../config';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

const CreateVocabularyDay = () => {
  const [day, setDay] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const classes = useStyles();

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
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Add New Vocabulary Day</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField 
          className={classes.textField}
          type="text" 
          label="Day" 
          value={day} 
          onChange={(event) => setDay(event.target.value)} 
          required 
        />
        <TextField 
          className={classes.textField}
          type="text" 
          label="Description" 
          value={description} 
          onChange={(event) => setDescription(event.target.value)} 
          required 
        />
        <Button className={classes.button} variant="contained" color="primary" type="submit">Add</Button>
      </form>
      <Button component={Link} to="/vocabulary">Back to Vocabulary</Button>
    </Container>
  );
};

export default CreateVocabularyDay;
