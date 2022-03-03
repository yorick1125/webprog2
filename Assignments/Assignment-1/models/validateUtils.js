const validTypes = ["normal", "grass", "fire", "water", "electric", "psychic", "poison", "flying"]
const validator = require('validator');

function isValid(name, type){ 
    // Check for valid type
    if(!validTypes.includes(type)){
        return false;
    }

    // Check for valid name
    if(typeof name === "string" && validator.isAlpha(name)){
        if (name){
            return true;
        }
        else {
            return false;
        }
    }
}



module.exports = {
    isValid
}