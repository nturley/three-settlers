
import React from 'react'
import type { Vec3Tuple } from '../../geometry'
import type { GameState } from '../../mechanics/gameState'
import HoverSettlement from './HoverSettlement'
import { HoverRoad } from './HoverRoad'
import { HoverHex } from './HoverHex'


export default function HoverObjects({ gameState, hoverPos }: { gameState: GameState, hoverPos: Vec3Tuple | undefined }) {
  if (hoverPos === undefined) return <></>
  return (
    <>
      <HoverSettlement hoverPos={hoverPos} gameState={gameState} />
      <HoverRoad hoverPos={hoverPos} gameState={gameState} anchorPoint={gameState.fromPoint} />
      <HoverHex hoverPos={hoverPos} gameState={gameState} />
    </>
  )
}
