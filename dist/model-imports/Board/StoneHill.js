import React, {useRef} from "../../../_snowpack/pkg/react.js";
import {useGLTF} from "../../../_snowpack/pkg/@react-three/drei.js";
import stone_hill from "./stone_hill.glb.proxy.js";
export default function Model(props) {
  const group = useRef();
  const {nodes, materials} = useGLTF(stone_hill);
  return /* @__PURE__ */ React.createElement("group", {
    ref: group,
    ...props,
    dispose: null
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_stone_hill.geometry,
    material: materials.dirt
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_stone_hill_1.geometry,
    material: nodes.Mesh_stone_hill_1.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.rockLarge.geometry,
    material: nodes.rockLarge.material,
    position: [0, 0.2, 0],
    scale: [1, 0.5, 1]
  }));
}
useGLTF.preload(stone_hill);
