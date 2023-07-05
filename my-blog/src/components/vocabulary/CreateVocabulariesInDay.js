import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

const CreateVocabularyInDay = () => {
  const location = useLocation();
  const [day, setDay] = useState(location.state.day || 1);
  const [vocabulary, setVocabulary] = useState('');
  const [vocabularyExplaination, setVocabularyExplaination] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const classes = useStyles();

  // Add this useEffect to set the day state when the component is re-rendered
  useEffect(() => {
    if (location.state.day) {
      setDay(location.state.day);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVocabulary = {
      day,
      vocabulary,
      vocabularyExplaination,
    };

    try {
      await axios.post(`${serverAddress}/vocabulary`, newVocabulary);
      navigate(`/vocabulary/day/${day}`);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred while adding the vocabulary.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Add New Vocabulary</Typography>
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
          label="Word" 
          value={vocabulary} 
          onChange={(event) => setVocabulary(event.target.value)} 
          required 
        />
        <TextField 
          className={classes.textField}
          type="text" 
          label="Meaning" 
          value={vocabularyExplaination} 
          onChange={(event) => setVocabularyExplaination(event.target.value)} 
          required 
        />
        <Button className={classes.button} variant="contained" color="primary" type="submit">Add</Button>
      </form>
      <Button component={Link} to="/vocabulary">Back to Vocabulary</Button>
    </Container>
  );
};

export default CreateVocabularyInDay;
