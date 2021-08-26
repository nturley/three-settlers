
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
import { SingleRoad } from './Models/Structures/SingleRoad'
import { GiBrickPile, GiCardPlay, GiCardRandom, GiOre, GiSheep, GiWheat, GiWoodPile } from 'react-icons/gi'

export default function App() {
  const [gameState, setGameState] = React.useState(fakeGameState())
  const [hoverPos, setHoverPos] = React.useState<Vec3Tuple | undefined>()

  return (
    <div className="App">
      <div className="page">
        {gameState.players.map(player =>
          <>
            <h2>{player.name}</h2>
            Color: {player.color}
            <table>
              <thead><tr>
                <th><GiBrickPile /></th><th><GiWoodPile /></th><th><GiWheat /></th><th><GiSheep /></th><th><GiOre /></th><th><GiCardPlay /></th>
              </tr></thead>
              <tbody><tr>
                <td>{player.resources.bricks}</td><td>{player.resources.wood}</td><td>{player.resources.wheat}</td><td>{player.resources.sheep}</td><td>{player.resources.ore}</td><td>{player.cards.length}</td>
              </tr></tbody>
            </table>




          </>
        )}
      </div>
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
          {gameState.roads.map(s => <SingleRoad road={s} gameState={gameState} key={s.pos.toString()} />)}

          {hoverPos && <HoverSettlement hoverPos={hoverPos} gameState={gameState} />}
          {hoverPos && <HoverRoad hoverPos={hoverPos} gameState={gameState} anchorPoint={gameState.fromPoint} />}
          {hoverPos && <HoverHex hoverPos={hoverPos} gameState={gameState} />}
        </Suspense>
      </Canvas>
    </div >
  )
}
