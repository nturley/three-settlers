
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

import './App.css'
import { StaticBoard } from './StaticBoard'
import { generateTiles } from './tiles'
import { HexTilesBoard } from './HexTilesBoard'
import _ from 'lodash'


export default function App() {
  const tiles = React.useMemo(() => generateTiles(), [])
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Environment preset="sunset" background />
          <OrbitControls />
          <StaticBoard />
          <HexTilesBoard tiles={tiles} />
        </Suspense>
      </Canvas>
    </div>
  )
}
