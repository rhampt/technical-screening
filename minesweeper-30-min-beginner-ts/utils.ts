const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomSample = (matrix: number[][]): number => {
  let rowIndex = Math.floor(Math.random() * matrix.length);
  let colIndex = Math.floor(Math.random() * matrix[0].length);
  return matrix[rowIndex][colIndex];
};

export { randomInt, randomSample };
