import { readFileSync } from 'fs';

let inputRaw = readFileSync('3.txt', 'utf8');
let input = inputRaw.split("\n");

function findNumbersTouchingSymbols(lineAbove: string, line: string, lineBelow: string) {
    let retVal = [];
    // first, find any numbers
    let numberRegex = new RegExp("[0-9]{1,}", "g");
    let potentialNumbers = Array.from(line.matchAll(numberRegex));

    // For each number...
    for (let potentialNumberIndex = 0; potentialNumberIndex < potentialNumbers.length; potentialNumberIndex++) {
        let potentialNumber = potentialNumbers[potentialNumberIndex];

        // Start our search at the index of the regex find - minus one, since symbols can touch diagonally.
        let startSearchIndex = potentialNumber.index ?? 0;
        startSearchIndex = startSearchIndex - 1;
        // End our search at the length of the number - plus one, since symbols can touch diagonally.
        let endSearchIndex = startSearchIndex + potentialNumber[0].length + 1;

        // Search the line above.
        if (lineAbove != undefined && lineAbove != "") {
            for (let i = startSearchIndex; i <= endSearchIndex; i++) {
                if (lineAbove[i] != undefined && lineAbove[i] != ".") {
                    retVal.push(+potentialNumber[0]);
                }
            }
        }

        // Search the line below. 
        if (lineBelow != undefined && lineBelow != "") {
            for (let i = startSearchIndex; i <= endSearchIndex; i++) {
                if (lineBelow[i] != undefined && lineBelow[i] != ".") {
                    // TODO: This will add numbers more than once if they're touched by multiple symbols. This
                    //  probably isn't what we want. 
                    retVal.push(+potentialNumber[0]);
                }
            }
        }

        // Check to the left and right of the number.
        if (
               (line[startSearchIndex] != undefined && line[startSearchIndex] != ".")
            || (line[endSearchIndex]   != undefined && line[endSearchIndex]   != ".")
        ) {
            retVal.push(+potentialNumber[0]);
        }

    }
    return retVal;
}

let numbersTouchingSymbols = [];
for (let i = 0; i < input.length; i++) {
    numbersTouchingSymbols.push(findNumbersTouchingSymbols(input[i - 1], input[i], input[i + 1]));
}

console.log(numbersTouchingSymbols.flat().reduce((a, b) => a + b));