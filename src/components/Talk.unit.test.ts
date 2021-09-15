import { convertToAmPm, createDate } from "../dateManipulation/timeOperations";
import Talk from "./Talk";
import Track from "./Track";

var morningDate: Date;
var afternoonDate: Date;
var timeInAmPm : String;
var trackExampleOne : Track;
var trackExampleTwo : Track;


// Before Each to Keep Code DRY
beforeEach(() => {
    morningDate = createDate(9,0,0);
    afternoonDate = createDate(13,0,0);
    timeInAmPm = "";
    trackExampleOne = new Track(1, morningDate, afternoonDate, null);
    trackExampleTwo = new Track(2, morningDate, afternoonDate, null);
});

// Talk Objection Creation
describe("It is possible to create a 'Talk' object with the 'new' keyword", () => {
    test("creates a new Talk object with the expected attributes", () => {
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

//talkAssignedToTrack Method
describe("talkAssignedToTrack Method returns true and false when expected", () => {
    test("talkAssignedToTrack returns false when track.hasPlace = false", () => {
        let reactForever = new Talk(20, 'React Forever', null);
        expect(reactForever.talkAssignedToTrack()).toBe(false);
    });

    test("talkAssignedToTrack returns true when track.hasPlace = true", () => {
        let awesomeTypeScript = new Talk(20, 'Awesome Typescript', null);
        awesomeTypeScript.hasSpot = true;
        expect(awesomeTypeScript.talkAssignedToTrack()).toBe(true);
    });

    test("talkAssignedToTrack works with arrays", () => {
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

// placeTalk Method
describe("placeTalk Method places Talks correctly", () => {
    test("placeTalk correctly places a Talk when possible", () => {
        // Pretend Track has time constraits
        trackExampleOne.sessions.morning.availableMinutes = 66;
        trackExampleOne.sessions.afternoon.availableMinutes = 0;

        // Create Talks
        let reactForever = new Talk(60, 'React Forever', null);
        let iWontFitinTrackOne = new Talk(5, 'Fast Talk', null);

        // Try to place tracks
        reactForever.placeTalk(trackExampleOne);
        iWontFitinTrackOne.placeTalk(trackExampleOne);

        expect(reactForever.hasSpot).toBe(true);
        expect(iWontFitinTrackOne.hasSpot).toBe(true);
    });

    test("placeTalk correctly places a Talk when possible and reject another when appropriate", () => {
        // Pretend Track has time constraits
        trackExampleTwo.sessions.morning.availableMinutes = 0;
        trackExampleTwo.sessions.afternoon.availableMinutes = 120;

        // Create Talks
        let iLoveJest = new Talk(60, 'I love Jest', null);
        let iGoTrackTwo = new Talk(60, 'I go track two', null);
        let iWontFitInTrackTwo = new Talk(5, 'I wont fit', null);

        // Try to place tracks
        iLoveJest.placeTalk(trackExampleTwo);
        iGoTrackTwo.placeTalk(trackExampleTwo);
        iWontFitInTrackTwo.placeTalk(trackExampleTwo);

        expect(iLoveJest.hasSpot).toBe(true);
        expect(iGoTrackTwo.hasSpot).toBe(true);
        expect(iWontFitInTrackTwo.hasSpot).toBe(false);
    });
})

describe("placeTalk correctly increments a Talks morning/afternoon time correctly", () => {
    test("placeTalk correctly increments a Talks morning time correctly", () => {
        // Create Talks
        let iLoveJest = new Talk(60, 'I love Jest', null);
        let iGoTrackTwo = new Talk(45, 'I go track two', null);
        let letsGo = new Talk(25, 'Lets go', null);

        // Place tracks
        iLoveJest.placeTalk(trackExampleOne);
        timeInAmPm = convertToAmPm(trackExampleOne.sessions.morning.startTime);
        expect(timeInAmPm).toBe("10:00 AM");

        iGoTrackTwo.placeTalk(trackExampleOne);
        timeInAmPm = convertToAmPm(trackExampleOne.sessions.morning.startTime);
        expect(timeInAmPm).toBe("10:45 AM");

        letsGo.placeTalk(trackExampleOne);
        timeInAmPm = convertToAmPm(trackExampleOne.sessions.morning.startTime);
        expect(timeInAmPm).toBe("11:10 AM")
    });

    test("placeTalk correctly increments a Talks afternooon time correctly", () => {
        // Pretend Track has time constraits
        trackExampleOne.sessions.morning.availableMinutes = 0;

        // Create Talks
        let iLoveJest = new Talk(60, 'I love Jest', null);
        let iGoTrackTwo = new Talk(45, 'I go track two', null);
        let letsGo = new Talk(25, 'Lets go', null);

        // Place tracks
        iLoveJest.placeTalk(trackExampleOne);
        timeInAmPm = convertToAmPm(trackExampleOne.sessions.afternoon.startTime);
        expect(timeInAmPm).toBe("2:00 PM");

        iGoTrackTwo.placeTalk(trackExampleOne);
        timeInAmPm = convertToAmPm(trackExampleOne.sessions.afternoon.startTime);
        expect(timeInAmPm).toBe("2:45 PM");

        letsGo.placeTalk(trackExampleOne);
        timeInAmPm = convertToAmPm(trackExampleOne.sessions.afternoon.startTime);
        expect(timeInAmPm).toBe("3:10 PM")
    });
});

describe("placeTalk pushes Talks to the correct array", () => {
    test("placeTalk pushes to a session's morning and afternoon correcy", () => {
        // Pretend Track has time constraits
        trackExampleOne.sessions.morning.availableMinutes = 60;
        
        // Create Talks
        let iLoveJest = new Talk(60, 'I love Jest', null);
        let iGoTrackTwo = new Talk(45, 'I go track two', null);
        let letsGo = new Talk(25, 'Lets go', null);

        // Place tracks
        iLoveJest.placeTalk(trackExampleOne);
        iGoTrackTwo.placeTalk(trackExampleOne);
        letsGo.placeTalk(trackExampleOne);

        expect(trackExampleOne.sessions.morning.talks).toEqual([iLoveJest]);
        expect(trackExampleOne.sessions.afternoon.talks).toEqual([iGoTrackTwo, letsGo]);
    });
});

