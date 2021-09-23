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

  // If user didn't use the 'min' suffix reject request
  if (inputWithNoWhiteSpace.indexOf("min") < 0) {
    return false;
  }

  let number: number;

  // Get the string without the 'min' sufix i.e "60 min" becomes "60" and "60 random" remains "60 random"
  let numberWithoutMinSufix = inputWithNoWhiteSpace.replace("min", "").trim();

  // The number without the suffix should match exactly the number parsed to an Integrer. This only occurs if 'min' is succesfully removed
  // i.e "60 minotaur" becomes "60 otaur" !== "60" so it returns false.
  if (numberWithoutMinSufix !== parseInt(inputWithNoWhiteSpace).toString()) {
    return false;
  }

  // Extract the numbers from the string
  number = parseInt(numberWithoutMinSufix);

  // Validate for value range
  if (number >= 5 && number <= 60) {
    return true;
  }
  return false;
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