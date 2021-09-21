import { createDate } from "../dateManipulation/timeOperations";
import Talk from "./Talk";
import Track from "./Track";

// Initialize Date variables
var morningStartTime: Date;
var morningEndTalksBy: Date;
var afternoonStartTime: Date;
var afternoonEndTalksBy: Date;

// Initialize Track variables
var trackExampleOne : Track;
var trackExampleTwo : Track;

// Before Each to Keep Code DRY
beforeEach(() => {
    // Create 'start' and 'endBy' times for each session
    morningStartTime = createDate(9,0,0);
    morningEndTalksBy = createDate(12,0,0);
    afternoonStartTime = createDate(13,0,0);
    afternoonEndTalksBy = createDate(17,0,0);
    
    // Create Tracks to use in testing
    trackExampleOne = new Track(1, morningStartTime, afternoonStartTime, morningEndTalksBy, afternoonEndTalksBy, null);
    trackExampleTwo = new Track(2, morningStartTime, afternoonStartTime, morningEndTalksBy, afternoonEndTalksBy, null);
});

// Talk Objection Creation
describe("It is possible to create a 'Talk' object with the 'new' keyword", () => {
    test("creates a new Talk object with the expected attributes", () => {
        let reactForever = new Talk(20, 'React Forever', false, 1, null);
        expect(reactForever).toEqual(expect.objectContaining({
            duration: 20,
            isLightning: false,
            hasSpot: false,
            title: 'React Forever',
            startTime: undefined,
            id: 1,
            props: null
        }));
    });
})

//Method talkAssignedToTrack() from Talk.ts
describe("Method talkAssignedToTrack() returns true and false when expected", () => {
    test("talkAssignedToTrack() returns false when track.hasPlace = false", () => {
        let reactForever = new Talk(20, 'React Forever', false, 1, null);
        expect(reactForever.talkAssignedToTrack()).toBe(false);
    });

    test("talkAssignedToTrack() returns true when track.hasPlace = true", () => {
        let awesomeTypeScript = new Talk(20, 'Awesome Typescript', false, 1, null);
        awesomeTypeScript.hasSpot = true;
        expect(awesomeTypeScript.talkAssignedToTrack()).toBe(true);
    });

    test("talkAssignedToTrack() works with arrays", () => {
        let loveCoding = new Talk(20, 'Love Coding', false, 1, null);
        loveCoding.hasSpot = true;
        let thisProject = new Talk(20, 'This Project', false, 2, null);
        thisProject.hasSpot = true;
        let dogsAreAwesome = new Talk(20, 'Why dogs are awesome', false, 3, null);
        dogsAreAwesome.hasSpot = true;
        let thisTalkWillReturnFalse = new Talk(20, 'I will return false', false, 4, null);

        // Create Dummy Arrays
        let awesomeArrayThatWillPass = [loveCoding, thisProject, dogsAreAwesome];
        let thisArrayWillFailTest = [loveCoding, thisProject, dogsAreAwesome, thisTalkWillReturnFalse];

        expect(awesomeArrayThatWillPass.every(talk => talk.talkAssignedToTrack())).toBe(true);

        expect(thisArrayWillFailTest.every(talk => {
            return talk.talkAssignedToTrack();
        })).toBe(false);
    });
})

// Method PlaceTalk() from Talk.ts
describe("Method placeTalk() sets the talk's hasSpot property correctly", () => {
    test("placeTalk() correctly sets a placed talk's hasSpot property to true when appropriate", () => {
        // Pretend Track has time constraits
        trackExampleOne.sessions.morning.availableMinutes = 66;
        trackExampleOne.sessions.afternoon.availableMinutes = 0;

        // Create Talks
        let reactForever = new Talk(60, 'React Forever', false, 1, null);
        let iWontFitinTrackOne = new Talk(5, 'Fast Talk', false, 2, null);

        // Try to place tracks
        reactForever.placeTalk(trackExampleOne);
        iWontFitinTrackOne.placeTalk(trackExampleOne);

        expect(reactForever.hasSpot).toBe(true);
        expect(iWontFitinTrackOne.hasSpot).toBe(true);
    });

    test("placetalk() correctly sets a placed talk's hasSpot property to true when appropriate and if a talk doesn't fit, it remains false", () => {
        // Pretend Track has time constraits
        trackExampleTwo.sessions.morning.availableMinutes = 0;
        trackExampleTwo.sessions.afternoon.availableMinutes = 120;

        // Create Talks
        let iLoveJest = new Talk(60, 'I love Jest', false, 1, null);
        let iGoTrackTwo = new Talk(60, 'I go track two', false, 2, null);
        let iWontFitInTrackTwo = new Talk(5, 'I wont fit', false, 3, null);

        // Try to place tracks
        iLoveJest.placeTalk(trackExampleTwo);
        iGoTrackTwo.placeTalk(trackExampleTwo);
        iWontFitInTrackTwo.placeTalk(trackExampleTwo);

        expect(iLoveJest.hasSpot).toBe(true);
        expect(iGoTrackTwo.hasSpot).toBe(true);
        expect(iWontFitInTrackTwo.hasSpot).toBe(false);
    });
})

