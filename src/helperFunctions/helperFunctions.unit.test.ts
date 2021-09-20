import { isLightningOrNumber } from "./helperFunctions";

describe("isLightningOrNumber works as expected", () => {
    test("isLightning returns true when input is lightning", () => {

        let lightning: string = "lightning";
        let lightningRandom: string = "LiGhtNing";
        let lightningCaps: string = "LIGHTNING";

        expect(isLightningOrNumber(lightning)).toBe(true);
        expect(isLightningOrNumber(lightningRandom)).toBe(true);
        expect(isLightningOrNumber(lightningCaps)).toBe(true);
    });
    test("isLightning returns false when a input has more than just numbers", () => {

        let lightningWithNumbers: string = "lightning12";
        let abcFour: string = "abc4";

        expect(isLightningOrNumber(lightningWithNumbers)).toBe(false);
        expect(isLightningOrNumber(abcFour)).toBe(false);
    });
    test("isLightning returns false if a number is under 5 or over 60", () => {

        let underFive: string = "4";
        let overSixty: string = "61";

        expect(isLightningOrNumber(underFive)).toBe(false);
        expect(isLightningOrNumber(overSixty)).toBe(false);
    });
    test("isLightning returns true when a number is between 5 and 60", () => {

        let five: string = "5";
        let forty: string = "40";
        let sitxty: string = "60";

        expect(isLightningOrNumber(five)).toBe(true);
        expect(isLightningOrNumber(forty)).toBe(true);
        expect(isLightningOrNumber(sitxty)).toBe(true);

    });
})