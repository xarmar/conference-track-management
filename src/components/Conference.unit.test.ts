import timeOperation from "../dateManipulation/timeOperations";
import Conference from "./Conference";

describe("It is possible to create a 'Conference' object with the 'new' keyword", () => {
    test('creates a new Conference object with the expected attributes', () => {
        let onlyOneConference = new Conference([], null);
        
        // Expected Values of Dates
        let morningStartingTime = timeOperation.createDate(9,0,0);
        let afternoonStartTime = timeOperation.createDate(13,0,0);

        expect(onlyOneConference).toEqual(expect.objectContaining({
            trackCounter: 0,
            morningStartTime: morningStartingTime,
            afternoonStartTime: afternoonStartTime,
            tracks:  []
        }));
    });
})

describe("Method createNewTrack() works as Expected", () => {
    test('createNewTrack() creates a new Track object and adds it to the array', () => {
        let onlyOneConference = new Conference([], null);
        expect(onlyOneConference.createNewTrack()).toEqual(expect(onlyOneConference.tracks.length).toBe(1));
    });
});