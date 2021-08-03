const size = 0.5;
const h = Math.sqrt(3) * size;
const w = 2 * size;

export type Vec3Tuple = [x: number, y: number, z: number];

export function hexCoordinateToWorld(
  cubicPos: Vec3Tuple,
  height: number,
): Vec3Tuple {
  const [x, y, z] = cubicPos;
  return [x * w + (z * w) / 2, height, z * h];
}
