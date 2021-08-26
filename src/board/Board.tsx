
import React from 'react'
import { StaticBoard } from './StaticBoard'
import { HexTilesBoard } from './HexTilesBoard'
import type { Vec3Tuple } from '../geometry'
import type { GameState } from '../mechanics/gameState'
import { onGrassClick } from '../mechanics/gameActions'
import Structures from './Structures'
import HoverObjects from './Hover/HoverObjects'

export default function Board({ gameState, setGameState }: { gameState: GameState, setGameState: (gs: GameState) => void }) {
  const [hoverPos, setHoverPos] = React.useState<Vec3Tuple | undefined>()

  return (
    <>
      <StaticBoard
        onGrassClick={(p => {
          setGameState(onGrassClick(p, gameState))
        })}
        onGrassEnter={p => setHoverPos(p)}
        onGrassLeave={p => { }}
      />
      <HexTilesBoard tiles={gameState.tiles} />
      <Structures gameState={gameState} />

      <HoverObjects gameState={gameState} hoverPos={hoverPos} />
    </>
  )
}
