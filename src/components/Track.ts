import {Component} from 'react'
import { addMinutesToDate, convertToAmPm, createDate } from '../dateManipulation/timeOperations';
import Talk from './Talk';

class Track extends Component <any, any> {

    trackNumber: number
    lunchHourStartTime: Date;
    networkingEventStartTime: any;
    // Each track has a morning and afternoon session
    sessions: {
        morning: {
            availableMinutes: number,
            finishTalksBy: Date,
            startTime: Date,
            talks: Talk[]
        }
        afternoon: {
            availableMinutes: number,
            finishTalksBy: Date,
            startTime: Date,
            talks: Talk[]
        }
    }

    constructor(trackNumber: number, morningStartTime: Date, afternoonStartTime: Date, finishMorningTalksBy:Date, finishAfternoonTalksBy:Date, props: any) {
        super(props);
        this.trackNumber = trackNumber;

        /* 
        "Morning sessions begin at 9am and must finish by 12" - 3 HOURS - 180 available minutes
        "Afternoon sessions begin at 1pm and must finish in time for the networking event. 
        The networking event can start no earlier than 4:00 and no later than 5:00."
        4 HOURS - 240 available minutes 
        */
        this.sessions = {
            morning: {
                availableMinutes: 180,
                startTime: morningStartTime,
                finishTalksBy: finishMorningTalksBy,
                talks: []
            },
            afternoon: {
                availableMinutes: 240,
                startTime: afternoonStartTime,
                finishTalksBy: finishAfternoonTalksBy,
                talks: []
            }
        }

        // Lunch hours equals the time constrait of finishMorningTalksBy
        this.lunchHourStartTime = finishMorningTalksBy;
        // The start time of the networking event will be calculated by a method.
        this.networkingEventStartTime = undefined;
    }

    // Returns the hour when a networking event should start
    findNetworkingEventStartTime() {
        let hourToStartNetworkingEvent;

        // Networking event must not start before 4pm
        if(this.sessions.afternoon.availableMinutes >= 60) {
            // Networking Event will start at 4pm.
            hourToStartNetworkingEvent = convertToAmPm(createDate(16,0,0));
        }

        // Else, place networking event between 4:01 pm and 5pm
        else {
            // Find out how many minutes to add to 4pm to get start time
            let minutesToAdd = 60 - this.sessions.afternoon.availableMinutes;

            // Add minutes to 4pm to get networking event start time
            let hourPlusMinutes = addMinutesToDate(createDate(16,0,0), minutesToAdd);
            hourToStartNetworkingEvent = convertToAmPm(hourPlusMinutes);
        }
        return hourToStartNetworkingEvent
    }

    render() {
        return null
    }
}

export default Track