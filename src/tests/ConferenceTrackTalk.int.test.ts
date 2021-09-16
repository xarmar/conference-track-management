import Conference from "../components/Conference";
import Track from "../components/Track";
import Talk from "../components/Talk";
import { createDate } from "../dateManipulation/timeOperations";

// This file does integration testing between the three Componentes: Conference, Track and Talk

var morningStartTime: Date;
var morningEndTalksBy: Date;
var afternoonStartTime: Date;
var afternoonEndTalksBy: Date;
var timeInAmPm : String;
var trackExampleOne : Track;
var trackExampleTwo : Track;
var trackExampleThree : Track;

// Before Each to Keep Code DRY
beforeEach(() => {
    morningStartTime = createDate(9,0,0);
    morningEndTalksBy = createDate(12,0,0);
    afternoonStartTime = createDate(13,0,0);
    afternoonEndTalksBy = createDate(17,0,0);
    timeInAmPm = "";
    trackExampleOne = new Track(1, morningStartTime, afternoonStartTime, morningEndTalksBy, afternoonEndTalksBy, null);
    trackExampleTwo = new Track(2, morningStartTime, afternoonStartTime, morningEndTalksBy, afternoonEndTalksBy, null);
    trackExampleThree = new Track(3, morningStartTime, afternoonStartTime, morningEndTalksBy, afternoonEndTalksBy, null);

});

describe("Conference Component can keep track of it's children Tracks", () => {

    test('Check if Tracks were corretly added to Conference tracks arrays', () => {
    
    // Create dummy Conference
    let onlyOneConference = new Conference([], null);

    // Add Tracks to Conference array
    onlyOneConference.tracks.push(trackExampleOne, trackExampleTwo, trackExampleThree)
        expect(onlyOneConference).toEqual(expect.objectContaining({
            tracks: [trackExampleOne, trackExampleTwo, trackExampleThree]
        }));
        
    });
});

describe("Track Component can keep track of it's children Talks", () => {

    test('Check if Talks were corretly added to Track arrays', () => {
        // Create dummy Talks
        let loveCoding = new Talk(60, 'Why I love coding', null);
        let livingInGermany = new Talk(45, 'Living in Germany', null);
        let afternoonCoffee = new Talk (30, 'Afternoon Coffee', null);

        // Add Talks to Track arrays
        trackExampleOne.sessions.morning.talks.push(loveCoding, livingInGermany);
        trackExampleOne.sessions.afternoon.talks.push(afternoonCoffee);

        expect(trackExampleOne.sessions.morning).toEqual(expect.objectContaining({
            talks: [loveCoding, livingInGermany]
        }));
        expect(trackExampleOne.sessions.afternoon).toEqual(expect.objectContaining({
            talks: [afternoonCoffee]
        }));
    });
});



