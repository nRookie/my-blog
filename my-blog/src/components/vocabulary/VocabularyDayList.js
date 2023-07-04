// VocabularyDayList.js
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import serverAddress from "../../config";

// Material-UI imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

const VocabularyDayList = () => {
    const [vocabulary, setVocabulary] = useState(null);

    useEffect(() => {
        // Fetch data when the component is mounted
        axios.get(`${serverAddress}/vocabulary_day/`)
            .then(res => {
                setVocabulary(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    if (!vocabulary) {
        return (
            <CircularProgress />
        );
    }

    return (
        <List>
            {vocabulary.map((vocabItem, index) => (
                <ListItem key={index}>
                    <Card style={{ width: '100%' }}>
                        <CardContent>
                            <Link component={RouterLink} to={`/vocabulary/day/${vocabItem.day}`}>
                                <Typography variant="h5">
                                    Day {vocabItem.day}
                                </Typography>
                            </Link>
                        </CardContent>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
}

export default VocabularyDayList;
