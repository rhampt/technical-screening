"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Challenge Details
  1. You are required to implement the gameBoard function
  2. It returns a string that will print out a gameboard with a given set of inputs
  3. There are edgecases to test for! I will only test with valid board configurations however
  4. Mines will be shown as an X on the board and should be placed randomly
  5. All other cells in the board grid are a number representing how many mines (X's) touch that cell
  
Available methods:
  randomInt(min: number, max: number): number   => Returns an int between [min,max], inclusive
  randomSample(matrix: number[][]): number      => Returns a numer representing a random selection from the board

Example output from gameBoard(5,5,6);
  1 X 2 1 1 0
  2 2 2 X 2 1
  X 2 3 3 X 1
  2 X 2 X 2 1
  1 1 2 1 1 0
*/
var gameBoard = function (rows, columns, mines) {
    if (rows === void 0) { rows = 5; }
    if (columns === void 0) { columns = 5; }
    if (mines === void 0) { mines = 5; }
    return '';
};
// console.log(gameBoard());
// console.log(gameBoard(2, 1, 1));
// console.log(gameBoard(1, 1, 1));
// console.log(gameBoard(1, 1, 0));
// console.log(gameBoard(4, 6, 10));
// console.log(gameBoard(5, 5, 24));
// console.log(gameBoard(6, 6, 0));
