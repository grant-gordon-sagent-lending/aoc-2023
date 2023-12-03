import { readFileSync } from 'fs';

let puzzleInput = readFileSync('2.txt', 'utf8');
let puzzleInputByLine = puzzleInput.split("\n");

let red_limit = 12
let green_limit = 13
let blue_limit = 14

// By using a capture group for the number, we can retrieve the number directly
// from the call to matchAll without any additional string-munging. 
let red_dice   = new RegExp("([0-9]*) red", "g");
let green_dice = new RegExp("([0-9]*) green", "g");
let blue_dice  = new RegExp("([0-9]*) blue", "g");

function isGamePossible(input: string): boolean {
    if (input.match("^$")) {
        return false;
    }
    let pulls = input.split(":")[1];

    let red_matches = Array.from(pulls.matchAll(red_dice));
    for (let i = 0; i < red_matches.length; i++) {
        if (+red_matches[i][1] > red_limit) {
            return false;
        }
    }

    let green_matches = Array.from(pulls.matchAll(green_dice));
    for (let i = 0; i < green_matches.length; i++) {
        if (+green_matches[i][1] > green_limit) {
            return false;
        }
    }

    let blue_matches = Array.from(pulls.matchAll(blue_dice));
    for (let i = 0; i < blue_matches.length; i++) {
        if (+blue_matches[i][1] > blue_limit) {
            return false;
        }
    }
    return true;
}

function scoreGamePart2(input: string): number {
    // TODO: Find the largest red/green/blue value
    if (input.match("^$")) {
        return 0;
    }

    let greatest_red = 0;
    let greatest_green = 0;
    let greatest_blue = 0;

    let pulls = input.split(":")[1];

    let red_matches = Array.from(pulls.matchAll(red_dice));
    for (let i = 0; i < red_matches.length; i++) {
        if (+red_matches[i][1] > greatest_red) {
            greatest_red = +red_matches[i][1];
        }
    }

    let green_matches = Array.from(pulls.matchAll(green_dice));
    for (let i = 0; i < green_matches.length; i++) {
        if (+green_matches[i][1] > greatest_green) {
            greatest_green = +green_matches[i][1];
        }
    }

    let blue_matches = Array.from(pulls.matchAll(blue_dice));
    for (let i = 0; i < blue_matches.length; i++) {
        if (+blue_matches[i][1] > greatest_blue) {
            greatest_blue = +blue_matches[i][1];
        }
    }
    return greatest_red * greatest_green * greatest_blue;
}

function scoreGame(input: string): number {
    let game = input.split(":")[0];
    let score = game.split(" ")[1];
    return +score
}

let total_score = 0;

console.log(puzzleInputByLine.filter(isGamePossible).reduce((a, c) => a + scoreGame(c), total_score));
console.log(puzzleInputByLine.map(scoreGamePart2).reduce((a, c) => a + c));