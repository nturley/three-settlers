
import React from 'react'
import Grass from './Models/Board/Grass'
import { hexCoordinateToWorld, Vec3Tuple } from './geometry'
import Water from './Models/Board/Water'
import UnitBoat from './Models/Board/UnitBoat'
import { GridLines } from './GridLines'

const grassPositions: Vec3Tuple[] = [
  [1, 0, -1],
  [1, -1, 0],
  [0, 1, -1],
  [0, -1, 1],
  [-1, 0, 1],
  [-1, 1, 0],

  [2, 0, -2],
  [2, -2, 0],
  [-2, 2, 0],
  [-2, 0, 2],
  [0, 2, -2],
  [0, -2, 2],

  [3, -2, -1],
  [3, -1, -2],
  [-3, 1, 2],
  [-3, 2, 1],
  [1, 2, -3],
  [1, -3, 2],
  [-1, -2, 3],
  [-1, 3, -2],
  [2, 1, -3],
  [2, -3, 1],
  [-2, -1, 3],
  [-2, 3, -1],

  [4, -1, -3],
  [4, -3, -1],
  [3, 1, -4],
  [3, -4, 1],
  [1, 3, -4],
  [1, -4, 3],
  [-4, 1, 3],
  [-4, 3, 1],
  [-3, -1, 4],
  [-3, 4, -1],
  [-1, -3, 4],
  [-1, 4, -3],

  [4, 0, -4],
  [4, -4, 0],
  [-4, 0, 4],
  [-4, 4, 0],
  [0, 4, -4],
  [0, -4, 4],

  [3, 2, -5],
  [2, 3, -5],
  [-5, 2, 3],
  [-5, 3, 2],
  [3, -5, 2],
  [2, -5, 3],
  [5, -2, -3],
  [5, -3, -2],
  [-2, -3, 5],
  [-3, -2, 5],
  [-2, 5, -3],
  [-3, 5, -2],
]

const waterPositions: Vec3Tuple[] = [
  [6, -3, -3],
  [-6, 3, 3],
  [-3, 6, -3],
  [3, -6, 3],
  [-3, -3, 6],
  [3, 3, -6],

  [6, -4, -2],
  [6, -2, -4],
  [-6, 4, 2],
  [-6, 2, 4],
  [4, 2, -6],
  [4, -6, 2],
  [-4, 6, -2],
  [-4, -2, 6],
  [2, 4, -6],
  [2, -6, 4],
  [-2, -4, 6],
  [-2, 6, -4],

  [5, 0, -5],
  [5, -5, 0],
  [-5, 0, 5],
  [-5, 5, 0],
  [0, 5, -5],
  [0, -5, 5],

  [-5, 1, 4],
  [-5, 4, 1],
  [5, -1, -4],
  [5, -4, -1],
  [1, -5, 4],
  [1, 4, -5],
  [-1, 5, -4],
  [-1, -4, 5],
  [4, -5, 1],
  [4, 1, -5],
  [-4, 5, -1],
  [-4, -1, 5],
]

const boatPositions: Array<{ pos: Vec3Tuple, rot: number }> = [
  { pos: [-4, -1, 5], rot: Math.PI / 2 },
  { pos: [-1, -4, 5], rot: Math.PI / 2 },
  { pos: [3, -6, 3], rot: -Math.PI / 6 },
  { pos: [5, -4, -1], rot: Math.PI / 6 },
  { pos: [5, -1, -4], rot: Math.PI / 6 },
  { pos: [3, -1, -6], rot: Math.PI / 2 },
  { pos: [-1, 5, -4], rot: -Math.PI / 6 },
  { pos: [-4, 5, -1], rot: -Math.PI / 6 },
  { pos: [-6, 3, 3], rot: Math.PI / 6 },
]

export function StaticBoard() {
  return <>
    {grassPositions
      .map(p => hexCoordinateToWorld(p, 0))
      .map(p => <Grass position={p} key={`board ${p.toString()}`} />)
    }
    {waterPositions
      .map(p => hexCoordinateToWorld(p, 0))
      .map(p => <Water position={p} key={`board ${p.toString()}`} />)
    }
    {boatPositions
      .map(p => ({ pos: hexCoordinateToWorld(p.pos, .1), rot: p.rot }))
      .map(p => <UnitBoat position={p.pos} key={`board b${p.pos.toString()}`} rotation={[0, p.rot, 0]} />)
    }
    <GridLines />
  </>
}