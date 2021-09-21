import { isLightningOrNumber, removeEmptyLines } from "./helperFunctions";

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
    test("isLightningOrNumber returns false if a number is under 5 or over 60", () => {

        let underFive: string = "4";
        let overSixty: string = "61";

        expect(isLightningOrNumber(underFive)).toBe(false);
        expect(isLightningOrNumber(overSixty)).toBe(false);
    });
    test("isLightningOrNumber returns true when a number is between 5 and 60", () => {

        let five: string = "5";
        let forty: string = "40";
        let sitxty: string = "60";

        expect(isLightningOrNumber(five)).toBe(true);
        expect(isLightningOrNumber(forty)).toBe(true);
        expect(isLightningOrNumber(sitxty)).toBe(true);

    });
})

describe("removeEmptyLines works as expected", () => {
    test("removeEmptyLines returns an array of lines that have content only", () => {

        let lineWithContent = "I have content, 60";
        let iHaveContentToo = " , 60";
        let same = ",";
        let iDontHaveContent = "                    ";
        let iAmTabWhiteSpace = "                ";

        let arrayOfLines = [lineWithContent, iHaveContentToo, same, iDontHaveContent, iAmTabWhiteSpace]

        // removeEmptyLines has an array wth content only
        expect(removeEmptyLines(arrayOfLines)).toStrictEqual(expect.arrayContaining(
            [
                lineWithContent, iHaveContentToo, same
            ]
        ));
        // removeEmptyLines doesn't add empty lines to othe array
        expect(removeEmptyLines(arrayOfLines)).toEqual(expect.not.arrayContaining(
            [
                iDontHaveContent, iAmTabWhiteSpace
            ]
        ));
    });
});