import React from 'react';
import NavBar from './NavBar';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import SkillPage from '../domain/skills/SkillPage';
import LoginPage from './LoginPage';
import ProjectPage from '../domain/project/ProjectPage';
import TrainingPage from '../domain/TrainingPage';

import APIProvider from '../contexts/LateNightApiStore'
import SnackBarContextProvider from '../contexts/SnackBarAlertContext'



const MainPage = () => {

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: drawerWidth,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
      },
      main: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
    }));
  
    const classes = useStyles();

    const [drawOpen, setDrawOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setDrawOpen(true);
    };
  
    const handleDrawerClose = () => {
      setDrawOpen(false);
    };
    return (
        <div>
            <Router>
            <NavBar
            closeDrawFn={handleDrawerClose}
            openDrawFn={handleDrawerOpen}
            drawOpen={drawOpen}

            />
            <main
            className={clsx(classes.content, {
                [classes.contentShift]: drawOpen,
            })}
            >
            <SnackBarContextProvider>
              <APIProvider>
                <div className={classes.main} />
                  <Paper style={{minHeight:"92vh", "margin-bottom":"1px"}}>
                    <Switch>
                      <Route exact path="/login">
                        <LoginPage />
                      </Route>
                      <Route path="/skills">
                        <SkillPage />
                      </Route>
                      <Route path="/projects">
                        <ProjectPage />
                      </Route>
                      <Route path="/training">
                        <TrainingPage />
                      </Route>
                    </Switch>
                  </Paper>
                </APIProvider>
              </SnackBarContextProvider>
            </main>

            </Router>
        </div>
    )

} 

export default MainPage