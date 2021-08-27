import {hexDistance} from "../geometry.js";
export function placeSettlement(pos, gameState) {
  const newSettlement = {
    isCity: false,
    owner: gameState.whoseTurn,
    pos
  };
  gameState.whoseTurn.settlements.push(newSettlement);
  return {
    ...gameState,
    settlements: [...gameState.settlements, newSettlement]
  };
}
export function validFreeSettlePosition(pos, gameState) {
  return !gameState.settlements.find((s) => hexDistance(s.pos, pos) < 2);
}
