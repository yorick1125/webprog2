const validator = require('validator');

const validTypes = [
    "normal", "grass", "water", "electric", "fire", "psychic", "fighting", "dragon"
]

/** Check validity of name and type. 
 *  Name must be a non-empty alphanumeric string */
function isValid(name, type) {
   return (validTypes.includes(type.toLowerCase()) && typeof name === 'string' && name && validator.isAlpha(name));
}

module.exports = {
    isValid
}
