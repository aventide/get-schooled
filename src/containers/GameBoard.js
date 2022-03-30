import { useState, useEffect } from "react";
import { shuffle, take } from "lodash";

import BoardHeader from "../components/BoardHeader";
import BoardFooter from "../components/BoardFooter";

import { getLegalMoveSpots, calculateScore } from "../util";

// https://www.svgrepo.com/

import Tile from "../components/Tile";
import BankTile from "../components/BankTile";
import { COLORS, ANIMALS } from "../constants";

function generateInitialBoard() {
  const board = [];
  for (let y = 0; y < 6; y++) {
    const row = [];
    for (let x = 0; x < 6; x++) {
      row.push({
        x,
        y,
      });
    }
    board.push(row);
  }

  return board;
}

function generateTileSet() {
  const tileSet = {};
  let counter = 1;

  COLORS.forEach((color) => {
    ANIMALS.forEach((animal) => {
      tileSet[counter] = {
        animal,
        color,
        id: counter,
      };
      counter++;
    });
  });
  return tileSet;
}

// the entire set of tiles. 36 of them.
// generate by fitting every animal/color combo, and setting a unique id
const tileSet = generateTileSet();

function GameBoard({ onBack }) {
  const [board, setBoard] = useState(generateInitialBoard());
  const [targetTile, setTargetTile] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [bank, setBank] = useState(shuffle(Object.values(tileSet)));
  const [availableBank, setAvailableBank] = useState([]);
  const [legalMoveSpots, setLegalMoveSpots] = useState([]);
  const [scores, setScores] = useState({
    color: 0,
    animal: 0,
  });

  const [boardSettings, setBoardSettings] = useState({
    isTableTopMode: false,
    isConfirmMovesMode: true,
  });

  const [turnFor, setTurnFor] = useState(
    Math.random() < 0.5 ? "animals" : "colors"
  );

  useEffect(() => {
    setAvailableBank(take(bank, 6));
  }, [bank]);

  useEffect(() => {
    setScores({
      animal: calculateScore(tileSet, board, "animal"),
      color: calculateScore(tileSet, board, "color"),
    });
  }, [hasMoved, turnFor, board]);

  function toggleTurnFor() {
    setTurnFor(turnFor === "colors" ? "animals" : "colors");
    setHasMoved(false);
  }

  function handlePlaceTile(x, y) {
    // addressed column-first
    const spotToPlace = board[y][x];
    const isSpotOccupied = spotToPlace["occupyingTile"];
    const isLegalMove = legalMoveSpots.some(
      (spot) => spot.x === x && spot.y === y
    );

    // before we do any deletion or adding, make sure we have a tile to place, and it's
    // going in a legal spot

    // if we ARE moving, make sure it's being done legally
    const isDoingLegalMove = !isMoving || isLegalMove;

    if (targetTile && !isSpotOccupied && isDoingLegalMove) {
      const newBoard = board;

      // delete any duplicates of tiles, i.e. in a tile move
      const alreadyPlacedTargetTile = newBoard
        .flat()
        .find((item) => item.occupyingTile === targetTile);
      if (alreadyPlacedTargetTile) {
        alreadyPlacedTargetTile.occupyingTile = null;
      }

      // addressed column-first
      newBoard[y][x]["occupyingTile"] = targetTile;

      setTargetTile(null);
      setBoard(newBoard);
      setIsMoving(false);
      setLegalMoveSpots([]);

      if (!isMoving) {
        toggleTurnFor();
        setBank(bank.filter((item) => item.id !== targetTile));
      } else {
        setHasMoved(true);
      }
    }
  }

  function handleSelectBoardTile(id) {
    if (!hasMoved) {
      handleSelectTile(id);
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
      const boardTargetTile = board
        .flat()
        .find((item) => item.occupyingTile === id);
      if (boardTargetTile) {
        setIsMoving(true);
        setLegalMoveSpots(getLegalMoveSpots(board, boardTargetTile));
      }
      setTargetTile(id);
    }
  }

  const { isTableTopMode } = boardSettings;

  return (
    <>
      <BoardHeader
        isTableTopMode={isTableTopMode}
        scores={scores}
        turnFor={turnFor}
        onBack={onBack}
      />

      <div
        className={`mt-4 w-full ${
          isTableTopMode ? "md:w-4/5" : "md:w-3/5 lg:w-2/5"
        } border-8 border-blue-300 rounded-md bg-blue-300 grid grid-cols-6 grid-rows-6 cursor-pointer ${
          isTableTopMode ? "gap-2" : "gap-1"
        }`}
      >
        {board.flat().map((boardTile) => {
          const isLegalMoveTile = legalMoveSpots.find(
            (spot) => spot.x === boardTile.x && spot.y === boardTile.y
          );
          const showPlacementDot =
            isLegalMoveTile ||
            (!boardTile.occupyingTile && targetTile && !isMoving);
          return (
            <div
              className={`group ${
                showPlacementDot
                  ? "bg-blue-400"
                  : boardTile.occupyingTile &&
                    boardTile.occupyingTile === targetTile
                  ? "bg-orange-200"
                  : "bg-blue-200"
              } hover:bg-orange-200 aspect-square`}
              onClick={() => handlePlaceTile(boardTile.x, boardTile.y)}
            >
              {boardTile.occupyingTile && (
                <div
                  className={
                    boardTile.occupyingTile === targetTile
                      ? "animate-pulse-slow"
                      : ""
                  }
                >
                  <Tile
                    animal={tileSet[boardTile.occupyingTile].animal}
                    color={tileSet[boardTile.occupyingTile].color}
                    onSelect={() =>
                      handleSelectBoardTile(boardTile.occupyingTile)
                    }
                  />
                </div>
              )}
              {showPlacementDot && (
                <div className="h-full w-full flex justify-center items-center">
                  <svg height="20" width="20" className="fill-blue-100">
                    <circle cx="10" cy="10" r="5" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        className={`mt-4 flex flex-row justify-center w-full ${
          isTableTopMode ? "md:w-4/5" : "md:w-3/5 lg:w-2/5"
        } flex-1`}
      >
        <div
          className={`w-full border-8 border-blue-300 rounded-md bg-blue-300 cursor-pointer`}
        >
          <div className="grid grid-cols-6 grid-rows-1 gap-1">
            {availableBank.map((abItem) => (
              <div
                className={
                  abItem.id !== targetTile ? "" : "bg-orange-200 rounded-md"
                }
              >
                <div
                  className={
                    abItem.id !== targetTile ? "" : "animate-pulse-slow"
                  }
                >
                  <BankTile
                    animal={abItem.animal}
                    color={abItem.color}
                    onSelect={() => handleSelectTile(abItem.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-1 border-t-4 border-blue-200"></div>
          <BoardFooter
            bankSize={bank.length}
            settings={boardSettings}
            onSettingsChanged={(newSettings) => setBoardSettings(newSettings)}
          />
        </div>
      </div>
      {/* <div className="h-20 w-20 fixed translate-x-5 translate-y-screen group-hover:-translate-y-screen ease-linear duration-10000">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div> */}
    </>
  );
}

export default GameBoard;
