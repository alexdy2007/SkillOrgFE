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

import TechRadarChart from '../../common/charts/techRadarChart';

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
        "marginBottom":"20px"
    }
  }));


const SkillPage = () => {

    const processSkillLevelThreeDataForRadarChart = (skillgrouped) => {
        let new_array_holder = [];
        for (const stwo of skillgrouped){
            let skillLevelOneId = stwo.skillLevelOneId;
            for (const sthree of stwo.skillsLevelThree){
                let tmp_data_obj = {};
                tmp_data_obj["id"] = sthree.skillLevelThreeId;
                tmp_data_obj["label"] = sthree.skillLevelThreeName;
                tmp_data_obj["quadrant"] = skillLevelOneId - 1;
                tmp_data_obj["ring"] = sthree.skillAdoptionId-1;
                tmp_data_obj["moved"] = 0;
                new_array_holder.push(tmp_data_obj);
            }
        }
        return new_array_holder;
    }

    const classes = useStyles();

    const {skills, apiCalls} = useContext(APIStoreContext);

    const [skillByDomain, setSkillByDomain] = useState([]);
    const [skillTechRader, setSkillTechRader] = useState([]);



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
                setSkillTechRader([])
            }else{
                setSkillByDomain(groupSkillData)
                let skillRaderData = processSkillLevelThreeDataForRadarChart(groupSkillData)
                setSkillTechRader(skillRaderData);
            }
        }
    },[skills])

    const radarviz_default_config = {
        svg_id: "radar",
        width: 1450,
        height: 1000,
        colors: {
          background: "#fff",
          grid: "#bbb",
          inactive: "#ddd"
        },
        title: "Alex's tech radar",
        quadrants: [
          { name: "Data - Stores and Managment" },
          { name: "Infra & Devops" },
          { name: "Tools, Lanaguages and Frameworks" },
          { name: "Methodolgies / Ways of working" }
        ],
        rings: [
          { name: "Adopt",  color: "#93c47d" },
          { name: "Trail", color: "#b7e1cd" },
          { name: "Spike",  color: "#fce8b2" },
          { name: "Heap",  color: "#f4c7c3" }
        ],
        print_layout: true,
        entries: [
     
          // ...
        ]
      };

    
    return (
        <>
            <Typography variant='h3' align='center'>
                Skills Heirachy
            </Typography>
            <br></br>
            <Box display="flex" justifyContent="center" style={{height:60}}>
                <ButtonBase className={classes.root , skillAddExpanded ? classes.addSkillActiveButton : classes.addSkillButton} onClick={handleExpandAddSkillClick}>
                    <AddCircleOutlineIcon />
                </ButtonBase>
            </Box >

            <Collapse in={skillAddExpanded} style={{width:"100%", "padding-bottom":"20px"}} timeout="auto" unmountOnExit>
                <Box display="flex" justifyContent="center">
                    <SkillAddForm skillToAdd={addSkill} setAddSkill={setAddSkillCallback}></SkillAddForm>
                </Box>
            </Collapse>  
            <Grid container xs={12} direction="row" alignItems="stretch">
                <Grid xs={6} direction="column" alignItems="stretch">
                    {Object.keys(skillByDomain).map((domainName, index) => (
                            index % 2 == 0 ? <SkillDomain key={domainName} domainName={skillByDomain[index]["skillLevelTwoName"]} domainSkills={skillByDomain[index]["skillsLevelThree"]} setAddSkill={setAddSkillCallback} setSkillAddExpanded={setSkillExpandedCallback} ></SkillDomain> : <div/>
                    ))} 
                </Grid>
                <Grid xs={6} direction="column" alignItems="stretch">
                    {Object.keys(skillByDomain).map((domainName, index) => (
                            index % 2 == 1 ? <SkillDomain key={domainName} domainName={skillByDomain[index]["skillLevelTwoName"]} domainSkills={skillByDomain[index]["skillsLevelThree"]} setAddSkill={setAddSkillCallback} setSkillAddExpanded={setSkillExpandedCallback} ></SkillDomain> : <div/>
                    ))} 
                </Grid>
            </Grid>
            <TechRadarChart config={radarviz_default_config} radar_data={skillTechRader}></TechRadarChart>
        </>

    )

} 
export default SkillPage