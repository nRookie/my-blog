import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from "axios";
import serverAddress from "../../config";

// Material-UI imports
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

const Vocabulary = () => {
    const [vocabulary, setVocabulary] =  useState(null);
    const classes = useStyles();

    // Display data when it's available
    useEffect(() => {
        axios.get(`${serverAddress}/vocabulary_day/`)
            .then(res => {
                setVocabulary(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h3" align="center">Vocabulary Camp</Typography>
                {/* If you want to display the vocabData on the page */}
                {vocabulary ? (
                    vocabulary.map((vocabItem, index) => (
                        <Link to={`/vocabulary/day/${vocabItem.day}`} key={index}>
                            <Paper className={classes.paper}>
                                <Typography variant="h6">Day: {vocabItem.day}</Typography>
                                <Typography variant="body1">Description: {vocabItem.description}</Typography>
                            </Paper>
                        </Link>
                    ))
                ) : (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                )}
                <Outlet />
            </Box>
        </Container>
    );
}

export default Vocabulary;
