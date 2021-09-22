import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TuneIcon from "@mui/icons-material/Tune";

const MainMenu = (props) => {
  const handleTextFieldOptionSelected = () => {
    props.renderTextFieldBuilderComponent();
    props.unmontMainMenuComponent();
  };

  const handleSliderOptionSelected = () => {
    props.renderSliderBuilderComponent();
    props.unmontMainMenuComponent();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
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
