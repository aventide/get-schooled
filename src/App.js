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
    <div className="h-screen bg-indigo-100 w-full flex justify-center items-center flex-col">

      {/* <div className="w-full md:w-3/5 lg:w-2/5 border-8 border-blue-300 rounded-md bg-blue-300">
      </div> */}

      {/* <div className= "w-1/5 flex justify-center items-center border-2 border-blue-500 rounded-md text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className='px-1 text-lg'>{bank.length}</span>
      </div> */}

      <label for="my-modal-2" class="btn btn-primary modal-button">Reveal Score</label>
      <input type="checkbox" id="my-modal-2" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <p>
            {`Animals Score: ${scores.animal}`}
          </p>
          <p>
            {`Colors Score: ${scores.color}`}
          </p>
          <div class="modal-action">
            <label for="my-modal-2" class="btn">Close</label>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full md:w-3/5 lg:w-2/5 border-8 border-blue-300 rounded-md bg-blue-300 grid grid-cols-6 grid-rows-6 cursor-pointer gap-1">
        {
          board.flat().map(boardTile => {
            const isLegalMoveTile = legalMoveSpots.find(spot => spot.x === boardTile.x && spot.y === boardTile.y)
            return <div className={`group ${isLegalMoveTile ? 'bg-indigo-100' : 'bg-blue-200'} hover:bg-red-400 hover:text-white aspect-square`} onClick={() => handlePlaceTile(boardTile.x, boardTile.y)}>{
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
                    <svg height="20" width="20" className='fill-blue-300'>
                      <circle cx="10" cy="10" r="5"/>
                    </svg>
                  </div>
                )
              }
            </div>
          })
        }
      </div>


      {/* put a badge on the dock for total left */}
      <div className="mt-4 flex flex-row justify-evenly items-center w-full">
        {availableBank.length > 0 && <div className="w-full md:w-3/5 lg:w-2/5 border-8 border-blue-300 rounded-md bg-blue-300 grid grid-cols-6 grid-rows-1 cursor-pointer gap-1">
          {
            availableBank.map((abItem) => (
              <div className={targetTile ? abItem.id !== targetTile ? "" : "opacity-25" : ""}>
                <BankTile animal={abItem.animal} color={abItem.color} onSelect={() => handleSelectTile(abItem.id)} />
              </div>
            ))
          }
        </div>}
      </div>

    </div>
  );
}

export default App;
