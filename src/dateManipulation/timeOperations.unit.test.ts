import { addMinutes } from "date-fns";
import timeOperation from "./timeOperations";


describe("createDate() creates a Date as expected", () => {
    test("Date has the correct time", () => {
        const nineAm = timeOperation.createDate(9,0,0);
        const twoPm = timeOperation.createDate(14,0,0);
        const elevenPm = timeOperation.createDate(23,0,0);

        expect(timeOperation.convertToAmPm(nineAm)).toBe("9:00 AM");
        expect(timeOperation.convertToAmPm(twoPm)).toBe("2:00 PM");
        expect(timeOperation.convertToAmPm(elevenPm)).toBe("11:00 PM");
    });
});

describe("addMinutes() correctly add minutes to a Date", () => {
    test("Adding 50 minutes to 9AM === 9:50 AM", () => {
        const nineAm = timeOperation.createDate(9,0,0);
        const nineFiftyAm = timeOperation.addMinutesToDate(nineAm, 50);
        expect(timeOperation.convertToAmPm(nineFiftyAm)).toBe("9:50 AM");
    });
    test("Adding 23 minutes to 2PM === 2:23 AM", () => {
        const twoPm = timeOperation.createDate(14,0,0);
        const twoTwentyThree = timeOperation.addMinutesToDate(twoPm, 23);
        expect(timeOperation.convertToAmPm(twoTwentyThree)).toBe("2:23 PM");
    });
    test("Adding 11 minutes to 11PM === 11:11 PM", () => {
        const elevenPm = timeOperation.createDate(23,0,0);
        const elevenEleven = timeOperation.addMinutesToDate(elevenPm, 11);
        expect(timeOperation.convertToAmPm(elevenEleven)).toBe("11:11 PM");
    });
});



