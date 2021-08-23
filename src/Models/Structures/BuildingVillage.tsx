/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import type * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import building_village from './building_village.glb'

type GLTFResult = GLTF & {
  nodes: {
    Mesh_building_village: THREE.Mesh
    Mesh_building_village_1: THREE.Mesh
    Mesh_building: THREE.Mesh
    Mesh_building_1: THREE.Mesh
    Mesh_building_2: THREE.Mesh
    Mesh_building_3: THREE.Mesh
    Mesh_building_4: THREE.Mesh
    Mesh_building_5: THREE.Mesh
    chimney: THREE.Mesh
    fence: THREE.Mesh
    fence_1: THREE.Mesh
    Group: THREE.Mesh
    Group_1: THREE.Mesh
    Mesh_tree: THREE.Mesh
    Mesh_tree_1: THREE.Mesh
  }
  materials: {
    dirt: THREE.MeshStandardMaterial
    grass: THREE.MeshStandardMaterial
    roof: THREE.MeshStandardMaterial
    wood: THREE.MeshStandardMaterial
    stone: THREE.MeshStandardMaterial
    foliage: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group'] & { roofColor: string }) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(building_village) as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_building_village.geometry} material={nodes.Mesh_building_village.material} />
      <mesh geometry={nodes.Mesh_building_village_1.geometry} material={materials.grass} />
      <group position={[-0.05, 0.2, -0.25]}>
        <mesh geometry={nodes.Mesh_building.geometry} material={nodes.Mesh_building.material} material-color={props.roofColor} />
        <mesh geometry={nodes.Mesh_building_1.geometry} material={nodes.Mesh_building_1.material} />
        <mesh geometry={nodes.Mesh_building_2.geometry} material={nodes.Mesh_building_2.material} />
      </group>
      <group position={[0.03, 0.2, 0.22]} rotation={[0, Math.PI / 4, 0]}>
        <mesh geometry={nodes.Mesh_building_3.geometry} material={nodes.Mesh_building_3.material} />
        <mesh geometry={nodes.Mesh_building_4.geometry} material={nodes.Mesh_building_4.material} />
        <mesh geometry={nodes.Mesh_building_5.geometry} material={nodes.Mesh_building_5.material} />
      </group>
      <mesh
        geometry={nodes.chimney.geometry}
        material={materials.stone}
        position={[-0.1, 0.2, 0.09]}
        rotation={[0, Math.PI / 4, 0]}
        scale={[1, 0.74, 1]}
      />
      <mesh
        geometry={nodes.fence.geometry}
        material={nodes.fence.material}
        position={[0.18, 0.2, -0.44]}
        rotation={[0, -Math.PI / 6, 0]}
      />
      <mesh
        geometry={nodes.fence_1.geometry}
        material={nodes.fence_1.material}
        position={[0.47, 0.2, 0.06]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <mesh
        geometry={nodes.Group.geometry}
        material={nodes.Group.material}
        position={[0.21, 0.2, -0.16]}
        rotation={[0, Math.PI / 6, 0]}
        scale={[0.74, 1, 0.74]}
      />
      <mesh
        geometry={nodes.Group_1.geometry}
        material={nodes.Group_1.material}
        position={[0.21, 0.2, 0.04]}
        scale={[0.74, 1, 0.74]}
      />
      <group position={[-0.29, 0.2, 0.09]} rotation={[0, -0.37, 0]}>
        <mesh geometry={nodes.Mesh_tree.geometry} material={nodes.Mesh_tree.material} />
        <mesh geometry={nodes.Mesh_tree_1.geometry} material={nodes.Mesh_tree_1.material} />
      </group>
      <group position={[0.35, 0.2, 0.22]} rotation={[0, -0.11, 0]} scale={[0.77, 0.77, 0.77]}>
        <mesh geometry={nodes.Mesh_tree.geometry} material={nodes.Mesh_tree.material} />
        <mesh geometry={nodes.Mesh_tree_1.geometry} material={nodes.Mesh_tree_1.material} />
      </group>
    </group>
  )
}

useGLTF.preload(building_village)
