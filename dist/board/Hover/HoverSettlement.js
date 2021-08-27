import React from "../../../_snowpack/pkg/react.js";
import {hexCoordinateToWorld} from "../../geometry.js";
import InvalidVillage from "../../model-imports/Structures/InvalidVillage.js";
import TransparentVillage from "../../model-imports/Structures/TransparentVillage.js";
import {validFreeSettlePosition} from "../../mechanics/settling.js";
export default function HoverSettlement({hoverPos, gameState}) {
  if (gameState.phase === "Free Settlement") {
    if (!validFreeSettlePosition(hoverPos, gameState)) {
      return /* @__PURE__ */ React.createElement(InvalidVillage, {
        position: hexCoordinateToWorld(hoverPos, 0)
      });
    }
    return /* @__PURE__ */ React.createElement(TransparentVillage, {
      position: hexCoordinateToWorld(hoverPos, 0),
      roofColor: gameState.whoseTurn.color
    });
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null);
}
