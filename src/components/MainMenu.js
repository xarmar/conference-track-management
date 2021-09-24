import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import PopUp from "./PopUp";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TuneIcon from "@mui/icons-material/Tune";
import React, {useState} from 'react'

const MainMenu = (props) => {
  const handleTextFieldOptionSelected = () => {
    props.renderTextFieldBuilderComponent();
    props.unmontMainMenuComponent();
  };

  const handleSliderOptionSelected = () => {
    props.renderSliderBuilderComponent();
    props.unmontMainMenuComponent();
  };

  // Set state to show/hide popUp - it's initially set to false before the user clicks my name.
  const [showPopUp, setShowPopUp] = useState(false);

  // Toggles the PopUp on and off
  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  } 

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyItems="center"
        justifyContent="center"
        justifySelf="center"
        mt={1}
      >
        <Grid item m={2} p={2}>
          <Typography variant="overline" align="center">
            App created by{" "}
            <a
              onClick={togglePopUp}
              className="linkedin-link"
              rel="noreferrer"
              href="https://www.linkedin.com/in/xavierpmarques/"
              target="_blank"
            >
              Xavier Marques
            </a>
          </Typography>
          <Typography variant="h6" align="center">
            ‌CONFERENCE‌‌ TRACK‌‌ MANAGEMENT‌ ‌APP
          </Typography>
          <Typography variant="caption" display="block" align="right">
            Plan Your Conference Today!
          </Typography>
        </Grid>
        <Grid item m={2} alignItems="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<TuneIcon />}
            onClick={handleSliderOptionSelected}
          >
            <Typography>Insert Talks with Slider</Typography>
          </Button>
        </Grid>
        <Grid item m={2}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            startIcon={<TextSnippetIcon />}
            onClick={handleTextFieldOptionSelected}
          >
            <Typography>Insert Talks with TextArea</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainMenu;
