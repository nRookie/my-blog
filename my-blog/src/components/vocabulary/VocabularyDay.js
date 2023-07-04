import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import serverAddress from "../../config"; // Import server address

// Material-UI imports
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
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
        // Fetch data when the component is mounted
        axios.get(`${serverAddress}/vocabulary/${day}`)
            .then(res => {
                setVocabulary(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [day]);

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
                    </Paper>
                ))}
            </Box>
        </Container>
    );
}

export default VocabularyDay;
