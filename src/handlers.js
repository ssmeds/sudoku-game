// validate number unique in row
const checkRow = (grid, row, i) => {
  return grid[row].indexOf(i) === -1;
};

// validate number unique in column
const checkCol = (grid, col, i) => {
  return grid.map((row) => row[col]).indexOf(i) === -1;
};

// validate number unique in box
const checkBox = (grid, row, col, i) => {
  // get Box start index
  let arrBox = [];
  let rowStart = row - (row % 3);
  let colStart = col - (col % 3);
  for (let ir = 0; ir < 3; ir++) {
    for (let ic = 0; ic < 3; ic++) {
      // get all the cell numbers and push to arrBox
      arrBox.push(grid[rowStart + ir][colStart + ic]);
    }
  }
  return arrBox.indexOf(i) === -1;
};

const checkValid = (grid, row, col, i) => {
  if (
    checkRow(grid, row, i) &&
    checkCol(grid, col, i) &&
    checkBox(grid, row, col, i)
  ) {
    return true;
  }
  return false;
};

const getNextCell = (row, col) => {
  // if col reaches 8, increase the row number by 1
  // if row AND col reaches 8, the next numbers will be [0, 0]
  // if col is under 8 increase the col number by 1
  return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
};

// recursive function to solve the game
export const recSolveGame = (grid, row = 0, col = 0) => {
  // if the cell is already filled with a number
  if (grid[row][col] !== -1) {
    // if it reaches the last cell it should not solve it
    let lastCell = row >= 8 && col >= 8;
    if (!lastCell) {
      let [nextRow, nextCol] = getNextCell(row, col);
      return recSolveGame(grid, nextRow, nextCol);
    }
  }
  for (let i = 1; i <= 9; i++) {
    if (checkValid(grid, row, col, i)) {
      //if valid
      grid[row][col] = i;
      // check next cell
      let [nextRow, nextCol] = getNextCell(row, col);
      if (!nextRow && !nextCol) {
        return true;
      }
      if (recSolveGame(grid, nextRow, nextCol)) {
        return true;
      }
    }
  }
  //if not valid
  grid[row][col] = -1;
  return false;
};

// comparing the solutions
export const compareGames = (changedArray, solvedGame) => {
  let results = {
    isSolved: true,
    isSolvable: true,
  };
  for (let ir = 1; ir < 9; ir++) {
    for (let ic = 1; ic < 9; ic++) {
      if (changedArray[ir][ic] !== solvedGame[ir][ic]) {
        if (changedArray[ir][ic] !== -1) {
          results.isSolvable = false;
        }
        results.isSolved = false;
      }
    }
  }
  return results;
};
