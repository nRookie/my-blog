import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import serverAddress from "../../config";

// Material-UI imports
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
}));

const VocabularyDay = () => {
    const { day } = useParams();
    const [vocabulary, setVocabulary] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        axios.get(`${serverAddress}/vocabulary/day/${day}`)
            .then(res => {
                setVocabulary(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [day]);

    const handleDelete = (vocabId) => {
        axios.delete(`${serverAddress}/vocabulary/id/${vocabId}`)
            .then(res => {
                // Remove the vocabulary item from the state
                setVocabulary(vocabulary.filter(vocab => vocab._id !== vocabId));
            })
            .catch(err => {
                console.error(err);
            });
    }

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
                <Typography variant="h4" align="center">Day {day}</Typography>
                {vocabulary.map((vocabItem, index) => (
                    <Paper key={index} className={classes.paper}>
                        <Typography variant="h6">{vocabItem.vocabulary}</Typography>
                        <Typography variant="body1">{vocabItem.vocabularyExplaination}</Typography>
                        <Link to={`/edit-vocabulary/${vocabItem._id}`}>
                            <Button variant="contained" color="primary">Edit</Button>
                        </Link>
                        <IconButton aria-label="delete" onClick={() => handleDelete(vocabItem._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
}

export default VocabularyDay;
