"use strict";

function toDigits(number) {
    const result = Array();
    for (let num = number; num > 0; num = Math.floor(num/10)) {
        const digit = num % 10;
        result.unshift(digit)
    }
    return result;
}

function isIncreasing(digitArray) {
    return digitArray.map((num, i) => i === 0 || num >= digitArray[i - 1])
        .reduce((a, b) => a && b, true);
}

function hasTwoSimilarConsecutive(digitArray) {
    return digitArray.map((num, i) => i > 0 && num === digitArray[i - 1])
        .reduce((a, b) => a || b, false);
}

function hasOnlyTwoSimilarConsecutive(digitArray) {
    const similarityArray = digitArray.map((num, i) => i > 0 && num === digitArray[i - 1]);
    return similarityArray.map((val, i) => {
        return similarityArray[i]
            && (i === 0 || !similarityArray[i - 1])
            && (i === similarityArray.length - 1 || !similarityArray[i + 1]);
    })
        .reduce((a, b) => a || b, false);
}

function isValidPassword(pwd) {
    const digits = toDigits(pwd);
    return digits.length === 6 && isIncreasing(digits) && hasOnlyTwoSimilarConsecutive(digits)
}

const start = 402328;
const end = 864247;
const passwords = Array.from({length: end - start}, (x, i) => start + i);
const validPwds = passwords.filter(pwd => isValidPassword(pwd)).length;
console.log(validPwds);
