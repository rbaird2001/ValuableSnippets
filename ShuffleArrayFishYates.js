/**
 * articles explaining this:
 * https://bost.ocks.org/mike/shuffle/
 * https://blog.codinghorror.com/the-danger-of-naivete/
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * 
 */


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * Which is a computer optimized variation
 *   of the Fisher-Yates algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

/**
 * ECMA 6 supported version of the same. Allows for 
 *    multiple variables at once which this code exploits
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}