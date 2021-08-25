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
  const players = gameState.players.map((p) =>
    gameState.whoseTurn == p
      ? { ...p, settlements: [...p.settlements, newSettlement] }
      : p,
  );
  return {
    ...gameState,
    settlements: [...gameState.settlements, newSettlement],
    players,
  };
}

export function validFreeSettlePosition(
  pos: Vec3Tuple,
  gameState: GameState,
): boolean {
  return !gameState.settlements.find((s) => hexDistance(s.pos, pos) < 2);
}
