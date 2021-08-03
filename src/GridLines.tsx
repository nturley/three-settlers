import { Line } from '@react-three/drei'
import React, { useRef } from 'react'
import { hexCoordinateToWorld, Vec3Tuple } from './geometry'
import { tilePositions } from './tiles'


const points: Vec3Tuple[] = [
  [1, 0, -1],
  [1, -1, 0],
  [0, -1, 1],
  [-1, 0, 1],
  [-1, 1, 0],
  [0, 1, -1],
  [1, 0, -1],
]

export function GridLines() {
  return <>
    {
      tilePositions.map(p => hexCoordinateToWorld(p, 0)).map(p =>
        <Line
          position={p}
          dashed={true}
          color="white"
          dashSize={1}
          dashScale={10}
          dashOffset={.3}
          lineWidth={.5}
          points={points.map(p => hexCoordinateToWorld(p, 0.25))}
        />
      )
    }
  </>
}