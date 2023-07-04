import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import serverAddress from "../../config"; 

// Material-UI imports
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const EditVocabulary = () => {
    const { day } = useParams();
    const [vocabulary, setVocabulary] = useState(null);
    const [vocabInput, setVocabInput] = useState('');
    const [vocabExplainationInput, setVocabExplainationInput] = useState('');

    useEffect(() => {
        // Fetch data when the component is mounted
        axios.get(`${serverAddress}/vocabulary/${day}`)
            .then(res => {
                setVocabulary(res.data);
                setVocabInput(res.data.vocabulary);
                setVocabExplainationInput(res.data.vocabularyExplaination);
            })
            .catch(err => {
                console.error(err);
            });
    }, [day]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const updatedVocabulary = {
            day: vocabulary.day,
            vocabulary: vocabInput,
            vocabularyExplaination: vocabExplainationInput,
        };
        axios.put(`${serverAddress}/vocabulary/${day}`, updatedVocabulary)
            .then(res => {
                alert('Vocabulary updated successfully');
            })
            .catch(err => {
                console.error(err);
            });
    };

    if (!vocabulary) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" align="center">Edit Vocabulary for Day {day}</Typography>
                <form onSubmit={handleFormSubmit}>
                    <TextField
                        label="Vocabulary"
                        value={vocabInput}
                        onChange={(e) => setVocabInput(e.target.value)}
                        required
                    />
                    <TextField
                        label="Vocabulary Explanation"
                        value={vocabExplainationInput}
                        onChange={(e) => setVocabExplainationInput(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default EditVocabulary;
