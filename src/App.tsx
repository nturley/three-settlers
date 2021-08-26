
import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, OrthographicCamera, RoundedBox, Text } from '@react-three/drei'

import './App.css'

import { fakeGameState } from './mechanics/gameState'
import Board from './board/Board'
import Sidebar from './Sidebar'
import DiceView from './DiceView'

export default function App() {
  const [gameState, setGameState] = React.useState(fakeGameState())

  return (
    <div className="App">
      <Sidebar gameState={gameState} />
      <Canvas>
        <Suspense fallback={null}>
          <Environment preset="sunset" background />
          <OrbitControls />
          <Board gameState={gameState} setGameState={setGameState} />
        </Suspense>
        <DiceView />
      </Canvas>
    </div >
  )
}
