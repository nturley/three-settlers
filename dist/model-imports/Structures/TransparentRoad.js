import * as THREE from "../../../_snowpack/pkg/three.js";
import React, {useRef} from "../../../_snowpack/pkg/react.js";
import {useGLTF} from "../../../_snowpack/pkg/@react-three/drei.js";
import path_straight from "./path_straight.glb.proxy.js";
export default function TransparentRoad(props) {
  const group = useRef();
  const {nodes, materials} = useGLTF(path_straight);
  const playerMaterials = React.useMemo(() => ({
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
  }, /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_path_straight.geometry,
    material: playerMaterials[props.playerColor]
  }), /* @__PURE__ */ React.createElement("lineSegments", {
    geometry: nodes.Mesh_path_straight_1.geometry,
    material: materials.dirt
  }));
}
useGLTF.preload(path_straight);
