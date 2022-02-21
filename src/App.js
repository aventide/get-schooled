import { useState, useEffect } from 'react';
import { shuffle, take } from 'lodash';

import BoardHeader from './components/BoardHeader';

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
  const [hasMoved, setHasMoved] = useState(false);

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
  const [players, setPlayers] = useState({
    animals: {
      playerName: "CPU",
      score: 0,
      isTurn: false
    },
    colors: {
      playerName: "Alex",
      score: 0,
      isTurn: true
    }
  });

  const [turnFor, setTurnFor] = useState(Math.random() < 0.5 ? "animals" : "colors");

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

  function toggleTurnFor(){
    setTurnFor(turnFor === "colors" ? "animals" : "colors");
    setHasMoved(false)
  }

  function handlePlaceTile(x, y) {

    // addressed column-first
    const spotToPlace = board[y][x];
    const isSpotOccupied = spotToPlace['occupyingTile'];
    const isLegalMove = legalMoveSpots.some(spot => spot.x === x && spot.y === y)

    // before we do any deletion or adding, make sure we have a tile to place, and it's
    // going in a legal spot

    // if we ARE moving, make sure it's being done legally
    const isDoingLegalMove = !isMoving || isLegalMove;

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
      setIsMoving(false);
      setLegalMoveSpots([])

      if(!isMoving){
        toggleTurnFor()
        setBank(bank.filter(item => item.id !== targetTile))
      } else {
        setHasMoved(true)
      }
    }
  }

  function handleSelectBoardTile(id){
    if(!hasMoved){
      handleSelectTile(id)
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

      <BoardHeader isTableTopMode={isTableTopMode} scores={scores} turnFor={turnFor}/>

      <div className={`mt-4 w-full ${isTableTopMode ? "md:w-4/5" : "md:w-3/5 lg:w-2/5"} border-8 border-blue-300 rounded-md bg-blue-300 grid grid-cols-6 grid-rows-6 cursor-pointer ${isTableTopMode ? "gap-2" : "gap-1"}`}>
        {
          board.flat().map(boardTile => {
            const isLegalMoveTile = legalMoveSpots.find(spot => spot.x === boardTile.x && spot.y === boardTile.y)
            return <div className={`group ${isLegalMoveTile ? 'bg-blue-400' : boardTile.occupyingTile && boardTile.occupyingTile === targetTile ? 'bg-orange-200' : 'bg-blue-200'} hover:bg-orange-200 aspect-square`} onClick={() => handlePlaceTile(boardTile.x, boardTile.y)}>{
              boardTile.occupyingTile &&
              (
                <div className={boardTile.occupyingTile === targetTile ? "animate-pulse-slow" : ""}>
                  <Tile animal={tileSet[boardTile.occupyingTile].animal} color={tileSet[boardTile.occupyingTile].color} onSelect={() => handleSelectBoardTile(boardTile.occupyingTile)} />
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

      <div className={`mt-4 flex flex-row justify-center w-full ${isTableTopMode ? "md:w-4/5" : "md:w-3/5 lg:w-2/5"} flex-1`}>
        <div className={`w-full border-8 border-blue-300 rounded-md bg-blue-300 cursor-pointer`}>
          <div className="grid grid-cols-6 grid-rows-1 gap-1">
            {
              availableBank.map((abItem) => (
                <div className={abItem.id !== targetTile ? "" : "bg-orange-200 rounded-md"}>
                  <div className={abItem.id !== targetTile ? "" : "animate-pulse-slow"}>
                    <BankTile animal={abItem.animal} color={abItem.color} onSelect={() => handleSelectTile(abItem.id)} />
                  </div>
                </div>
              ))
            }
          </div>
          <div className="mt-1 border-t-4 border-blue-200"></div>
          <div className="flex justify-between mx-2 my-4 text-white">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="font-fancy mx-1">{bank.length}</p>
            </div>
            <button className="border-2 border-white rounded-md py-1 font-fancy text-white flex-1 mx-12 hover:opacity-75">
              DONE
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
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
