import React from "../../_snowpack/pkg/react.js";
import {HexTile} from "./HexTile.js";
export function HexTilesBoard({tiles}) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, tiles.map((t) => /* @__PURE__ */ React.createElement(HexTile, {
    tile: t,
    key: t.pos.toString()
  })));
}
