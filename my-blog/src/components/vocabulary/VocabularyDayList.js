import React from 'react';
import {useSelector} from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

// Material-UI imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const VocabularyDayList = () => {
    // Get the vocabData from the Redux store instead of local state
    const vocabData = useSelector(state => state.vocabulary.vocabData);
    
    return (
        <List>
            {vocabData.map((vocab, index) => (
                <ListItem key={index}>
                    <Card style={{ width: '100%' }}>
                        <CardContent>
                            <Link component={RouterLink} to={`day/${vocab.day}`}>
                                <Typography variant="h5">
                                    Day {vocab.day}
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
