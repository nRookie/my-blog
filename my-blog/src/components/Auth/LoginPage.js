import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import serverAddress from '../../config';
import { AuthContext } from '../reactContext';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

const LoginPage = () => {

  const {setLoggedIn} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const res =  await axios.post(`${serverAddress}/api/login`, userData);
      setLoggedIn(true);
      // Store the token to local storage
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while logging in.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField 
          className={classes.textField}
          type="text" 
          label="email" 
          value={email} 
          onChange={(event) => setEmail(event.target.value)} 
          required 
        />
        <TextField 
          className={classes.textField}
          type="password" 
          label="Password" 
          value={password} 
          onChange={(event) => setPassword(event.target.value)} 
          required 
        />
        <Button className={classes.button} variant="contained" color="primary" type="submit">Login</Button>
      </form>
    </Container>
  );
};

export default LoginPage;
