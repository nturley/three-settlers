import { hexDistance, Vec3Tuple } from '../geometry';
import type { GameState, Road } from './gameState';

export function validRoadAnchor(pos: Vec3Tuple, gameState: GameState): boolean {
  if (
    gameState.whoseTurn.settlements.find(
      (s) => s.pos.toString() == pos.toString(),
    )
  )
    return true;
  if (
    gameState.whoseTurn.roads.find((r) =>
      r.pos.map((p) => p.toString()).includes(pos.toString()),
    )
  )
    return true;
  return false;
}

export function validFreeRoad(pos: Vec3Tuple, gameState: GameState): boolean {
  const fromPoint = gameState.fromPoint;
  if (fromPoint === undefined) return false;
  const settlements = gameState.whoseTurn.settlements;
  if (hexDistance(settlements[settlements.length - 1].pos, pos) != 1)
    return false;
  return true;
}

export function placeRoad(pos: Vec3Tuple, gameState: GameState): GameState {
  if (gameState.fromPoint === undefined)
    throw new Error('from point undefined');
  const newRoad: Road = {
    owner: gameState.whoseTurn,
    pos: [gameState.fromPoint, pos],
  };
  gameState.roads.push(newRoad);
  gameState.whoseTurn.roads.push(newRoad);
  return gameState;
}
