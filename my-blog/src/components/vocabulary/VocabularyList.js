// VocabularyList.js
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  
const VocabularyList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/vocabulary');
                console.log(response.data);
                dispatch({ type: 'SET_VOCAB_DATA', payload: response.data });
                console.log("dispatch xxx")
                console.log(dispatch({ type: 'SET_VOCAB_DATA', payload: response.data }))
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [dispatch]);


    console.log("get vocabData from useSelector")
    // Get the vocabData from the Redux store instead of local state
    const vocabData = useSelector(state => state.vocabulary.vocabData);

    console.log(vocabData)
    console.log("get vocabData from useSelector finished")
    return (
        <ul>
            {vocabData.map((vocab, index) => (
                <li key={index}>
                    <Link to={`day/${vocab.day}`}>
                        Day {vocab.day}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default VocabularyList;
