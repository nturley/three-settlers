import React from 'react'
import type { Vector3Tuple } from 'three';
import BuildingFarm from './Models/Board/BuildingFarm';
import BuildingSheep from './Models/Board/BuildingSheep';
import Dirt from './Models/Board/Dirt';
import Forest from './Models/Board/Forest';
import { hexCoordinateToWorld, Vec3Tuple } from './geometry';
import Sand from './Models/Board/Sand';
import StoneHill from './Models/Board/StoneHill';
import type { Tile } from './tiles';

type HexComponent = (props: JSX.IntrinsicElements['group']) => JSX.Element;

const tileToComponent: Map<Tile, HexComponent> = new Map([
  ['Field', BuildingFarm],
  ['Pasture', BuildingSheep],
  ['Desert', Sand],
  ['Mountains', StoneHill],
  ['Clay', Dirt],
  ['Forest', Forest],
]);

export function HexTile(props: JSX.IntrinsicElements['group'] & { tile: Tile, pos: Vec3Tuple }) {
  const pos = hexCoordinateToWorld(props.pos, 0)
  const Tile = tileToComponent.get(props.tile)
  if (!Tile) throw new Error('Unexpected hex type')
  return <Tile {...props} position={pos} />
}