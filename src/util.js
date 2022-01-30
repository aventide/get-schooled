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

}