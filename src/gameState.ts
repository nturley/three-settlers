import type { Vec3Tuple } from './geometry';
import type { Tile } from './tiles';

type DevelopmentCard = 'Soldier' | 'Monopoly' | 'Roads' | 'Resources';

type GamePhase =
  | 'Free Settlement 1'
  | 'Free Road 1'
  | 'Free Settlement 2'
  | 'Free Road 2'
  | 'Rob'
  | 'Trade'
  | 'Build';

interface Settlement {
  isCity: boolean;
  pos: Vec3Tuple;
  owner: Player;
}

interface Road {
  pos: Vec3Tuple;
  owner: Player;
}

interface GameState {
  players: Player[];
  tiles: Tile[];
  cardDeck: DevelopmentCard[];
  phase: GamePhase;
  whoseTurn: Player;
  roads: Road[];
  settlements: Settlement[];
}

interface Player {
  name: string;
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
