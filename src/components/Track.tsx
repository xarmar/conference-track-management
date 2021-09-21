import { Grid, Typography } from '@mui/material';
import {Component} from 'react'
import { addMinutesToDate, convertToAmPm, createDate } from '../dateManipulation/timeOperations';
import ListOfTalks from './listGenerators/ListOfTalks';
import Talk from './Talk';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

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

    const track: Track = this.props.track

    // Get Track's Number
    const trackNumber: number = track.trackNumber;
    
    // Get Track's Lunch and Networking event start times
    const lunchStartTime = track.lunchHourStartTime;
    const networkingStartTime = track.networkingEventStartTime

    // Get Track's Morning and Afternoon Talks
    const morningTalks: Talk[] = track.sessions.morning.talks;
    const afternoonTalks: Talk[] = track.sessions.afternoon.talks;

        return (
            <Grid container direction="row" item justifyContent="center" m={1} p={2} sx={{ boxShadow: 10 }}>
                <Grid item xs={12}>
                    <Grid container item xs={12} m={1} justifyContent="center" mb={2}>
                        <Typography variant="h5" color="primary">Track {trackNumber}</Typography>
                    </Grid>
                <Grid item xs={12} m={1}>
                    <Grid container item direction="row" xs={12} justifyItems="center" justifyContent="center" columnSpacing={2} mt={1} mb={1}>
                        <Grid item>
                            <WbSunnyIcon />
                        </Grid>
                        <Grid item>
                            <Typography> Morning</Typography>
                        </Grid>
                        <Grid item>
                            <WbSunnyIcon />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} m={1}>
                        <ListOfTalks session="morning" arrayOfTalks={morningTalks}/>
                    </Grid>
                </Grid>
                <Grid container item direction="row" xs={12} justifyItems="center" justifyContent="center" columnSpacing={2} mt={4} mb={4} className="lunch">
                    <Grid item>
                        <FoodBankIcon />
                    </Grid>
                    <Grid item>
                        <Typography>{convertToAmPm(lunchStartTime)} | Lunch</Typography>
                    </Grid>
                    <Grid item>
                        <FoodBankIcon />
                    </Grid>
                </Grid>
                <Grid item xs={12} m={1}>
                    <Grid container item direction="row" xs={12} justifyItems="center" justifyContent="center" mt={1} mb={1} columnSpacing={2}>
                        <Grid item>
                            <WatchLaterIcon/>
                        </Grid>
                        <Grid item>
                            <Typography> Afternoon</Typography>
                        </Grid>
                        <Grid item>
                            <WatchLaterIcon/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} m={1}>
                        <ListOfTalks session="afternoon" arrayOfTalks={afternoonTalks}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} m={2}>
                    <Typography>{networkingStartTime} | Networking Event</Typography>
                </Grid>
            </Grid>
        </Grid>
        )
    }
}

export default Track