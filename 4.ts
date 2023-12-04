import { readFileSync } from "fs";

let inputRaw = readFileSync("4.txt", "utf8");
let input = inputRaw.split("\n");

function numberToScore(input: number): number { 
    if(input == 0) {
        return 0;
    }
    return 2**(input - 1)
};

function scoreCard(input: string): number {
    if (input.match(/^$/)) {
        return numberToScore(0);
    }

    let cards = input.split(":")[1];

    let winningNumbersRaw = cards.split("|")[0].trim();
    let myNumbersRaw = cards.split("|")[1].trim();

    let winningNumbersRawArray = winningNumbersRaw.replace(/  /g, " ").split(" ");
    let myNumbersRawArray = myNumbersRaw.replace(/  /g, " ").split(" ");

    let winningNumbers = winningNumbersRawArray.map((a) => +a);
    let myNumbers = myNumbersRawArray.map((a) => +a);

    let count = 0;
    for (let i = 0; i < myNumbers.length; i++) {
        if (winningNumbers.includes(myNumbers[i])) {
            count ++;
        }
    }

    return numberToScore(count);
}

console.log(input.map(scoreCard).reduce((a, c) => a + c));