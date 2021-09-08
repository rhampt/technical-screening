"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSample = exports.randomInt = void 0;
var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.randomInt = randomInt;
var randomSample = function (matrix) {
    var rowIndex = Math.floor(Math.random() * matrix.length);
    var colIndex = Math.floor(Math.random() * matrix[0].length);
    return matrix[rowIndex][colIndex];
};
exports.randomSample = randomSample;
