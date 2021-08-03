import React from 'react'
import { HexTile } from './HexTile'
import { Tile, tilePositions } from './tiles'

export function HexTilesBoard({ tiles }: { tiles: Tile[] }) {
  return <>
    {tilePositions.map((pos, i) =>
      <HexTile tile={tiles[i]} pos={pos} key={pos.toString()} />)}
  </>
}