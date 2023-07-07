import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Box } from '@material-ui/core';
import { GitHub, Instagram, Facebook } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        marginTop: 'auto',
        padding: theme.spacing(6, 0),
        color: '#fff'
    },
    icons: {
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    Japanese Learning Blog
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    © 2023 - All rights reserved
                </Typography>
                <Box className={classes.icons}>
                    <GitHub fontSize="large" />
                    <Instagram fontSize="large" />
                    <Facebook fontSize="large" />
                </Box>
            </Container>
        </footer>
    );
};

export default Footer;
