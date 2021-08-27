import React from "../../../_snowpack/pkg/react.js";
import {hexCoordinateToWorld} from "../../geometry.js";
import StraightRoad from "./StraightRoad.js";
export function SingleRoad({road, gameState}) {
  const dp = road.pos[1].map((to, i) => to - road.pos[0][i]);
  let rot = 0;
  if (dp[0] == 0)
    rot = -Math.PI / 3;
  if (dp[1] == 0)
    rot = -2 * Math.PI / 3;
  const avePos = road.pos[1].map((p1, i) => p1 - dp[i] / 4);
  return /* @__PURE__ */ React.createElement(StraightRoad, {
    position: hexCoordinateToWorld(avePos, 0.2),
    playerColor: road.owner.color,
    rotation: [0, rot, 0],
    scale: [0.65, 1, 1]
  });
}
