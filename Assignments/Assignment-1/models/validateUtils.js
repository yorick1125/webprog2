const validator = require('validator');

function isValid(title, year){ 
    return validTitle(title) && validYear(year);
}

function validTitle(title){
    // if title is type string and is alphabetic characters
    return typeof title === "string" && !isEmpty(title);
}

function validYear(year){
    // if date is between 0 and current year
    return 0 < year && year <= new Date().getFullYear();
}

function isEmpty(s){
    return s === "" || s === " " || !s
}

module.exports = {
    isValid
}