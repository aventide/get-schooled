import { useState, useEffect } from 'react';
import { shuffle, take } from 'lodash';

// https://www.svgrepo.com/

import Tile from './components/Tile';
import BankTile from './components/BankTile';
import { COLORS, ANIMALS } from './constants';

function generateInitialBoard() {

  const board = [];
  for (let y = 0; y < 6; y++) {
    const row = [];
    for (let x = 0; x < 6; x++) {
      row.push({
        x,
        y,
      })
    }
    board.push(row);
  }

  return board;
}

function generateTileSet() {
  const tileSet = {};
  let counter = 0;

  COLORS.forEach(color => {
    ANIMALS.forEach(animal => {
      tileSet[counter] = {
        animal,
        color,
        id: counter
      };
      counter++;
    })
  })
  return tileSet;
}

function App() {

  const [board, setBoard] = useState(generateInitialBoard());
  const [targetTile, setTargetTile] = useState(null);

  // the entire set of tiles. 36 of them.
  // generate by fitting every animal/color combo, and setting a unique id
  const [tileSet, setTileSet] = useState(generateTileSet());
  const [bank, setBank] = useState(shuffle(Object.values(tileSet)));
  const [availableBank, setAvailableBank] = useState([]);

  useEffect(() => {
    setAvailableBank(take(bank, 6))
  }, [bank])

  function handleSelectTile(x, y) {
    if(targetTile || targetTile === 0){
      const newBoard = board;

      // addressed column-first
      newBoard[y][x]['occupyingTile'] = targetTile;

      setTargetTile(null);
      setBoard(newBoard);
      setBank(bank.filter(item => item.id !== targetTile))
    }
  }

  return (
    <div className="h-screen bg-indigo-100 w-full flex justify-center items-center flex-col">
      <div className="w-4/5 md:w-3/5 lg:w-2/5 border-8 border-blue-300 rounded-md bg-blue-300 grid grid-cols-6 grid-rows-6 cursor-pointer gap-1">
        {
          board.flat().map(boardTile => <div className={`group bg-blue-200 hover:bg-red-400 hover:text-white aspect-square`} onClick={() => handleSelectTile(boardTile.x, boardTile.y)}>{
            (boardTile.occupyingTile || boardTile.occupyingTile === 0) && <Tile animal={tileSet[boardTile.occupyingTile].animal} color={tileSet[boardTile.occupyingTile].color}/>
          }</div>)
        }
      </div>

      <div className="mt-12 flex flex-row justify-evenly items-center w-full px-10">
        {availableBank.length > 0 && <div className="w-full md:w-3/5 lg:w-2/5 border-8 border-blue-300 rounded-md bg-blue-300 grid grid-cols-6 grid-rows-1 cursor-pointer gap-1">
          {
            availableBank.map((abItem) => (
              <div className={(targetTile || targetTile === 0) && abItem.id !== targetTile ? "opacity-25" : ""}>
                <BankTile animal={abItem.animal} color={abItem.color} onSelect={() => setTargetTile(abItem.id)} />
              </div>
            ))
          }
        </div>}
      </div>

    </div>
  );
}

export default App;
