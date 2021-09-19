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
import { containsNumber } from '../helperFunctions/helperFunctions';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import ScheduleIcon from '@mui/icons-material/Schedule';


const Form = () => {

    // Initiate State for Form Inputs
    const [inputFields, setinputFields] = useState([
        {talkTitle: "", talkDuration: "", isLightning: false, talkHelperText: "", talkError: false}
    ]);

    // Handle User Input on Title TextField
    const handleTitleChange = (index, event) => {
        
        const values = [...inputFields];
        let inputValue = event.target.value;
        let targetInput = event.target.name;
        let containsANumber = containsNumber(inputValue);

        // Set helperText for Talk Title
        if(targetInput === "talkTitle") {
            if(containsANumber) {
                values[index]['talkError'] = true;
                values[index]['talkHelperText'] = 'Numbers are not allowed!';       
            }
            else {
                values[index]['talkError'] = false;
                values[index]['talkHelperText'] = ''; 
            }
        }

        values[index][targetInput] = inputValue;
        setinputFields(values);
    }

    // Handle User Input On Slider TextField
    const handleDurationChange = (index, event) => {
        const values = [...inputFields];
        let inputValue = event.target.value
        values[index][event.target.name] = inputValue
        setinputFields(values);
    }

    // Handle User Clicks To Goggle Lightning Talk on/off
    const handleLightningTalkClick = (index, event) => {
        let values = [...inputFields];
        values[index]['isLightning'] = !values[index]['isLightning'];
        setinputFields(values);
        console.log(values[index]['isLightning']);
    }

    // Adds a new group of inputs on click
    const handleAddInput = (index) => {
        const values = [...inputFields];
        let newinput = {talkTitle: "", talkDuration: "", isLightning: false, talkHelperText: "", talkError: false};
        values.splice(index + 1, 0, newinput);
        setinputFields(values);
    }

    // Removes a group of inputs on click
    const handleRemoveInput = (index) => {
        const values = [... inputFields];
        values.splice(index, 1);
        setinputFields(values);
    }

    // SLIDER -----------------------------------------------------------------
    const Input = styled(MuiInput)`
    width: 10%;
`;

    // Sets the Slider Value in the JSX - WORKING DONT TOUCH
    const sliderValue = (index) => {
        let values = [...inputFields];
        if (typeof values[index]['talkDuration'] === 'number') {
            return inputFields[index]['talkDuration']
        }
        else {
            return 0
        }
    }

    // Handles slider change (when user drags the slider) - WORKING DONT TOUCH
    const handleSliderChange = (index, event) => {
    let values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setinputFields(values);
    };



    // Renders Form UI to the DOM
    const renderForm = inputFields.map((inputFields, index) => {
        return (
            <Grid container direction="row" item key={index} alignItems="center" justifyContent="center" xs={3} m={1} p={2} id="cada-form">
                <Grid item xs={12}>
                    <TextField name="talkTitle" 
                    label="Talk Title" 
                    value={inputFields.talkTitle} 
                    variant="filled"
                    error={inputFields.talkError}
                    helperText={inputFields.talkHelperText} 
                    size="small"
                    onChange={event => handleTitleChange(index, event)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <TitleIcon />
                            </InputAdornment>
                            ),
                        }}/>  
                <Box sx={{ width: 250 }} className="input-slider">
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item>
                        <ScheduleIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider
                        name = "talkDuration"
                        variant="filled"
                        value={sliderValue(index)}
                        onChange={event => handleSliderChange(index, event)}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                        step={5}
                        min={5}
                        max={60}
                        />
                    </Grid>
                </Grid>
                </Box>
                </Grid>
                <Grid container item direction="column" xs={12}>
                    <Grid item xs={4} m={1} mb={0}>
                            <Tooltip title="Set as lightning talk" placement="top">
                                <IconButton 
                                onClick={event => handleLightningTalkClick(index,event)}
                                >
                                    <FlashOnIcon/>
                                </IconButton>  
                            </Tooltip>
                        </Grid>
                    <Grid item xs={4} m={1} mb={0}>
                            <Tooltip title="Add another talk" placement="top">
                                <IconButton onClick={event => handleAddInput(index)}>
                                    <AddCircleOutlineIcon/>
                                </IconButton>  
                            </Tooltip>
                        </Grid>
                    <Grid item xs={4} m={1} mb={0}>
                        <Tooltip title="Remove this talk" placement="top">
                                <IconButton onClick={event => handleRemoveInput(index)}>
                                    <RemoveCircleOutlineIcon/> 
                                </IconButton>  
                            </Tooltip>  
                    </Grid>
                </Grid>
            </Grid>
        )
        });
    
    return (
        <Grid container item xs={12} alignItems="center" id="preto-tudo">
            <Grid container item direction="row" justifyContent="center" xs={12} id="verde-forms">
                {renderForm}
            </Grid>
            <Grid item alignSelf="center" alignItems="center" mx={2} mt={4} xs={12}>
                <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                startIcon={<DateRangeIcon/>}>
                <Typography>Schedule Conference</Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

export default Form