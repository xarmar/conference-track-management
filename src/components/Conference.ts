import React, {Component} from 'react';
import Talk from './Talk';
import Track from './Track';
import timeOperation from '../dateManipulation/timeOperations';

class Conference extends Component<any,any> {

    trackCounter: number;
    morningStartTime: Date;
    afternoonStartTime: Date;
    tracks: Track[]
    
    constructor(tracks: Track[], props: any) {
        super(props);
        this.trackCounter = 0;
        this.tracks = tracks;

        // Set Schedule For Conference
        this.morningStartTime = timeOperation.createDate(9,0,0);
        this.afternoonStartTime = timeOperation.createDate(13,0,0);
    }

    createNewTrack() {
        // Increment Counter
        this.trackCounter++;
        // Create new Track
        const newTrack = new Track(this.trackCounter, this.morningStartTime, this.afternoonStartTime, null);
        // Add Track to Conference Array
        this.tracks.push(newTrack);
    }

    // Builds the Track List
    buildTrackList(arrayOfTalks: Talk[]) {
        
        let keepRunningMethod = true;

        do {
            // If every Talk is assigned to a Track, stop looping, job is done
            if(arrayOfTalks.every(talk => talk.talkAssignedToTrack())) {
                keepRunningMethod = false;
                break
            }

            else {
                this.placeTalks(arrayOfTalks);
            }
        }

        while(keepRunningMethod)
        }

    // Loops over Talks and tries to place them inside a Track
    placeTalks(arrayOfTalks: Talk[]) {
        arrayOfTalks.forEach(talk => {
            //If talk doesn't have a spot in a track yet
            if (!talk.hasSpot) {
                // Loop over existing tracks looking for a spot
                this.tracks.forEach(currentTrack => {
                    // Check if talk fits inside currentTrack's morning
                    if (talk.duration < currentTrack.sessions.morning.availableMinutes) {
                        talk.startTime = currentTrack.sessions.morning.startTime;
                        // Increment startTime for next talk that will be placed
                        currentTrack.sessions.morning.startTime.setMinutes(talk.duration);
                        // Add talk to currentTrack morning talk's array
                        currentTrack.sessions.morning.talks.push(talk);
                        // Tell App that talk is placed
                        talk.hasSpot = true
                    }

                    // Check if talk fits inside currentTrack's afternoon
                    else if (talk.duration < currentTrack.sessions.afternoon.availableMinutes) {
                        talk.startTime = currentTrack.sessions.afternoon.startTime;
                        // Increment startTime for next talk that will be placed
                        currentTrack.sessions.afternoon.startTime.setMinutes(talk.duration);
                        // Add talk to currentTrack afternoon talk's array
                        currentTrack.sessions.afternoon.talks.push(talk);
                        // Tell App that talk is placed
                        talk.hasSpot = true
                    }
                });
            }

            // If talk was not placed inside the current Tracks, create a new Track
            if (!talk.hasSpot) {
                    this.createNewTrack();
            }
        });
    }

    render() {
        return null
    }
}

export default Conference