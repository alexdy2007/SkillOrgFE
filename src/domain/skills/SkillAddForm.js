
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import React, { useContext, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';

import {SnackbarContext} from "../../contexts/SnackBarAlertContext"
import {APIStoreContext} from '../../contexts/LateNightApiStore'
import { Typography } from '@material-ui/core';



const SkillAddForm = (props) => {

    const useStyles = makeStyles((theme) => ({
        root:{
            flexGrow:1
        },
        expandOpen: {
          transform: 'rotate(180deg)',
        },
        paperExpansionAdd: {
          padding:'2%'
        },
        selectBox: {
            margin: theme.spacing(1),
            minWidth: '80%',
        },
        formAdd: {
            width: '80%'
        },
        minWidth: {
            minWidth: '80%'
        },
        skillID : {
            width:"2%"
        },
        buttonSpacing : {
        '& > *': {
            margin: theme.spacing(1),
            },
        }
      }));


    const defaultAddSkill = {
        "skillLevelThreeId":0,
        "skillLevelName":"",
        "skillLevelTwoId":1,
        "description":"",
        "imgPath":"",
        "formSubmitted": false,
        "success": false,
        "validation":{
            "skillError": false,
            "skillSubTypeIDError": false,
            "descriptionError":false,
            "imgPathError":false
        }
    }

    const resetAddSkillForm = () => {
        props.setAddSkill(defaultAddSkill)
    }

    const validateSkillAdd = (field, value) => {
        let x = skillDetails
        if (field==="skill"){
            if (value===""){
                x["validation"]["skillError"]=true
                setSkillDetails(x);
                return
            }
            x["validation"]["skillError"]=false
            setSkillDetails(x);
            return
        }
    }

    const isValid = () => {
        let valid = false
        for (const [ _ , value] of Object.entries(skillDetails.validation)) {
            valid = valid | value
        }
        return !valid
    }



    const handleSkillAddChange = (event) => {
        switch(event.target.name){
            case 'addSkillName': {
                validateSkillAdd("skill", event.target.value)
                setSkillDetails({...skillDetails, "skillLevelThreeName":event.target.value})
                break;
            }
            case 'addImgPath': {
                setSkillDetails({...skillDetails, "imgPath":event.target.value})
                break;
            }
            case 'addSkilldescrption': {
                setSkillDetails({...skillDetails, "description":event.target.value})
                break;
            }
            case 'skillDomain': {
                console.log("HERE")
                setSkillDetails({...skillDetails, "skillLevelTwoId":event.target.value})
                break;
            }
            default: {
                console.log("Unknow event for changing form data")
            }
        }
    }

    const saveSkill = async () => {
        if(isValid()){
            if(skillDetails.skillID !== 0){
                await apiCalls.skills.edit(skillDetails)
                if(skills.success===true){
                    setSnackbar({...snackbar, message:`Edited ${skillDetails.skillLevelThreeName}`, severity:"success", open:true})
                }
            }else{
                await apiCalls.skills.add(skillDetails)
                setSnackbar({...snackbar, message:`Added ${skillDetails.skillLevelThreeName}`, severity:"success", open:true})

            }
        }else{
            setSnackbar({...snackbar, message:"invalid skills properties", severity:"error", open:true})
        }
    }

    useEffect(() => {
        let merged_skill = {...defaultAddSkill, ...props.skillToAdd}
        setSkillDetails(merged_skill)
    },[props.skillToAdd])

    const {skills, apiCalls} = useContext(APIStoreContext);

    const levelTwoNameList = skills["data"].map(skill => { return {"skillLevelTwoName":skill.skillLevelTwoName, "skillLevelTwoId":skill.skillLevelTwoId}}) 

    const [skillDetails, setSkillDetails] = useState(defaultAddSkill);
    const {snackbar, setSnackbar} = useContext(SnackbarContext);
    const classes = useStyles();


    return (
        <form className={classes.formAdd}>
            <Paper elevation={2} className={classes.paperExpansionAdd}>
                <div className={classes.root}>
                    <Grid container justify="flex-end">
                        <Typography variant="p"> {skillDetails.skillLevelThreeId > 0 ? 'Edit-Mode' : 'New-Skill'} </Typography> 
                    </Grid>
                    <Grid container alignItems="center" direction="row">
                        <Grid item xs={12}>
                            <TextField disabled className={classes.skillID} id="addSkillID" name="addSkillID" label="SkillID"  value={skillDetails.skillLevelThreeId}/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField className={classes.minWidth} required id="addSkillName" name="addSkillName" label="SkillName" error={skillDetails.validation.skillError} value={skillDetails.skillLevelThreeName} onChange={handleSkillAddChange}/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField
                                id='skillDomain'
                                error={false}
                                select
                                label="SubGroup"
                                value={skillDetails.skillLevelTwoId}
                                className={classes.selectBox}
                                name='skillDomain'
                                onChange={handleSkillAddChange}
                            >  
                                {levelTwoNameList.map((lvlTwoskill, index) => (
                                    <MenuItem key={lvlTwoskill.skillLevelTwoName} value={lvlTwoskill.skillLevelTwoId}>
                                        <em>{lvlTwoskill.skillLevelTwoName}</em>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField className={classes.minWidth} required id='addImgPath' label="ImgPath" name="addImgPath" error={skillDetails.validation.imgPathError} value={skillDetails.imgPath} onChange={handleSkillAddChange}/>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField multiline  rowsMax={3} style={{width:"93%"}} required id='addSkilldescrption' name="addSkilldescrption" error={skillDetails.validation.descriptionError} label="Description" value={skillDetails.description} onChange={handleSkillAddChange}/>
                        </Grid>
                        <Grid item xs={12}><br/></Grid>
                        <Grid container justify="flex-end">
                            <div className={classes.buttonSpacing}>
                                <Button variant="contained" color="primary" onClick={saveSkill}>
                                    Save
                                </Button>
                                <Button variant="contained" color="secondary" onClick={resetAddSkillForm}>
                                    Reset
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </form>
    )   
}

export default SkillAddForm;