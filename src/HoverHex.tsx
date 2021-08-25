import { Ring } from '@react-three/drei'
import React from 'react'
import { hexCoordinateToWorld, Vec3Tuple } from './geometry'
import type { GameState } from './mechanics/gameState'
import { validFreeSettlePosition } from './mechanics/settling'

export function HoverHex({ hoverPos, gameState }: { hoverPos: Vec3Tuple, gameState: GameState }) {
  let color = gameState.whoseTurn.color
  if (gameState.phase === 'Free Settlement 1' || gameState.phase === 'Free Settlement 2') {
    if (!validFreeSettlePosition(hoverPos, gameState)) {
      color = 'red'
    }
  }
  return <Ring args={[.6, .55, 6]} position={hexCoordinateToWorld(hoverPos, .21)} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
    <meshBasicMaterial attach="material" color="white" />
  </Ring>
}