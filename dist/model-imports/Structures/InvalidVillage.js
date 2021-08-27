import * as THREE from "../../../_snowpack/pkg/three.js";
import React, {useRef} from "../../../_snowpack/pkg/react.js";
import {useGLTF} from "../../../_snowpack/pkg/@react-three/drei.js";
import building_village from "./building_village.glb.proxy.js";
export default function Model(props) {
  const group = useRef();
  const {nodes, materials} = useGLTF(building_village);
  const mat = React.useMemo(() => new THREE.MeshStandardMaterial({color: "red"}), []);
  return /* @__PURE__ */ React.createElement("group", {
    ref: group,
    ...props,
    dispose: null
  }, /* @__PURE__ */ React.createElement("group", {
    position: [-0.05, 0.2, -0.25]
  }, /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building.geometry,
    material: mat
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building_1.geometry,
    material: mat
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building_2.geometry,
    material: mat
  })), /* @__PURE__ */ React.createElement("group", {
    position: [0.03, 0.2, 0.22],
    rotation: [0, Math.PI / 4, 0]
  }, /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building_3.geometry,
    material: mat
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building_4.geometry,
    material: mat
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_building_5.geometry,
    material: mat
  })), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.chimney.geometry,
    material: mat,
    position: [-0.1, 0.2, 0.09],
    rotation: [0, Math.PI / 4, 0],
    scale: [1, 0.74, 1]
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.fence.geometry,
    material: mat,
    position: [0.18, 0.2, -0.44],
    rotation: [0, -Math.PI / 6, 0]
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.fence_1.geometry,
    material: mat,
    position: [0.47, 0.2, 0.06],
    rotation: [0, -Math.PI / 2, 0]
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Group.geometry,
    material: mat,
    position: [0.21, 0.2, -0.16],
    rotation: [0, Math.PI / 6, 0],
    scale: [0.74, 1, 0.74]
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Group_1.geometry,
    material: mat,
    position: [0.21, 0.2, 0.04],
    scale: [0.74, 1, 0.74]
  }), /* @__PURE__ */ React.createElement("group", {
    position: [-0.29, 0.2, 0.09],
    rotation: [0, -0.37, 0]
  }, /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_tree.geometry,
    material: mat
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: mat
  })), /* @__PURE__ */ React.createElement("group", {
    position: [0.35, 0.2, 0.22],
    rotation: [0, -0.11, 0],
    scale: [0.77, 0.77, 0.77]
  }, /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_tree.geometry,
    material: mat
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: mat
  })));
}
useGLTF.preload(building_village);
