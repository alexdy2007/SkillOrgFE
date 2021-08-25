import React, { useContext, useEffect, useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {APIStoreContext} from '../../contexts/LateNightApiStore'
import {groupBy} from '../../utils/Utils'

import SkillDomain from './SkillDomain'
import SkillAddForm from './SkillAddForm';

import Box from '@material-ui/core/Box';
import { Collapse } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      height: 50,
      width: '100%',
    },

    addSkillActiveButton:{
        width: '80%',
        backgroundColor:theme.palette.secondary.main,
        '&:hover, &$focusVisible' :{
            border: '2px solid black'
        }
    },
    addSkillButton:{
        width: '80%',
        '&:hover, &$focusVisible' :{
            border: '2px solid black' 
        },
        "margin-bottom":"20px"
    }
  }));


const SkillPage = () => {

    const classes = useStyles();

    const {skills, apiCalls} = useContext(APIStoreContext);
    const [skillByDomain, setSkillByDomain] = useState([]);

    const [skillAddExpanded, setSkillAddExpanded] = useState(false);
    const setSkillExpandedCallback = useCallback((value) => {
        setSkillAddExpanded(value)
    }, [])
  
    const handleExpandAddSkillClick = () => {
        setSkillAddExpanded(!skillAddExpanded);
    };

    const [addSkill, setAddSkill] = useState({});
    const setAddSkillCallback = useCallback((value) => {
        setAddSkill(value)
    }, [])

    useEffect(() => {
        async function refresh_skills() {
            await apiCalls.skills.refresh()
        }
        refresh_skills()
    },[])

    useEffect(() => {
        if (skills.IsLoading===false){
            let groupSkillData = skills.data
            if (groupSkillData === 'null' | groupSkillData.length===0){
                setSkillByDomain([])
            }else{
                setSkillByDomain(groupSkillData)
            }
        }
    },[skills])

    
    return (
        <>
            <Typography variant='h3' align='center'>
                Skills Heirachy
            </Typography>
            <br></br>
            <Box display="flex" justifyContent="center">
                <ButtonBase className={classes.root , skillAddExpanded ? classes.addSkillActiveButton : classes.addSkillButton} onClick={handleExpandAddSkillClick}>
                    <IconButton aria-label="Add New Skill To Domain">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </ButtonBase>
            </Box >

            <Collapse in={skillAddExpanded} style={{width:"100%", "padding-bottom":"20px"}} timeout="auto" unmountOnExit>
                <Box display="flex" justifyContent="center">
                    <SkillAddForm skillToAdd={addSkill} setAddSkill={setAddSkillCallback}></SkillAddForm>
                </Box>
            </Collapse>  
            <Grid container direction="row" alignItems="stretch">
                {Object.keys(skillByDomain).map((domainName, index) => (
                        <SkillDomain key={domainName} domainName={skillByDomain[index]["skillLevelTwoName"]} domainSkills={skillByDomain[index]["skillsLevelThree"]} setAddSkill={setAddSkillCallback} setSkillAddExpanded={setSkillExpandedCallback} ></SkillDomain>
                ))} 
            </Grid>
     
        </>
    )

} 
export default SkillPage