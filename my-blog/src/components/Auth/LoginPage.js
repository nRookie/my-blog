import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import serverAddress from '../../config';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      await axios.post(`${serverAddress}/api/login`, userData);
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
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
          label="Username" 
          value={username} 
          onChange={(event) => setUsername(event.target.value)} 
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
