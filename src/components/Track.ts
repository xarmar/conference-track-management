import React, {Component} from 'react'
import Talk from './Talk';

class Track extends Component <any, any> {

    day: Number

    // Each track has a morning and afternoon session
    sessions: {
        morning: {
            talks: Talk[],
            remainingMinutes: number
        }
        afternoon: {
            talks: Talk[],
            remainingMinutes: number
        }
    }

    constructor(day: Number, props: any) {
        super(props);
        this.day = day;

        /* 
        "Morning sessions begin at 9am and must finish by 12" - 3 HOURS - 180 minutes
        "Afternoon sessions begin at 1pm and must finish in time for the networking event. 
        The networking event can start no earlier than 4:00 and no later than 5:00."
        4 HOURS - 240 minutes 
        */
        this.sessions = {
            morning: {
                talks: [],
                remainingMinutes: 180
            },
            afternoon: {
                talks: [],
                remainingMinutes: 240
            }
        }
    }

    render() {
        return null
    }
}

export default Track