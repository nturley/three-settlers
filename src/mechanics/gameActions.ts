import type { GameState, Player } from './gameState';
import type { Vec3Tuple } from '../geometry';
import { placeSettlement, validFreeSettlePosition } from './settling';
import { placeRoad, validFreeRoad } from './roads';

export function onGrassClick(pos: Vec3Tuple, gameState: GameState): GameState {
  if (gameState.phase === 'Free Settlement') {
    if (!validFreeSettlePosition(pos, gameState)) return gameState;
    console.log('place settlement');
    gameState = placeSettlement(pos, gameState);
    console.log('time to place a road');
    return { ...gameState, phase: 'Free Road', fromPoint: pos };
  }
  if (gameState.phase === 'Free Road') {
    if (!validFreeRoad(pos, gameState)) return gameState;
    console.log('place road...');
    gameState = placeRoad(pos, gameState);
    gameState.fromPoint = undefined;

    const nextPlayer = findNextPlayer(gameState);
    const prevPlayer = findPrevPlayer(gameState);
    console.log('next player = ', nextPlayer.name);
    console.log('prev player = ', prevPlayer.name);
    if (nextPlayer.settlements.length == 0) {
      gameState.whoseTurn = nextPlayer;
      console.log('free settlement phase');
      gameState.phase = 'Free Settlement';
      return gameState;
    }
    if (gameState.whoseTurn.settlements.length == 1) {
      gameState.phase = 'Free Settlement';
      console.log('place a second settlement');
      return gameState;
    }
    if (prevPlayer.settlements.length < 2) {
      gameState.phase = 'Free Settlement';
      gameState.whoseTurn = prevPlayer;
      return gameState;
    }
    console.log('roll dice');
    gameState.phase = 'Trade';
  }
  return gameState;
}

export function findNextPlayer(gameState: GameState): Player {
  const playerIndex = gameState.players.findIndex(
    (p) => p === gameState.whoseTurn,
  );
  const nextPlayer =
    gameState.players[(playerIndex + 1) % gameState.players.length];
  return nextPlayer;
}

export function findPrevPlayer(gameState: GameState): Player {
  const playerIndex = gameState.players.findIndex(
    (p) => p === gameState.whoseTurn,
  );
  const nextPlayer =
    gameState.players[
      playerIndex == 0 ? gameState.players.length - 1 : playerIndex - 1
    ];
  return nextPlayer;
}
