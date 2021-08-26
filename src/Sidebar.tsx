
import React from 'react'
import type { GameState } from './mechanics/gameState'
import { GiBrickPile, GiCardPlay, GiOre, GiSheep, GiWheat, GiWoodPile } from 'react-icons/gi'

export default function Sidebar({ gameState }: { gameState: GameState }) {

  return (
    <div className="page">
      {gameState.players.map(player =>
        <>
          <h2>{player.name} ({player.color})</h2>
          <table>
            <thead><tr>
              <th><GiBrickPile /></th><th><GiWoodPile /></th><th><GiWheat /></th><th><GiSheep /></th><th><GiOre /></th><th><GiCardPlay /></th>
            </tr></thead>
            <tbody><tr>
              <td>{player.resources.bricks}</td><td>{player.resources.wood}</td><td>{player.resources.wheat}</td><td>{player.resources.sheep}</td><td>{player.resources.ore}</td><td>{player.cards.length}</td>
            </tr></tbody>
          </table>
        </>
      )}
    </div>
  )
}
