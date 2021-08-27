const size = 0.5;
const h = Math.sqrt(3) * size;
const w = 2 * size;
export function hexCoordinateToWorld(cubicPos, height) {
  const [x, y, z] = cubicPos;
  return [x * w + z * w / 2, height, z * h];
}
export function hexDistance(a, b) {
  return a.reduce((acc, av, i) => acc + Math.abs(av - b[i]), 0) / 2;
}
