import {Ring} from "../../../_snowpack/pkg/@react-three/drei.js";
import React from "../../../_snowpack/pkg/react.js";
import {hexCoordinateToWorld} from "../../geometry.js";
import {validFreeRoad} from "../../mechanics/roads.js";
import {validFreeSettlePosition} from "../../mechanics/settling.js";
export function HoverHex({hoverPos, gameState}) {
  let color = gameState.whoseTurn.color;
  if (gameState.phase === "Free Settlement") {
    if (!validFreeSettlePosition(hoverPos, gameState)) {
      color = "red";
    }
  }
  if (gameState.phase == "Free Road") {
    if (!validFreeRoad(hoverPos, gameState))
      color = "red";
  }
  return /* @__PURE__ */ React.createElement(Ring, {
    args: [0.6, 0.55, 6],
    position: hexCoordinateToWorld(hoverPos, 0.21),
    rotation: [Math.PI / 2, 0, Math.PI / 6]
  }, /* @__PURE__ */ React.createElement("meshBasicMaterial", {
    attach: "material",
    color
  }));
}
