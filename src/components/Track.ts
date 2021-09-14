import React, {Component} from 'react'
import Talk from './Talk';

class Track extends Component <any, any> {

    trackNumber: number

    // Each track has a morning and afternoon session
    sessions: {
        morning: {
            availableMinutes: number,
            startTime: Date,
            talks: Talk[]
        }
        afternoon: {
            availableMinutes: number,
            startTime: Date,
            talks: Talk[]
        }
    }

    constructor(trackNumber: number, morningStartTime: Date, afternoonStartTime: Date, props: any) {
        super(props);
        this.trackNumber = trackNumber;

        /* 
        "Morning sessions begin at 9am and must finish by 12" - 3 HOURS - 180 minutes
        "Afternoon sessions begin at 1pm and must finish in time for the networking event. 
        The networking event can start no earlier than 4:00 and no later than 5:00."
        4 HOURS - 240 minutes 
        */
        this.sessions = {
            morning: {
                availableMinutes: 180,
                startTime: morningStartTime,
                talks: []
            },
            afternoon: {
                availableMinutes: 240,
                startTime: afternoonStartTime,
                talks: []
            }
        }
    }

    render() {
        return null
    }
}

export default Track