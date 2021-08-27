import React from "../../_snowpack/pkg/react.js";
import BuildingFarm from "../model-imports/Board/BuildingFarm.js";
import BuildingSheep from "../model-imports/Board/BuildingSheep.js";
import Dirt from "../model-imports/Board/Dirt.js";
import Forest from "../model-imports/Board/Forest.js";
import {hexCoordinateToWorld} from "../geometry.js";
import Sand from "../model-imports/Board/Sand.js";
import StoneHill from "../model-imports/Board/StoneHill.js";
import {Text} from "../../_snowpack/pkg/@react-three/drei.js";
import {useFrame} from "../../_snowpack/pkg/@react-three/fiber.js";
import mergeRefs from "../../_snowpack/pkg/react-merge-refs.js";
const tileToComponent = new Map([
  ["Field", BuildingFarm],
  ["Pasture", BuildingSheep],
  ["Desert", Sand],
  ["Mountains", StoneHill],
  ["Clay", Dirt],
  ["Forest", Forest]
]);
const Billboard = React.forwardRef(function Billboard2({follow = true, lockX = false, lockY = false, lockZ = false, ...props}, ref) {
  const localRef = React.useRef();
  useFrame(({camera}) => {
    if (!follow || !localRef.current)
      return;
    const prevRotation = localRef.current.rotation.clone();
    localRef.current.quaternion.copy(camera.quaternion);
    if (lockX)
      localRef.current.rotation.x = prevRotation.x;
    if (lockY)
      localRef.current.rotation.y = prevRotation.y;
    if (lockZ)
      localRef.current.rotation.z = prevRotation.z;
  });
  return /* @__PURE__ */ React.createElement("group", {
    ref: mergeRefs([localRef, ref]),
    ...props
  });
});
export function HexTile(props) {
  const tileType = props.tile.type;
  let hoverHeight = 0.3;
  if (tileType === "Field")
    hoverHeight = 0.45;
  if (tileType === "Pasture")
    hoverHeight = 0.5;
  if (tileType === "Forest")
    hoverHeight = 0.65;
  if (tileType === "Mountains")
    hoverHeight = 0.8;
  const pos = hexCoordinateToWorld(props.tile.pos, 0);
  const Tile = tileToComponent.get(props.tile.type);
  if (!Tile)
    throw new Error("Unexpected hex type");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, tileType !== "Desert" && /* @__PURE__ */ React.createElement(Billboard, {
    position: [pos[0], pos[1] + hoverHeight, pos[2]],
    follow: true,
    material: void 0
  }, /* @__PURE__ */ React.createElement(Text, {
    color: "#000000",
    fontSize: 0.3,
    textAlign: "center",
    font: "https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff",
    anchorX: "center",
    anchorY: "middle"
  }, props.tile.num)), /* @__PURE__ */ React.createElement(Tile, {
    ...props,
    position: pos
  }));
}
