import _ from 'lodash';
import type { Vec3Tuple } from './geometry';

export type TileType =
  | 'Field'
  | 'Pasture'
  | 'Mountains'
  | 'Clay'
  | 'Desert'
  | 'Forest';

export interface Tile {
  type: TileType;
  num: number;
  pos: Vec3Tuple;
}

const tilePile: TileType[] = [
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

const tileNumbers = [11, 3, 6, 5, 4, 9, 10, 8, 4, 11, 12, 9, 10, 8, 3, 6, 2, 5];

export function generateTiles(): Tile[] {
  let numIndex = -1;
  return _.shuffle(tilePile).map((t, i) => {
    if (t !== 'Desert') numIndex += 1;
    return {
      type: t,
      num: t === 'Desert' ? 0 : tileNumbers[numIndex],
      pos: tilePositions[i],
    };
  });
}
