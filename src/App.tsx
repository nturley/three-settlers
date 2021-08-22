
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

export default function App() {
  const tiles = React.useMemo(() => generateTiles(), [])
  const [hoverPos, setHoverPos] = React.useState<Vec3Tuple | undefined>()
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Environment preset="sunset" background />
          <OrbitControls />
          <StaticBoard
            onGrassUp={(p => console.log('up', p))}
            onGrassEnter={p => setHoverPos(p)}
            onGrassLeave={p => {
              if (p == hoverPos) setHoverPos(undefined)
            }}
          />
          <HexTilesBoard tiles={tiles} />
          {hoverPos && <BuildingVillage position={hexCoordinateToWorld(hoverPos, 0)} />}
        </Suspense>
      </Canvas>
    </div>
  )
}
