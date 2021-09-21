import {
  addMinutesToDate,
  convertToAmPm,
  createDate,
  subtrackMinutesFromDate,
} from "./timeOperations";

// Initialize Date variables
var nineAm: Date;
var twelvePm: Date;
var twoPm: Date;
var elevenPm: Date;

// Before Each to Keep Code DRY
beforeEach(() => {
  // Give Date specific hours to test timeOperation.ts functions
  nineAm = createDate(9, 0, 0);
  twoPm = createDate(14, 0, 0);
  elevenPm = createDate(23, 0, 0);
  twelvePm = createDate(12, 0, 0);
});

describe("createDate() creates a Date as expected", () => {
  test("Date has the correct time", () => {
    expect(convertToAmPm(nineAm)).toBe("9:00 AM");
    expect(convertToAmPm(twelvePm)).toBe("12:00 PM");
    expect(convertToAmPm(twoPm)).toBe("2:00 PM");
    expect(convertToAmPm(elevenPm)).toBe("11:00 PM");
  });
});

describe("addMinutes() correctly add minutes to a Date", () => {
  test("Adding 50 minutes to 9AM === 9:50 AM", () => {
    const nineFiftyAm = addMinutesToDate(nineAm, 50);
    expect(convertToAmPm(nineFiftyAm)).toBe("9:50 AM");
  });
  test("Adding 23 minutes to 2PM === 2:23 PM", () => {
    const twoTwentyThree = addMinutesToDate(twoPm, 23);
    expect(convertToAmPm(twoTwentyThree)).toBe("2:23 PM");
  });
  test("Adding 11 minutes to 11PM === 11:11 PM", () => {
    const elevenEleven = addMinutesToDate(elevenPm, 11);
    expect(convertToAmPm(elevenEleven)).toBe("11:11 PM");
  });
});

describe("subtrackMinutes() subtracks correctly from a Date", () => {
  test("Subtracting 50 minutes from 9AM === 8:10 AM", () => {
    const eightTenAm = subtrackMinutesFromDate(nineAm, 50);
    expect(convertToAmPm(eightTenAm)).toBe("8:10 AM");
  });
  test("Subtracting 23 minutes from 2PM === 1:37 PM", () => {
    const oneThirtySeven = subtrackMinutesFromDate(twoPm, 23);
    expect(convertToAmPm(oneThirtySeven)).toBe("1:37 PM");
  });
  test("Subtracting 11 minutes from 11PM === 10:49 PM", () => {
    const elevenEleven = subtrackMinutesFromDate(elevenPm, 11);
    expect(convertToAmPm(elevenEleven)).toBe("10:49 PM");
  });
});
