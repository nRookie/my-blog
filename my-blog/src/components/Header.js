import React, {useContext} from 'react';
import { AuthContext } from './reactContext';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  logoutButton: {
    marginLeft: 'auto',
  }
});

const Header = () => {
  const {loggedIn, setLoggedIn} = useContext(AuthContext)

  const logout = () => {
    localStorage.removeItem('userToken')
    setLoggedIn(false);
  };

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Welcome to Japanese Learning Blog
        </Typography>
        {loggedIn ? (
          <Button color="inherit" className={classes.logoutButton} onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
