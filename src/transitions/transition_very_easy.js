import { sample, take, uniqBy } from "lodash";

import { getMatchGroups } from "../util";

function getRandomEmptySpot(boardBuffer) {
  const emptySpots = boardBuffer.filter((item) => !item.occupyingTile);
  return sample(emptySpots);
}

function getRandomAvailableBankTile(bank) {
  const availableBank = take(bank, 6);
  return sample(availableBank);
}

// get all present variants in all matchGroups for given matchType
function getBoardMatchTypeVariants(matchGroups, matchType) {
  const allMatchTiles = matchGroups.flat();
  const uniqueMatchTypes = uniqBy(allMatchTiles, matchType).map(
    (mt) => mt[matchType]
  );

  return uniqueMatchTypes;
}

function getMatchingBankTilesForBoardVariants(matchGroups, matchType, bank) {
  const availableBank = take(bank, 6);
  const matchTypeVariants = getBoardMatchTypeVariants(matchGroups, matchType);

  const matchingBankTiles = availableBank.filter((bankTile) =>
    matchTypeVariants.includes(bankTile[matchType])
  );

  return matchingBankTiles;
}

export default function transition_very_easy({ board, bank, turnFor }) {
  const newBoard = JSON.parse(JSON.stringify(board));
  const boardBuffer = newBoard.flat();
  const matchType = turnFor === "animals" ? "animal" : "color";
  const matchGroups = getMatchGroups(boardBuffer, matchType);

  // // by default, choose a random bank tile
  let targetBankTile = getRandomAvailableBankTile(bank);

  const matchingBankTilesForVariants = getMatchingBankTilesForBoardVariants(
    matchGroups,
    matchType,
    bank
  );

  // this seems to work, but isn't helpful if the groups are totally surrounded
  // maybe make a variant of this function that only returns the group if at least one space is free

  // therefore, need a function getFreeTilesAroundGroup();

  // // if this is the first move, just place a random bank tile on a random spot
  // if (true || !matchingBankTilesForVariants.length) {
  //   const randomSpot = getRandomEmptySpot(boardBuffer);
  //   newBoard[randomSpot.y][randomSpot.x].occupyingTile = targetBankTile.id;
  // } else {
  // }

  return {
    newBoard,
    newBank: bank.filter((item) => item.id !== targetBankTile.id),
    newTurnFor: turnFor === "colors" ? "animals" : "colors",
  };
}
