import { useState } from 'react';

// https://www.svgrepo.com/

import Tile from './components/Tile';
import BankTile from './components/BankTile';

function generateInitialBoard() {

  const board = [];
  for (let y = 0; y < 6; y++) {
    const row = [];
    for (let x = 0; x < 6; x++) {
      row.push({
        isFilled: false,
        x,
        y,
      })
    }
    board.push(row);
  }

  return board;
}

function App() {

  const [board, setBoard] = useState(generateInitialBoard());
  const [bank, setBank] = useState();
  const [availableBank, setAvailableBank] = useState([
    {
      animal: "crab",
      color: "red"
    },
    {
      animal: "crab",
      color: "purple"
    },
    {
      animal: "jellyfish",
      color: "red"
    },
    {
      animal: "crab",
      color: "purple"
    }
  ]);

  return (
    <div className="h-screen bg-indigo-100 w-full flex justify-center items-center flex-col">
      <div className="w-4/5 md:w-3/5 lg:w-2/5 border-8 border-blue-300 rounded-md bg-blue-300 grid grid-cols-6 grid-rows-6 cursor-pointer gap-1">
        {
          board.flat().map(boardTile => <div className="group bg-blue-200 hover:bg-red-400 hover:text-white aspect-square">
            <p className="text-red-600 group-hover:text-white">{boardTile.x}</p>
          </div>)
        }
      </div>

      <div className="mt-12 flex flex-row justify-evenly items-center w-full px-10">
        <div className="w-3/5 md:w-3/5 lg:w-2/5 border-8 border-blue-300 rounded-md bg-blue-300 grid grid-cols-6 grid-rows-1 cursor-pointer gap-1">
          <BankTile animal="crab"/>
          <BankTile animal="jellyfish" />
          <BankTile animal="jellyfish" />
          <BankTile animal="crab"/>
          <BankTile animal="crab"/>
          <BankTile animal="crab"/>
        </div>
      </div>


    </div>
  );
}

export default App;
