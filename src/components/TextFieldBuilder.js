import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import { Button, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { containsNumber, isLightningOrNumber } from '../helperFunctions/helperFunctions';
import Talk from './Talk'
import { Box } from '@mui/system';
import RestartAlt from '@mui/icons-material/RestartAlt';

const TextFieldBuilder = (props) => {

    // Initiate State for Form Inputs
    const [textAreaInput, setTextAreaInput] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
    const [error, setError] = useState(false);


    const handleMainMenuClick = () => {
        props.unmountTextFieldBuilderComponent();
        props.renderMainMenuComponent();
    }

    // TALK TITLE ------------------------------------------------------

    // Handle User Input on Title TextField
    const handleTextArea = (event) => {
        setTextAreaInput(event.target.value);
    }

    // FORM SUMISSION ----------------------------------------------------
    
    // Uses the data to build a Track List
    const handleScheduleConference = () => {
        
        // Get user input by line
        let userInputArray = textAreaInput.split('\n');

        let arrayToValidate = [];

        // Extact Talk title and duration
        userInputArray.forEach(lineOfText => {
            // Use comma to separate between Title and Duration 
            let titleTime = lineOfText.split(',');
            let title = titleTime[0];
            let duration = titleTime[1];
            arrayToValidate.push({title: title, duration: duration})
        });

        // Rejects whitespace and undefined values - WORKING
        if( arrayToValidate.some(input => input.title === undefined) ||
            arrayToValidate.some(input => input.duration === undefined) ||
            arrayToValidate.some(input => !input.title.trim()) ||
            arrayToValidate.some(input => !input.duration.trim())) {
            setWarningMessage('Invalid Input! Correct Synthax: {Title With No Numbers } , {the word "lightning"} OR {a number between 5 and 60}');
            setError(true);
            return
        }

        // If a title contains numbers in Title, reject input - WORKING
        else if(arrayToValidate.some(input => containsNumber(input.title))) {
            setWarningMessage('Invalid Input! Correct Synthax: {Title With No Numbers } , {the word "lightning"} OR {a number between 5 and 60}');
            setError(true);
            return
        }

        // Reject any duration inputs that are not lightning or numbers between 5 and 60
        else if(!arrayToValidate.every(input => isLightningOrNumber(input.duration))) {
            setWarningMessage('Invalid Input! Correct Synthax: {Title With No Numbers } , {the word "lightning"} OR {a number between 5 and 60}');
            setError(true);
            return
        }

        else {
            //Prepare arrayOfTalks that will be sent to buildTrackList Method
            let arrayOfTalks = [];

            arrayToValidate.forEach(input => {

                // If it is lightning => duration is 5 minutes and vice versa
                if(input.duration.trim().toLocaleLowerCase() === 'lightning' || parseInt(input.duration) === 5) {
                    let newTalk = new Talk(5, input.title, true, null);
                    arrayOfTalks.push(newTalk);
                }
                // If is not lightning, just use the talk duration
                else {
                    let newTalk = new Talk(parseInt(input.duration), input.title, false, null);
                    arrayOfTalks.push(newTalk);
                }
            });

            //Unmount TextFieldOptionComponent
            props.unmountTextFieldBuilderComponent();

            // Render Conference Component to the DOM
            props.renderConferenceComponent(arrayOfTalks);
        }
    }
    
    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
            <Grid container xs={12} alignItems="center">
                <Grid container item direction="row" justifyContent="center" align-items="center" xs={12}>
                    <TextField name="textField" 
                    label="Please enter your talks here: {Talk.title} , {Talk.duration}" 
                    value={textAreaInput}
                    error={error}
                    helperText={warningMessage} 
                    variant="filled"
                    multiline="true"
                    minRows="8"
                    maxRows="30"
                    fullWidth="true"
                    size="small"
                    onChange={event => handleTextArea(event)}/>
                </Grid> 
                <Grid container item justifyContent="center" alignItems="center" mt={4} xs={12}>
                    <Grid item m={3}>
                        <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        startIcon={<DateRangeIcon/>}
                        onClick={handleScheduleConference}>
                        <Typography>Schedule Conference</Typography>
                        </Button>
                    </Grid>
                    <Grid item m={3}>
                        <Button 
                        variant="contained" 
                        color="secondary" 
                        type="submit" 
                        startIcon={<RestartAlt/>}
                        onClick={handleMainMenuClick}>
                        <Typography>Back to Main Menu</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TextFieldBuilder