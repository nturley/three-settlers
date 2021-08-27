import {Line} from "../../_snowpack/pkg/@react-three/drei.js";
import React from "../../_snowpack/pkg/react.js";
import {hexCoordinateToWorld} from "../geometry.js";
import {tilePositions} from "../tiles.js";
const points = [
  [1, 0, -1],
  [1, -1, 0],
  [0, -1, 1],
  [-1, 0, 1],
  [-1, 1, 0],
  [0, 1, -1],
  [1, 0, -1]
];
export function GridLines() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, tilePositions.map((p) => hexCoordinateToWorld(p, 0)).map((p) => /* @__PURE__ */ React.createElement(Line, {
    position: p,
    dashed: true,
    color: "white",
    dashSize: 1,
    dashScale: 10,
    dashOffset: 0.3,
    lineWidth: 0.5,
    points: points.map((p2) => hexCoordinateToWorld(p2, 0.25)),
    key: p.toString()
  })));
}
