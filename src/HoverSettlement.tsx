import React from 'react'
import type { GameState } from './mechanics/gameState';
import { hexCoordinateToWorld, Vec3Tuple } from './geometry';
import InvalidVillage from './Models/Structures/InvalidVillage';
import TransparentVillage from './Models/Structures/TransparentVillage';
import { validFreeSettlePosition } from './mechanics/settling';

export default function HoverSettlement({ hoverPos, gameState }: { hoverPos: Vec3Tuple, gameState: GameState }) {
  if (gameState.phase === 'Free Settlement 1' || gameState.phase === 'Free Settlement 2') {
    if (!validFreeSettlePosition(hoverPos, gameState)) {
      return <InvalidVillage position={hexCoordinateToWorld(hoverPos, 0)} />
    }
    return <TransparentVillage position={hexCoordinateToWorld(hoverPos, 0)} roofColor={gameState.whoseTurn.color} />
  }
  return <></>
}