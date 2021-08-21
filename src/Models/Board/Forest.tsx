/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import type * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Mesh_grass_forest: THREE.Mesh
    Mesh_grass_forest_1: THREE.Mesh
    Mesh_tree: THREE.Mesh
    Mesh_tree_1: THREE.Mesh
  }
  materials: {
    dirt: THREE.MeshStandardMaterial
    grass: THREE.MeshStandardMaterial
    foliage: THREE.MeshStandardMaterial
    wood: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('../../grass_forest.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_grass_forest.geometry} material={materials.dirt} />
      <mesh geometry={nodes.Mesh_grass_forest_1.geometry} material={materials.grass} />
      <group position={[0.32, 0.2, -0.08]} rotation={[0, -0.26, 0]} scale={[1, 1, 1]}>
        <mesh geometry={nodes.Mesh_tree.geometry} material={nodes.Mesh_tree.material} />
        <mesh geometry={nodes.Mesh_tree_1.geometry} material={nodes.Mesh_tree_1.material} />
      </group>
      <group position={[0.29, 0.2, 0.21]} rotation={[0, -Math.PI / 6, 0]} scale={0.77}>
        <mesh geometry={nodes.Mesh_tree.geometry} material={nodes.Mesh_tree.material} />
        <mesh geometry={nodes.Mesh_tree_1.geometry} material={nodes.Mesh_tree_1.material} />
      </group>
      <group position={[0.01, 0.2, 0.3]}>
        <mesh geometry={nodes.Mesh_tree.geometry} material={nodes.Mesh_tree.material} />
        <mesh geometry={nodes.Mesh_tree_1.geometry} material={nodes.Mesh_tree_1.material} />
      </group>
      <group position={[0.17, 0.2, -0.32]} rotation={[0, Math.PI / 6, 0]} scale={0.62}>
        <mesh geometry={nodes.Mesh_tree.geometry} material={nodes.Mesh_tree.material} />
        <mesh geometry={nodes.Mesh_tree_1.geometry} material={nodes.Mesh_tree_1.material} />
      </group>
      <group position={[-0.29, 0.2, -0.16]} rotation={[0, -0.66, 0]} scale={[1, 1, 1]}>
        <mesh geometry={nodes.Mesh_tree.geometry} material={nodes.Mesh_tree.material} />
        <mesh geometry={nodes.Mesh_tree_1.geometry} material={nodes.Mesh_tree_1.material} />
      </group>
      <group position={[-0.3, 0.2, 0.19]} rotation={[0, -0.05, 0]} scale={0.62}>
        <mesh geometry={nodes.Mesh_tree.geometry} material={nodes.Mesh_tree.material} />
        <mesh geometry={nodes.Mesh_tree_1.geometry} material={nodes.Mesh_tree_1.material} />
      </group>
      <group position={[-0.04, 0.2, 0.01]} rotation={[0, 0.26, 0]} scale={[0.77, 0.77, 0.77]}>
        <mesh geometry={nodes.Mesh_tree.geometry} material={nodes.Mesh_tree.material} />
        <mesh geometry={nodes.Mesh_tree_1.geometry} material={nodes.Mesh_tree_1.material} />
      </group>
      <group position={[-0.08, 0.2, -0.35]} rotation={[0, 0.15, 0]} scale={0.77}>
        <mesh geometry={nodes.Mesh_tree.geometry} material={nodes.Mesh_tree.material} />
        <mesh geometry={nodes.Mesh_tree_1.geometry} material={nodes.Mesh_tree_1.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/grass_forest.glb')
