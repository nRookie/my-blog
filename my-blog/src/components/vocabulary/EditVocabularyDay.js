import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import serverAddress from "../../config";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

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

const EditVocabularyDay = () => {
    const classes = useStyles();
    const [vocabularyDay, setVocabularyDay] = useState({day: '', description: ''});
    const { day } = useParams();
    const navigate = useNavigate();

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
        axios.put(`${serverAddress}/vocabulary_day/${day}`, vocabularyDay, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(() => {
              console.log('Vocabulary Day Updated');
              navigate('/vocabulary');
            })
            .catch(error => console.error(`There was an error updating the vocabulary day: ${error}`));
    }

    return (
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>Edit Vocabulary Day</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField 
            className={classes.textField}
            id="day"
            name="day"
            label="Day"
            value={vocabularyDay.day || ''}
            onChange={handleChange} 
            required 
          />
          <TextField 
            className={classes.textField}
            id="description"
            name="description"
            label="Description"
            value={vocabularyDay.description || ''}
            onChange={handleChange} 
            required 
          />
          <Button className={classes.button} variant="contained" color="primary" type="submit">Update Vocabulary Day</Button>
        </form>
      </Container>
    )
}

export default EditVocabularyDay;
