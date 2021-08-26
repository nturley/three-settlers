import React from 'react'
import type { GameState } from './mechanics/gameState';
import { hexCoordinateToWorld, hexDistance, Vec3Tuple } from './geometry';
import TransparentRoad from './Models/Structures/TransparentRoad';

export function HoverRoad({ hoverPos, gameState, anchorPoint }: { hoverPos: Vec3Tuple, gameState: GameState, anchorPoint: Vec3Tuple | undefined }) {
  if (anchorPoint) {
    // if we are roading from a settlement.
    if (gameState.settlements.find(s => s.pos.toString() == anchorPoint.toString())) {
      if (hexDistance(hoverPos, anchorPoint) != 1) return <></>
      const dp = hoverPos.map((h, i) => h - anchorPoint[i])
      let rot = 0
      if (dp[0] == 0) rot = -Math.PI / 3
      if (dp[1] == 0) rot = -2 * Math.PI / 3
      const avePos = hoverPos.map((p1, i) => (p1 - dp[i] / 4)) as Vec3Tuple
      return <TransparentRoad position={hexCoordinateToWorld(avePos, .2)} rotation={[0, rot, 0]} playerColor={gameState.whoseTurn.color} scale={[.65, 1, 1]} />
    }
  }
  return <></>
}