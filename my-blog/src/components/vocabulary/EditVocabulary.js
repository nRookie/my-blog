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
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const EditVocabulary = () => {
    const { id } = useParams();
    const [vocabulary, setVocabulary] = useState(null);
    const [vocabInput, setVocabInput] = useState('');
    const [vocabExplainationInput, setVocabExplainationInput] = useState('');

    console.log(id)
    useEffect(() => {
        console.log(id)
        // Fetch data when the component is mounted
        axios.get(`${serverAddress}/vocabulary/id/${id}`)
            .then(res => {
                setVocabulary(res.data);
                setVocabInput(res.data.vocabulary);
                setVocabExplainationInput(res.data.vocabularyExplaination);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const updatedVocabulary = {
            vocabulary: vocabInput,
            vocabularyExplaination: vocabExplainationInput,
        };
        axios.put(`${serverAddress}/vocabulary/id/${id}`, updatedVocabulary)
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
                <Typography variant="h4" align="center">Edit Vocabulary</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Original Word: {vocabulary.vocabulary}
                                </Typography>
                                <Typography variant="body1">
                                    Meaning: {vocabulary.vocabularyExplaination}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <form onSubmit={handleFormSubmit}>
                            <TextField
                                label="Vocabulary"
                                value={vocabInput}
                                onChange={(e) => setVocabInput(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Vocabulary Explanation"
                                value={vocabExplainationInput}
                                onChange={(e) => setVocabExplainationInput(e.target.value)}
                                required
                                fullWidth
                                multiline
                            />
                            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                                Save
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default EditVocabulary;
