import React, {useMemo, useRef} from "../_snowpack/pkg/react.js";
import {createPortal, useFrame, useThree} from "../_snowpack/pkg/@react-three/fiber.js";
import {OrthographicCamera, RoundedBox, Text} from "../_snowpack/pkg/@react-three/drei.js";
import {Scene} from "../_snowpack/pkg/three.js";
export default function DiceView() {
  const {gl, scene, camera, size} = useThree();
  const virtualScene = useMemo(() => new Scene(), []);
  const virtualCam = useRef();
  useFrame(() => {
    gl.autoClear = true;
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();
    if (virtualCam.current !== void 0)
      gl.render(virtualScene, virtualCam.current);
  }, 1);
  return createPortal(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(OrthographicCamera, {
    ref: virtualCam,
    makeDefault: false,
    position: [0, 0, 100]
  }), /* @__PURE__ */ React.createElement(RoundedBox, {
    args: [50, 50, 50],
    radius: 10,
    smoothness: 4,
    position: [size.width / 2 - 80, size.height / 2 - 80, 0]
  }, /* @__PURE__ */ React.createElement("meshLambertMaterial", {
    attach: "material",
    color: "white"
  })), /* @__PURE__ */ React.createElement(Text, {
    position: [size.width / 2 - 80, size.height / 2 - 80, 50],
    fontSize: 25,
    color: "black"
  }, "6"), /* @__PURE__ */ React.createElement(RoundedBox, {
    args: [50, 50, 50],
    radius: 10,
    smoothness: 4,
    position: [size.width / 2 - 140, size.height / 2 - 80, 0]
  }, /* @__PURE__ */ React.createElement("meshLambertMaterial", {
    attach: "material",
    color: "white"
  })), /* @__PURE__ */ React.createElement(Text, {
    position: [size.width / 2 - 140, size.height / 2 - 80, 50],
    fontSize: 25,
    color: "black"
  }, "3"), /* @__PURE__ */ React.createElement("ambientLight", {
    intensity: 0.5
  }), /* @__PURE__ */ React.createElement("pointLight", {
    position: [10, 10, 10],
    intensity: 1
  })), virtualScene);
}
