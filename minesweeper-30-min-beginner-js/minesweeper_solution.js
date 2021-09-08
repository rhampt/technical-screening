import { randomInt, randomSample } from './utils.js';

/* 
Challenge Details
  1. You are required to implement the gameBoard function
  2. It returns a string that will print out a gameboard with a given set of inputs
  3. There are edgecases to test for! I will only test with valid board configurations however
  4. Mines will be shown as an X on the board and should be placed randomly
  5. All other cells in the board grid are a number representing how many mines (X's) touch that cell
  
Available methods:
  randomInt(min: int, max: int): int       => Returns an int between [min,max], inclusive
  randomSample(matrix: int[][]): int       => Returns a char representing a random selection from the board

Example output from gameBoard(5,5,6);
  1 X 2 1 1 0
  2 2 2 X 2 1
  X 2 3 3 X 1
  2 X 2 X 2 1
  1 1 2 1 1 0
*/

const gameBoard = (rows, columns, mines) => {
  // Fill matrix with zeros
  let board = new Array(rows).fill(0, 0, rows);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(columns).fill(0, 0, columns);
  }

  // Allocate random mines with -1 in place of X
  let allocated = 0;
  while (allocated < mines) {
    let randomCol = randomInt(0, columns - 1);
    let randomRow = randomInt(0, rows - 1);
    if (board[randomRow][randomCol] !== -1) {
      allocated++;
      board[randomRow][randomCol] = -1;
    }
  }

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; ++c) {
      if (board[r][c] === -1) continue;

      if (r !== 0 && board[r - 1][c] === -1) board[r][c]++; // Top
      if (r !== rows - 1 && board[r + 1][c] === -1) board[r][c]++; // Bottom
      if (c !== 0 && board[r][c - 1] === -1) board[r][c]++; // Left
      if (c !== columns - 1 && board[r][c + 1] === -1) board[r][c]++; // Right

      if (c !== 0 && r !== 0 && board[r - 1][c - 1] === -1) board[r][c]++; // Top-Left
      if (r !== 0 && c !== columns - 1 && board[r - 1][c + 1] === -1) board[r][c]++; // Top-Right
      if (c !== columns - 1 && r !== rows - 1 && board[r + 1][c + 1] === -1) board[r][c]++; // Bottom-Right
      if (r !== rows - 1 && c !== 0 && board[r + 1][c - 1] === -1) board[r][c]++; // Bottom-Left
    }
  }

  let toReturn = '';
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; ++c) {
      if (board[r][c] === -1) toReturn += ' X';
      else toReturn += ` ${board[r][c]}`;
    }
    toReturn += '\n';
  }

  return toReturn;
};

console.log(gameBoard(2, 1, 1));
console.log(gameBoard(1, 1, 1));
console.log(gameBoard(1, 1, 0));
console.log(gameBoard(4, 6, 10));
console.log(gameBoard(5, 5, 24));
console.log(gameBoard(6, 6, 0));
