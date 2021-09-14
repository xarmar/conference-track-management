import Conference from "./Conference";

describe("It is possible to create a 'Conference' object with the 'new' keyword", () => {
    test('creates a new Conference object', () => {
        let onlyOneConference = new Conference([], null);
        let morningStartingTime = new Date();
        morningStartingTime.setHours(9,0,0);
        let afternoonStartTime = new Date();
        afternoonStartTime.setHours(13,0,0);

        expect(onlyOneConference).toEqual(expect.objectContaining({
            dayCounter: 0,
            morningStartTime: morningStartingTime,
            afternoonStartTime: afternoonStartTime,
            tracks:  []
        }));
    });
})