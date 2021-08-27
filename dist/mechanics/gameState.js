import {generateTiles} from "../tiles.js";
export function fakeGameState() {
  const player = {
    name: "Bill",
    color: "white",
    cards: [],
    settlements: [],
    roads: [],
    resources: {
      wheat: 0,
      bricks: 0,
      sheep: 0,
      ore: 0,
      wood: 0
    }
  };
  const player2 = {
    name: "Jorge",
    color: "green",
    cards: [],
    settlements: [],
    roads: [],
    resources: {
      wheat: 0,
      bricks: 0,
      sheep: 0,
      ore: 0,
      wood: 0
    }
  };
  return {
    players: [player, player2],
    cardDeck: [],
    phase: "Free Settlement",
    tiles: generateTiles(),
    whoseTurn: player,
    settlements: [],
    roads: [],
    fromPoint: void 0
  };
}
