import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import SkillItem from './SkillItem';



const useStyles = makeStyles((theme) => ({
    card: {
      "minWidth": 275,
      "minHeight":20,
      "marginBottom":20,
      "marginLeft":20,
      "marginRight":20
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    paperExpansionAdd: {
      padding:'5%'
    }
  }));


const SkillDomain = (props) => {

  const classes = useStyles();

  return (
          <Grid item xs={12} lg={6}>
              <Card className={classes.card}>
                  <CardHeader title={props.domainName}>
                  </CardHeader>
                  <CardContent xs={12}>
                    <TableContainer>
                      <Table aria-label="collapsible table">
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell />
                            <TableCell>Skill ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {props.domainSkills.map((skill) => (
                            <SkillItem key={skill.skillLevelThreeId} row={skill} setAddSkill={props.setAddSkill} setSkillAddExpanded={props.setSkillAddExpanded}  />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
              </Card>
          </Grid>
  )
}


export default SkillDomain