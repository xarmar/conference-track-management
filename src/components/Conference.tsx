import {Component} from 'react';
import { createDate } from '../dateManipulation/timeOperations';
import ListOfTracks from './listGenerators/ListOfTracks';
import Talk from './Talk';
import Track from './Track';


class Conference extends Component<any,any> {

    trackCounter: number;
    morningStartTime: Date;
    afternoonStartTime: Date;
    finishMorningTalksBy: Date;
    finishAfternoonTalksBy: Date;
    tracks: Track[];

    constructor(tracks: Track[], props: any) {
        super(props);
        this.trackCounter = 0;
        this.tracks = tracks;

        // Set Schedule For Conference
        this.morningStartTime = createDate(9,0,0);
        this.afternoonStartTime = createDate(13,0,0);
        this.finishMorningTalksBy = createDate(12,0,0);
        this.finishAfternoonTalksBy = createDate(17,0,0);

    }

    // Creates A New Track
    createNewTrack() {
        // Increment Counter
        this.trackCounter++;
        // Create new Track
        const newTrack = new Track(this.trackCounter, this.morningStartTime, this.afternoonStartTime, this.finishMorningTalksBy, this.finishAfternoonTalksBy, null);
        // Add Track to Conference Array
        this.tracks.push(newTrack);
    }

    // Builds the Track List
    buildTrackList(arrayOfTalks: Talk[]) {

        // Create an initial Track
        this.createNewTrack();

        let allTalksHaveASpot = false;

        do {
            // If every Talk is assigned to a Track, stop looping, job is done
            if(arrayOfTalks.every(talk => talk.talkAssignedToTrack())) {
                allTalksHaveASpot = true;
                break
            }

            // Else, keep looping over talks, and placing them inside Tracks, creating new tracks when needed
            else {
                this.placeTalks(arrayOfTalks);
            }
        }
        while(!allTalksHaveASpot)

        // After all Talks are placed inside a Track, loop over Tracks and assign the networking events the correct starting time
        this.placeNetworkingEvents();

        return this.tracks
        }
    
    // Loops over Tracks and sets the start time for the networking events
    placeNetworkingEvents() {
        this.tracks.forEach(track => {
            // calculate networking event startTime of Track
            let startTime = track.findNetworkingEventStartTime();

            // Assign the networkingEventStartTime to the track
            track.networkingEventStartTime = startTime;
        });
    }

    // Loops over Talks and tries to place them inside a Track
    placeTalks(arrayOfTalks: Talk[]) {
        arrayOfTalks.forEach(talk => {
            //If talk doesn't have a spot in a track yet
            if (!talk.hasSpot) {
                // Loop over existing tracks looking for a spot
                this.tracks.forEach(currentTrack => {
                    talk.placeTalk(currentTrack);
                });
            }

            // If talk was not placed inside the current Tracks, create a new Track
            if (!talk.hasSpot) {
                    this.createNewTrack();
            }
        });
    }

    render() {

        const conference = this.props.conference

        const arrayOfTracks: Track[] = conference.tracks;
    
        // Return list of divs that contain Track Components
        return (
            <div id='tracks-container'>
                <ListOfTracks arrayOfTracks={arrayOfTracks} />
                <button onClick={this.props.unMountConferenceMountForm}>Example</button>
            </div>
        )
    }
}

export default Conference