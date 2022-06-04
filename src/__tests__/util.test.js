import { getScoreForMatches, generateTileSet } from "../util";

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

  describe("getScoreForMatches util", () => {
    const matchCounts = [0, 1, 2, 3, 4, 5, 6];
    const expectedScores = [0, 0, 1, 3, 6, 10, 15];

    it("gets correct score for each potential match count", () => {
      expect(matchCounts.map(getScoreForMatches)).toEqual(expectedScores);
    });
  });
});
