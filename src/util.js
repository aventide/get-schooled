import { kebabCase, matches } from "lodash";

export function getLegalMoveSpots(board, boardSpot) {

    const legalMoves = [];

    // are there spots above?
    if (boardSpot.y > 0) {
        for (let y = boardSpot.y - 1; y >= 0; y--) {
            if (board[y][boardSpot.x].occupyingTile) {
                break;
            } else {
                legalMoves.push({ x: boardSpot.x, y })
            }
        }
    }

    // // are there spots below?
    if (boardSpot.y < 5) {
        for (let y = boardSpot.y + 1; y < 6; y++) {
            if (board[y][boardSpot.x].occupyingTile) {
                break;
            } else {
                legalMoves.push({ x: boardSpot.x, y })
            }
        }
    }

    // // are there spots to the right?
    if (boardSpot.x < 5) {
        for (let x = boardSpot.x + 1; x < 6; x++) {
            if (board[boardSpot.y][x].occupyingTile) {
                break;
            } else {
                legalMoves.push({ x, y: boardSpot.y })
            }
        }
    }

    // are there spots to the left?
    if (boardSpot.x > 0) {
        for (let x = boardSpot.x - 1; x >= 0; x--) {
            if (board[boardSpot.y][x].occupyingTile) {
                break;
            } else {
                legalMoves.push({ x, y: boardSpot.y })
            }
        }
    }

    return legalMoves;
}

export function calculateColorScore(tileSet, board) {

    const boardCopy = JSON.parse(JSON.stringify(board));
    let filteredBoard = boardCopy.flat().filter(item => item.occupyingTile).map(item => {
        const { x, y } = item;
        return {
            x,
            y,
            id: item.occupyingTile
        }
    })
    let score = 0;

    while (filteredBoard.length > 0) {
        const tileToEval = filteredBoard[0];
        console.log("evaluating tile: ", tileToEval)

        if (filteredBoard.length > 0) {
            const matches = getMatches(tileSet, filteredBoard, tileToEval)
            console.log("matches: ", matches);
            score += getScoreForMatches(matches.size);
            filteredBoard = filteredBoard.filter(item => !matches.has(item.id))
        }

        console.log("score now at: ", score)
        console.log("remaining tiles: ", JSON.parse(JSON.stringify(filteredBoard)))

    }

    return score;

};

function inBounds(x, y) {
    return x >= 0 && x < 6 && y >= 0 && y < 6;
}

function getMatches(tileSet, board, spot) {

    // const animal = tileSet[spot.occupyingTile].animal;
    const color = tileSet[spot.id].color;
    const matchPool = new Set([spot.id]);
    let checkPool = [spot.id];

    while (checkPool.length > 0) {

        const currentCheckItem = checkPool[0];
        const currentCheckSquare = board.find(item => item.id === currentCheckItem);

        const upCheck = board.find(item => item.x === currentCheckSquare.x && item.y === currentCheckSquare.y - 1)
        const downCheck = board.find(item => item.x === currentCheckSquare.x && item.y === currentCheckSquare.y + 1)
        const leftCheck = board.find(item => item.x === currentCheckSquare.x - 1 && item.y === currentCheckSquare.y)
        const rightCheck = board.find(item => item.x === currentCheckSquare.x + 1 && item.y === currentCheckSquare.y)

        const checks = [
            upCheck,
            downCheck,
            leftCheck,
            rightCheck
        ];

        checks.forEach(check => {
            if (check && !matchPool.has(check.id) && tileSet[check.id].color === color) {
                matchPool.add(check.id);
                checkPool.push(check.id);
            }
        })

        checkPool = checkPool.filter(entry => entry !== currentCheckItem)

    }

    return matchPool
}

function getScoreForMatches(numberOfMatches) {
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