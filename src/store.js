import { configureStore } from '@reduxjs/toolkit';
import sudokuReducer from './features/sudoku/sudokuSlice';

export const store = configureStore({
  reducer: {
    sudoku: sudokuReducer,
  },
});
