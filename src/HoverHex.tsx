import { Ring } from '@react-three/drei'
import React from 'react'

export function HoverHex({ }) {
  return <Ring args={[1, .8, 6]} position={[0, .21, 0]} rotation={[Math.PI / 2, 0, 0]}>
    <meshBasicMaterial attach="material" color="white" />
  </Ring>
}