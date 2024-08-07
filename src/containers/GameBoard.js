import { useState, useEffect } from "react";
import { shuffle, take } from "lodash";

import BoardFooter from "../components/BoardFooter";

import {
  generateInitialBoard,
  generateTileSet,
  getLegalMoveSpaces,
  calculateScore,
} from "../util";

// https://www.svgrepo.com/

import Tile from "../components/Tile";
import BankTile from "../components/BankTile";

// the entire set of tiles. 36 of them.
// generate by fitting every animal/color combo, and setting a unique id
// @todo honestly make this global. It only gets generated once and it's static.
const tileSet = generateTileSet();

function GameBoard({ initialTurnFor, localPlayer, onTransition, BoardHeader }) {
  const [board, setBoard] = useState(generateInitialBoard());
  const [targetTile, setTargetTile] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [hasPlaced, setHasPlaced] = useState(false);
  const [bank, setBank] = useState(shuffle(Object.values(tileSet)));
  const [availableBank, setAvailableBank] = useState([]);
  const [legalMoveSpots, setLegalMoveSpots] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scores, setScores] = useState({
    color: 0,
    animal: 0,
  });

  const [boardSettings, setBoardSettings] = useState({
    isConfirmMovesMode: true,
  });

  const [turnFor, setTurnFor] = useState(initialTurnFor);
  const [actionSequence, setActionSequence] = useState([
    {
      board,
      bank,
      turnFor,
      highlights: {
        placedSpace: null,
        movedFromSpace: null,
        movedToSpace: null,
      },
    },
  ]);

  useEffect(() => {
    setAvailableBank(take(bank, 6));
  }, [bank]);

  useEffect(() => {
    setScores({
      animal: calculateScore(board, "animal"),
      color: calculateScore(board, "color"),
    });
  }, [board]);

  useEffect(() => {
    if (hasPlaced && !boardSettings.isConfirmMovesMode) {
      const toggledTurnFor = turnFor === "colors" ? "animals" : "colors";
      applyTurnChange(toggledTurnFor);
    }
  }, [hasPlaced, boardSettings.isConfirmMovesMode]); // eslint-disable-line

  useEffect(() => {
    if (actionSequence.length === 1 && localPlayer !== turnFor) {
      applyTurnChange(turnFor);
    }
  }, [localPlayer, actionSequence]);

  function applyTurnChange(nextTurnFor) {
    setTurnFor(nextTurnFor);
    setHasMoved(false);
    setHasPlaced(false);
    if (onTransition) {
      setIsTransitioning(true);
      setTimeout(() => {
        const { newBoard, newBank, newTurnFor, newHighlights } = onTransition({
          board,
          bank,
          turnFor: nextTurnFor,
        });
        setBoard(newBoard);
        setBank(newBank);
        setTurnFor(newTurnFor);
        setActionSequence([
          ...actionSequence,
          {
            board: newBoard,
            bank: newBank,
            turnFor: newTurnFor,
            highlights: newHighlights,
          },
        ]);
        setIsTransitioning(false);
      }, 1000);
    }
  }

  function handlePlaceTile(x, y) {
    if (hasPlaced) {
      return;
    }

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
      // @todo I hate this so much. Let's use an immutability library perhaps?
      const newBoard = JSON.parse(JSON.stringify(board));
      let newBank = JSON.parse(JSON.stringify(bank));

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
        newBank = bank.filter((item) => item.id !== targetTile);
        setBank(newBank);
        setHasPlaced(true);
      } else {
        setHasMoved(true);
      }
      setActionSequence([
        ...actionSequence,
        {
          board: newBoard,
          bank: newBank,
          turnFor,
        },
      ]);
    }
  }

  function handleSelectBoardTile(id) {
    if (!hasMoved) {
      handleSelectTile(id);
    }
  }

  function handleSelectTile(id) {
    if (hasPlaced) {
      return;
    }

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
        setLegalMoveSpots(getLegalMoveSpaces(board, boardTargetTile));
      }
      setTargetTile(id);
    }
  }

  function handleConfirmAction() {
    const nextTurnFor = turnFor === "colors" ? "animals" : "colors";
    applyTurnChange(nextTurnFor);
  }

  function handleCancelAction() {
    const newActionSequence = actionSequence.slice(0, -1);

    setBoard(newActionSequence[newActionSequence.length - 1].board);
    setBank(newActionSequence[newActionSequence.length - 1].bank);

    if (!(hasMoved && hasPlaced)) {
      setHasMoved(false);
    }
    setHasPlaced(false);
    setActionSequence(newActionSequence);
  }

  return (
    <>
      <BoardHeader scores={scores} turnFor={turnFor} />

      <div
        className={`mt-2 w-full border-8 border-blue-300 rounded-md bg-blue-300 grid grid-cols-6 grid-rows-6 cursor-pointer gap-1 ${
          isTransitioning ? "pointer-events-none" : "pointer-events-auto"
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
                    actionSequence[actionSequence.length - 1]?.highlights
                      ?.placedSpace?.occupyingTile === boardTile.occupyingTile
                  ? "bg-yellow-200 animate-pulse-fast animate-once"
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

      <div className={`mt-2 flex flex-row justify-center w-full flex-1`}>
        <div
          className={`w-full border-8 border-blue-300 rounded-md bg-blue-300`}
        >
          <div
            className={`grid grid-cols-6 grid-rows-1 gap-1 ${
              isTransitioning
                ? "pointer-events-none cursor-pointer"
                : "pointer-events-auto cursor-pointer"
            }`}
          >
            {availableBank.map((abItem, abIndex) => (
              <div
                className={
                  abItem.id !== targetTile ? "" : "bg-orange-200 rounded-md"
                }
                key={abItem.id}
              >
                <div
                  className={
                    abItem.id !== targetTile ? "" : "animate-pulse-slow"
                  }
                >
                  {!hasPlaced || abIndex !== 5 ? (
                    <BankTile
                      animal={abItem.animal}
                      color={abItem.color}
                      onSelect={() => handleSelectTile(abItem.id)}
                    />
                  ) : (
                    <BankTile mystery />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-1 border-t-4 border-blue-200" />
          <BoardFooter
            bankSize={bank.length}
            settings={boardSettings}
            onSettingsChanged={(newSettings) => setBoardSettings(newSettings)}
            hasMoved={hasMoved}
            hasPlaced={hasPlaced}
            onConfirmMove={handleConfirmAction}
            onCancelMove={handleCancelAction}
          />
        </div>
      </div>
    </>
  );
}

export default GameBoard;
