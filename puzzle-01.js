"use strict";
const fs = require("fs");

const calcFuelForMass = (mass) => Math.floor(mass / 3) - 2;

const calcFuelForModule = (mass) => {
    let totalFuel = 0;
    for (let fuel = calcFuelForMass(mass); fuel >=0; fuel = calcFuelForMass(fuel)) {
        totalFuel += fuel;
    }
    return totalFuel;
}

const input = fs.readFileSync('./input-files/puzzle-01.txt', 'utf-8').split(/\r?\n/);
let counter = input.map(calcFuelForModule).reduce((x, y) => x + y);
console.log(counter);
