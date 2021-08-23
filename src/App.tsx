
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

import './App.css'
import { StaticBoard } from './StaticBoard'
import { generateTiles } from './tiles'
import { HexTilesBoard } from './HexTilesBoard'
import _ from 'lodash'
import { hexCoordinateToWorld, Vec3Tuple } from './geometry'
import { Text } from '@react-three/drei'
import BuildingVillage from './Models/Structures/BuildingVillage'
import { fakeGameState, GameState, Player, Settlement } from './gameState'
import TransparentVillage from './Models/Structures/TransparentVillage'


export default function App() {
  const [gameState, setGameState] = React.useState(fakeGameState())
  const [hoverPos, setHoverPos] = React.useState<Vec3Tuple | undefined>()

  function placeSettlement(pos: Vec3Tuple) {
    const newSettlement: Settlement = {
      isCity: false,
      owner: gameState.whoseTurn,
      pos
    }
    const players = gameState.players.map(p => gameState.whoseTurn == p ? { ...p, settlements: [...p.settlements, newSettlement] } : p)
    setGameState({
      ...gameState,
      settlements: [...gameState.settlements, newSettlement],
      players
    })
  }

  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Environment preset="sunset" background />
          <OrbitControls />
          <StaticBoard
            onGrassClick={(p => placeSettlement(p))}
            onGrassEnter={p => setHoverPos(p)}
            onGrassLeave={p => {
              if (p == hoverPos) setHoverPos(undefined)
            }}
          />
          <HexTilesBoard tiles={gameState.tiles} />
          {hoverPos && <TransparentVillage position={hexCoordinateToWorld(hoverPos, 0)} roofColor={gameState.whoseTurn.color} />}
          {gameState.settlements.map(s => <BuildingVillage position={hexCoordinateToWorld(s.pos, 0)} roofColor={s.owner.color} />)}
        </Suspense>
      </Canvas>
    </div>
  )
}
