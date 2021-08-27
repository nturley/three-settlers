import React from "../../../_snowpack/pkg/react.js";
import {hexCoordinateToWorld, hexDistance} from "../../geometry.js";
import TransparentRoad from "../../model-imports/Structures/TransparentRoad.js";
export function HoverRoad({hoverPos, gameState, anchorPoint}) {
  if (anchorPoint) {
    if (gameState.settlements.find((s) => s.pos.toString() == anchorPoint.toString())) {
      if (hexDistance(hoverPos, anchorPoint) != 1)
        return /* @__PURE__ */ React.createElement(React.Fragment, null);
      const dp = hoverPos.map((h, i) => h - anchorPoint[i]);
      let rot = 0;
      if (dp[0] == 0)
        rot = -Math.PI / 3;
      if (dp[1] == 0)
        rot = -2 * Math.PI / 3;
      const avePos = hoverPos.map((p1, i) => p1 - dp[i] / 4);
      return /* @__PURE__ */ React.createElement(TransparentRoad, {
        position: hexCoordinateToWorld(avePos, 0.2),
        rotation: [0, rot, 0],
        playerColor: gameState.whoseTurn.color,
        scale: [0.65, 1, 1]
      });
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null);
}
