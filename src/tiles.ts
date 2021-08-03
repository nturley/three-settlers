import BuildingFarm from './Models/Board/BuildingFarm';
import BuildingSheep from './Models/Board/BuildingSheep';
import Dirt from './Models/Board/Dirt';
import Forest from './Models/Board/Forest';
import type { Vec3Tuple } from './geometry';
import Sand from './Models/Board/Sand';
import StoneHill from './Models/Board/StoneHill';

export type Tile =
  | 'Field'
  | 'Pasture'
  | 'Mountains'
  | 'Clay'
  | 'Desert'
  | 'Forest';

export const tilePile: Tile[] = [
  'Field',
  'Field',
  'Field',
  'Field',
  'Field',
  'Clay',
  'Clay',
  'Clay',
  'Forest',
  'Forest',
  'Forest',
  'Pasture',
  'Pasture',
  'Pasture',
  'Pasture',
  'Mountains',
  'Mountains',
  'Mountains',
  'Desert',
];

export const tilePositions: Vec3Tuple[] = [
  [0, 0, 0],

  [-2, 1, 1],
  [-1, -1, 2],
  [1, -2, 1],
  [2, -1, -1],
  [1, 1, -2],
  [-1, 2, -1],

  [-3, 3, 0],
  [-4, 2, 2],
  [-3, 0, 3],
  [-2, -2, 4],
  [0, -3, 3],
  [2, -4, 2],
  [3, -3, 0],
  [4, -2, -2],
  [3, 0, -3],
  [2, 2, -4],
  [0, 3, -3],
  [-2, 4, -2],
];
