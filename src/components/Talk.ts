import React, {Component} from 'react'
import { addMinutesToDate } from '../dateManipulation/timeOperations';
import Track from './Track';


class Talk extends Component<any, any> {

    duration: number;
    hasSpot: Boolean;
    title: String;
    startTime: any;

    constructor(duration: number, title: String, props: any) {
        super(props);
        this.duration = duration;
        this.hasSpot = false;
        this.title = title;
        this.startTime = undefined;
    }

    // Checks if a Talk is already assigned to a Track
    talkAssignedToTrack() {
        if(this.hasSpot) {
            return true
        }
        return false
    }

    // Tries to place a Talk inside a target Track
    placeTalk(track: Track) {
        // Check if talk fits inside track's morning
        if (this.duration <= track.sessions.morning.availableMinutes) {
            
            // Set startTime of Talk
            this.startTime = track.sessions.morning.startTime;

            // Increment startTime in Track to be ready for the next Track placement
            track.sessions.morning.startTime = addMinutesToDate(track.sessions.morning.startTime, this.duration);

            // Subtrack from track.sessions.morning.availableMinutes
            track.sessions.morning.availableMinutes -= this.duration;

            // Add talk to track's morning array
            track.sessions.morning.talks.push(this);

            // Tell App the talk is placed
            this.hasSpot = true
        }

        else if (this.duration <= track.sessions.afternoon.availableMinutes) {

            // Set startTime of Talk
            this.startTime = track.sessions.afternoon.startTime;

            // Increment startTime in Track to be ready for the next Track placement
            track.sessions.afternoon.startTime = addMinutesToDate(track.sessions.afternoon.startTime, this.duration);

            // Subtrack from track.sessions.afternoon.availableMinutes
            track.sessions.afternoon.availableMinutes -= this.duration;

            // Add talk to track's afternoon array
            track.sessions.afternoon.talks.push(this);

            // Tell App the talk is placed
            this.hasSpot = true
        }
    }

    render() {
        return null
    }

}

export default Talk