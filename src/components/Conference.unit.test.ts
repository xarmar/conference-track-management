import Conference from "./Conference";

describe("It is possible to create a 'Conference' object with the 'new' keyword", () => {
    test('creates a new Conference object', () => {
        let onlyOneConference = new Conference([], null);
        expect(onlyOneConference).toEqual(expect.objectContaining({
            tracks: []
        }));
    });
})