import * as THREE from "../../../_snowpack/pkg/three.js";
import React, {useRef} from "../../../_snowpack/pkg/react.js";
import {useGLTF} from "../../../_snowpack/pkg/@react-three/drei.js";
import building_village from "./building_village.glb.proxy.js";
export default function Model(props) {
  const group = useRef();
  const {nodes, materials} = useGLTF(building_village);
  const roofMaterials = React.useMemo(() => ({
    red: new THREE.MeshStandardMaterial({color: "red"}),
    blue: new THREE.MeshStandardMaterial({color: "blue"}),
    white: new THREE.MeshStandardMaterial({color: "white"}),
    green: new THREE.MeshStandardMaterial({color: "green"}),
    gray: new THREE.MeshStandardMaterial({color: "gray"})
  }), []);
  return /* @__PURE__ */ React.createElement("group", {
    ref: group,
    ...props,
    dispose: null
  }, /* @__PURE__ */ React.createElement("group", {
    position: [-0.05, 0.2, -0.25]
  }, /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building.geometry,
    material: roofMaterials[props.roofColor]
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building_1.geometry,
    material: nodes.Mesh_building_1.material
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building_2.geometry,
    material: nodes.Mesh_building_2.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [0.03, 0.2, 0.22],
    rotation: [0, Math.PI / 4, 0]
  }, /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building_3.geometry,
    material: roofMaterials[props.roofColor]
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building_4.geometry,
    material: nodes.Mesh_building_4.material
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building_5.geometry,
    material: nodes.Mesh_building_5.material
  })), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.chimney.geometry,
    material: materials.stone,
    position: [-0.1, 0.2, 0.09],
    rotation: [0, Math.PI / 4, 0],
    scale: [1, 0.74, 1]
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.fence.geometry,
    material: nodes.fence.material,
    position: [0.18, 0.2, -0.44],
    rotation: [0, -Math.PI / 6, 0]
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.fence_1.geometry,
    material: nodes.fence_1.material,
    position: [0.47, 0.2, 0.06],
    rotation: [0, -Math.PI / 2, 0]
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Group.geometry,
    material: nodes.Group.material,
    position: [0.21, 0.2, -0.16],
    rotation: [0, Math.PI / 6, 0],
    scale: [0.74, 1, 0.74]
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Group_1.geometry,
    material: nodes.Group_1.material,
    position: [0.21, 0.2, 0.04],
    scale: [0.74, 1, 0.74]
  }), /* @__PURE__ */ React.createElement("group", {
    position: [-0.29, 0.2, 0.09],
    rotation: [0, -0.37, 0]
  }, /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_tree.geometry,
    material: nodes.Mesh_tree.material
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: nodes.Mesh_tree_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [0.35, 0.2, 0.22],
    rotation: [0, -0.11, 0],
    scale: [0.77, 0.77, 0.77]
  }, /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_tree.geometry,
    material: nodes.Mesh_tree.material
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: nodes.Mesh_tree_1.material
  })));
}
useGLTF.preload(building_village);
