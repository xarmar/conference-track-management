export const containsNumber = (string: string) => {
    let containsNumber;

    // If string contains a digit
    if(string.match(".*\\d.*")){
        containsNumber = true;
        return containsNumber
    } 
    // else
    containsNumber = false;

    return containsNumber
};



