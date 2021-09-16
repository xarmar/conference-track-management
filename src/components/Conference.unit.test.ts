
import { createDate } from "../dateManipulation/timeOperations";
import Conference from "./Conference";

var onlyOneConference: Conference
var expectedMorningStartTime: Date;
var expectedMorningEndTalksBy: Date;
var expectedAfternoonStartTime: Date;
var expectedAfternoonEndTalksBy: Date;

// Before Each to Keep Code DRY
beforeEach(() => {
    onlyOneConference = new Conference([], null);
    expectedMorningStartTime = createDate(9,0,0);
    expectedMorningEndTalksBy = createDate(12,0,0);
    expectedAfternoonStartTime = createDate(13,0,0);
    expectedAfternoonEndTalksBy = createDate(17,0,0);
});

// Test Class Object Creation
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

// Test createNewTrack Method
describe("Method createNewTrack() works as Expected", () => {
    test('createNewTrack() creates a new Track object and adds it to the array', () => {
        expect(onlyOneConference.createNewTrack()).toEqual(expect(onlyOneConference.tracks.length).toBe(1));
    });
});