import React from 'react'
import BuildingFarm from './Models/Board/BuildingFarm';
import BuildingSheep from './Models/Board/BuildingSheep';
import Dirt from './Models/Board/Dirt';
import Forest from './Models/Board/Forest';
import { hexCoordinateToWorld, Vec3Tuple } from './geometry';
import Sand from './Models/Board/Sand';
import StoneHill from './Models/Board/StoneHill';
import type { Tile, TileType } from './tiles';
import { Text } from '@react-three/drei'
type HexComponent = (props: JSX.IntrinsicElements['group']) => JSX.Element;

const tileToComponent: Map<TileType, HexComponent> = new Map([
  ['Field', BuildingFarm],
  ['Pasture', BuildingSheep],
  ['Desert', Sand],
  ['Mountains', StoneHill],
  ['Clay', Dirt],
  ['Forest', Forest],
]);

export function HexTile(props: JSX.IntrinsicElements['group'] & { tile: Tile }) {
  const pos = hexCoordinateToWorld(props.tile.pos, 0)
  const Tile = tileToComponent.get(props.tile.type)
  if (!Tile) throw new Error('Unexpected hex type')
  return <>
    {props.tile.type !== 'Desert' ? <Text
      color={'#000000'}
      fontSize={.3}
      textAlign={'center'}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle"
      position={[pos[0], pos[1] + .7, pos[2]]}
      rotation={[3 * Math.PI / 2, 0, 0]}
    >
      {props.tile.num}
    </Text> : null}
    <Tile {...props} position={pos} />
  </>
}