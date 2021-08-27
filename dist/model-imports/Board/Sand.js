import React, {useRef} from "../../../_snowpack/pkg/react.js";
import {useGLTF} from "../../../_snowpack/pkg/@react-three/drei.js";
import sand from "./sand.glb.proxy.js";
export default function Model(props) {
  const group = useRef();
  const {nodes, materials} = useGLTF(sand);
  return /* @__PURE__ */ React.createElement("group", {
    ref: group,
    ...props,
    dispose: null
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sand.geometry,
    material: materials.dirt
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sand_1.geometry,
    material: materials.sand
  }));
}
useGLTF.preload(sand);
