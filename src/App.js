import { useState, useEffect } from 'react';
import { shuffle, take } from 'lodash';

import { getLegalMoveSpots, calculateScore } from './util';

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
  let counter = 1;

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
  const [isMoving, setIsMoving] = useState(false);

  // the entire set of tiles. 36 of them.
  // generate by fitting every animal/color combo, and setting a unique id
  const [tileSet, setTileSet] = useState(generateTileSet());
  const [bank, setBank] = useState(shuffle(Object.values(tileSet)));
  const [availableBank, setAvailableBank] = useState([]);
  const [legalMoveSpots, setLegalMoveSpots] = useState([]);
  const [scores, setScores] = useState({
    color: 0,
    animal: 0
  });

  const [isTableTopMode, setIsTableTopMode] = useState(false);

  useEffect(() => {
    setAvailableBank(take(bank, 6))
    setScores({
      animal: calculateScore(tileSet, board, "animal"),
      color: calculateScore(tileSet, board, "color")
    })
    if (bank.length === 0) {
      setScores({
        animal: calculateScore(tileSet, board, "animal"),
        color: calculateScore(tileSet, board, "color")
      })
    }
  }, [bank])

  function handlePlaceTile(x, y) {

    // addressed column-first
    const spotToPlace = board[y][x];
    const isSpotOccupied = spotToPlace['occupyingTile'];
    const isLegalMove = legalMoveSpots.some(spot => spot.x === x && spot.y === y)

    // before we do any deletion or adding, make sure we have a tile to place, and it's
    // going in a legal spot

    // if we ARE moving, make sure it's being done legally
    const isDoingLegalMove = !isMoving || isLegalMove;

    // new tile placement
    if (targetTile && !isSpotOccupied && isDoingLegalMove) {
      const newBoard = board;

      // delete any duplicates of tiles, i.e. in a tile move
      const alreadyPlacedTargetTile = newBoard.flat().find(item => item.occupyingTile === targetTile);
      if (alreadyPlacedTargetTile) {
        alreadyPlacedTargetTile.occupyingTile = null;
      }

      // addressed column-first
      newBoard[y][x]['occupyingTile'] = targetTile;

      setTargetTile(null);
      setBoard(newBoard);
      setBank(bank.filter(item => item.id !== targetTile))
      setIsMoving(false);
      setLegalMoveSpots([])
    }
  }

  function handleSelectTile(id) {

    setIsMoving(false);
    setLegalMoveSpots([]);

    // cancel tile selection if target re-selected
    if (targetTile === id) {
      setTargetTile(null);
      setIsMoving(false);
      setLegalMoveSpots([]);
    } else {

      // only calculate legalMoves if we're doing a MOVE on the board
      const boardTargetTile = board.flat().find(item => item.occupyingTile === id);
      if (boardTargetTile) {
        setIsMoving(true)
        setLegalMoveSpots(getLegalMoveSpots(board, boardTargetTile))
      }
      setTargetTile(id);
    }

  }

  return (
    <div className="h-screen bg-indigo-100 w-full flex items-center flex-col">
      <div className={`w-full ${isTableTopMode ? '' : "md:w-3/5 lg:w-2/5"} bg-blue-600 flex justify-evenly text-blue-100 font-sspRegular`}>
        <div className="flex items-center px-4 hover:bg-blue-400">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div className='flex flex-1 justify-between px-6 py-2'>
          <div className="flex items-center justify-between">
            <span className='pr-6 text-3xl'>{scores.animal}</span>
            <div className="flex flex-col items-center">
              <span className='text-xl'>CPU</span>
              <span className='text-xs font-fancy'>Animals</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center animate-pulse">
              <span className='text-xl'>Alex</span>
              <span className='text-xs font-fancy'>Colors</span>
            </div>
            <span className='pl-6 text-3xl'>{scores.color}</span>
          </div>
        </div>
      </div>

      <div className={`mt-4 w-full ${isTableTopMode ? "md:w-4/5" : "md:w-3/5 lg:w-2/5"} border-8 border-blue-300 rounded-md bg-blue-300 grid grid-cols-6 grid-rows-6 cursor-pointer ${isTableTopMode ? "gap-2" : "gap-1"}`}>
        {
          board.flat().map(boardTile => {
            const isLegalMoveTile = legalMoveSpots.find(spot => spot.x === boardTile.x && spot.y === boardTile.y)
            return <div className={`group ${isLegalMoveTile ? 'bg-blue-400' : 'bg-blue-200'} hover:bg-orange-200 hover:text-white aspect-square`} onClick={() => handlePlaceTile(boardTile.x, boardTile.y)}>{
              boardTile.occupyingTile &&
              (
                <div className={boardTile.occupyingTile !== targetTile ? "" : "opacity-25"}>
                  <Tile animal={tileSet[boardTile.occupyingTile].animal} color={tileSet[boardTile.occupyingTile].color} onSelect={() => handleSelectTile(boardTile.occupyingTile)} />
                </div>
              )
            }
              {
                isLegalMoveTile && (
                  <div className='h-full w-full flex justify-center items-center'>
                    <svg height="20" width="20" className='fill-blue-100'>
                      <circle cx="10" cy="10" r="5" />
                    </svg>
                  </div>
                )
              }
            </div>
          })
        }
      </div>


      {/* put a badge on the dock for total left */}
      <div className="mt-4 flex flex-row justify-center w-full">
        {availableBank.length > 0 && <div className={`w-full ${isTableTopMode ? "md:w-4/5" : "md:w-3/5 lg:w-2/5"} border-8 border-blue-300 rounded-md bg-blue-300 grid grid-cols-6 grid-rows-1 cursor-pointer gap-1`}>
          {
            availableBank.map((abItem) => (
              <div className={targetTile ? abItem.id !== targetTile ? "" : "opacity-25" : ""}>
                <BankTile animal={abItem.animal} color={abItem.color} onSelect={() => handleSelectTile(abItem.id)} />
              </div>
            ))
          }
        </div>}
      </div>

      <div className={`flex-1 mt-4 w-full ${isTableTopMode ? '' : "md:w-3/5 lg:w-2/5"} bg-blue-600 flex justify-evenly text-blue-100 font-sspRegular`}>

      </div>

      {/* <div className="h-20 w-20 fixed translate-x-5 translate-y-screen group-hover:-translate-y-screen ease-linear duration-10000">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div> */}
    </div>
  );
}

export default App;
