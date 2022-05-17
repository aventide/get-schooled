import { sample, take } from "lodash";

function getRandomEmptySpot(board) {
  const emptySpots = board.flat().filter((item) => !item.occupyingTile);
  return sample(emptySpots);
}

function getRandomAvailableBankTile(bank) {
  const availableBank = take(bank, 6);
  return sample(availableBank);
}

export default function transition_ignoramus({ board, bank, turnFor }) {
  const newBoard = JSON.parse(JSON.stringify(board));
  const flattenedBoard = newBoard.flat();

  // by default, choose a random bank tile
  let targetBankTile = getRandomAvailableBankTile(bank);

  // if this is the first move, just place a random bank tile on a random spot
  if (true || !flattenedBoard.length) {
    const randomSpot = getRandomEmptySpot(board);
    newBoard[randomSpot.y][randomSpot.x].occupyingTile = targetBankTile.id;
  }

  return {
    newBoard,
    newBank: bank.filter((item) => item.id !== targetBankTile.id),
    newTurnFor: turnFor === "colors" ? "animals" : "colors",
  };
}
