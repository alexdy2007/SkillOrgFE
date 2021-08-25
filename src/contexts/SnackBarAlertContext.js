import { createContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

export const SnackbarContext = createContext({});





function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
}));

const SnackBarContextProvider = ({children}) => {

    /*
        Serverity levels
        "error"
        "warning"
        "info"
        "success"
    */
    const [snackbar, setSnackbar] = useState({
        message: '',
        severity: '',
        open: false,
      });



    const classes = useStyles();
  
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({...snackbar, open: false});
    };

    return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
        {children}
        <div className={classes.root}>
            <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    </SnackbarContext.Provider>
    )
}

export default SnackBarContextProvider