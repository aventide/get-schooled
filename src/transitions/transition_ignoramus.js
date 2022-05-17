import { sample, take } from "lodash";

function getRandomEmptySpot(board) {
  const emptySpots = board.flat().filter((item) => !item.occupyingTile);
  const randomTile = sample(emptySpots);
  return randomTile;
}

function getRandomAvailableBankTile(bank) {
  const availableBank = take(bank, 6);
  return bank[(Math.floor(Math.random() * 10) % availableBank.length) + 1];
}

export default function transition_ignoramus({ board, bank, turnFor }) {
  let newBoard = board;
  let newBank = bank;

  const boardCopy = JSON.parse(JSON.stringify(board));
  const flattenedBoard = boardCopy.flat();

  // if this is the first move
  if (true || !flattenedBoard.length) {
    // first, choose a random bank tile
    const targetBankTile = getRandomAvailableBankTile(bank);
    const randomSpot = getRandomEmptySpot(board);

    // place it somewhere random
    boardCopy[randomSpot.y][randomSpot.x].occupyingTile = targetBankTile.id;
    newBoard = boardCopy;
    newBank = bank.filter((item) => item.id !== targetBankTile.id);
  }

  return {
    newBoard,
    newBank,
    newTurnFor: turnFor === "colors" ? "animals" : "colors",
  };
}
