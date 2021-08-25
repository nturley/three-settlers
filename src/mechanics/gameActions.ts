import type { GameState, Player } from './gameState';
import type { Vec3Tuple } from '../geometry';
import { placeSettlement, validFreeSettlePosition } from './settling';
import { validRoad } from './roads';

export function onGrassClick(pos: Vec3Tuple, gameState: GameState): GameState {
  if (gameState.phase === 'Free Settlement 1') {
    if (!validFreeSettlePosition(pos, gameState)) return gameState;
    gameState = placeSettlement(pos, gameState);
    return { ...gameState, phase: 'Free Road 1 to', fromPoint: pos };
  }
  if (gameState.phase === 'Free Road 1 to') {
    const fromPoint: Vec3Tuple = gameState.fromPoint as Vec3Tuple;
    if (!validRoad(pos, gameState)) return gameState;
  }
  return gameState;
}

export function advancePlayerTurn(
  gameState: GameState,
  setGameState: (gs: GameState) => void,
): Player {
  const playerIndex = gameState.players.findIndex(
    (p) => p === gameState.whoseTurn,
  );
  const nextPlayer =
    gameState.players[(playerIndex + 1) % gameState.players.length];
  setGameState({
    ...gameState,
    whoseTurn: nextPlayer,
  });
  return nextPlayer;
}
