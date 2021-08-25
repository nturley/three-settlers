import React from 'react'
import type { GameState } from './mechanics/gameState';
import { hexCoordinateToWorld, hexDistance, Vec3Tuple } from './geometry';
import RoadStraight from './Models/Structures/RoadStraight';

export function HoverRoad({ hoverPos, gameState, anchorPoint }: { hoverPos: Vec3Tuple, gameState: GameState, anchorPoint: Vec3Tuple | undefined }) {
  // 0,-1,1

  if (anchorPoint) {
    if (hexDistance(hoverPos, anchorPoint) != 1) return <></>
    const dp = hoverPos.map((h, i) => h - anchorPoint[i])
    let rot = 0
    if (dp[0] == 0) rot = -Math.PI / 3
    if (dp[1] == 0) rot = -2 * Math.PI / 3
    return <RoadStraight position={hexCoordinateToWorld(hoverPos, .2)} rotation={[0, rot, 0]} playerColor={gameState.whoseTurn.color} />
  }
  return <></>
}