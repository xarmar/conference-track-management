export const containsNumber = (string: string) => {
  let containsNumber;

  // If string contains a digit
  if (string.match(".*\\d.*")) {
    containsNumber = true;
    return containsNumber;
  }
  // else
  containsNumber = false;

  return containsNumber;
};

export const isLightningOrNumber = (input: string) => {
  let inputWithNoWhiteSpace = input.trim();

  // Check if it is lightning
  if (inputWithNoWhiteSpace.toLowerCase() === "lightning") {
    return true;
  }

  // Check it it only contains digits
  let isNumber = /^\d+$/.test(inputWithNoWhiteSpace);
  if (!isNumber) {
    return false;
  }

  // If it only contains numbers, convert string to number and check for value range
  else {
    let number = parseInt(inputWithNoWhiteSpace);
    if (number >= 5 && number <= 60) {
      return true;
    }
    return false;
  }
};

export const removeEmptyLines = (arrayOfLines: string[]) => {
  let filteredArray: string[] = [];

  arrayOfLines.forEach((line) => {
    if (line.trim()) {
      filteredArray.push(line);
    }
  });

  return filteredArray;
};
