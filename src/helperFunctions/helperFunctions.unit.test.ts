import { containsComma, isLightningOrNumber, removeEmptyLines } from "./helperFunctions";

describe("isLightningOrNumber works as expected", () => {
  test("isLightningOrNumber returns true when input is lightning", () => {
    let lightning: string = "lightning";
    let lightningRandom: string = "LiGhtNing";
    let lightningCaps: string = "LIGHTNING";

    expect(isLightningOrNumber(lightning)).toBe(true);
    expect(isLightningOrNumber(lightningRandom)).toBe(true);
    expect(isLightningOrNumber(lightningCaps)).toBe(true);
  });
  test("isLightningOrNumber returns false when a input has more than just numbers", () => {
    let lightningWithNumbers: string = "lightning12";
    let abcFour: string = "abc4";

    expect(isLightningOrNumber(lightningWithNumbers)).toBe(false);
    expect(isLightningOrNumber(abcFour)).toBe(false);
  });

  test("isLightningOrNumber returns false if user doesn't append the sufix 'min'", () => {
    let fifty: string = "50";
    let forty: string = "40";

    expect(isLightningOrNumber(fifty)).toBe(false);
    expect(isLightningOrNumber(forty)).toBe(false);
  });

  test("isLightningOrNumber returns true when a input has exactly the suffix 'min' but rejects any other sufixes", () => {
    
    let iHaveMin: string = "60min";
    let iamValidToo: string = "40min";
    let iDont: string = "60mint";
    let iDontHaveJustMin: string = "40 minotaur"

    expect(isLightningOrNumber(iHaveMin)).toBe(true);
    expect(isLightningOrNumber(iamValidToo)).toBe(true);
    expect(isLightningOrNumber(iDont)).toBe(false);
    expect(isLightningOrNumber(iDontHaveJustMin)).toBe(false);
  });

  test("isLightningOrNumber returns false if a number is under 5 or over 60", () => {
    let underFive: string = "4min";
    let overSixty: string = "61min";

    expect(isLightningOrNumber(underFive)).toBe(false);
    expect(isLightningOrNumber(overSixty)).toBe(false);
  });
  test("isLightningOrNumber returns true when a number is between 5 and 60", () => {
    let five: string = "5min";
    let forty: string = "40min";
    let sitxty: string = "60min";

    expect(isLightningOrNumber(five)).toBe(true);
    expect(isLightningOrNumber(forty)).toBe(true);
    expect(isLightningOrNumber(sitxty)).toBe(true);
  });
});

describe("removeEmptyLines works as expected", () => {
  test("removeEmptyLines returns an array of lines that have content only", () => {
    let lineWithContent = "I have content, 60";
    let iHaveContentToo = " , 60";
    let same = ",";
    let iDontHaveContent = "                    ";
    let iAmTabWhiteSpace = "                ";

    let arrayOfLines = [
      lineWithContent,
      iHaveContentToo,
      same,
      iDontHaveContent,
      iAmTabWhiteSpace,
    ];

    // removeEmptyLines has an array wth content only
    expect(removeEmptyLines(arrayOfLines)).toStrictEqual(
      expect.arrayContaining([lineWithContent, iHaveContentToo, same])
    );
    // removeEmptyLines doesn't add empty lines to othe array
    expect(removeEmptyLines(arrayOfLines)).toEqual(
      expect.not.arrayContaining([iDontHaveContent, iAmTabWhiteSpace])
    );
  });
});

describe("containsComma() works as expected", () => {
  test("Contains comma detects when a sentence has a comma", () => {

    let contains = "I contain a comma,";
    let containsToo = "Me to, I have, two";
    let iDont = "I don't have one";

    // removeEmptyLines has an array wth content only
    expect(containsComma(contains)).toBe(true);
    expect(containsComma(containsToo)).toBe(true);
    expect(containsComma(iDont)).toBe(false);
  });
});