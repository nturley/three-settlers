import React, {useRef} from "../../../_snowpack/pkg/react.js";
import {useGLTF} from "../../../_snowpack/pkg/@react-three/drei.js";
import building_farm from "./building_farm.glb.proxy.js";
export default function Model(props) {
  const group = useRef();
  const {nodes, materials} = useGLTF(building_farm);
  return /* @__PURE__ */ React.createElement("group", {
    ref: group,
    ...props,
    dispose: null
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_building_farm.geometry,
    material: nodes.Mesh_building_farm.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_building_farm_1.geometry,
    material: materials.grass
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.fence.geometry,
    material: nodes.fence.material,
    position: [-0.38, 0.2, 0],
    rotation: [0, Math.PI / 2, 0]
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.grain.geometry,
    material: nodes.grain.material,
    position: [0.05, 0.2, 0.09],
    rotation: [0, -Math.PI / 3, 0]
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.grainBundle.geometry,
    material: nodes.grainBundle.material,
    position: [-0.29, 0.2, -0.13]
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.grainBundle_1.geometry,
    material: nodes.grainBundle_1.material,
    position: [-0.15, 0.2, -0.23],
    rotation: [0, -Math.PI / 6, 0],
    scale: [1, 0.5, 1]
  }));
}
useGLTF.preload(building_farm);
