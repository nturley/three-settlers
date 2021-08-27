import React, {useRef} from "../../../_snowpack/pkg/react.js";
import {useGLTF} from "../../../_snowpack/pkg/@react-three/drei.js";
import grass_forest from "./grass_forest.glb.proxy.js";
export default function Model(props) {
  const group = useRef();
  const {nodes, materials} = useGLTF(grass_forest);
  return /* @__PURE__ */ React.createElement("group", {
    ref: group,
    ...props,
    dispose: null
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_grass_forest.geometry,
    material: materials.dirt
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_grass_forest_1.geometry,
    material: materials.grass
  }), /* @__PURE__ */ React.createElement("group", {
    position: [0.32, 0.2, -0.08],
    rotation: [0, -0.26, 0],
    scale: [1, 1, 1]
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree.geometry,
    material: nodes.Mesh_tree.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: nodes.Mesh_tree_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [0.29, 0.2, 0.21],
    rotation: [0, -Math.PI / 6, 0],
    scale: 0.77
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree.geometry,
    material: nodes.Mesh_tree.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: nodes.Mesh_tree_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [0.01, 0.2, 0.3]
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree.geometry,
    material: nodes.Mesh_tree.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: nodes.Mesh_tree_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [0.17, 0.2, -0.32],
    rotation: [0, Math.PI / 6, 0],
    scale: 0.62
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree.geometry,
    material: nodes.Mesh_tree.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: nodes.Mesh_tree_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [-0.29, 0.2, -0.16],
    rotation: [0, -0.66, 0],
    scale: [1, 1, 1]
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree.geometry,
    material: nodes.Mesh_tree.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: nodes.Mesh_tree_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [-0.3, 0.2, 0.19],
    rotation: [0, -0.05, 0],
    scale: 0.62
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree.geometry,
    material: nodes.Mesh_tree.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: nodes.Mesh_tree_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [-0.04, 0.2, 0.01],
    rotation: [0, 0.26, 0],
    scale: [0.77, 0.77, 0.77]
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree.geometry,
    material: nodes.Mesh_tree.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: nodes.Mesh_tree_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [-0.08, 0.2, -0.35],
    rotation: [0, 0.15, 0],
    scale: 0.77
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree.geometry,
    material: nodes.Mesh_tree.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_tree_1.geometry,
    material: nodes.Mesh_tree_1.material
  })));
}
useGLTF.preload(grass_forest);
