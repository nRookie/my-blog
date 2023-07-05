// VocabularyDayList.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
import Button from '@material-ui/core/Button';

const VocabularyDayList = () => {
    const [vocabulary, setVocabulary] = useState(null);
    const navigate = useNavigate(); // initialize useNavigate
    
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
        <div>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/create-vocabulary-list')} 
                style={{ marginBottom: '20px' }}
            >
                Create Vocabulary Day
            </Button>
            <List>
                {vocabulary.map((vocabItem, index) => (
                    <ListItem key={index}>
                        <Card style={{ width: '100%' }}>
                            <CardContent>
                                <Link component={RouterLink} to={`/vocabulary/day/${vocabItem.day}`}>
                                    <Typography variant="h5">
                                        Day {vocabItem.day}
                                    </Typography>
                                    <Typography variant="h5">
                                        {vocabItem.description}
                                    </Typography>
                                </Link>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default VocabularyDayList;
