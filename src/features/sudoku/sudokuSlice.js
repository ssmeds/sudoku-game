import { createSlice } from '@reduxjs/toolkit';
import { recSolveGame, compareGames } from '../../handlers';

const initialState = {
  difficulty: 'easy',
  isSolved: false,
  isSolvable: false,
  isIncorrect: false,
  clearMsg: false,
  easy: [
    [-1, 5, -1, 9, -1, -1, -1, -1, -1],
    [8, -1, -1, -1, 4, -1, 3, -1, 7],
    [-1, -1, -1, 2, 8, -1, 1, 9, -1],
    [5, 3, 8, 6, -1, 7, 9, 4, -1],
    [-1, 2, -1, 3, -1, 1, -1, -1, -1],
    [1, -1, 9, 8, -1, 4, 6, 2, 3],
    [9, -1, 7, 4, -1, -1, -1, -1, -1],
    [-1, 4, 5, -1, -1, -1, 2, -1, 9],
    [-1, -1, -1, -1, 3, -1, -1, 7, -1],
  ],
  medium: [
    [-1, 3, -1, 6, -1, 8, -1, 1, -1],
    [6, -1, 2, 1, -1, 5, -1, -1, -1],
    [1, -1, 8, -1, -1, 2, 5, -1, 7],

    [8, -1, -1, 7, -1, 1, -1, 2, 3],
    [-1, -1, 6, 8, -1, 3, 7, -1, 1],
    [7, 1, -1, 9, 2, 4, -1, -1, -1],

    [-1, -1, -1, -1, 3, -1, -1, 8, 4],
    [2, -1, 7, -1, 1, -1, 6, -1, 5],
    [-1, 4, -1, 2, 8, -1, 1, -1, -1],
  ],
  hard: [
    [5, 3, -1, -1, 7, -1, -1, -1, -1],
    [6, -1, -1, 1, 9, 5, -1, -1, -1],
    [-1, 9, 8, -1, -1, -1, -1, 6, -1],
    [8, -1, -1, -1, 6, -1, -1, -1, 3],
    [4, -1, -1, 8, -1, 3, -1, -1, 1],
    [7, -1, -1, -1, 2, -1, -1, -1, 6],
    [-1, 6, -1, -1, -1, -1, 2, 8, -1],
    [-1, -1, -1, 4, 1, 9, -1, -1, 5],
    [-1, -1, -1, -1, 8, -1, -1, 7, 9],
  ],
};

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    easyGame: (state) => {
      state.difficulty = 'easy';
      state.clearMsg = true;
    },

    mediumGame: (state) => {
      state.difficulty = 'medium';
      state.clearMsg = true;
    },

    hardGame: (state) => {
      state.difficulty = 'hard';
      state.clearMsg = true;
    },

    solveGame: (state, action) => {
      let array = action.payload.array;
      let difficulty = action.payload.difficulty;
      const originalCopy = (array) => {
        return JSON.parse(JSON.stringify(array));
      };
      let game = originalCopy(array);
      recSolveGame(game);
      if (difficulty === 'easy') {
        state.easy = game;
      } else if (difficulty === 'medium') {
        state.medium = game;
      } else if (difficulty === 'hard') {
        state.hard = game;
      }
      state.clearMsg = true;
    },
    resetGame: (state, action) => {
      let difficulty = action.payload.difficulty;
      if (difficulty === 'easy') {
        state.easy = initialState.easy;
      } else if (difficulty === 'medium') {
        state.medium = initialState.medium;
      } else if (difficulty === 'hard') {
        state.hard = initialState.hard;
      }
      state.clearMsg = true;
    },
    checkSolution: (state, action) => {
      let changedArray = action.payload.array;
      let difficulty = action.payload.difficulty;
      let originalGame = [];

      if (difficulty === 'easy') {
        originalGame = initialState.easy;
      } else if (difficulty === 'medium') {
        originalGame = initialState.medium;
      } else if (difficulty === 'hard') {
        originalGame = initialState.hard;
      }

      const originalCopy = (arr) => {
        return JSON.parse(JSON.stringify(arr));
      };
      let game = originalCopy(originalGame);
      recSolveGame(game);

      let comp = compareGames(changedArray, game);
      if (comp.isSolved) {
        state.isSolved = true;
      } else if (comp.isSolvable) {
        state.isSolvable = true;
      } else {
        state.isIncorrect = true;
      }
      // state.clearMsg = true;
    },
    onInputChange: (state, action) => {
      let value = action.payload.value;
      let row = action.payload.row;
      let col = action.payload.col;
      let array = action.payload.array;
      let difficulty = action.payload.difficulty;
      const originalCopy = (array) => {
        return JSON.parse(JSON.stringify(array));
      };
      let intValue = parseInt(value) || -1;
      if (intValue > 0 && intValue < 10) {
        console.log('valid number');
        let grid = originalCopy(array);
        grid[row][col] = intValue;
        if (difficulty === 'easy') {
          state.easy = grid;
        } else if (difficulty === 'medium') {
          state.medium = grid;
        } else if (difficulty === 'hard') {
          state.hard = grid;
        }
      }
    },
  },
});

// console.log('sudokuSlice', sudokuSlice);
// console.log('initialState', initialState);
export const {
  easyGame,
  mediumGame,
  hardGame,
  solveGame,
  resetGame,
  checkSolution,
  onInputChange,
} = sudokuSlice.actions;
export default sudokuSlice.reducer;
