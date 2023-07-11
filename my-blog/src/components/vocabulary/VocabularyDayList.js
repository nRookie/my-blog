// VocabularyDayList.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import serverAddress from "../../config";
import jwt_decode from "jwt-decode"
// Material-UI imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const VocabularyDayList = () => {
    const [vocabulary, setVocabulary] = useState(null);
    const navigate = useNavigate(); // initialize useNavigate


    const handleDelete = (day) => {
        axios.delete(`${serverAddress}/vocabulary_day/${day}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setVocabulary(vocabulary.filter(vocabDay => vocabDay.day !== day));
            })
            .catch(err => {
                console.error(err)
            });
    }

    const token = localStorage.getItem('token');
    let isAdmin = false;
    if (token) {
        const decoded = jwt_decode(token);
        isAdmin = decoded.role === 'admin';
    }


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
                                {isAdmin &&(
                                    <>
                                    <Link component={RouterLink} to={`/edit-vocabularyday/${vocabItem._id}`}>
                                            <Button variant="contained" color="primary">Edit</Button>
                                    </Link>
                                    <IconButton aria-label="delete" onClick={() => handleDelete(vocabItem._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/create-vocabulary-list')}
                style={{ marginBottom: '20px' }}
            >
                Create Vocabulary Day
            </Button>
        </div>
    );
}

export default VocabularyDayList;
