import Conference from "../components/Conference";
import Track from "../components/Track";
import Talk from "../components/Talk";
import { createDate } from "../dateManipulation/timeOperations";

// This file does integration testing between the three Componentes: Conference, Track and Talk

var onlyOneConference: Conference;
var morningStartTime: Date;
var morningEndTalksBy: Date;
var afternoonStartTime: Date;
var afternoonEndTalksBy: Date;
var trackExampleOne : Track;
var trackExampleTwo : Track;
var trackExampleThree : Track;

// Initiate variables that will hold Talks
var writingFastTestsAgainstEnterpriseRails: Talk
var overdoingitinPython: Talk
var luafortheMasses: Talk
var rubyErrorsfromMismatchedGemVersions: Talk
var commonRubyErrors: Talk
var railsforPythonDevelopers: Talk
var communicatingOverDistance: Talk
var accountingDrivenDevelopment: Talk
var woah: Talk
var sitDownandWrite: Talk
var pairProgrammingvsNoise: Talk
var railsMagic: Talk
var rubyonRailsWhyWeShouldMoveOn: Talk
var clojureAteScalaonmyproject: Talk
var programmingintheBoondocksofSeattle: Talk
var rubyVsClojureforBackEndDevelopment: Talk
var rubyonRailsLegacyAppMaintenance: Talk
var aWorldWithoutHackerNews: Talk
var userInterfaceCSSinRailsApps: Talk

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
    writingFastTestsAgainstEnterpriseRails = new Talk(60, 'Writing Fast Tests Against Enterprise Rails', null);
    overdoingitinPython = new Talk(45, 'Overdoing it in Python', null);
    luafortheMasses = new Talk(30, 'Lua for the Masses', null);
    rubyErrorsfromMismatchedGemVersions = new Talk(45, 'Ruby Errors from Mismatched Gem Versions', null);
    commonRubyErrors = new Talk (45, 'Common Ruby Errors', null);
    railsforPythonDevelopers = new Talk(5, 'Rails for Python Developers', null); // don't forget to add this.isLightning: Boolean to the constructor of Talks
    communicatingOverDistance = new Talk (60, 'Communicating Over Distance', null);
    accountingDrivenDevelopment = new Talk(45, 'Accounting-Driven Development', null);
    woah = new Talk(30, 'Woah', null);
    sitDownandWrite = new Talk(30, 'Sit Down and Write', null);
    pairProgrammingvsNoise = new Talk (45, 'Pair Programming vs Noise', null);
    railsMagic = new Talk (60, 'Rails Magic', null);
    rubyonRailsWhyWeShouldMoveOn = new Talk (60, 'Ruby on Rails: Why We Should Move On', null);
    clojureAteScalaonmyproject = new Talk(45, 'Clojure Ate Scala (on my project)', null);
    programmingintheBoondocksofSeattle = new Talk(30, 'Programming in the Boondocks of Seattle', null);
    rubyVsClojureforBackEndDevelopment = new Talk(30, 'Ruby vs. Clojure for Back-End Development', null );
    rubyonRailsLegacyAppMaintenance = new Talk (60,'Ruby on Rails Legacy App Maintenance', null);
    aWorldWithoutHackerNews = new Talk (30, 'A World Without HackerNews', null);
    userInterfaceCSSinRailsApps = new Talk(30, 'User Interface CSS in Rails Apps', null);
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
    test('buildTrackList() gives out the same output as the one provided in the PDF document', () => {
        // Add Talks to arrayOfTalks
        let arrayOfTalks = [writingFastTestsAgainstEnterpriseRails, overdoingitinPython, luafortheMasses, rubyErrorsfromMismatchedGemVersions, 
            commonRubyErrors, railsforPythonDevelopers, communicatingOverDistance, accountingDrivenDevelopment, woah, sitDownandWrite, 
            pairProgrammingvsNoise, railsMagic, rubyonRailsWhyWeShouldMoveOn, clojureAteScalaonmyproject, programmingintheBoondocksofSeattle, 
            rubyVsClojureforBackEndDevelopment, rubyonRailsLegacyAppMaintenance, aWorldWithoutHackerNews, userInterfaceCSSinRailsApps];

        onlyOneConference.buildTrackList(arrayOfTalks);
        expect(onlyOneConference.tracks).toHaveLength(2);
    });
});
