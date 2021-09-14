import Talk from "./Talk";

describe("It is possible to create a 'Talk' object with the 'new' keyword", () => {
    test('creates a new Talk object with the expected attributes', () => {
        let reactForever = new Talk(20, 'React Forever', null);
        expect(reactForever).toEqual(expect.objectContaining({
            duration: 20,
            hasSpot: false,
            title: 'React Forever',
            startTime: undefined,
            props: null
        }));
    });
})

describe("talkAssignedToTrack Method returns true and false when expected", () => {
    test('talkAssignedToTrack returns false when track.hasPlace = false', () => {
        let reactForever = new Talk(20, 'React Forever', null);
        expect(reactForever.talkAssignedToTrack()).toBe(false);
    });
    test('talkAssignedToTrack returns true when track.hasPlace = true', () => {
        let awesomeTypeScript = new Talk(20, 'Awesome Typescript', null);
        awesomeTypeScript.hasSpot = true;
        expect(awesomeTypeScript.talkAssignedToTrack()).toBe(true);
    });
})

