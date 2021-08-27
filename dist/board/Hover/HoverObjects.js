import React from "../../../_snowpack/pkg/react.js";
import HoverSettlement from "./HoverSettlement.js";
import {HoverRoad} from "./HoverRoad.js";
import {HoverHex} from "./HoverHex.js";
export default function HoverObjects({gameState, hoverPos}) {
  if (hoverPos === void 0)
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HoverSettlement, {
    hoverPos,
    gameState
  }), /* @__PURE__ */ React.createElement(HoverRoad, {
    hoverPos,
    gameState,
    anchorPoint: gameState.fromPoint
  }), /* @__PURE__ */ React.createElement(HoverHex, {
    hoverPos,
    gameState
  }));
}
