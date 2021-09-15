import React, {Component} from 'react'
import { addMinutesToDate, convertToAmPm, subtrackMinutesFromDate } from '../dateManipulation/timeOperations';
import Track from './Track';
import { Session } from '../types/types';


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
            this.startTime = this.calculateTalkStartTime(track, 'morning');

            // Subtrack from track.sessions.morning.availableMinutes
            track.sessions.morning.availableMinutes -= this.duration;

            // Add talk to track's morning array
            track.sessions.morning.talks.push(this);

            // Tell App the talk is placed
            this.hasSpot = true
        }

        else if (this.duration <= track.sessions.afternoon.availableMinutes) {

            // Set startTime of Talk
            this.startTime = this.calculateTalkStartTime(track, 'afternoon');

            // Subtrack from track.sessions.afternoon.availableMinutes
            track.sessions.afternoon.availableMinutes -= this.duration;

            // Add talk to track's afternoon array
            track.sessions.afternoon.talks.push(this);

            // Tell App the talk is placed
            this.hasSpot = true
        }
    }

    calculateTalkStartTime(track: Track, session: Session) {
        let talkStartTime;
        if(session === 'morning') {
            talkStartTime = convertToAmPm(subtrackMinutesFromDate(track.sessions.morning.finishTalksBy, track.sessions.morning.availableMinutes));
        }
        else {
            talkStartTime = convertToAmPm(subtrackMinutesFromDate(track.sessions.afternoon.finishTalksBy, track.sessions.afternoon.availableMinutes));
        }
        return talkStartTime
    }

    render() {
        return null
    }

}

export default Talk