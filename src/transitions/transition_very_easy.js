import { sample, take, uniqBy } from "lodash";

import { getMatchGroups, getSpacesAroundGroup } from "../util";

function getRandomEmptySpot(boardBuffer) {
  const emptySpots = boardBuffer.filter((item) => !item.occupyingTile);
  return sample(emptySpots);
}

function getRandomAvailableBankTile(bank) {
  const availableBank = take(bank, 6);
  return sample(availableBank);
}

// get all present variants in all matchGroups for given matchType
function getMatchVariants(matchGroups, matchType) {
  const allMatchTiles = matchGroups.flat();
  const uniqueMatchTypes = uniqBy(allMatchTiles, matchType).map(
    (mt) => mt[matchType]
  );

  return uniqueMatchTypes;
}

function getBankTilesByVariants(matchType, matchVariants, bank) {
  const availableBank = take(bank, 6);

  const matchingBankTiles = availableBank.filter((bankTile) =>
    matchVariants.includes(bankTile[matchType])
  );

  return matchingBankTiles;
}

export default function transition_very_easy({ board, bank, turnFor }) {
  const newBoard = JSON.parse(JSON.stringify(board));
  const boardBuffer = newBoard.flat();
  const matchType = turnFor === "animals" ? "animal" : "color";
  const matchGroups = getMatchGroups(boardBuffer, matchType);
  const matchVariants = getMatchVariants(matchGroups, matchType);

  // by default, choose a random bank tile
  let targetBankTile = getRandomAvailableBankTile(bank);

  const bankTilesByVariants = getBankTilesByVariants(
    matchType,
    matchVariants,
    bank
  );

  // @todo WOW PLEASE CLEAN THIS UP, JEEZ

  // just fyi, there are redundant values in here
  const bankMatchedVariants = bankTilesByVariants.map((bt) => bt[matchType]);

  // // if this is the first move, just place a random bank tile on a random spot
  if (!bankTilesByVariants.length) {
    const randomSpot = getRandomEmptySpot(boardBuffer);
    newBoard[randomSpot.y][randomSpot.x].occupyingTile = targetBankTile.id;
  } else {
    const bankMatchedGroups = matchGroups.filter(
      (mg) =>
        bankMatchedVariants.includes(mg[0][matchType]) &&
        getSpacesAroundGroup(boardBuffer, mg).length > 0
    );
    const largestBMG = bankMatchedGroups.reduce(
      (bmg, largest) => (bmg.length > largest.length ? bmg : largest),
      []
    );

    if (!largestBMG || !largestBMG.length) {
      // here we would revert to using random placement
      const randomSpot = getRandomEmptySpot(boardBuffer);
      newBoard[randomSpot.y][randomSpot.x].occupyingTile = targetBankTile.id;
    } else {
      const largestBMGSpaces = getSpacesAroundGroup(boardBuffer, largestBMG);
      const randomOfSpaces = sample(largestBMGSpaces);
      const availableBank = take(bank, 6);
      targetBankTile = availableBank.find(
        (bankItem) => bankItem[matchType] === largestBMG[0][matchType]
      );
      newBoard[randomOfSpaces.y][randomOfSpaces.x].occupyingTile =
        targetBankTile.id;
    }
  }

  return {
    newBoard,
    newBank: bank.filter((item) => item.id !== targetBankTile.id),
    newTurnFor: turnFor === "colors" ? "animals" : "colors",
  };
}
