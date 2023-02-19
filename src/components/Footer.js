import React from "react";

// material-ui関係
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF',
        backgroundColor: '#3f51b5',
        position: 'fixed',
        bottom: 0
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>copyright 2023 Matsuda</Box>
    )
}

export default Footer;