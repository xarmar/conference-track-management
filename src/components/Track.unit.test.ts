import Track from "./Track";

describe("It is possible to create a 'Track' object with the 'new' keyword", () => {
    test('creates a new Track object', () => {

        let morningStartTime = new Date();
        morningStartTime.setHours(9,0,0);

        let afternoonStartTime = new Date();
        afternoonStartTime.setHours(13,0,0);

        let trackExample = new Track(1, morningStartTime, afternoonStartTime, null);
        expect(trackExample).toEqual(expect.objectContaining({
            day: 1,
            sessions: {
                morning: {
                    availableMinutes: 180,
                    startTime: morningStartTime,
                    talks: [],
                },
                afternoon: {
                    availableMinutes: 240,
                    startTime: afternoonStartTime,
                    talks: [],
                }
            }
        }));
    });
})