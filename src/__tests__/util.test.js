import {
  getAdjacentSpaces,
  getScoreForMatches,
  generateTileSet,
  generateInitialBoard,
  getMatches,
  getMatchGroups,
} from "../util";

describe("util functions", () => {
  describe("generateTileSet util", () => {
    const expectedTileSet = {
      1: {
        animal: "crab",
        color: "#EAB6BD",
        id: 1,
      },
      2: {
        animal: "jellyfish",
        color: "#EAB6BD",
        id: 2,
      },
      3: {
        animal: "seahorse",
        color: "#EAB6BD",
        id: 3,
      },
      4: {
        animal: "starfish",
        color: "#EAB6BD",
        id: 4,
      },
      5: {
        animal: "turtle",
        color: "#EAB6BD",
        id: 5,
      },
      6: {
        animal: "fish",
        color: "#EAB6BD",
        id: 6,
      },
      7: {
        animal: "crab",
        color: "#D96E6C",
        id: 7,
      },
      8: {
        animal: "jellyfish",
        color: "#D96E6C",
        id: 8,
      },
      9: {
        animal: "seahorse",
        color: "#D96E6C",
        id: 9,
      },
      10: {
        animal: "starfish",
        color: "#D96E6C",
        id: 10,
      },
      11: {
        animal: "turtle",
        color: "#D96E6C",
        id: 11,
      },
      12: {
        animal: "fish",
        color: "#D96E6C",
        id: 12,
      },
      13: {
        animal: "crab",
        color: "#F7DE88",
        id: 13,
      },
      14: {
        animal: "jellyfish",
        color: "#F7DE88",
        id: 14,
      },
      15: {
        animal: "seahorse",
        color: "#F7DE88",
        id: 15,
      },
      16: {
        animal: "starfish",
        color: "#F7DE88",
        id: 16,
      },
      17: {
        animal: "turtle",
        color: "#F7DE88",
        id: 17,
      },
      18: {
        animal: "fish",
        color: "#F7DE88",
        id: 18,
      },
      19: {
        animal: "crab",
        color: "#A6D8D8",
        id: 19,
      },
      20: {
        animal: "jellyfish",
        color: "#A6D8D8",
        id: 20,
      },
      21: {
        animal: "seahorse",
        color: "#A6D8D8",
        id: 21,
      },
      22: {
        animal: "starfish",
        color: "#A6D8D8",
        id: 22,
      },
      23: {
        animal: "turtle",
        color: "#A6D8D8",
        id: 23,
      },
      24: {
        animal: "fish",
        color: "#A6D8D8",
        id: 24,
      },
      25: {
        animal: "crab",
        color: "#53B7DF",
        id: 25,
      },
      26: {
        animal: "jellyfish",
        color: "#53B7DF",
        id: 26,
      },
      27: {
        animal: "seahorse",
        color: "#53B7DF",
        id: 27,
      },
      28: {
        animal: "starfish",
        color: "#53B7DF",
        id: 28,
      },
      29: {
        animal: "turtle",
        color: "#53B7DF",
        id: 29,
      },
      30: {
        animal: "fish",
        color: "#53B7DF",
        id: 30,
      },
      31: {
        animal: "crab",
        color: "#9B9FDA",
        id: 31,
      },
      32: {
        animal: "jellyfish",
        color: "#9B9FDA",
        id: 32,
      },
      33: {
        animal: "seahorse",
        color: "#9B9FDA",
        id: 33,
      },
      34: {
        animal: "starfish",
        color: "#9B9FDA",
        id: 34,
      },
      35: {
        animal: "turtle",
        color: "#9B9FDA",
        id: 35,
      },
      36: {
        animal: "fish",
        color: "#9B9FDA",
        id: 36,
      },
    };

    it("tileset generates properly", () => {
      expect(generateTileSet()).toEqual(expectedTileSet);
    });
  });

  describe("getAdjacentSpaces util", () => {
    it("all adjacent spaces - middle of board", () => {
      const expectedAdjacentSpaces = [
        { x: 2, y: 1 },
        { x: 2, y: 3 },
        { x: 1, y: 2 },
        { x: 3, y: 2 },
      ];
      const board = generateInitialBoard();
      const boardBuffer = board.flat();
      expect(getAdjacentSpaces(boardBuffer, { x: 2, y: 2 })).toEqual(
        expectedAdjacentSpaces
      );
    });
    it("all adjacent spaces - top edge of board", () => {
      const expectedAdjacentSpaces = [
        { x: 4, y: 1 },
        { x: 3, y: 0 },
        { x: 5, y: 0 },
      ];
      const board = generateInitialBoard();
      const boardBuffer = board.flat();
      expect(getAdjacentSpaces(boardBuffer, { x: 4, y: 0 })).toEqual(
        expectedAdjacentSpaces
      );
    });
    it("all adjacent spaces - left edge of board", () => {
      const expectedAdjacentSpaces = [
        { x: 0, y: 2 },
        { x: 0, y: 4 },
        { x: 1, y: 3 },
      ];
      const board = generateInitialBoard();
      const boardBuffer = board.flat();
      expect(getAdjacentSpaces(boardBuffer, { x: 0, y: 3 })).toEqual(
        expectedAdjacentSpaces
      );
    });
  });

  // test getting all adjacent matches for given tile on board,
  // given the board, a tile, and what matchType to match on
  describe("getMatches util", () => {
    const tileSet = generateTileSet();

    it("matching colors - horizontal file", () => {
      const expectedMatched = [tileSet["27"], tileSet["26"], tileSet["25"]];
      const board = generateInitialBoard();
      board[3][3].occupyingTile = 25; // 53B7DF crab
      board[3][2].occupyingTile = 26; // 53B7DF jellyfish
      board[3][1].occupyingTile = 27; // 53B7DF seahorse
      const boardBuffer = board.flat();

      // @todo looks like x and y can be anything... only id matters?
      expect(getMatches(boardBuffer, { x: 1, y: 3, id: 27 }, "color")).toEqual(
        expectedMatched
      );
    });

    // test for vertical file
    // test for plus shape
    // test for rectangle shape
    // test for bizarre shape
  });

  describe("getMatchGroups util", () => {
    const tileSet = generateTileSet();

    it("matching animals - two groups of different animals that are touching", () => {
      const expectedMatchGroups = [
        [tileSet["17"], tileSet["11"]],
        [tileSet["16"], tileSet["10"], tileSet["4"]],
      ];
      const board = generateInitialBoard();
      board[3][3].occupyingTile = 4; // starfish
      board[3][2].occupyingTile = 10; // starfish
      board[3][1].occupyingTile = 16; // starfish

      board[2][2].occupyingTile = 11; // turtle
      board[2][1].occupyingTile = 17; // turtle
      const boardBuffer = board.flat();

      expect(getMatchGroups(boardBuffer, "animal")).toEqual(
        expectedMatchGroups
      );
    });
    it("matching animals - two groups of same animals that are not touching", () => {
      const expectedMatchGroups = [
        [tileSet["16"], tileSet["10"], tileSet["4"]],
        [tileSet["22"], tileSet["28"]],
      ];
      const board = generateInitialBoard();
      board[3][3].occupyingTile = 4; // starfish
      board[3][2].occupyingTile = 10; // starfish
      board[3][1].occupyingTile = 16; // starfish

      board[4][4].occupyingTile = 22; // starfish
      board[4][5].occupyingTile = 28; // starfish
      const boardBuffer = board.flat();

      expect(getMatchGroups(boardBuffer, "animal")).toEqual(
        expectedMatchGroups
      );
    });
  });

  describe("getScoreForMatches util", () => {
    const matchCounts = [0, 1, 2, 3, 4, 5, 6];
    const expectedScores = [0, 0, 1, 3, 6, 10, 15];

    it("gets correct score for each potential match count", () => {
      expect(matchCounts.map(getScoreForMatches)).toEqual(expectedScores);
    });

    it("gets score of zero for invalid input", () => {
      expect(getScoreForMatches("hello")).toEqual(0);
    });
  });
});
