
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

import './App.css'
import { StaticBoard } from './StaticBoard'
import { HexTilesBoard } from './HexTilesBoard'
import _ from 'lodash'
import { hexCoordinateToWorld, Vec3Tuple } from './geometry'
import BuildingVillage from './Models/Structures/BuildingVillage'
import { fakeGameState, GameState, Settlement } from './gameState'
import HoverSettlement from './HoverSettlement'
import { placeSettlement, validFreeSettlePosition } from './settling'

export default function App() {
  const [gameState, setGameState] = React.useState(fakeGameState())
  const [hoverPos, setHoverPos] = React.useState<Vec3Tuple | undefined>()

  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Environment preset="sunset" background />
          <OrbitControls />
          <StaticBoard
            onGrassClick={(p => validFreeSettlePosition(p, gameState) && placeSettlement(p, gameState, setGameState))}
            onGrassEnter={p => setHoverPos(p)}
            onGrassLeave={p => { }}
          />
          <HexTilesBoard tiles={gameState.tiles} />
          {hoverPos && <HoverSettlement hoverPos={hoverPos} gameState={gameState} />}
          {gameState.settlements.map(s => <BuildingVillage position={hexCoordinateToWorld(s.pos, 0)} roofColor={s.owner.color} />)}
        </Suspense>
      </Canvas>
    </div>
  )
}
