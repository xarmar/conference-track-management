import React, {Component} from 'react';
import Track from './Track';

class Conference extends Component<any,any> {

    dayCounter: number;
    morningStartTime: Date;
    afternoonStartTime: Date;
    tracks: Track[]
    
    constructor(tracks: Track[], props: any) {
        super(props);
        this.dayCounter = 0;
        this.tracks = tracks;

        // Set Schedule For Conference
        this.morningStartTime = new Date();
        this.afternoonStartTime = new Date();
        this.morningStartTime.setHours(9,0,0);
        this.afternoonStartTime.setHours(13,0,0);
    }

    render() {
        return null
    }
}

export default Conference