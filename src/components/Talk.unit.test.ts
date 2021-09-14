import Talk from "./Talk";

describe("It is possible to create a 'Talk' object with the 'new' keyword", () => {
    test('creates a new Talk object', () => {
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