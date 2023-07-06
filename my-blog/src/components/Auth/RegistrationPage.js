import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import serverAddress from '../../config';
import { TextField, Button, Typography, Paper, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const RegistrationPage = () => {
    const classes = useStyles();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const register = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if(user.password !== user.confirmPassword) {
            setErrorState(true);
            setErrorMessage('Passwords do not match!');
            return;
        }

        try {
            const res = await axios.post(`${serverAddress}/api/register`, {
                email: user.email,
                password: user.password
            });
            console.log(res.data);
            setErrorState(false);
            setErrorMessage('');
            navigate('/login');
        } catch(err) {
            console.error(err.response.data);
            setErrorState(true);
            setErrorMessage(err.response.data.msg);
        }
    };

    return (
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">Register</Typography>
            <form className={classes.form} onSubmit={register}>
                <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" value={user.email} onChange={handleChange} />
                <TextField variant="outlined" margin="normal" required fullWidth id="password" label="Password" name="password" type="password" value={user.password} onChange={handleChange} />
                <TextField variant="outlined" margin="normal" required fullWidth id="confirmPassword" label="Confirm Password" name="confirmPassword" type="password" value={user.confirmPassword} onChange={handleChange} />
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Register</Button>
            </form>
            { errorState && <Alert severity="error">{errorMessage}</Alert> }
        </Paper>
    );
}

export default RegistrationPage;
