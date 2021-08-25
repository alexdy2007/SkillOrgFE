import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }
  }));

const SideDraw = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    const location = useLocation();
    console.log(location)


    return (

        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.drawerPaper,
            }}
            >
            <div className={classes.drawerHeader}>
                <IconButton onClick={props.drawCloseFn}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
            {['projects', 'skills', 'training'].map((text, index) => (
                <ListItem button component={Link} to={`/${text}`} key={text} selected={location.pathname ===`/${text}`}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
        </Drawer>
    )


}


export default SideDraw