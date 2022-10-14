import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkSolution,
  solveGame,
  resetGame,
  easyGame,
  mediumGame,
  hardGame,
  onInputChange,
} from '../features/sudoku/sudokuSlice';

const SudokuContainer = () => {
  const dispatch = useDispatch();
  const {
    difficulty,
    isSolved,
    isSolvable,
    isIncorrect,
    clearMsg,
    easy,
    medium,
    hard,
  } = useSelector((store) => store.sudoku);
  const noRowCol = [...Array(9).keys()];
  const numRowCol = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let array;
  if (difficulty === 'easy') {
    array = easy;
  } else if (difficulty === 'medium') {
    array = medium;
  } else if (difficulty === 'hard') {
    array = hard;
  }
  return (
    <div className='game-container'>
      <div className='table-container'>
        <table>
          <tbody>
            {numRowCol.map((row, rI) => {
              return (
                <tr
                  key={rI}
                  className={(row + 1) % 3 === 0 ? 'bottom-border' : undefined}>
                  {numRowCol.map((col, cI) => {
                    return (
                      <td
                        key={rI + cI}
                        className={
                          (col + 1) % 3 === 0 ? 'right-border' : undefined
                        }>
                        <input
                          onChange={(e) =>
                            dispatch(
                              onInputChange({
                                value: e.target.value,
                                row: row,
                                col: col,
                                array: array,
                                difficulty: difficulty,
                              })
                            )
                          }
                          value={array[row][col] === -1 ? '' : array[row][col]}
                          type='text'
                          disabled={array[row][col] !== -1 ? true : false}
                          className='cInput'
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <aside>
        <div className='upper-btn-container'>
          <button id='easy-btn' onClick={() => dispatch(easyGame())}>
            Easy
          </button>
          <button id='medium-btn' onClick={() => dispatch(mediumGame())}>
            Medium
          </button>
          <button id='hard-btn' onClick={() => dispatch(hardGame())}>
            Hard
          </button>
        </div>
        <div className='lower-btn-container'>
          <button
            id='check-btn'
            onClick={() =>
              dispatch(checkSolution({ array: array, difficulty: difficulty }))
            }>
            Check
          </button>
          <button
            id='solve-btn'
            onClick={() =>
              dispatch(solveGame({ array: array, difficulty: difficulty }))
            }>
            Solve
          </button>
          <button
            id='reset-btn'
            onClick={() => {
              dispatch(resetGame({ array: array, difficulty: difficulty }));
            }}>
            Reset
          </button>
        </div>

        {!clearMsg && (
          <div>
            {isSolved && (
              <div>
                <h2>Grattis, du löste den!</h2>
              </div>
            )}

            <div>
              {isSolvable ? (
                <div>
                  <h4>Du är på rätt spår, fortsätt!</h4>
                </div>
              ) : isIncorrect ? (
                <div>
                  <h4>Du har gjort ett fel!</h4>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default SudokuContainer;
