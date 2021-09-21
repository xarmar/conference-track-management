import { Component } from "react";
import {
  convertToAmPm,
  subtrackMinutesFromDate,
} from "../dateManipulation/timeOperations";
import Track from "./Track";
import { Session } from "../types/types";
import { Grid, Typography } from "@mui/material";
class Talk extends Component<any, any> {
  duration: number;
  hasSpot: Boolean;
  isLightning: Boolean;
  startTime: any;
  title: string;
  id: number;

  constructor(
    duration: number,
    title: string,
    isLightning: Boolean,
    id: number,
    props: any
  ) {
    super(props);
    this.duration = duration;
    this.hasSpot = false;
    this.isLightning = isLightning;
    this.startTime = undefined;
    this.title = title;
    this.id = id;
  }

  // Checks if a Talk is already assigned to a Track
  talkAssignedToTrack() {
    if (this.hasSpot) {
      return true;
    }
    return false;
  }

  // Tries to place a Talk inside a target Track
  placeTalk(track: Track) {
    // Check if talk fits inside track's morning
    if (this.duration <= track.sessions.morning.availableMinutes) {
      // Set startTime of Talk
      this.startTime = this.calculateTalkStartTime(track, "morning");

      // Subtrack from track.sessions.morning.availableMinutes
      track.sessions.morning.availableMinutes -= this.duration;

      // Add talk to track's morning array
      track.sessions.morning.talks.push(this);

      // Tell App the talk is placed
      this.hasSpot = true;
    }
    // Check if talk fits inside track's afternoon
    else if (this.duration <= track.sessions.afternoon.availableMinutes) {
      // Set startTime of Talk
      this.startTime = this.calculateTalkStartTime(track, "afternoon");

      // Subtrack from track.sessions.afternoon.availableMinutes
      track.sessions.afternoon.availableMinutes -= this.duration;

      // Add talk to track's afternoon array
      track.sessions.afternoon.talks.push(this);

      // Tell App the talk is placed
      this.hasSpot = true;
    }
  }

  calculateTalkStartTime(track: Track, session: Session) {
    let talkStartTime;
    if (session === "morning") {
      talkStartTime = convertToAmPm(
        subtrackMinutesFromDate(
          track.sessions.morning.finishTalksBy,
          track.sessions.morning.availableMinutes
        )
      );
    } else {
      talkStartTime = convertToAmPm(
        subtrackMinutesFromDate(
          track.sessions.afternoon.finishTalksBy,
          track.sessions.afternoon.availableMinutes
        )
      );
    }
    return talkStartTime;
  }

  render() {
    const talk: Talk = this.props.talk;

    let durationOutput;
    let sufix;

    // If talk is Lightning, show 'lightning' to the user instead of minutes
    talk.isLightning
      ? (durationOutput = "lightning")
      : (durationOutput = talk.duration);
    talk.isLightning ? (sufix = "") : (sufix = "m");

    return (
      <Grid item>
        <Typography m={1} variant="body2">
          {" "}
          <strong>{talk.startTime}</strong> | {talk.title} - {durationOutput}
          {sufix}
        </Typography>
      </Grid>
    );
  }
}

export default Talk;
