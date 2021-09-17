
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

// Method createNewTrack()
describe("Method createNewTrack() works as Expected", () => {
    test('createNewTrack() creates a new Track object and adds it to the array', () => {
        expect(onlyOneConference.createNewTrack()).toEqual(expect(onlyOneConference.tracks.length).toBe(1));
    });
});

// Method placeNetworkingEvents()
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

// Method buildTrackList()
describe("Method buildTrackList() works as Expected", () => {
    test('buildTrackList() gives out the same output as the one provided in the PDF document', () => {

        let writingFastTestsAgainstEnterpriseRails = new Talk(60, 'Writing Fast Tests Against Enterprise Rails', null);
        let overdoingitinPython = new Talk(45, 'Overdoing it in Python', null);
        let luafortheMasses = new Talk(30, 'Lua for the Masses', null);
        let rubyErrorsfromMismatchedGemVersions = new Talk(45, 'Ruby Errors from Mismatched Gem Versions', null);
        let commonRubyErrors = new Talk (45, 'Common Ruby Errors', null);
        let railsforPythonDevelopers = new Talk(5, 'Rails for Python Developers', null);
        let communicatingOverDistance = new Talk (60, 'Communicating Over Distance', null);
        let accountingDrivenDevelopment = new Talk(45, 'Accounting-Driven Development', null);
        let woah = new Talk(30, 'Woah', null);
        let sitDownandWrite = new Talk(30, 'Sit Down and Write', null);
        let pairProgrammingvsNoise = new Talk (45, 'Pair Programming vs Noise', null);
        let railsMagic = new Talk (60, 'Rails Magic', null);
        let rubyonRailsWhyWeShouldMoveOn = new Talk (60, 'Ruby on Rails: Why We Should Move On', null);
        let clojureAteScalaonmyproject = new Talk(45, 'Clojure Ate Scala (on my project)', null);
        let programmingintheBoondocksofSeattle = new Talk(30, 'Programming in the Boondocks of Seattle', null);
        let rubyVsClojureforBackEndDevelopment = new Talk(30, 'Ruby vs. Clojure for Back-End Development', null );
        let rubyonRailsLegacyAppMaintenance = new Talk (60,'Ruby on Rails Legacy App Maintenance', null);
        let aWorldWithoutHackerNews = new Talk (30, 'A World Without HackerNews', null);
        let userInterfaceCSSinRailsApps = new Talk(30, 'User Interface CSS in Rails Apps', null);

        // Add Talks to arrayOfTalks
        let arrayOfTalks = [writingFastTestsAgainstEnterpriseRails, overdoingitinPython, luafortheMasses, rubyErrorsfromMismatchedGemVersions, 
            commonRubyErrors, railsforPythonDevelopers, communicatingOverDistance, accountingDrivenDevelopment, woah, sitDownandWrite, 
            pairProgrammingvsNoise, railsMagic, rubyonRailsWhyWeShouldMoveOn, clojureAteScalaonmyproject, programmingintheBoondocksofSeattle, 
            rubyVsClojureforBackEndDevelopment, rubyonRailsLegacyAppMaintenance, aWorldWithoutHackerNews, userInterfaceCSSinRailsApps];

        onlyOneConference.buildTrackList(arrayOfTalks);
        expect(onlyOneConference.tracks).toHaveLength(2);
    });
});