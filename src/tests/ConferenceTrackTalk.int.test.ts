import Conference from "../components/Conference";
import Track from "../components/Track";
import Talk from "../components/Talk";
import { createDate } from "../dateManipulation/timeOperations";

// This file does integration testing between the three Componentes: Conference, Track and Talk

// Initialize Date variables
var morningStartTime: Date;
var morningEndTalksBy: Date;
var afternoonStartTime: Date;
var afternoonEndTalksBy: Date;

// Initialize Conference variable
var onlyOneConference: Conference;

// Initialize Track variables
var trackExampleOne : Track;
var trackExampleTwo : Track;
var trackExampleThree : Track;

// Initialize Talk variables
var fruit: Talk;
var banana: Talk;
var strawberry: Talk;
var kiwi: Talk;
var pear: Talk;
var orange: Talk;
var grapes: Talk;
var avocado: Talk;
var apple: Talk;
var mango: Talk;
var icecream: Talk;
var chocolate: Talk;
var pistachio: Talk;
var vanilla: Talk;
var cheesecake: Talk;
var brownies: Talk;
var cookieCream: Talk;

// Initialize arrayOfTalks
var arrayOfTalks: Talk[]

// Before Each to Keep Code DRY
beforeEach(() => {
    // Create 'start' and 'endBy' times for each session
    morningStartTime = createDate(9,0,0);
    morningEndTalksBy = createDate(12,0,0);
    afternoonStartTime = createDate(13,0,0);
    afternoonEndTalksBy = createDate(17,0,0);

    // Create Conference to use in testing
    onlyOneConference = new Conference([], null);

    // Create Tracks to use in testing
    trackExampleOne = new Track(1, morningStartTime, afternoonStartTime, morningEndTalksBy, afternoonEndTalksBy, null);
    trackExampleTwo = new Track(2, morningStartTime, afternoonStartTime, morningEndTalksBy, afternoonEndTalksBy, null);
    trackExampleThree = new Track(3, morningStartTime, afternoonStartTime, morningEndTalksBy, afternoonEndTalksBy, null);

    // Create Talks to use in testing
    fruit = new Talk(60, 'fruit', null);
    banana = new Talk(45, 'banana', null);
    strawberry = new Talk(30, 'strawberry', null);
    kiwi = new Talk(25, 'kiwi', null);
    pear = new Talk(40, 'pear', null);
    orange = new Talk(60, 'orange', null);
    grapes = new Talk(60, 'grapes', null);
    avocado = new Talk(60, 'avocado', null);
    apple = new Talk(45, 'apple', null);
    mango = new Talk(60, 'mango', null);
    icecream = new Talk(45, 'icecream', null);
    chocolate = new Talk(55, 'chocolate', null);
    pistachio = new Talk(60, 'pistachio', null);
    vanilla = new Talk(60, 'vanilla', null);
    cheesecake = new Talk(60, 'cheesecake', null);
    brownies = new Talk(60, 'brownies', null);
    cookieCream = new Talk(15, 'cookieCream', null);

    // Create arrayOfTalks
    arrayOfTalks = [fruit, banana, strawberry, kiwi, pear, orange, grapes, avocado, apple, mango, 
        icecream, chocolate, pistachio, vanilla, cheesecake, brownies, cookieCream];
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

// Method buildTrackList() from Conference.ts
describe("Method buildTrackList() works as Expected", () => {
    test('buildTrackList() runs and after, Conference array has 3 tracks', () => {

        onlyOneConference.buildTrackList(arrayOfTalks);
        expect(onlyOneConference.tracks).toHaveLength(3);
    });
    test('buildTrackList() correctly places Talks as expected ', () => {

        onlyOneConference.buildTrackList(arrayOfTalks);
        let trackOne = onlyOneConference.tracks[0];
        let trackTwo = onlyOneConference.tracks[1];
        let trackThree = onlyOneConference.tracks[2];
        
        // trackOne morning and afternoon have the expected talks
        expect(trackOne.sessions.morning.talks).toEqual(expect.arrayContaining(
            [fruit, banana, strawberry, kiwi, cookieCream]
        ));
        expect(trackOne.sessions.afternoon.talks).toEqual(expect.arrayContaining(
            [pear, orange, grapes, avocado]
        ));
        
        // trackTwo morning and afternoon have the expected talks
        expect(trackTwo.sessions.morning.talks).toEqual(expect.arrayContaining(
            [mango, icecream, chocolate]
        ));
        expect(trackTwo.sessions.afternoon.talks).toEqual(expect.arrayContaining(
            [pistachio, vanilla, cheesecake, brownies]
        ));

        // trackThree morning and afternoon have the expected talks
        expect(trackThree.sessions.morning.talks).toEqual(expect.arrayContaining(
            [apple]
        ));
        expect(trackThree.sessions.afternoon.talks).toEqual(expect.arrayContaining(
            []
        ));
    });
});

