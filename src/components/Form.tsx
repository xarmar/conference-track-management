import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import TitleIcon from '@mui/icons-material/Title';
import Grid from '@mui/material/Grid'
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { InputAdornment } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';

const Form = () => {
    
    // Initiate State for Form Inputs
    const [inputFields, setinputFields] = useState([
        {talkTitle: "", talkDuration: "", isLightning: false},
    ]);

    // const handleChangeInput = (index: number, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    //     console.log(index);
    //     const values:any = [...inputFields];
    //     values[index][event.target.name] = event.target.value;
    //     setinputFields(values);
    // }

    // Renders Form UI to the DOM
    const renderForm = inputFields.map((inputFields, index) => {
        return (
        <Grid container direction="row" alignItems="left" justifyContent="center" key={index} spacing={4}>
            <Grid item>
                <TextField name="talk-title" 
                label="Talk Title" 
                value={inputFields.talkTitle} 
                variant="filled" 
                onChange={event => handleChangeInput(index, event)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <TitleIcon />
                        </InputAdornment>
                        ),
                    }}/>  
            </Grid>
            <Grid item>
                <TextField name="talk-duration" 
                label="Talk Duration" 
                value={inputFields.talkDuration} 
                variant="filled" 
                onChange={event => handleChangeInput(index, event)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <ScheduleIcon />
                        </InputAdornment>
                        ),
                    }}/>
            </Grid>
            <Grid item>
                <Tooltip title="lightning talk" placement="top">
                    <IconButton>
                        <FlashOnIcon/>
                    </IconButton>  
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title="Add another talk" placement="top">
                    <IconButton>
                        <AddCircleOutlineIcon/>
                    </IconButton>  
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title="Remove this talk" placement="top">
                    <IconButton>
                        <RemoveCircleOutlineIcon/>
                    </IconButton>  
                </Tooltip>  
            </Grid>
        </Grid>
        )
        });
    
    return (
        <Grid container direction="column">
            <Grid item m={2}>
                {renderForm}
            </Grid>
            <Grid item m={2}>
                <Grid container direction="row" alignItems="left" justifyContent="center">
                    <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    startIcon={<DateRangeIcon/>}>
                    <Typography>Schedule Conference</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Form