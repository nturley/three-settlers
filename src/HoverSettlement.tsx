import React from 'react'
import type { GameState } from './gameState';
import { hexCoordinateToWorld, hexDistance, Vec3Tuple } from './geometry';
import InvalidVillage from './Models/Structures/InvalidVillage';
import TransparentVillage from './Models/Structures/TransparentVillage';
import { validFreeSettlePosition } from './settling';

export default function HoverSettlement({ hoverPos, gameState }: { hoverPos: Vec3Tuple, gameState: GameState }) {
  if (!validFreeSettlePosition(hoverPos, gameState)) {
    return <InvalidVillage position={hexCoordinateToWorld(hoverPos, 0)} />
  }
  return <TransparentVillage position={hexCoordinateToWorld(hoverPos, 0)} roofColor={gameState.whoseTurn.color} />
}