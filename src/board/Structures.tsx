
import React from 'react'
import { hexCoordinateToWorld, Vec3Tuple } from '../geometry'
import BuildingVillage from '../model-imports/Structures/BuildingVillage'
import type { GameState } from '../mechanics/gameState'
import { SingleRoad } from '../model-imports/Structures/SingleRoad'

export default function Structures({ gameState, }: { gameState: GameState }) {
  return (
    <>
      {gameState.settlements.map(s => <BuildingVillage position={hexCoordinateToWorld(s.pos, 0)} roofColor={s.owner.color} key={s.pos.toString()} />)}
      {gameState.roads.map(s => <SingleRoad road={s} gameState={gameState} key={s.pos.toString()} />)}
    </>
  )
}
