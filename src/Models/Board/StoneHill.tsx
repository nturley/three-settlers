/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import type * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Mesh_stone_hill: THREE.Mesh
    Mesh_stone_hill_1: THREE.Mesh
    rockLarge: THREE.Mesh
  }
  materials: {
    dirt: THREE.MeshStandardMaterial
    stone: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('../../stone_hill.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_stone_hill.geometry} material={materials.dirt} />
      <mesh geometry={nodes.Mesh_stone_hill_1.geometry} material={nodes.Mesh_stone_hill_1.material} />
      <mesh
        geometry={nodes.rockLarge.geometry}
        material={nodes.rockLarge.material}
        position={[0, 0.2, 0]}
        scale={[1, 0.5, 1]}
      />
    </group>
  )
}

useGLTF.preload('/stone_hill.glb')
