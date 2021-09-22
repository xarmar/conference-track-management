// Check if a string contains a number
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

// Checks if a string is a number between 5 and 60 or the word "lightning"
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

// Removes empty lines from a TextBox and returns just the lines with content
export const removeEmptyLines = (arrayOfLines: string[]) => {
  let filteredArray: string[] = [];

  arrayOfLines.forEach((line) => {
    if (line.trim()) {
      filteredArray.push(line);
    }
  });

  return filteredArray;
};
