
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

import './App.css'
import { StaticBoard } from './StaticBoard'
import { HexTilesBoard } from './HexTilesBoard'
import _ from 'lodash'
import { hexCoordinateToWorld, Vec3Tuple } from './geometry'
import BuildingVillage from './Models/Structures/BuildingVillage'
import { fakeGameState } from './mechanics/gameState'
import HoverSettlement from './HoverSettlement'
import { onGrassClick } from './mechanics/gameActions'
import { HoverRoad } from './HoverRoad'
import { HoverHex } from './HoverHex'

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
            onGrassClick={(p => {
              setGameState(onGrassClick(p, gameState))
            })}
            onGrassEnter={p => setHoverPos(p)}
            onGrassLeave={p => { }}
          />
          <HexTilesBoard tiles={gameState.tiles} />
          {gameState.settlements.map(s => <BuildingVillage position={hexCoordinateToWorld(s.pos, 0)} roofColor={s.owner.color} key={s.pos.toString()} />)}

          {hoverPos && <HoverSettlement hoverPos={hoverPos} gameState={gameState} />}
          {hoverPos && <HoverRoad hoverPos={hoverPos} gameState={gameState} anchorPoint={gameState.fromPoint} />}
          {hoverPos && <HoverHex hoverPos={hoverPos} gameState={gameState} />}
        </Suspense>
      </Canvas>
    </div>
  )
}
