import React from "../_snowpack/pkg/react.js";
import {GiBrickPile, GiCardPlay, GiOre, GiSheep, GiWheat, GiWoodPile} from "../_snowpack/pkg/react-icons/gi.js";
export default function Sidebar({gameState}) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "page"
  }, gameState.players.map((player) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, player.name, " (", player.color, ")"), /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(GiBrickPile, null)), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(GiWoodPile, null)), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(GiWheat, null)), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(GiSheep, null)), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(GiOre, null)), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(GiCardPlay, null)))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, player.resources.bricks), /* @__PURE__ */ React.createElement("td", null, player.resources.wood), /* @__PURE__ */ React.createElement("td", null, player.resources.wheat), /* @__PURE__ */ React.createElement("td", null, player.resources.sheep), /* @__PURE__ */ React.createElement("td", null, player.resources.ore), /* @__PURE__ */ React.createElement("td", null, player.cards.length)))))));
}