import React from 'react'
import { HexTile } from './HexTile'
import type { Tile } from '../tiles'

export function HexTilesBoard({ tiles }: { tiles: Tile[] }) {
  return <>
    {tiles.map((t) =>
      <HexTile tile={t} key={t.pos.toString()} />)}
  </>
}