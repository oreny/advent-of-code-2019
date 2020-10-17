"use strict";
const fs = require("fs");

const ops = {
    "1": (a, b) => a + b,
    "2": (a, b) => a * b
};

const continueProgram = (opcode) => opcode === 1 || opcode === 2;

function compute(input) {
    for (let i = 0; continueProgram(input[i]); i+=4) {
        const func = ops[input[i].toString()];
        let param1 = input[i + 1];
        let param2 = input[i + 2];
        let output = input[i + 3];
        input[output] = func(input[param1], input[param2]);
    }
}

function initAndExecute(input, noun, verb) {
    const memory = [...input];
    memory[1] = noun;
    memory[2] = verb;
    compute(memory);
    return memory[0];

}

const input = fs.readFileSync('./input-files/puzzle-02.txt', 'utf-8').split(",").map(x => Number(x));
const target = 19690720;

let targetNounAndVerb;
let found = false;
for (let i = 1; i < 100 && !found; i++) {
    for (let j = 1; j < 100 && !found; j++) {
        if (initAndExecute(input, i, j) === target) {
            targetNounAndVerb = [i, j];
            found = true;
        }
    }
}
console.log(targetNounAndVerb);

