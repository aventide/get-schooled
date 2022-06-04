import { COLORS, ANIMALS } from "./constants";

export function generateTileSet() {
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

export function generateInitialBoard() {
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

export function getLegalMoveSpots(board, boardSpot) {
  const legalMoves = [];

  // are there spots above?
  if (boardSpot.y > 0) {
    for (let y = boardSpot.y - 1; y >= 0; y--) {
      if (board[y][boardSpot.x].occupyingTile) {
        break;
      } else {
        legalMoves.push({ x: boardSpot.x, y });
      }
    }
  }

  // // are there spots below?
  if (boardSpot.y < 5) {
    for (let y = boardSpot.y + 1; y < 6; y++) {
      if (board[y][boardSpot.x].occupyingTile) {
        break;
      } else {
        legalMoves.push({ x: boardSpot.x, y });
      }
    }
  }

  // // are there spots to the right?
  if (boardSpot.x < 5) {
    for (let x = boardSpot.x + 1; x < 6; x++) {
      if (board[boardSpot.y][x].occupyingTile) {
        break;
      } else {
        legalMoves.push({ x, y: boardSpot.y });
      }
    }
  }

  // are there spots to the left?
  if (boardSpot.x > 0) {
    for (let x = boardSpot.x - 1; x >= 0; x--) {
      if (board[boardSpot.y][x].occupyingTile) {
        break;
      } else {
        legalMoves.push({ x, y: boardSpot.y });
      }
    }
  }

  return legalMoves;
}

export function calculateScore(tileSet, board, matchType) {
  const matchGroups = getMatchGroups(tileSet, board, matchType);
  return matchGroups.reduce(
    (totalScore, matchGroup) =>
      totalScore + getScoreForMatches(matchGroup.length),
    0
  );
}

export function getMatchGroups(tileSet, board, matchType) {
  const boardCopy = JSON.parse(JSON.stringify(board));
  const matchGroups = [];
  let filteredBoard = boardCopy
    .flat()
    .filter((item) => item.occupyingTile)
    .map((item) => {
      const { x, y } = item;
      return {
        x,
        y,
        id: item.occupyingTile,
      };
    });

  while (filteredBoard.length > 0) {
    const tileToEval = filteredBoard[0];

    if (filteredBoard.length > 0) {
      const matches = getMatches(tileSet, filteredBoard, tileToEval, matchType);
      matchGroups.push(matches);
      filteredBoard = filteredBoard.filter(
        (boardItem) => !matches.some((item) => item.id === boardItem.id)
      );
    }
  }

  return matchGroups;
}

// get adjacent tiles within the board for a given tile
// check up, down, left, right
export function getAdjacentTiles(board, tile) {
  const upCheck = board.find(
    (boardTile) => boardTile.x === tile.x && boardTile.y === tile.y - 1
  );
  const downCheck = board.find(
    (boardTile) => boardTile.x === tile.x && boardTile.y === tile.y + 1
  );
  const leftCheck = board.find(
    (boardTile) => boardTile.x === tile.x - 1 && boardTile.y === tile.y
  );
  const rightCheck = board.find(
    (boardTile) => boardTile.x === tile.x + 1 && boardTile.y === tile.y
  );

  return [upCheck, downCheck, leftCheck, rightCheck].filter((exists) => exists);
}

function getMatches(tileSet, board, spot, matchType) {
  const compare = tileSet[spot.id][matchType];
  const matchPool = [tileSet[spot.id]];
  let checkPool = [spot.id];

  while (checkPool.length > 0) {
    const currentCheckItem = checkPool[0];
    const currentCheckSquare = board.find(
      (item) => item.id === currentCheckItem
    );

    const checks = getAdjacentTiles(board, currentCheckSquare);

    checks.forEach((check) => {
      if (
        !matchPool.some((poolItem) => poolItem.id === check.id) &&
        tileSet[check.id][matchType] === compare
      ) {
        matchPool.push(tileSet[check.id]);
        checkPool.push(check.id);
      }
    });

    checkPool = checkPool.filter((entry) => entry !== currentCheckItem);
  }

  return matchPool;
}

export function getScoreForMatches(numberOfMatches) {
  switch (numberOfMatches) {
    case 0:
    case 1:
      return 0;
    case 2:
      return 1;
    case 3:
      return 3;
    case 4:
      return 6;
    case 5:
      return 10;
    case 6:
      return 15;
    default:
      return 0;
  }
}
