import React, {useRef} from "../../../_snowpack/pkg/react.js";
import {useGLTF} from "../../../_snowpack/pkg/@react-three/drei.js";
import unit_boat from "./unit_boat.glb.proxy.js";
export default function Model(props) {
  const group = useRef();
  const {nodes, materials} = useGLTF(unit_boat);
  return /* @__PURE__ */ React.createElement("group", {
    ref: group,
    ...props,
    dispose: null
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.unit_boat.geometry,
    material: nodes.unit_boat.material
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Group.geometry,
    material: nodes.Group.material,
    position: [-0.13, 0.12, -0.09],
    rotation: [-Math.PI / 4, 0, -Math.PI / 2],
    scale: [0.21, 0.43, 0.29]
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Group_1.geometry,
    material: nodes.Group_1.material,
    position: [0.11, 0.12, -0.09],
    rotation: [-Math.PI / 4, 0, -Math.PI / 2],
    scale: [0.21, 0.43, 0.29]
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Group_2.geometry,
    material: nodes.Group_2.material,
    position: [-0.02, 0.12, 0.09],
    rotation: [-2.36, 0, -Math.PI / 2],
    scale: [-0.21, 0.43, 0.29]
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Group_3.geometry,
    material: nodes.Group_3.material,
    position: [-0.13, 0.12, 0.09],
    rotation: [-2.36, 0, -Math.PI / 2],
    scale: [-0.21, 0.43, 0.29]
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Group_4.geometry,
    material: nodes.Group_4.material,
    position: [0.11, 0.12, 0.09],
    rotation: [-2.36, 0, -Math.PI / 2],
    scale: [-0.21, 0.43, 0.29]
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Group_5.geometry,
    material: nodes.Group_5.material,
    position: [-0.02, 0.12, -0.09],
    rotation: [-Math.PI / 4, 0, -Math.PI / 2],
    scale: [0.21, 0.43, 0.29]
  })));
}
useGLTF.preload(unit_boat);
