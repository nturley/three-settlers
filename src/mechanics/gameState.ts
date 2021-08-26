import type { Vec3Tuple } from '../geometry';
import { generateTiles, Tile } from '../tiles';

type DevelopmentCard = 'Soldier' | 'Monopoly' | 'Roads' | 'Resources';

type GamePhase = 'Free Settlement' | 'Free Road' | 'Rob' | 'Trade' | 'Build';

export interface Settlement {
  isCity: boolean;
  pos: Vec3Tuple;
  owner: Player;
}

export interface Road {
  pos: [Vec3Tuple, Vec3Tuple];
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
  fromPoint: Vec3Tuple | undefined;
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
    name: 'Bill',
    color: 'white',
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
  const player2: Player = {
    name: 'Jorge',
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
    players: [player, player2],
    cardDeck: [],
    phase: 'Free Settlement',
    tiles: generateTiles(),
    whoseTurn: player,
    settlements: [],
    roads: [],
    fromPoint: undefined,
  };
}
