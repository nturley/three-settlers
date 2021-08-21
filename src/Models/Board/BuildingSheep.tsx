/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import type * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Mesh_building_sheep: THREE.Mesh
    Mesh_building_sheep_1: THREE.Mesh
    fence: THREE.Mesh
    fence_1: THREE.Mesh
    fence_2: THREE.Mesh
    fence_3: THREE.Mesh
    Mesh_sheep: THREE.Mesh
    Mesh_sheep_1: THREE.Mesh
  }
  materials: {
    dirt: THREE.MeshStandardMaterial
    grass: THREE.MeshStandardMaterial
    dark: THREE.MeshStandardMaterial
    wool: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('../../building_sheep.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_building_sheep.geometry} material={nodes.Mesh_building_sheep.material} />
      <mesh geometry={nodes.Mesh_building_sheep_1.geometry} material={materials.grass} />
      <mesh
        geometry={nodes.fence.geometry}
        material={nodes.fence.material}
        position={[-0.48, 0.2, -0.06]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        geometry={nodes.fence_1.geometry}
        material={nodes.fence_1.material}
        position={[0.47, 0.2, 0.06]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <mesh
        geometry={nodes.fence_2.geometry}
        material={nodes.fence_2.material}
        position={[0.18, 0.2, -0.44]}
        rotation={[0, -Math.PI / 6, 0]}
      />
      <mesh
        geometry={nodes.fence_3.geometry}
        material={nodes.fence_3.material}
        position={[-0.18, 0.2, 0.44]}
        rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
      />
      <group position={[-0.2, 0.2, -0.22]} rotation={[0, Math.PI / 3, 0]}>
        <mesh geometry={nodes.Mesh_sheep.geometry} material={nodes.Mesh_sheep.material} />
        <mesh geometry={nodes.Mesh_sheep_1.geometry} material={nodes.Mesh_sheep_1.material} />
      </group>
      <group position={[0.06, 0.2, 0.3]} rotation={[0, Math.PI / 6, 0]}>
        <mesh geometry={nodes.Mesh_sheep.geometry} material={nodes.Mesh_sheep.material} />
        <mesh geometry={nodes.Mesh_sheep_1.geometry} material={nodes.Mesh_sheep_1.material} />
      </group>
      <group position={[0.32, 0.2, 0.09]} rotation={[0, 0.18, 0]}>
        <mesh geometry={nodes.Mesh_sheep.geometry} material={nodes.Mesh_sheep.material} />
        <mesh geometry={nodes.Mesh_sheep_1.geometry} material={nodes.Mesh_sheep_1.material} />
      </group>
      <group position={[0.04, 0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh geometry={nodes.Mesh_sheep.geometry} material={nodes.Mesh_sheep.material} />
        <mesh geometry={nodes.Mesh_sheep_1.geometry} material={nodes.Mesh_sheep_1.material} />
      </group>
      <group position={[-0.25, 0.2, 0.13]}>
        <mesh geometry={nodes.Mesh_sheep.geometry} material={nodes.Mesh_sheep.material} />
        <mesh geometry={nodes.Mesh_sheep_1.geometry} material={nodes.Mesh_sheep_1.material} />
      </group>
      <group position={[0.14, 0.2, -0.29]} rotation={[Math.PI, -1.31, Math.PI]} scale={[1, 1, 1]}>
        <mesh geometry={nodes.Mesh_sheep.geometry} material={nodes.Mesh_sheep.material} />
        <mesh geometry={nodes.Mesh_sheep_1.geometry} material={nodes.Mesh_sheep_1.material} />
      </group>
    </group>
  )
}

useGLTF.preload('../../building_sheep.glb')
