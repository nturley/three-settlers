import React, {useRef} from "../../../_snowpack/pkg/react.js";
import {useGLTF} from "../../../_snowpack/pkg/@react-three/drei.js";
import grass from "./grass.glb.proxy.js";
export default function Model(props) {
  const group = useRef();
  const {nodes, materials} = useGLTF(grass);
  return /* @__PURE__ */ React.createElement("group", {
    ref: group,
    ...props,
    dispose: null
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_grass.geometry,
    material: materials.dirt
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_grass_1.geometry,
    material: materials.grass
  }));
}
useGLTF.preload(grass);
