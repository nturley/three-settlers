import React, {Suspense} from "../_snowpack/pkg/react.js";
import {Canvas} from "../_snowpack/pkg/@react-three/fiber.js";
import {Environment, OrbitControls} from "../_snowpack/pkg/@react-three/drei.js";
import "./App.css.proxy.js";
import {fakeGameState} from "./mechanics/gameState.js";
import Board from "./board/Board.js";
import Sidebar from "./Sidebar.js";
import DiceView from "./DiceView.js";
export default function App() {
  const [gameState, setGameState] = React.useState(fakeGameState());
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement(Sidebar, {
    gameState
  }), /* @__PURE__ */ React.createElement(Canvas, null, /* @__PURE__ */ React.createElement(Suspense, {
    fallback: null
  }, /* @__PURE__ */ React.createElement(Environment, {
    preset: "sunset",
    background: true
  }), /* @__PURE__ */ React.createElement(OrbitControls, null), /* @__PURE__ */ React.createElement(Board, {
    gameState,
    setGameState
  })), /* @__PURE__ */ React.createElement(DiceView, null)));
}
