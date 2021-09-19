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

export const isLightningOrNumber = (string: string) => {
    
    // If user types lightning return true
    if(string === "lightning" || "Lightning" || "LIGHTNING") {
        return true
    }
    
    // else test for a valid number between 5 and 60
    let number = parseInt(string);
    
    // Reject non-numbers
    if(isNaN(number)) {
        return false
    }

    else { 
        if(number < 5 || number > 60) {
            return false
        }
        // Accept numbers between 5 and 60
        else {
            return true
        }
    }
};

