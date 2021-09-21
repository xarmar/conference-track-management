import { createDate } from "../dateManipulation/timeOperations";
import Track from "./Track";

// Initialize Date variables
var morningStartTime: Date;
var morningEndTalksBy: Date;
var afternoonStartTime: Date;
var afternoonEndTalksBy: Date;

// Initialize Track variables
var trackExampleOne: Track;
var trackExampleTwo: Track;

// Before Each to Keep Code DRY
beforeEach(() => {
  // Create 'start' and 'endBy' times for each session
  morningStartTime = createDate(9, 0, 0);
  morningEndTalksBy = createDate(12, 0, 0);
  afternoonStartTime = createDate(13, 0, 0);
  afternoonEndTalksBy = createDate(17, 0, 0);

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
});

describe("It is possible to create a 'Track' object with the 'new' keyword", () => {
  test("creates a new Track object with the expected attributes", () => {
    expect(trackExampleOne).toEqual(
      expect.objectContaining({
        trackNumber: 1,
        lunchHourStartTime: morningEndTalksBy,
        networkingEventStartTime: undefined,
        sessions: {
          morning: {
            availableMinutes: 180,
            startTime: morningStartTime,
            finishTalksBy: morningEndTalksBy,
            talks: [],
          },
          afternoon: {
            availableMinutes: 240,
            startTime: afternoonStartTime,
            finishTalksBy: afternoonEndTalksBy,
            talks: [],
          },
        },
      })
    );
  });
});

// Method findNetworkingEventStartTime() from Track.ts
describe("Method findNetworkingEventStartTime() correctly tells when a networking event should start", () => {
  test("A track with over 60 minutes of availableMinutes should start the networking event no sooner than 4:00 PM", () => {
    // Pretend Tracks have time constraits
    trackExampleOne.sessions.afternoon.availableMinutes = 120;

    expect(trackExampleOne.findNetworkingEventStartTime()).toBe("4:00 PM");
  });
  test("A track with exactly 60 minutes of availableMinutes should start the networking event at 4:00 PM", () => {
    // Pretend Tracks have time constraits
    trackExampleTwo.sessions.afternoon.availableMinutes = 60;

    expect(trackExampleTwo.findNetworkingEventStartTime()).toBe("4:00 PM");
  });
  test("A track with 59 minutes of availableMinutes should start the networking event at 4:01 PM", () => {
    // Pretend Tracks have time constraits
    trackExampleOne.sessions.afternoon.availableMinutes = 59;

    expect(trackExampleOne.findNetworkingEventStartTime()).toBe("4:01 PM");
  });
  test("A track with 20 minutes of availableMinutes should start the networking event at 4:40 PM", () => {
    // Pretend Tracks have time constraits
    trackExampleTwo.sessions.afternoon.availableMinutes = 20;

    expect(trackExampleTwo.findNetworkingEventStartTime()).toBe("4:40 PM");
  });
});
