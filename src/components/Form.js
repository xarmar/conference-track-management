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
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckBox from '@mui/material/Checkbox'


const Form = () => {

    // Initiate State for Form Inputs
    const [inputFields, setinputFields] = useState([
        {talkTitle: "", talkHelperText: "", talkError: false, talkDuration: "", isLightning: true}
    ]);

    // TALK TITLE ------------------------------------------------------

    // Handle User Input on Title TextField
    const handleTitleChange = (index, event) => {
        
        // Get state values
        const values = [...inputFields];
        let inputValue = event.target.value;
        let targetInput = event.target.name;
        let containsANumber = containsNumber(inputValue);

        // Set helperText for Talk Title
        if(targetInput === "talkTitle") {
            if(containsANumber) {
                values[index]['talkError'] = true;
                values[index]['talkHelperText'] = 'Numbers not allowed!';       
            }
            else {
                values[index]['talkError'] = false;
                values[index]['talkHelperText'] = ''; 
            }
        }
        
        // Set new state values
        values[index][targetInput] = inputValue;
        setinputFields(values);
    }

    // SLIDER -----------------------------------------------------------

    // Sets the Slider Value in the DOM
    const sliderValue = (index) => {
        
        // Get state values
        let values = [...inputFields];

        // If it's a number, return that number to the DOM
        if (typeof values[index]['talkDuration'] === 'number') {
            return inputFields[index]['talkDuration']
        }
        else {
            return 0
        }
    }

    // Handles slider change (when user drags the slider)
    const handleSliderChange = (index, event) => {
        
        // Get state values
        let values = [...inputFields];
        values[index][event.target.name] = event.target.value;

        // If the user drags slider > 5 minutes, set isLightning to false
        if(event.target.value > 5) {
            values[index]['isLightning'] = false;
        }

        // If the user drags slider to 5 minutes, set isLightning to true
        else if (event.target.value === 5) {
            values[index]['isLightning'] = true;
        }
        setinputFields(values);
    };

    // CHECKBOX (lightning) --------------------------------------------

    // Handles User Clicks To Toggle 'isLightning' ON and OFF
    const handleLightningTalkClick = (index, event) => {
        
        // Get state values
        let values = [...inputFields];

        // Only allow toggle off it's over 5 minutes
        if(values[index]['talkDuration'] > 5) {
            values[index]['isLightning'] = !values[index]['isLightning'];
        }

        // If isLightning & duration > 5, set talk duration to 5 minutes
        if(values[index]['isLightning']) {
            values[index]['talkDuration'] = 5;
        }
        setinputFields(values);
    }

    // Change checkbox 'checked' state based on isLightning boolean value
    const handleCheckbox = (index) => {
        if(inputFields[index]['isLightning']) {
            return true
        }
        return false;
    }

    // Changes the onHover helperText on Checkbox
    const setLightningTalkHelperText = (index) => {
        let values = [...inputFields];
        if (values[index]['isLightning']) {
            return "Turn OFF lightning talk"
        }
        return "Turn ON lightning talk"
    }

    // ADD / REMOVE TALK BUTTONS ---------------------------------------

    // Adds a new group of inputs on click
    const handleAddInput = (index) => {
        const values = [...inputFields];
        let newinput = {talkTitle: "", talkDuration: "", isLightning: true, talkHelperText: "", talkError: false};
        values.splice(index + 1, 0, newinput);
        setinputFields(values);
    }

    // Removes a group of inputs on click
    const handleRemoveInput = (index) => {
        const values = [... inputFields];
        values.splice(index, 1);
        setinputFields(values);
    }

    // Uses the data to build a Track List - TODO TODO TODO
    const handleSubmitRequest = () => {
        let invalid = false;
        let userInputArray = [...inputFields]

        for (let i = 0; i < userInputArray.length; i++) {
            // Look for empty strings and warn user
            if(userInputArray[i].talkTitle === "") {
                userInputArray[i]['talkHelperText'] = "No empty titles!";
                userInputArray[i]['talkError'] = true;
                setinputFields(userInputArray);
                invalid = true;
            }
            // Look for numbers in title and warn user
            else if(containsNumber(userInputArray[i].talkTitle)) {
                userInputArray[i]['talkHelperText'] = "No numbers, please!";
                userInputArray[i]['talkError'] = true;
                setinputFields(userInputArray);
                invalid = true;
            }
        }
        if (invalid) {
            return
        }
    }


    // Renders Form UI to the DOM
    const renderForm = inputFields.map((inputFields, index) => {
        return (
            <Grid container direction="row" item key={index} alignItems="center" justifyContent="center" xs={2} m={1} p={2} id="cada-form">
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
                <Grid container spacing={2} alignItems="center" justifyContent="center" mt={2}>
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
                <Grid container item direction="row" justifyContent="center" align-items="center" spacing={2} xs={12} mt={1} ms={4}>
                    <Tooltip title={setLightningTalkHelperText(index)} placement="top">
                        <CheckBox onClick={event => handleLightningTalkClick(index,event)} checked={handleCheckbox(index)} icon={<FlashOffIcon />} checkedIcon={<FlashOnIcon />} />
                    </Tooltip>
                    <Tooltip title="Add another talk" placement="top">
                        <IconButton onClick={event => handleAddInput(index)}>
                            <AddCircleOutlineIcon/>
                        </IconButton>  
                    </Tooltip>
                    <Tooltip title="Remove this talk" placement="top">
                        <IconButton onClick={event => handleRemoveInput(index)}>
                            <RemoveCircleOutlineIcon/> 
                        </IconButton>  
                    </Tooltip> 
                </Grid>
            </Grid>
        )
        });
    
    return (
        <Grid container item xs={12} alignItems="center" id="preto-tudo">
            <Grid container item direction="row" justifyContent="center" align-items="center" xs={12} id="verde-forms">
                {renderForm}
            </Grid>
            <Grid container item justifyContent="center" alignItems="center" mt={4} xs={12}>
                <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                startIcon={<DateRangeIcon/>}
                onClick={handleSubmitRequest}>
                <Typography>Schedule Conference</Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

export default Form