import {hexDistance} from "../geometry.js";
export function validRoadAnchor(pos, gameState) {
  if (gameState.whoseTurn.settlements.find((s) => s.pos.toString() == pos.toString()))
    return true;
  if (gameState.whoseTurn.roads.find((r) => r.pos.map((p) => p.toString()).includes(pos.toString())))
    return true;
  return false;
}
export function validFreeRoad(pos, gameState) {
  const fromPoint = gameState.fromPoint;
  if (fromPoint === void 0)
    return false;
  const settlements = gameState.whoseTurn.settlements;
  if (hexDistance(settlements[settlements.length - 1].pos, pos) != 1)
    return false;
  return true;
}
export function placeRoad(pos, gameState) {
  if (gameState.fromPoint === void 0)
    throw new Error("from point undefined");
  const newRoad = {
    owner: gameState.whoseTurn,
    pos: [gameState.fromPoint, pos]
  };
  gameState.roads.push(newRoad);
  gameState.whoseTurn.roads.push(newRoad);
  return gameState;
}
