import React, {useRef} from "../../../_snowpack/pkg/react.js";
import {useGLTF} from "../../../_snowpack/pkg/@react-three/drei.js";
import building_sheep from "./building_sheep.glb.proxy.js";
export default function Model(props) {
  const group = useRef();
  const {nodes, materials} = useGLTF(building_sheep);
  return /* @__PURE__ */ React.createElement("group", {
    ref: group,
    ...props,
    dispose: null
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_building_sheep.geometry,
    material: nodes.Mesh_building_sheep.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_building_sheep_1.geometry,
    material: materials.grass
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.fence.geometry,
    material: nodes.fence.material,
    position: [-0.48, 0.2, -0.06],
    rotation: [0, Math.PI / 2, 0]
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.fence_1.geometry,
    material: nodes.fence_1.material,
    position: [0.47, 0.2, 0.06],
    rotation: [0, -Math.PI / 2, 0]
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.fence_2.geometry,
    material: nodes.fence_2.material,
    position: [0.18, 0.2, -0.44],
    rotation: [0, -Math.PI / 6, 0]
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.fence_3.geometry,
    material: nodes.fence_3.material,
    position: [-0.18, 0.2, 0.44],
    rotation: [-Math.PI, Math.PI / 6, -Math.PI]
  }), /* @__PURE__ */ React.createElement("group", {
    position: [-0.2, 0.2, -0.22],
    rotation: [0, Math.PI / 3, 0]
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep.geometry,
    material: nodes.Mesh_sheep.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep_1.geometry,
    material: nodes.Mesh_sheep_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [0.06, 0.2, 0.3],
    rotation: [0, Math.PI / 6, 0]
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep.geometry,
    material: nodes.Mesh_sheep.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep_1.geometry,
    material: nodes.Mesh_sheep_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [0.32, 0.2, 0.09],
    rotation: [0, 0.18, 0]
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep.geometry,
    material: nodes.Mesh_sheep.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep_1.geometry,
    material: nodes.Mesh_sheep_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [0.04, 0.2, 0],
    rotation: [0, -Math.PI / 2, 0]
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep.geometry,
    material: nodes.Mesh_sheep.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep_1.geometry,
    material: nodes.Mesh_sheep_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [-0.25, 0.2, 0.13]
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep.geometry,
    material: nodes.Mesh_sheep.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep_1.geometry,
    material: nodes.Mesh_sheep_1.material
  })), /* @__PURE__ */ React.createElement("group", {
    position: [0.14, 0.2, -0.29],
    rotation: [Math.PI, -1.31, Math.PI],
    scale: [1, 1, 1]
  }, /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep.geometry,
    material: nodes.Mesh_sheep.material
  }), /* @__PURE__ */ React.createElement("mesh", {
    geometry: nodes.Mesh_sheep_1.geometry,
    material: nodes.Mesh_sheep_1.material
  })));
}
useGLTF.preload(building_sheep);
