import { addMinutes } from "date-fns";
import { addMinutesToDate, convertToAmPm, createDate } from "./timeOperations";


describe("createDate() creates a Date as expected", () => {
    test("Date has the correct time", () => {
        const nineAm = createDate(9,0,0);
        const twoPm = createDate(14,0,0);
        const elevenPm = createDate(23,0,0);

        expect(convertToAmPm(nineAm)).toBe("9:00 AM");
        expect(convertToAmPm(twoPm)).toBe("2:00 PM");
        expect(convertToAmPm(elevenPm)).toBe("11:00 PM");
    });
});

describe("addMinutes() correctly add minutes to a Date", () => {
    test("Adding 50 minutes to 9AM === 9:50 AM", () => {
        const nineAm = createDate(9,0,0);
        const nineFiftyAm = addMinutesToDate(nineAm, 50);
        expect(convertToAmPm(nineFiftyAm)).toBe("9:50 AM");
    });
    test("Adding 23 minutes to 2PM === 2:23 AM", () => {
        const twoPm = createDate(14,0,0);
        const twoTwentyThree = addMinutesToDate(twoPm, 23);
        expect(convertToAmPm(twoTwentyThree)).toBe("2:23 PM");
    });
    test("Adding 11 minutes to 11PM === 11:11 PM", () => {
        const elevenPm = createDate(23,0,0);
        const elevenEleven = addMinutesToDate(elevenPm, 11);
        expect(convertToAmPm(elevenEleven)).toBe("11:11 PM");
    });
});



