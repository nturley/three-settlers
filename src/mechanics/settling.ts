import type { GameState, Settlement } from './gameState';
import { hexDistance, Vec3Tuple } from '../geometry';

export function placeSettlement(
  pos: Vec3Tuple,
  gameState: GameState,
): GameState {
  const newSettlement: Settlement = {
    isCity: false,
    owner: gameState.whoseTurn,
    pos,
  };
  gameState.whoseTurn.settlements.push(newSettlement);
  return {
    ...gameState,
    settlements: [...gameState.settlements, newSettlement],
  };
}

export function validFreeSettlePosition(
  pos: Vec3Tuple,
  gameState: GameState,
): boolean {
  return !gameState.settlements.find((s) => hexDistance(s.pos, pos) < 2);
}
