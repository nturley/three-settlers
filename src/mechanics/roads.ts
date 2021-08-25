import { hexDistance, Vec3Tuple } from 'src/geometry';
import type { GameState } from './gameState';

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

export function validRoad(pos: Vec3Tuple, gameState: GameState): boolean {
  const fromPoint = gameState.fromPoint;
  if (fromPoint === undefined) return false;
  if (hexDistance(gameState.whoseTurn.settlements[0].pos, pos) != 1)
    return false;
  return true;
}
