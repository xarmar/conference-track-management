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
var trackExampleOne: Track;
var trackExampleTwo: Track;
var trackExampleThree: Track;

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
var arrayOfTalks: Talk[];

// Before Each to Keep Code DRY
beforeEach(() => {
  // Create 'start' and 'endBy' times for each session
  morningStartTime = createDate(9, 0, 0);
  morningEndTalksBy = createDate(12, 0, 0);
  afternoonStartTime = createDate(13, 0, 0);
  afternoonEndTalksBy = createDate(17, 0, 0);

  // Create Conference to use in testing
  onlyOneConference = new Conference([], null);

  // Create Tracks to use in testing
  trackExampleOne = new Track(
    1,
    morningStartTime,
    afternoonStartTime,
    morningEndTalksBy,
    afternoonEndTalksBy,
    null
  );
  trackExampleTwo = new Track(
    2,
    morningStartTime,
    afternoonStartTime,
    morningEndTalksBy,
    afternoonEndTalksBy,
    null
  );
  trackExampleThree = new Track(
    3,
    morningStartTime,
    afternoonStartTime,
    morningEndTalksBy,
    afternoonEndTalksBy,
    null
  );

  // Create Talks to use in testing
  fruit = new Talk(60, "fruit", false, 1, null);
  banana = new Talk(45, "banana", false, 2, null);
  strawberry = new Talk(30, "strawberry", false, 3, null);
  kiwi = new Talk(25, "kiwi", false, 4, null);
  pear = new Talk(40, "pear", false, 5, null);
  orange = new Talk(60, "orange", false, 6, null);
  grapes = new Talk(60, "grapes", false, 7, null);
  avocado = new Talk(60, "avocado", false, 8, null);
  apple = new Talk(45, "apple", false, 9, null);
  mango = new Talk(60, "mango", false, 10, null);
  icecream = new Talk(45, "icecream", false, 11, null);
  chocolate = new Talk(55, "chocolate", false, 12, null);
  pistachio = new Talk(60, "pistachio", false, 13, null);
  vanilla = new Talk(60, "vanilla", false, 14, null);
  cheesecake = new Talk(60, "cheesecake", false, 15, null);
  brownies = new Talk(60, "brownies", false, 16, null);
  cookieCream = new Talk(15, "cookieCream", false, 17, null);

  // Create arrayOfTalks
  arrayOfTalks = [
    fruit,
    banana,
    strawberry,
    kiwi,
    pear,
    orange,
    grapes,
    avocado,
    apple,
    mango,
    icecream,
    chocolate,
    pistachio,
    vanilla,
    cheesecake,
    brownies,
    cookieCream,
  ];
});

describe("Conference Component can keep track of it's children Tracks", () => {
  test("Check if Tracks were corretly added to Conference tracks arrays", () => {
    // Create dummy Conference
    let onlyOneConference = new Conference([], null);

    // Add Tracks to Conference array
    onlyOneConference.tracks.push(
      trackExampleOne,
      trackExampleTwo,
      trackExampleThree
    );
    expect(onlyOneConference).toEqual(
      expect.objectContaining({
        tracks: [trackExampleOne, trackExampleTwo, trackExampleThree],
      })
    );
  });
});

describe("Track Component can keep track of it's children Talks", () => {
  test("Check if Talks were corretly added to Track arrays", () => {
    // Create dummy Talks
    let loveCoding = new Talk(60, "Why I love coding", false, 1, null);
    let livingInGermany = new Talk(45, "Living in Germany", false, 2, null);
    let afternoonCoffee = new Talk(30, "Afternoon Coffee", false, 3, null);

    // Add Talks to Track arrays
    trackExampleOne.sessions.morning.talks.push(loveCoding, livingInGermany);
    trackExampleOne.sessions.afternoon.talks.push(afternoonCoffee);

    expect(trackExampleOne.sessions.morning).toEqual(
      expect.objectContaining({
        talks: [loveCoding, livingInGermany],
      })
    );
    expect(trackExampleOne.sessions.afternoon).toEqual(
      expect.objectContaining({
        talks: [afternoonCoffee],
      })
    );
  });
});

// Method buildTrackList() from Conference.ts
describe("Method buildTrackList() works as Expected", () => {
  test("After buildTrackList() runs, Conference.tracks array contains 3 tracks", () => {
    onlyOneConference.buildTrackList(arrayOfTalks);
    expect(onlyOneConference.tracks).toHaveLength(3);
  });
  test("buildTrackList() correctly places Talks in Tracks as expected", () => {
    onlyOneConference.buildTrackList(arrayOfTalks);
    let trackOne = onlyOneConference.tracks[0];
    let trackTwo = onlyOneConference.tracks[1];
    let trackThree = onlyOneConference.tracks[2];

    // trackOne morning and afternoon have the expected talks
    expect(trackOne.sessions.morning.talks).toEqual(
      expect.arrayContaining([fruit, banana, strawberry, kiwi, cookieCream])
    );
    expect(trackOne.sessions.afternoon.talks).toEqual(
      expect.arrayContaining([pear, orange, grapes, avocado])
    );

    // trackTwo morning and afternoon have the expected talks
    expect(trackTwo.sessions.morning.talks).toEqual(
      expect.arrayContaining([mango, icecream, chocolate])
    );
    expect(trackTwo.sessions.afternoon.talks).toEqual(
      expect.arrayContaining([pistachio, vanilla, cheesecake, brownies])
    );

    // trackThree morning and afternoon have the expected talks
    expect(trackThree.sessions.morning.talks).toEqual(
      expect.arrayContaining([apple])
    );
    expect(trackThree.sessions.afternoon.talks).toEqual(
      expect.arrayContaining([])
    );
  });
  test("buildTrackList() correctly assigns networking Events startTimes to Tracks", () => {
    onlyOneConference.buildTrackList(arrayOfTalks);
    let trackOne = onlyOneConference.tracks[0];
    let trackTwo = onlyOneConference.tracks[1];
    let trackThree = onlyOneConference.tracks[2];

    // track one has the expected networking event start time
    expect(trackOne.networkingEventStartTime).toBe("4:40 PM");

    // track two has the expected networking event start time
    expect(trackTwo.networkingEventStartTime).toBe("5:00 PM");

    // track three has the expected networking event start time
    expect(trackThree.networkingEventStartTime).toBe("4:00 PM");
  });
});