describe("Method placeTalk() pushes Talks to the correct Track array", () => {
    test("placeTalk() pushes to a session's morning and afternoon correctly", () => {
        // Pretend Track has time constraits
        trackExampleOne.sessions.morning.availableMinutes = 60;
        
        // Create Talks
        let iLoveJest = new Talk(60, 'I love Jest', false, 1, null);
        let iGoTrackTwo = new Talk(45, 'I go track two', false, 2, null);
        let letsGo = new Talk(25, 'Lets go', false, 3, null);

        // Place tracks
        iLoveJest.placeTalk(trackExampleOne);
        iGoTrackTwo.placeTalk(trackExampleOne);
        letsGo.placeTalk(trackExampleOne);

        expect(trackExampleOne.sessions.morning.talks).toEqual([iLoveJest]);
        expect(trackExampleOne.sessions.afternoon.talks).toEqual([iGoTrackTwo, letsGo]);
    });
});

describe("Method placeTalk() correctly sets the start time of a talk", () => {
    test("given a set of talks, placeTalk() correctly sets the start time for each talk", () => {

        // Pretend Track has time constraits
        trackExampleOne.sessions.morning.availableMinutes = 60;
        trackExampleOne.sessions.afternoon.availableMinutes = 5;

        // Create Talks
        let reactForever = new Talk(60, 'React Forever', false, 1, null);
        let helloFriend = new Talk(5, 'I Love Friends', false, 2, null);

        // Try to place tracks
        reactForever.placeTalk(trackExampleOne);
        helloFriend.placeTalk(trackExampleOne);

        expect(reactForever.startTime).toBe("11:00 AM");
        expect(helloFriend.startTime).toBe("4:55 PM");
    });
    test("given a different set of talks, placeTalk() correctly sets the start time for each talks", () => {
        // Pretend Track has time constraits
        trackExampleTwo.sessions.morning.availableMinutes = 180;
        trackExampleTwo.sessions.afternoon.availableMinutes = 240;

        // Create Talks
        let randomTalkOne = new Talk(60, 'RandomOne', false, 1, null);
        let randomTalkTwo = new Talk(55, 'RandomTwo', false, 2, null);
        let randomTalkThree = new Talk(60, 'RandomThree', false, 3, null);
        let randomTalkFour = new Talk(40, 'RandomFour', false, 4, null);
        let randomTalkFive = new Talk(20, 'RandomFive', false, 5, null);
        let randomTalkSix = new Talk(15, 'RandomSix', false, 6, null);

        // Try to place tracks
        randomTalkOne.placeTalk(trackExampleTwo);
        randomTalkTwo.placeTalk(trackExampleTwo);
        randomTalkThree.placeTalk(trackExampleTwo);
        randomTalkFour.placeTalk(trackExampleTwo);
        randomTalkFive.placeTalk(trackExampleTwo);
        randomTalkSix.placeTalk(trackExampleTwo);

        expect(randomTalkOne.startTime).toBe("9:00 AM");
        expect(randomTalkTwo.startTime).toBe("10:00 AM");
        expect(randomTalkThree.startTime).toBe("10:55 AM");
        expect(randomTalkFour.startTime).toBe("1:00 PM");
        expect(randomTalkFive.startTime).toBe("1:40 PM");
        expect(randomTalkSix.startTime).toBe("2:00 PM");
    });
})

describe("Method placeTalk() correctly subtracts from a track sessions's available minutes", () => {
    test("given a set of talks, placeTalk() subtracks from a session's morning the correct amount of minutes", () => {

        // Pretend Track has time constraits
        trackExampleOne.sessions.morning.availableMinutes = 180;
        trackExampleOne.sessions.afternoon.availableMinutes = 60;

        // Create Talks
        let reactForever = new Talk(60, 'React Forever', false, 1, null);
        let helloFriend = new Talk(5, 'I Love Friends', false, 2, null);

        // Try to place tracks
        reactForever.placeTalk(trackExampleOne);
        expect(trackExampleOne.sessions.morning.availableMinutes).toBe(120);

        helloFriend.placeTalk(trackExampleOne);
        expect(trackExampleOne.sessions.morning.availableMinutes).toBe(115);

    });
    test("given a different set of talks, placeTalk() subtracks from a session's morning and afternoon the correct amount of minutes", () => {
        // Pretend Track has time constraits
        trackExampleTwo.sessions.morning.availableMinutes = 65;
        trackExampleTwo.sessions.afternoon.availableMinutes = 130;

         // Create Talks
        let randomTalkOne = new Talk(60, 'RandomOne', false, 1, null);
        let randomTalkTwo = new Talk(55, 'RandomTwo', false, 2, null);
        let randomTalkThree = new Talk(60, 'RandomThree', false, 3, null);
        let randomTalkFour = new Talk(15, 'RandomFour', false, 4, null);

        // Try to place tracks
        randomTalkOne.placeTalk(trackExampleTwo);
        expect(trackExampleTwo.sessions.morning.availableMinutes).toBe(5);

        randomTalkTwo.placeTalk(trackExampleTwo);
        expect(trackExampleTwo.sessions.afternoon.availableMinutes).toBe(75);

        randomTalkThree.placeTalk(trackExampleTwo);
        expect(trackExampleTwo.sessions.afternoon.availableMinutes).toBe(15);

        randomTalkFour.placeTalk(trackExampleTwo);
        expect(trackExampleTwo.sessions.afternoon.availableMinutes).toBe(0);
    });
})