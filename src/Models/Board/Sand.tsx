/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import type * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Mesh_sand: THREE.Mesh
    Mesh_sand_1: THREE.Mesh
  }
  materials: {
    dirt: THREE.MeshStandardMaterial
    sand: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/sand.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_sand.geometry} material={materials.dirt} />
      <mesh geometry={nodes.Mesh_sand_1.geometry} material={materials.sand} />
    </group>
  )
}

useGLTF.preload('/sand.glb')