import React from 'react'
import BuildingFarm from '../model-imports/Board/BuildingFarm';
import BuildingSheep from '../model-imports/Board/BuildingSheep';
import Dirt from '../model-imports/Board/Dirt';
import Forest from '../model-imports/Board/Forest';
import { hexCoordinateToWorld, Vec3Tuple } from '../geometry';
import Sand from '../model-imports/Board/Sand';
import StoneHill from '../model-imports/Board/StoneHill';
import type { Tile, TileType } from '../tiles';
import { BillboardProps, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import mergeRefs from 'react-merge-refs'

type HexComponent = (props: JSX.IntrinsicElements['group']) => JSX.Element;

const tileToComponent: Map<TileType, HexComponent> = new Map([
  ['Field', BuildingFarm],
  ['Pasture', BuildingSheep],
  ['Desert', Sand],
  ['Mountains', StoneHill],
  ['Clay', Dirt],
  ['Forest', Forest],
]);

const Billboard = React.forwardRef<Mesh, BillboardProps>(function Billboard(
  { follow = true, lockX = false, lockY = false, lockZ = false, ...props },
  ref
) {
  const localRef = React.useRef<Mesh>()
  useFrame(({ camera }) => {
    if (!follow || !localRef.current) return

    // save previous rotation in case we're locking an axis
    const prevRotation = localRef.current.rotation.clone()

    // always face the camera
    localRef.current.quaternion.copy(camera.quaternion)

    // readjust any axis that is locked
    if (lockX) localRef.current.rotation.x = prevRotation.x
    if (lockY) localRef.current.rotation.y = prevRotation.y
    if (lockZ) localRef.current.rotation.z = prevRotation.z
  })
  return <group ref={mergeRefs([localRef, ref])} {...props as any} />
})

export function HexTile(props: JSX.IntrinsicElements['group'] & { tile: Tile }) {
  const tileType = props.tile.type;

  let hoverHeight = .3
  if (tileType === 'Field') hoverHeight = .45
  if (tileType === 'Pasture') hoverHeight = .5
  if (tileType === 'Forest') hoverHeight = .65
  if (tileType === 'Mountains') hoverHeight = .8
  const pos = hexCoordinateToWorld(props.tile.pos, 0)
  const Tile = tileToComponent.get(props.tile.type)
  if (!Tile) throw new Error('Unexpected hex type')
  return <>
    {tileType !== 'Desert' && <Billboard position={[pos[0], pos[1] + hoverHeight, pos[2]]} follow={true} material={undefined}>
      <Text
        color={'#000000'}
        fontSize={.3}
        textAlign={'center'}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
      >
        {props.tile.num}
      </Text>
    </Billboard>}
    <Tile {...props} position={pos} />
  </>
}