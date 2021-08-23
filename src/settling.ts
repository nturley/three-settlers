import type { GameState, Settlement } from './gameState';
import { hexDistance, Vec3Tuple } from './geometry';

export function placeSettlement(
  pos: Vec3Tuple,
  gameState: GameState,
  setGameState: (gs: GameState) => void,
) {
  const playerIndex = gameState.players.findIndex(
    (p) => p === gameState.whoseTurn,
  );
  const nextPlayer =
    gameState.players[(playerIndex + 1) % gameState.players.length];
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
  setGameState({
    ...gameState,
    settlements: [...gameState.settlements, newSettlement],
    players,
    whoseTurn: nextPlayer,
  });
}

export function validFreeSettlePosition(
  pos: Vec3Tuple,
  gameState: GameState,
): boolean {
  return !gameState.settlements.find((s) => hexDistance(s.pos, pos) < 2);
}
