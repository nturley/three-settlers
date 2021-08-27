import React from "../../_snowpack/pkg/react.js";
import {StaticBoard} from "./StaticBoard.js";
import {HexTilesBoard} from "./HexTilesBoard.js";
import {onGrassClick} from "../mechanics/gameActions.js";
import Structures from "./Structures.js";
import HoverObjects from "./Hover/HoverObjects.js";
export default function Board({gameState, setGameState}) {
  const [hoverPos, setHoverPos] = React.useState();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(StaticBoard, {
    onGrassClick: (p) => {
      setGameState(onGrassClick(p, gameState));
    },
    onGrassEnter: (p) => setHoverPos(p),
    onGrassLeave: (p) => {
    }
  }), /* @__PURE__ */ React.createElement(HexTilesBoard, {
    tiles: gameState.tiles
  }), /* @__PURE__ */ React.createElement(Structures, {
    gameState
  }), /* @__PURE__ */ React.createElement(HoverObjects, {
    gameState,
    hoverPos
  }));
}
