import { createDate } from "../dateManipulation/timeOperations";
import Track from "./Track";

describe("It is possible to create a 'Track' object with the 'new' keyword", () => {
    test('creates a new Track object with the expected attributes', () => {

        let morningStartTime = createDate(9,0,0);
        let afternoonStartTime = createDate(13,0,0);
        let finishMorningTalksBy = createDate(12,0,0);
        let finishAfternoonTalksBy = createDate(17,0,0);


        let trackExample = new Track(1, morningStartTime, afternoonStartTime, finishMorningTalksBy, finishAfternoonTalksBy, null);
        expect(trackExample).toEqual(expect.objectContaining({
            trackNumber: 1,
            sessions: {
                morning: {
                    availableMinutes: 180,
                    startTime: morningStartTime,
                    finishTalksBy: finishMorningTalksBy,
                    talks: [],
                },
                afternoon: {
                    availableMinutes: 240,
                    startTime: afternoonStartTime,
                    finishTalksBy: finishAfternoonTalksBy,
                    talks: [],
                }
            }
        }));
    });
})