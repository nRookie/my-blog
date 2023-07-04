// Vocabulary.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Vocabulary = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h3" align="center">Vocabulary Camp</Typography>
                <Outlet /> {/* This will render either VocabularyDayList or VocabularyDay */}
            </Box>
        </Container>
    );
}

export default Vocabulary;
