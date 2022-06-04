import { sample, take } from "lodash";

function getRandomEmptySpot(board) {
  const emptySpots = board.filter((item) => !item.occupyingTile);
  return sample(emptySpots);
}

function getRandomAvailableBankTile(bank) {
  const availableBank = take(bank, 6);
  return sample(availableBank);
}

export default function transition_ignoramus({ board, bank, turnFor }) {
  const newBoard = JSON.parse(JSON.stringify(board));
  const boardBuffer = newBoard.flat();

  // by default, choose a random bank tile
  let targetBankTile = getRandomAvailableBankTile(bank);

  // just place a random bank tile on a random spot cause I'm stupid
  const randomSpot = getRandomEmptySpot(boardBuffer);
  newBoard[randomSpot.y][randomSpot.x].occupyingTile = targetBankTile.id;

  return {
    newBoard,
    newBank: bank.filter((item) => item.id !== targetBankTile.id),
    newTurnFor: turnFor === "colors" ? "animals" : "colors",
  };
}
