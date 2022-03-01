const validTypes = ["normal", "grass", "fire", "water", "electric", "psychic"]
const validator = require('validator');

function isValid1(name, type){ 
    // Check for valid type
    if(!validTypes.includes(type)){
        return false;
    }

    // Check for valid name
    if(typeof name === "string"){
        if (name){
            return true;
        }
        else {
            return false;
        }
    }
}


function isValid2(name){
    return validator.isAlpha(name);
}

module.exports = {
    isValid1,
    isValid2
}