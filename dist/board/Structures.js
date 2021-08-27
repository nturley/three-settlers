import React from "../../_snowpack/pkg/react.js";
import {hexCoordinateToWorld} from "../geometry.js";
import BuildingVillage from "../model-imports/Structures/BuildingVillage.js";
import {SingleRoad} from "../model-imports/Structures/SingleRoad.js";
export default function Structures({gameState}) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, gameState.settlements.map((s) => /* @__PURE__ */ React.createElement(BuildingVillage, {
    position: hexCoordinateToWorld(s.pos, 0),
    roofColor: s.owner.color,
    key: s.pos.toString()
  })), gameState.roads.map((s) => /* @__PURE__ */ React.createElement(SingleRoad, {
    road: s,
    gameState,
    key: s.pos.toString()
  })));
}
