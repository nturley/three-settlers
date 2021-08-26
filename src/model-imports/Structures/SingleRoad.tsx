import React from 'react'
import { hexCoordinateToWorld, Vec3Tuple } from '../../geometry';
import type { GameState, Road } from '../../mechanics/gameState';
import StraightRoad from './StraightRoad';

export function SingleRoad({ road, gameState }: { road: Road, gameState: GameState }) {
  const dp = road.pos[1].map((to, i) => to - road.pos[0][i])
  let rot = 0
  if (dp[0] == 0) rot = -Math.PI / 3
  if (dp[1] == 0) rot = -2 * Math.PI / 3
  const avePos = road.pos[1].map((p1, i) => (p1 - dp[i] / 4)) as Vec3Tuple
  return <StraightRoad position={hexCoordinateToWorld(avePos, .2)} playerColor={road.owner.color} rotation={[0, rot, 0]} scale={[.65, 1, 1]} />
}