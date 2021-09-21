import Track from "../Track";
import { Grid } from "@mui/material";

interface listOfTracksProps {
  arrayOfTracks: Track[];
}

const ListOfTracks = (props: listOfTracksProps) => {
  const arrayOfTracks: Track[] = props.arrayOfTracks;

  // Do not run if arrayOfTracks length is 0
  if (arrayOfTracks.length === 0) {
    return null;
  }

  // Map arrayOfTracks to return an new array of divs that contain Track Components
  const trackList = arrayOfTracks.map((track) => (
    <Grid
      key={track.trackNumber}
      container
      item
      direction="row"
      justifyContent="center"
      align-items="center"
      xs={6}
    >
      <Track track={track} />
    </Grid>
  ));

  return <>{[trackList]}</>;
};

export default ListOfTracks;
