/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import type * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Mesh_building_farm: THREE.Mesh
    Mesh_building_farm_1: THREE.Mesh
    fence: THREE.Mesh
    grain: THREE.Mesh
    grainBundle: THREE.Mesh
    grainBundle_1: THREE.Mesh
  }
  materials: {
    dirt: THREE.MeshStandardMaterial
    grass: THREE.MeshStandardMaterial
    sand: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('./building_farm.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_building_farm.geometry} material={nodes.Mesh_building_farm.material} />
      <mesh geometry={nodes.Mesh_building_farm_1.geometry} material={materials.grass} />
      <mesh
        geometry={nodes.fence.geometry}
        material={nodes.fence.material}
        position={[-0.38, 0.2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        geometry={nodes.grain.geometry}
        material={nodes.grain.material}
        position={[0.05, 0.2, 0.09]}
        rotation={[0, -Math.PI / 3, 0]}
      />
      <mesh
        geometry={nodes.grainBundle.geometry}
        material={nodes.grainBundle.material}
        position={[-0.29, 0.2, -0.13]}
      />
      <mesh
        geometry={nodes.grainBundle_1.geometry}
        material={nodes.grainBundle_1.material}
        position={[-0.15, 0.2, -0.23]}
        rotation={[0, -Math.PI / 6, 0]}
        scale={[1, 0.5, 1]}
      />
    </group>
  )
}

useGLTF.preload('./building_farm.glb')
