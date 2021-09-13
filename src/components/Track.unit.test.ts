import Track from "./Track";

describe("It is possible to create a 'Track' object with the 'new' keyword", () => {
    test('creates a new Track object', () => {
        let trackExample = new Track(1, null);
        expect(trackExample).toEqual(expect.objectContaining({
            day: 1,
            sessions: {
                morning: {
                    talks: [],
                    remainingMinutes: 180
                },
                afternoon: {
                    talks: [],
                    remainingMinutes: 240
                }
            }
        }));
    });
})