import { createDate } from "../dateManipulation/timeOperations";
import Talk from "./Talk";
import Track from "./Track";

describe("It is possible to create a 'Talk' object with the 'new' keyword", () => {
    test('creates a new Talk object with the expected attributes', () => {
        let reactForever = new Talk(20, 'React Forever', null);
        expect(reactForever).toEqual(expect.objectContaining({
            duration: 20,
            hasSpot: false,
            title: 'React Forever',
            startTime: undefined,
            props: null
        }));
    });
})

describe("talkAssignedToTrack Method returns true and false when expected", () => {
    test('talkAssignedToTrack returns false when track.hasPlace = false', () => {
        let reactForever = new Talk(20, 'React Forever', null);
        expect(reactForever.talkAssignedToTrack()).toBe(false);
    });

    test('talkAssignedToTrack returns true when track.hasPlace = true', () => {
        let awesomeTypeScript = new Talk(20, 'Awesome Typescript', null);
        awesomeTypeScript.hasSpot = true;
        expect(awesomeTypeScript.talkAssignedToTrack()).toBe(true);
    });

    test('talkAssignedToTrack works with arrays', () => {
        let loveCoding = new Talk(20, 'Love Coding', null);
        loveCoding.hasSpot = true;
        let thisProject = new Talk(20, 'This Project', null);
        thisProject.hasSpot = true;
        let dogsAreAwesome = new Talk(20, 'Why dogs are awesome', null);
        dogsAreAwesome.hasSpot = true;
        let thisTalkWillReturnFalse = new Talk(20, 'I will return false', null);

        // Create Dummy Arrays
        let awesomeArrayThatWillPass = [loveCoding, thisProject, dogsAreAwesome];
        let thisArrayWillFailTest = [loveCoding, thisProject, dogsAreAwesome, thisTalkWillReturnFalse];

        expect(awesomeArrayThatWillPass.every(talk => talk.talkAssignedToTrack())).toBe(true);

        expect(thisArrayWillFailTest.every(talk => {
            return talk.talkAssignedToTrack();
        })).toBe(false);
    });
})


describe("placeTalk Method places Talks correctly", () => {
    test('placeTalk correctly places a Talk when possible', () => {

        let morningDate = createDate(9,0,0);
        let afternoonDate = createDate(13,0,0);    

        // Create Track
        let trackOneMorningAvailable = new Track(1, morningDate, afternoonDate, null);
        
        // Pretend Track has time constraits
        trackOneMorningAvailable.sessions.morning.availableMinutes = 66;
        trackOneMorningAvailable.sessions.afternoon.availableMinutes = 0;

        // Create Talks that will try to fit in track 1
        let reactForever = new Talk(60, 'React Forever', null);
        let iWontFitinTrackOne = new Talk(5, 'Fast Talk', null);

        // Try to place tracks
        reactForever.placeTalk(trackOneMorningAvailable);
        iWontFitinTrackOne.placeTalk(trackOneMorningAvailable);

        expect(reactForever.hasSpot).toBe(true);
        expect(iWontFitinTrackOne.hasSpot).toBe(true);
    });

    test('placeTalk correctly places a Talk when possible and reject another when appropriate', () => {

        let morningDate = createDate(9,0,0);
        let afternoonDate = createDate(13,0,0);   
        
        // Create Track
        let trackTwoAfternoonAvailable = new Track(2, morningDate, afternoonDate, null);

        // Pretend Track has time constraits
        trackTwoAfternoonAvailable.sessions.morning.availableMinutes = 0;
        trackTwoAfternoonAvailable.sessions.afternoon.availableMinutes = 120;

        // Create Talks that will try to fit in track 2
        let iLoveJest = new Talk(60, 'I love Jest', null);
        let iGoTrackTwo = new Talk(60, 'I go track two', null);
        let iWontFitInTrackTwo = new Talk(5, 'I wont fit', null);

        // Try to place tracks
        iLoveJest.placeTalk(trackTwoAfternoonAvailable);
        iGoTrackTwo.placeTalk(trackTwoAfternoonAvailable);
        iWontFitInTrackTwo.placeTalk(trackTwoAfternoonAvailable);

        expect(iLoveJest.hasSpot).toBe(true);
        expect(iGoTrackTwo.hasSpot).toBe(true);
        expect(iWontFitInTrackTwo.hasSpot).toBe(false);

    });

})



