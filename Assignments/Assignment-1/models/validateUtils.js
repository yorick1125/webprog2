const validator = require('validator');

function isValid(name, year){ 
    return validName(name) && validYear(year);
}

function validName(name){
    // if name is type string and is alphabetic characters
    return typeof name === "string";
}

function validYear(year){
    // if date is between 0 and current year
    return 0 < year && year <= new Date().getFullYear();
}



module.exports = {
    isValid
}