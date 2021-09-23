import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import {
  containsNumber,
  isLightningOrNumber,
  removeEmptyLines,
} from "../helperFunctions/helperFunctions";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Grid from "@mui/material/Grid";
import RestartAlt from "@mui/icons-material/RestartAlt";
import Talk from "./Talk";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const TextFieldBuilder = (props) => {
  // Used to pass boolean value to TextField's fullWith and multiline properties
  const isTrue = true;

  // Initiate State for Form Inputs
  const [textAreaInput, setTextAreaInput] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [toggleAlternativeHelperText, settoggleAlternativeHelperText] =
    useState(false);
  const [error, setError] = useState(false);

  const handleMainMenuClick = () => {
    props.unmountTextFieldBuilderComponent();
    props.renderMainMenuComponent();
  };

  // TALK TITLE ------------------------------------------------------

  // Handle User Input on Title TextField
  const handleTextArea = (event) => {
    setTextAreaInput(event.target.value);
    setWarningMessage("");
    setError(false);
  };

  // FORM SUMISSION ----------------------------------------------------

  // Uses the data to build a Track List
  const handleScheduleConference = () => {
    // Get user input by line
    let userInputArray = textAreaInput.split("\n");

    // Filter user input, ignore white space lines
    let filteredArrayThatIgnoresEmptyLines = removeEmptyLines(userInputArray);

    // Initiate Array That will go through validation steps
    let arrayToValidate = [];

    // Extract Talk title and duration
    filteredArrayThatIgnoresEmptyLines.forEach((lineOfText) => {
      // Use spaces to separate and get array of words
      let arrayOfWords = lineOfText.split(" ");

      // Title is the sum of all words except the last one
      let chosenTitle = "";
      for (let i = 0; i < arrayOfWords.length - 1; i++) {
        chosenTitle += arrayOfWords[i] + " ";
      }

      // Duration is the last typed word
      let chosenDuration = arrayOfWords[arrayOfWords.length - 1];

      // Set title and duration
      let title = chosenTitle.trim();
      let duration = chosenDuration;

      arrayToValidate.push({
        title: title,
        duration: duration,
      });
    });

    // VALIDATE USER INPUT

    // If is there is whitespace at the end of each line, warn the user
    if (
      arrayToValidate.some((input) => !input.duration.match("\\S+")) ||
      arrayToValidate.some((input) => input.duration === "")
    ) {
      setWarningMessage(
        "Your last word on a line must be your talk's {duration}. Look for whitespace at the end of each line and delete it!"
      );
      setError(true);
    }
    // If user gives an invalid duration.
    else if (
      arrayToValidate.some((input) => !isLightningOrNumber(input.duration))
    ) {
      if (!toggleAlternativeHelperText) {
        setWarningMessage(
          "Invalid duration! Pick 'lightning' OR a number between 5 and 60 with the sufix 'min'. i.e {Your Title} {60min}."
        );
        setError(true);
        settoggleAlternativeHelperText(!toggleAlternativeHelperText);
      }
      // When user copy-pastes from a pdf to the textArea (for example the intructions PDF), it comes with whitespace that cannot be removed with .trim() - tell user to delete it
      else {
        setWarningMessage(
          "If you have a valid duration (minutes/lightning), look for any whitespace or characters at the end of each line and delete them!"
        );
        setError(true);
        settoggleAlternativeHelperText(!toggleAlternativeHelperText);
      }
      return;
    }

    // If a title contains numbers in Title, reject input
    else if (arrayToValidate.some((input) => containsNumber(input.title))) {
      setWarningMessage("Invalid! There are numbers in your titles.");
      setError(true);
      return;
    } else {
      //Prepare arrayOfTalks that will be sent to buildTrackList Method
      let arrayOfTalks = [];
      let talkCounter = 0;

      arrayToValidate.forEach((input) => {
        talkCounter++;

        // If it is lightning => duration is 5 minutes and vice versa
        if (
          input.duration.trim().toLocaleLowerCase() === "lightning" ||
          parseInt(input.duration) === 5
        ) {
          let newTalk = new Talk(5, input.title, true, talkCounter, null);
          arrayOfTalks.push(newTalk);
        }
        // If is not lightning, just use the talk duration
        else {
          let newTalk = new Talk(
            parseInt(input.duration),
            input.title,
            false,
            talkCounter,
            null
          );
          arrayOfTalks.push(newTalk);
        }
      });

      // Prevent submits with no talks
      if (arrayOfTalks.length === 0) {
        setWarningMessage("Please insert some talks!");
        setError(true);
      } else {
        //Unmount TextFieldOptionComponent
        props.unmountTextFieldBuilderComponent();

        // Render Conference Component to the DOM
        props.renderConferenceComponent(arrayOfTalks);
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid container alignItems="center">
        <Grid
          container
          item
          direction="row"
          justifyContent="center"
          align-items="center"
          xs={12}
          sx={{ boxShadow: 10 }}
        >
          <TextField
            name="textField"
            label="Enter your talks. i.e: {My title} {60min}"
            value={textAreaInput}
            error={error}
            helperText={warningMessage}
            variant="filled"
            multiline={isTrue}
            minRows="8"
            maxRows="30"
            fullWidth={isTrue}
            size="small"
            onChange={(event) => handleTextArea(event)}
          />
        </Grid>
        <Grid
          container
          item
          justifyContent="center"
          alignItems="center"
          mt={4}
          xs={12}
        >
          <Grid item m={3}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<DateRangeIcon />}
              onClick={handleScheduleConference}
            >
              <Typography>Schedule Conference</Typography>
            </Button>
          </Grid>
          <Grid item m={3}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              startIcon={<RestartAlt />}
              onClick={handleMainMenuClick}
            >
              <Typography>Back to Main Menu</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextFieldBuilder;
