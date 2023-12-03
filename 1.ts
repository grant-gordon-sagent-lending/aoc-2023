import { readFileSync } from 'fs';

function stringNumberToNumberNumber(input: string) {
    if      (input == "one")   { return "1"; } 
    else if (input == "two")   { return "2"; }
    else if (input == "three") { return "3"; }
    else if (input == "four")  { return "4"; }
    else if (input == "five")  { return "5"; }
    else if (input == "six")   { return "6"; }
    else if (input == "seven") { return "7"; }
    else if (input == "eight") { return "8"; }
    else if (input == "nine")  { return "9"; }
    else { return input; }
}

function calculateValueForString(input: string, scoreRegex: RegExp) {
    // Skip blank lines. 
    if(input.match('^$')) { return 0; }

    // matchAll will find all matching parts of a string 
    // TODO :: I don't understand why we need to do Array.from, instead of just using the Iterator that matchAll returns. 
    let allNumbersInString = Array.from(input.matchAll(scoreRegex));

    let firstNumber = stringNumberToNumberNumber(allNumbersInString[0][1]);
    let lastNumber  = stringNumberToNumberNumber(allNumbersInString[allNumbersInString.length - 1][1]);

    // https://stackoverflow.com/questions/14667713/how-to-convert-a-string-to-number-in-typescript
    return +(firstNumber + lastNumber);
}

let puzzleInput = readFileSync('1.txt', 'utf8');
let puzzleInputByLine = puzzleInput.split("\n");

// These regular expressions need to have the same number of capture groups. In TypeScript, the
// return value of matchAll is an array with one index for the matched value, and additional 
// indices for each capture group. I'm currently accessing the return value by hardcoded index,
// so the return value needs to be at the same index for each regexp, so each regexp needs to
// have the same number of capture groups. 
//
// https://stackoverflow.com/questions/60289995/matchall-throws-error-when-g-flag-is-missing-now
// Also, because we're using the matchAll method, we need to set the 'g' (global) flag on our 
// RegExp object. 
// 
// https://stackoverflow.com/questions/11430863/how-to-find-overlapping-matches-with-a-regexp
// part1Regexp will have the value in the 0th and 1st array indices, but part2Regexp will only
// have the value in the 1st array index. The lookahead is 
let part1Regexp = new RegExp('([0-9])', 'g');
let part2Regexp = new RegExp('(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))', 'g');

// When we want to call a function on every value in an array, map is a great way to handle that. 
// When we want to summarize an array (like summing all the numbers), reduce is a great way to handle that. 
console.log(puzzleInputByLine.map(x => calculateValueForString(x, part1Regexp)).reduce((a, b) => a + b))
console.log(puzzleInputByLine.map(x => calculateValueForString(x, part2Regexp)).reduce((a, b) => a + b))
