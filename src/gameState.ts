import type { Vec3Tuple } from './geometry';
import { generateTiles, Tile } from './tiles';

type DevelopmentCard = 'Soldier' | 'Monopoly' | 'Roads' | 'Resources';

type GamePhase =
  | 'Free Settlement 1'
  | 'Free Road 1'
  | 'Free Settlement 2'
  | 'Free Road 2'
  | 'Rob'
  | 'Trade'
  | 'Build';

export interface Settlement {
  isCity: boolean;
  pos: Vec3Tuple;
  owner: Player;
}

export interface Road {
  pos: Vec3Tuple;
  owner: Player;
}

export interface GameState {
  players: Player[];
  tiles: Tile[];
  cardDeck: DevelopmentCard[];
  phase: GamePhase;
  whoseTurn: Player;
  roads: Road[];
  settlements: Settlement[];
}

export interface Player {
  name: string;
  color: string;
  resources: Resources;
  cards: DevelopmentCard[];
  roads: Road[];
  settlements: Settlement[];
}

interface Resources {
  wood: number;
  sheep: number;
  ore: number;
  bricks: number;
  wheat: number;
}

export function fakeGameState(): GameState {
  const player: Player = {
    name: '',
    color: 'green',
    cards: [],
    settlements: [],
    roads: [],
    resources: {
      wheat: 0,
      bricks: 0,
      sheep: 0,
      ore: 0,
      wood: 0,
    },
  };
  return {
    players: [player],
    cardDeck: [],
    phase: 'Free Settlement 1',
    tiles: generateTiles(),
    whoseTurn: player,
    settlements: [],
    roads: [],
  };
}
