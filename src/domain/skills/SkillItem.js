import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import {APIStoreContext} from '../../contexts/LateNightApiStore'


const useSkillRowStyles = makeStyles({
    tableRoot: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });


function SkillItem(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useSkillRowStyles();
    const {skills, apiCalls} = useContext(APIStoreContext);


    const clickEditSkill = () => {
        props.setAddSkill(row);
        props.setSkillAddExpanded(true);
    }

    const clickDeleteSkill = async () => {
        await apiCalls.skills.delete(row)
    }
  
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <CachedRoundedIcon/>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.skillLevelThreeId}
                </TableCell>
                <TableCell>{row.skillLevelThreeName}</TableCell>
                <TableCell align="right" allign>
                    <IconButton onClick={clickEditSkill}>
                        <EditRoundedIcon/>
                    </IconButton>
                    <IconButton>
                        <DeleteRoundedIcon onClick={clickDeleteSkill}/>
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Skill Details
                            </Typography>
                            <p>{row.description}</p>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Knows Level</TableCell>
                                    <TableCell>Want to Learn</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Joe Blogs
                                        </TableCell>
                                        <TableCell>Proficient 3</TableCell>
                                        <TableCell>Very Proficient 4</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>
    );
  }
  export default SkillItem