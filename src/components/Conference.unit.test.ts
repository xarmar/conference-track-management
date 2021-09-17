
import { createDate } from "../dateManipulation/timeOperations";
import Conference from "./Conference";
import Talk from "./Talk";
import Track from "./Track";

var onlyOneConference: Conference
var expectedMorningStartTime: Date;
var expectedMorningEndTalksBy: Date;
var expectedAfternoonStartTime: Date;
var expectedAfternoonEndTalksBy: Date;
var trackExampleOne : Track;
var trackExampleTwo : Track;
var trackExampleThree : Track;

// Before Each to Keep Code DRY
beforeEach(() => {
    onlyOneConference = new Conference([], null);
    expectedMorningStartTime = createDate(9,0,0);
    expectedMorningEndTalksBy = createDate(12,0,0);
    expectedAfternoonStartTime = createDate(13,0,0);
    expectedAfternoonEndTalksBy = createDate(17,0,0);
    trackExampleOne = new Track(1, expectedMorningStartTime, expectedAfternoonStartTime, expectedMorningEndTalksBy, expectedAfternoonEndTalksBy, null);
    trackExampleTwo = new Track(2, expectedMorningStartTime, expectedAfternoonStartTime, expectedMorningEndTalksBy, expectedAfternoonEndTalksBy, null);
    trackExampleThree = new Track(3, expectedMorningStartTime, expectedAfternoonStartTime, expectedMorningEndTalksBy, expectedAfternoonEndTalksBy, null);

});

// Test Class Object Creation
// Sometimes this fails due to the milliseconds difference between object creation and mock dates creation
describe("It is possible to create a 'Conference' object with the 'new' keyword", () => {
    test('creates a new Conference object with the expected attributes', () => {
        expect(onlyOneConference).toEqual(expect.objectContaining({
            trackCounter: 0,
            morningStartTime: expectedMorningStartTime,
            afternoonStartTime: expectedAfternoonStartTime,
            finishMorningTalksBy: expectedMorningEndTalksBy,
            finishAfternoonTalksBy: expectedAfternoonEndTalksBy,
            tracks: []
        }));
    });
});

// Method createNewTrack() from Conference.ts
describe("Method createNewTrack() works as Expected", () => {
    test('createNewTrack() creates a new Track object and adds it to the array', () => {
        expect(onlyOneConference.createNewTrack()).toEqual(expect(onlyOneConference.tracks.length).toBe(1));
    });
});

// Method placeNetworkingEvents() from Conference.ts
describe("Method placeNetworkingEvents() works as Expected", () => {
    test('placeNetworkingEvents() correctly determines the startTime of Networking events', () => {
        // Pretend TrackS have time constraits
        trackExampleOne.sessions.afternoon.availableMinutes = 60;
        trackExampleTwo.sessions.afternoon.availableMinutes = 40;
        trackExampleThree.sessions.afternoon.availableMinutes = 0;

        // Add Tracks To Conference
        let arrayOfTracks = [trackExampleOne, trackExampleTwo, trackExampleThree];
        onlyOneConference.tracks = arrayOfTracks

        // Place Networking Events start times in Tracks
        onlyOneConference.placeNetworkingEvents();

        expect(trackExampleOne.networkingEventStartTime).toBe('4:00 PM');
        expect(trackExampleTwo.networkingEventStartTime).toBe('4:20 PM');
        expect(trackExampleThree.networkingEventStartTime).toBe('5:00 PM');
    });
});