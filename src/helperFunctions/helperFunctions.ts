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

  let number;

  // Check it input only contains digits
  let isNumber = /^\d+$/.test(inputWithNoWhiteSpace);

  // If it contains more than just digits
  if (!isNumber) {

    // Get the string without the 'min' sufix i.e "60 min" becomes "60" and "60 random" remains "60 random"
    let numberWithoutMinSufix = inputWithNoWhiteSpace.replace('min', '').trim();

    // The number without the suffix should match exactly the number parsed to an Integrer. 
    // "60 random" !== "60" so it returns false. 
    if(numberWithoutMinSufix !== parseInt(inputWithNoWhiteSpace).toString()) {
      return false
    }

    // Extract the numbers from the string
    number = parseInt(numberWithoutMinSufix);
  }

  // If it only contains numbers, convert input string a number
  else {
    number = parseInt(inputWithNoWhiteSpace);
  }

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

export const containsComma = (line: string) => {
 
  let containsComma = line.match(".*,.*$");

  if(containsComma) {
    return true
  }
  return false
}