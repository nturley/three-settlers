import { r as react } from '../common/index-04edb6a1.js';
import { u as useThree, a as useLoader, b as useAsset, c as useFrame } from '../common/react-three-fiber.esm-0f9bdfd7.js';
import { E as EventDispatcher, V as Vector3, M as MOUSE, T as TOUCH, P as PerspectiveCamera, Q as Quaternion, S as Spherical, a as Vector2, O as OrthographicCamera$1, L as Loader, b as LoaderUtils, F as FileLoader, C as Color, c as SpotLight, d as PointLight, D as DirectionalLight, e as MeshBasicMaterial, f as MeshPhysicalMaterial, s as sRGBEncoding, g as TangentSpaceNormalMap, I as ImageBitmapLoader, h as TextureLoader, i as InterleavedBuffer, B as BufferAttribute, R as RGBFormat, j as LinearFilter, k as LinearMipmapLinearFilter, l as RepeatWrapping, m as PointsMaterial, n as Material, o as LineBasicMaterial, p as MeshStandardMaterial, q as DoubleSide, r as PropertyBinding, t as BufferGeometry, u as SkinnedMesh, v as Mesh, w as LineSegments, x as Line$1, y as LineLoop, z as Points, G as Group, A as MathUtils, H as InterpolateLinear, J as AnimationClip, K as Bone, N as Object3D, U as Matrix4, W as Skeleton, X as TriangleFanDrawMode, Y as Interpolant, Z as NearestFilter, _ as NearestMipmapNearestFilter, $ as LinearMipmapNearestFilter, a0 as NearestMipmapLinearFilter, a1 as ClampToEdgeWrapping, a2 as MirroredRepeatWrapping, a3 as InterpolateDiscrete, a4 as FrontSide, a5 as InterleavedBufferAttribute, a6 as Texture, a7 as TriangleStripDrawMode, a8 as VectorKeyframeTrack, a9 as QuaternionKeyframeTrack, aa as NumberKeyframeTrack, ab as Box3, ac as Sphere, ad as DataTextureLoader, ae as UnsignedByteType, af as HalfFloatType, ag as FloatType, ah as DataUtils, ai as RGBEFormat, aj as LinearEncoding, ak as RGBEEncoding, al as InstancedBufferGeometry, am as Float32BufferAttribute, an as InstancedInterleavedBuffer, ao as WireframeGeometry, ap as ShaderLib, aq as UniformsUtils, ar as UniformsLib, as as ShaderMaterial, at as Vector4, au as Line3, av as MeshDepthMaterial, aw as RGBADepthPacking, ax as MeshDistanceMaterial, ay as ShaderChunk, az as DataTexture, aA as RGBAFormat, aB as Matrix3, aC as PlaneGeometry, aD as InstancedBufferAttribute, aE as PMREMGenerator, aF as CubeTextureLoader, aG as Shape } from '../common/three.module-a38a28fd.js';
import { m as mergeRefs } from '../common/react-merge-refs.esm-309210cb.js';
import '../common/_commonjsHelpers-8c19dec8.js';
import '../common/index-4cc9f833.js';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function create(type) {
  const El = type + 'BufferGeometry';
  return /*#__PURE__*/react.forwardRef(({
    args,
    children,
    ...props
  }, ref) => /*#__PURE__*/react.createElement("mesh", _extends({
    ref: ref
  }, props), /*#__PURE__*/react.createElement(El, {
    attach: "geometry",
    args: args
  }), children));
}
const Ring = create('ring');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one-finger move
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

const moduloWrapAround = (offset, capacity) => (offset % capacity + capacity) % capacity;

class OrbitControls extends EventDispatcher {
  // Set to false to disable this control
  // "target" sets the location of focus, where the object orbits around
  // How far you can dolly in and out ( PerspectiveCamera only )
  // How far you can zoom in and out ( OrthographicCamera only )
  // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.
  // radians
  // radians
  // How far you can orbit horizontally, upper and lower limits.
  // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
  // radians
  // radians
  // Set to true to enable damping (inertia)
  // If damping is enabled, you must call controls.update() in your animation loop
  // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
  // Set to false to disable zooming
  // Set to false to disable rotating
  // Set to false to disable panning
  // if false, pan orthogonal to world-space direction camera.up
  // pixels moved per arrow key push
  // Set to true to automatically rotate around the target
  // If auto-rotate is enabled, you must call controls.update() in your animation loop
  // 30 seconds per orbit when fps is 60
  // The four arrow keys
  // Mouse buttons
  // Touch fingers
  // the target DOM element for key events
  constructor(object, domElement) {
    super();

    _defineProperty(this, "object", void 0);

    _defineProperty(this, "domElement", void 0);

    _defineProperty(this, "enabled", true);

    _defineProperty(this, "target", new Vector3());

    _defineProperty(this, "minDistance", 0);

    _defineProperty(this, "maxDistance", Infinity);

    _defineProperty(this, "minZoom", 0);

    _defineProperty(this, "maxZoom", Infinity);

    _defineProperty(this, "minPolarAngle", 0);

    _defineProperty(this, "maxPolarAngle", Math.PI);

    _defineProperty(this, "minAzimuthAngle", -Infinity);

    _defineProperty(this, "maxAzimuthAngle", Infinity);

    _defineProperty(this, "enableDamping", false);

    _defineProperty(this, "dampingFactor", 0.05);

    _defineProperty(this, "enableZoom", true);

    _defineProperty(this, "zoomSpeed", 1.0);

    _defineProperty(this, "enableRotate", true);

    _defineProperty(this, "rotateSpeed", 1.0);

    _defineProperty(this, "enablePan", true);

    _defineProperty(this, "panSpeed", 1.0);

    _defineProperty(this, "screenSpacePanning", true);

    _defineProperty(this, "keyPanSpeed", 7.0);

    _defineProperty(this, "autoRotate", false);

    _defineProperty(this, "autoRotateSpeed", 2.0);

    _defineProperty(this, "keys", {
      LEFT: 'ArrowLeft',
      UP: 'ArrowUp',
      RIGHT: 'ArrowRight',
      BOTTOM: 'ArrowDown'
    });

    _defineProperty(this, "mouseButtons", {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN
    });

    _defineProperty(this, "touches", {
      ONE: TOUCH.ROTATE,
      TWO: TOUCH.DOLLY_PAN
    });

    _defineProperty(this, "target0", void 0);

    _defineProperty(this, "position0", void 0);

    _defineProperty(this, "zoom0", void 0);

    _defineProperty(this, "_domElementKeyEvents", null);

    _defineProperty(this, "getPolarAngle", void 0);

    _defineProperty(this, "getAzimuthalAngle", void 0);

    _defineProperty(this, "setPolarAngle", void 0);

    _defineProperty(this, "setAzimuthalAngle", void 0);

    _defineProperty(this, "listenToKeyEvents", void 0);

    _defineProperty(this, "saveState", void 0);

    _defineProperty(this, "reset", void 0);

    _defineProperty(this, "update", void 0);

    _defineProperty(this, "connect", void 0);

    _defineProperty(this, "dispose", void 0);

    this.object = object;
    this.domElement = domElement; // for reset

    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object instanceof PerspectiveCamera ? this.object.zoom : 1; //
    // public methods
    //

    this.getPolarAngle = () => spherical.phi;

    this.getAzimuthalAngle = () => spherical.theta;

    this.setPolarAngle = value => {
      // use modulo wrapping to safeguard value
      let phi = moduloWrapAround(value, 2 * Math.PI);
      let currentPhi = spherical.phi; // convert to the equivalent shortest angle

      if (currentPhi < 0) currentPhi += 2 * Math.PI;
      if (phi < 0) phi += 2 * Math.PI;
      let phiDist = Math.abs(phi - currentPhi);

      if (2 * Math.PI - phiDist < phiDist) {
        if (phi < currentPhi) {
          phi += 2 * Math.PI;
        } else {
          currentPhi += 2 * Math.PI;
        }
      }

      sphericalDelta.phi = phi - currentPhi;
      scope.update();
    };

    this.setAzimuthalAngle = value => {
      // use modulo wrapping to safeguard value
      let theta = moduloWrapAround(value, 2 * Math.PI);
      let currentTheta = spherical.theta; // convert to the equivalent shortest angle

      if (currentTheta < 0) currentTheta += 2 * Math.PI;
      if (theta < 0) theta += 2 * Math.PI;
      let thetaDist = Math.abs(theta - currentTheta);

      if (2 * Math.PI - thetaDist < thetaDist) {
        if (theta < currentTheta) {
          theta += 2 * Math.PI;
        } else {
          currentTheta += 2 * Math.PI;
        }
      }

      sphericalDelta.theta = theta - currentTheta;
      scope.update();
    };

    this.listenToKeyEvents = domElement => {
      domElement.addEventListener('keydown', onKeyDown);
      this._domElementKeyEvents = domElement;
    };

    this.saveState = () => {
      scope.target0.copy(scope.target);
      scope.position0.copy(scope.object.position);
      scope.zoom0 = scope.object instanceof PerspectiveCamera ? scope.object.zoom : 1;
    };

    this.reset = () => {
      scope.target.copy(scope.target0);
      scope.object.position.copy(scope.position0);

      if (scope.object instanceof PerspectiveCamera) {
        scope.object.zoom = scope.zoom0;
        scope.object.updateProjectionMatrix();
      }

      scope.dispatchEvent(changeEvent);
      scope.update();
      state = STATE.NONE;
    }; // this method is exposed, but perhaps it would be better if we can make it private...


    this.update = (() => {
      const offset = new Vector3(); // so camera.up is the orbit axis

      const quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));
      const quatInverse = quat.clone().invert();
      const lastPosition = new Vector3();
      const lastQuaternion = new Quaternion();
      const twoPI = 2 * Math.PI;
      return function update() {
        const position = scope.object.position;
        offset.copy(position).sub(scope.target); // rotate offset to "y-axis-is-up" space

        offset.applyQuaternion(quat); // angle from z-axis around y-axis

        spherical.setFromVector3(offset);

        if (scope.autoRotate && state === STATE.NONE) {
          rotateLeft(getAutoRotationAngle());
        }

        if (scope.enableDamping) {
          spherical.theta += sphericalDelta.theta * scope.dampingFactor;
          spherical.phi += sphericalDelta.phi * scope.dampingFactor;
        } else {
          spherical.theta += sphericalDelta.theta;
          spherical.phi += sphericalDelta.phi;
        } // restrict theta to be between desired limits


        let min = scope.minAzimuthAngle;
        let max = scope.maxAzimuthAngle;

        if (isFinite(min) && isFinite(max)) {
          if (min < -Math.PI) min += twoPI;else if (min > Math.PI) min -= twoPI;
          if (max < -Math.PI) max += twoPI;else if (max > Math.PI) max -= twoPI;

          if (min <= max) {
            spherical.theta = Math.max(min, Math.min(max, spherical.theta));
          } else {
            spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);
          }
        } // restrict phi to be between desired limits


        spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
        spherical.makeSafe();
        spherical.radius *= scale; // restrict radius to be between desired limits

        spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius)); // move target to panned location

        if (scope.enableDamping === true) {
          scope.target.addScaledVector(panOffset, scope.dampingFactor);
        } else {
          scope.target.add(panOffset);
        }

        offset.setFromSpherical(spherical); // rotate offset back to "camera-up-vector-is-up" space

        offset.applyQuaternion(quatInverse);
        position.copy(scope.target).add(offset);
        scope.object.lookAt(scope.target);

        if (scope.enableDamping === true) {
          sphericalDelta.theta *= 1 - scope.dampingFactor;
          sphericalDelta.phi *= 1 - scope.dampingFactor;
          panOffset.multiplyScalar(1 - scope.dampingFactor);
        } else {
          sphericalDelta.set(0, 0, 0);
          panOffset.set(0, 0, 0);
        }

        scale = 1; // update condition is:
        // min(camera displacement, camera rotation in radians)^2 > EPS
        // using small-angle approximation cos(x/2) = 1 - x^2 / 8

        if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
          scope.dispatchEvent(changeEvent);
          lastPosition.copy(scope.object.position);
          lastQuaternion.copy(scope.object.quaternion);
          zoomChanged = false;
          return true;
        }

        return false;
      };
    })(); // https://github.com/mrdoob/three.js/issues/20575


    this.connect = domElement => {
      if (domElement === document) {
        console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.');
      }

      scope.domElement = domElement; // disables touch scroll
      // touch-action needs to be defined for pointer events to work on mobile
      // https://stackoverflow.com/a/48254578

      scope.domElement.style.touchAction = 'none';
      scope.domElement.addEventListener('contextmenu', onContextMenu);
      scope.domElement.addEventListener('pointerdown', onPointerDown);
      scope.domElement.addEventListener('pointercancel', onPointerCancel);
      scope.domElement.addEventListener('wheel', onMouseWheel);
    };

    this.dispose = () => {
      var _scope$domElement, _scope$domElement2, _scope$domElement3, _scope$domElement4, _scope$domElement5, _scope$domElement6;

      (_scope$domElement = scope.domElement) === null || _scope$domElement === void 0 ? void 0 : _scope$domElement.removeEventListener('contextmenu', onContextMenu);
      (_scope$domElement2 = scope.domElement) === null || _scope$domElement2 === void 0 ? void 0 : _scope$domElement2.removeEventListener('pointerdown', onPointerDown);
      (_scope$domElement3 = scope.domElement) === null || _scope$domElement3 === void 0 ? void 0 : _scope$domElement3.removeEventListener('pointercancel', onPointerCancel);
      (_scope$domElement4 = scope.domElement) === null || _scope$domElement4 === void 0 ? void 0 : _scope$domElement4.removeEventListener('wheel', onMouseWheel);
      (_scope$domElement5 = scope.domElement) === null || _scope$domElement5 === void 0 ? void 0 : _scope$domElement5.ownerDocument.removeEventListener('pointermove', onPointerMove);
      (_scope$domElement6 = scope.domElement) === null || _scope$domElement6 === void 0 ? void 0 : _scope$domElement6.ownerDocument.removeEventListener('pointerup', onPointerUp);

      if (scope._domElementKeyEvents !== null) {
        scope._domElementKeyEvents.removeEventListener('keydown', onKeyDown);
      } //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

    }; //
    // internals
    //


    const scope = this;
    const changeEvent = {
      type: 'change'
    };
    const startEvent = {
      type: 'start'
    };
    const endEvent = {
      type: 'end'
    };
    const STATE = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let state = STATE.NONE;
    const EPS = 0.000001; // current position in spherical coordinates

    const spherical = new Spherical();
    const sphericalDelta = new Spherical();
    let scale = 1;
    const panOffset = new Vector3();
    let zoomChanged = false;
    const rotateStart = new Vector2();
    const rotateEnd = new Vector2();
    const rotateDelta = new Vector2();
    const panStart = new Vector2();
    const panEnd = new Vector2();
    const panDelta = new Vector2();
    const dollyStart = new Vector2();
    const dollyEnd = new Vector2();
    const dollyDelta = new Vector2();
    const pointers = [];
    const pointerPositions = {};

    function getAutoRotationAngle() {
      return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
    }

    function getZoomScale() {
      return Math.pow(0.95, scope.zoomSpeed);
    }

    function rotateLeft(angle) {
      sphericalDelta.theta -= angle;
    }

    function rotateUp(angle) {
      sphericalDelta.phi -= angle;
    }

    const panLeft = (() => {
      const v = new Vector3();
      return function panLeft(distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix

        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    })();

    const panUp = (() => {
      const v = new Vector3();
      return function panUp(distance, objectMatrix) {
        if (scope.screenSpacePanning === true) {
          v.setFromMatrixColumn(objectMatrix, 1);
        } else {
          v.setFromMatrixColumn(objectMatrix, 0);
          v.crossVectors(scope.object.up, v);
        }

        v.multiplyScalar(distance);
        panOffset.add(v);
      };
    })(); // deltaX and deltaY are in pixels; right and down are positive


    const pan = (() => {
      const offset = new Vector3();
      return function pan(deltaX, deltaY) {
        const element = scope.domElement;

        if (element && scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera) {
          // perspective
          const position = scope.object.position;
          offset.copy(position).sub(scope.target);
          let targetDistance = offset.length(); // half of the fov is center to top of screen

          targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0); // we use only clientHeight here so aspect ratio does not distort speed

          panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
          panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
        } else if (element && scope.object instanceof OrthographicCamera$1 && scope.object.isOrthographicCamera) {
          // orthographic
          panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
          panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
        } else {
          // camera neither orthographic nor perspective
          console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
          scope.enablePan = false;
        }
      };
    })();

    function dollyOut(dollyScale) {
      if (scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera) {
        scale /= dollyScale;
      } else if (scope.object instanceof OrthographicCamera$1 && scope.object.isOrthographicCamera) {
        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
        scope.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
        scope.enableZoom = false;
      }
    }

    function dollyIn(dollyScale) {
      if (scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera) {
        scale *= dollyScale;
      } else if (scope.object instanceof OrthographicCamera$1 && scope.object.isOrthographicCamera) {
        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
        scope.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
        scope.enableZoom = false;
      }
    } //
    // event callbacks - update the object state
    //


    function handleMouseDownRotate(event) {
      rotateStart.set(event.clientX, event.clientY);
    }

    function handleMouseDownDolly(event) {
      dollyStart.set(event.clientX, event.clientY);
    }

    function handleMouseDownPan(event) {
      panStart.set(event.clientX, event.clientY);
    }

    function handleMouseMoveRotate(event) {
      rotateEnd.set(event.clientX, event.clientY);
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
      const element = scope.domElement;

      if (element) {
        rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight); // yes, height

        rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      }

      rotateStart.copy(rotateEnd);
      scope.update();
    }

    function handleMouseMoveDolly(event) {
      dollyEnd.set(event.clientX, event.clientY);
      dollyDelta.subVectors(dollyEnd, dollyStart);

      if (dollyDelta.y > 0) {
        dollyOut(getZoomScale());
      } else if (dollyDelta.y < 0) {
        dollyIn(getZoomScale());
      }

      dollyStart.copy(dollyEnd);
      scope.update();
    }

    function handleMouseMovePan(event) {
      panEnd.set(event.clientX, event.clientY);
      panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
      scope.update();
    }

    function handleMouseWheel(event) {
      if (event.deltaY < 0) {
        dollyIn(getZoomScale());
      } else if (event.deltaY > 0) {
        dollyOut(getZoomScale());
      }

      scope.update();
    }

    function handleKeyDown(event) {
      let needsUpdate = false;

      switch (event.code) {
        case scope.keys.UP:
          pan(0, scope.keyPanSpeed);
          needsUpdate = true;
          break;

        case scope.keys.BOTTOM:
          pan(0, -scope.keyPanSpeed);
          needsUpdate = true;
          break;

        case scope.keys.LEFT:
          pan(scope.keyPanSpeed, 0);
          needsUpdate = true;
          break;

        case scope.keys.RIGHT:
          pan(-scope.keyPanSpeed, 0);
          needsUpdate = true;
          break;
      }

      if (needsUpdate) {
        // prevent the browser from scrolling on cursor keys
        event.preventDefault();
        scope.update();
      }
    }

    function handleTouchStartRotate() {
      if (pointers.length == 1) {
        rotateStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        rotateStart.set(x, y);
      }
    }

    function handleTouchStartPan() {
      if (pointers.length == 1) {
        panStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        panStart.set(x, y);
      }
    }

    function handleTouchStartDolly() {
      const dx = pointers[0].pageX - pointers[1].pageX;
      const dy = pointers[0].pageY - pointers[1].pageY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyStart.set(0, distance);
    }

    function handleTouchStartDollyPan() {
      if (scope.enableZoom) handleTouchStartDolly();
      if (scope.enablePan) handleTouchStartPan();
    }

    function handleTouchStartDollyRotate() {
      if (scope.enableZoom) handleTouchStartDolly();
      if (scope.enableRotate) handleTouchStartRotate();
    }

    function handleTouchMoveRotate(event) {
      if (pointers.length == 1) {
        rotateEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        rotateEnd.set(x, y);
      }

      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
      const element = scope.domElement;

      if (element) {
        rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight); // yes, height

        rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      }

      rotateStart.copy(rotateEnd);
    }

    function handleTouchMovePan(event) {
      if (pointers.length == 1) {
        panEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        panEnd.set(x, y);
      }

      panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
    }

    function handleTouchMoveDolly(event) {
      const position = getSecondPointerPosition(event);
      const dx = event.pageX - position.x;
      const dy = event.pageY - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyEnd.set(0, distance);
      dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));
      dollyOut(dollyDelta.y);
      dollyStart.copy(dollyEnd);
    }

    function handleTouchMoveDollyPan(event) {
      if (scope.enableZoom) handleTouchMoveDolly(event);
      if (scope.enablePan) handleTouchMovePan(event);
    }

    function handleTouchMoveDollyRotate(event) {
      if (scope.enableZoom) handleTouchMoveDolly(event);
      if (scope.enableRotate) handleTouchMoveRotate(event);
    }
    // event handlers - FSM: listen for events and reset state
    //


    function onPointerDown(event) {
      if (scope.enabled === false) return;

      if (pointers.length === 0) {
        var _scope$domElement7, _scope$domElement8;

        (_scope$domElement7 = scope.domElement) === null || _scope$domElement7 === void 0 ? void 0 : _scope$domElement7.ownerDocument.addEventListener('pointermove', onPointerMove);
        (_scope$domElement8 = scope.domElement) === null || _scope$domElement8 === void 0 ? void 0 : _scope$domElement8.ownerDocument.addEventListener('pointerup', onPointerUp);
      }

      addPointer(event);

      if (event.pointerType === 'touch') {
        onTouchStart(event);
      } else {
        onMouseDown(event);
      }
    }

    function onPointerMove(event) {
      if (scope.enabled === false) return;

      if (event.pointerType === 'touch') {
        onTouchMove(event);
      } else {
        onMouseMove(event);
      }
    }

    function onPointerUp(event) {
      if (scope.enabled === false) return;

      if (event.pointerType === 'touch') {
        onTouchEnd();
      } else {
        onMouseUp();
      }

      removePointer(event);

      if (pointers.length === 0) {
        var _scope$domElement9, _scope$domElement10;

        (_scope$domElement9 = scope.domElement) === null || _scope$domElement9 === void 0 ? void 0 : _scope$domElement9.ownerDocument.removeEventListener('pointermove', onPointerMove);
        (_scope$domElement10 = scope.domElement) === null || _scope$domElement10 === void 0 ? void 0 : _scope$domElement10.ownerDocument.removeEventListener('pointerup', onPointerUp);
      }
    }

    function onPointerCancel(event) {
      removePointer(event);
    }

    function onMouseDown(event) {
      let mouseAction;

      switch (event.button) {
        case 0:
          mouseAction = scope.mouseButtons.LEFT;
          break;

        case 1:
          mouseAction = scope.mouseButtons.MIDDLE;
          break;

        case 2:
          mouseAction = scope.mouseButtons.RIGHT;
          break;

        default:
          mouseAction = -1;
      }

      switch (mouseAction) {
        case MOUSE.DOLLY:
          if (scope.enableZoom === false) return;
          handleMouseDownDolly(event);
          state = STATE.DOLLY;
          break;

        case MOUSE.ROTATE:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (scope.enablePan === false) return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          } else {
            if (scope.enableRotate === false) return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          }

          break;

        case MOUSE.PAN:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (scope.enableRotate === false) return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          } else {
            if (scope.enablePan === false) return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          }

          break;

        default:
          state = STATE.NONE;
      }

      if (state !== STATE.NONE) {
        scope.dispatchEvent(startEvent);
      }
    }

    function onMouseMove(event) {
      if (scope.enabled === false) return;

      switch (state) {
        case STATE.ROTATE:
          if (scope.enableRotate === false) return;
          handleMouseMoveRotate(event);
          break;

        case STATE.DOLLY:
          if (scope.enableZoom === false) return;
          handleMouseMoveDolly(event);
          break;

        case STATE.PAN:
          if (scope.enablePan === false) return;
          handleMouseMovePan(event);
          break;
      }
    }

    function onMouseUp() {
      scope.dispatchEvent(endEvent);
      state = STATE.NONE;
    }

    function onMouseWheel(event) {
      if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) {
        return;
      }

      event.preventDefault();
      scope.dispatchEvent(startEvent);
      handleMouseWheel(event);
      scope.dispatchEvent(endEvent);
    }

    function onKeyDown(event) {
      if (scope.enabled === false || scope.enablePan === false) return;
      handleKeyDown(event);
    }

    function onTouchStart(event) {
      trackPointer(event);

      switch (pointers.length) {
        case 1:
          switch (scope.touches.ONE) {
            case TOUCH.ROTATE:
              if (scope.enableRotate === false) return;
              handleTouchStartRotate();
              state = STATE.TOUCH_ROTATE;
              break;

            case TOUCH.PAN:
              if (scope.enablePan === false) return;
              handleTouchStartPan();
              state = STATE.TOUCH_PAN;
              break;

            default:
              state = STATE.NONE;
          }

          break;

        case 2:
          switch (scope.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (scope.enableZoom === false && scope.enablePan === false) return;
              handleTouchStartDollyPan();
              state = STATE.TOUCH_DOLLY_PAN;
              break;

            case TOUCH.DOLLY_ROTATE:
              if (scope.enableZoom === false && scope.enableRotate === false) return;
              handleTouchStartDollyRotate();
              state = STATE.TOUCH_DOLLY_ROTATE;
              break;

            default:
              state = STATE.NONE;
          }

          break;

        default:
          state = STATE.NONE;
      }

      if (state !== STATE.NONE) {
        scope.dispatchEvent(startEvent);
      }
    }

    function onTouchMove(event) {
      trackPointer(event);

      switch (state) {
        case STATE.TOUCH_ROTATE:
          if (scope.enableRotate === false) return;
          handleTouchMoveRotate(event);
          scope.update();
          break;

        case STATE.TOUCH_PAN:
          if (scope.enablePan === false) return;
          handleTouchMovePan(event);
          scope.update();
          break;

        case STATE.TOUCH_DOLLY_PAN:
          if (scope.enableZoom === false && scope.enablePan === false) return;
          handleTouchMoveDollyPan(event);
          scope.update();
          break;

        case STATE.TOUCH_DOLLY_ROTATE:
          if (scope.enableZoom === false && scope.enableRotate === false) return;
          handleTouchMoveDollyRotate(event);
          scope.update();
          break;

        default:
          state = STATE.NONE;
      }
    }

    function onTouchEnd() {
      scope.dispatchEvent(endEvent);
      state = STATE.NONE;
    }

    function onContextMenu(event) {
      if (scope.enabled === false) return;
      event.preventDefault();
    }

    function addPointer(event) {
      pointers.push(event);
    }

    function removePointer(event) {
      delete pointerPositions[event.pointerId];

      for (let i = 0; i < pointers.length; i++) {
        if (pointers[i].pointerId == event.pointerId) {
          pointers.splice(i, 1);
          return;
        }
      }
    }

    function trackPointer(event) {
      let position = pointerPositions[event.pointerId];

      if (position === undefined) {
        position = new Vector2();
        pointerPositions[event.pointerId] = position;
      }

      position.set(event.pageX, event.pageY);
    }

    function getSecondPointerPosition(event) {
      const pointer = event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0];
      return pointerPositions[pointer.pointerId];
    } // connect events


    if (domElement !== undefined) this.connect(domElement); // force an update at start

    this.update();
  }

} // This set of controls performs orbiting, dollying (zooming), and panning.

class GLTFLoader extends Loader {
  constructor(manager) {
    super(manager);
    this.dracoLoader = null;
    this.ktx2Loader = null;
    this.meshoptDecoder = null;
    this.pluginCallbacks = [];
    this.register(function (parser) {
      return new GLTFMaterialsClearcoatExtension(parser);
    });
    this.register(function (parser) {
      return new GLTFTextureBasisUExtension(parser);
    });
    this.register(function (parser) {
      return new GLTFTextureWebPExtension(parser);
    });
    this.register(function (parser) {
      return new GLTFMaterialsTransmissionExtension(parser);
    });
    this.register(function (parser) {
      return new GLTFMaterialsVolumeExtension(parser);
    });
    this.register(function (parser) {
      return new GLTFMaterialsIorExtension(parser);
    });
    this.register(function (parser) {
      return new GLTFMaterialsSpecularExtension(parser);
    });
    this.register(function (parser) {
      return new GLTFLightsExtension(parser);
    });
    this.register(function (parser) {
      return new GLTFMeshoptCompression(parser);
    });
  }

  load(url, onLoad, onProgress, onError) {
    const scope = this;
    let resourcePath;

    if (this.resourcePath !== '') {
      resourcePath = this.resourcePath;
    } else if (this.path !== '') {
      resourcePath = this.path;
    } else {
      resourcePath = LoaderUtils.extractUrlBase(url);
    } // Tells the LoadingManager to track an extra item, which resolves after
    // the model is fully loaded. This means the count of items loaded will
    // be incorrect, but ensures manager.onLoad() does not fire early.


    this.manager.itemStart(url);

    const _onError = function (e) {
      if (onError) {
        onError(e);
      } else {
        console.error(e);
      }

      scope.manager.itemError(url);
      scope.manager.itemEnd(url);
    };

    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType('arraybuffer');
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function (data) {
      try {
        scope.parse(data, resourcePath, function (gltf) {
          onLoad(gltf);
          scope.manager.itemEnd(url);
        }, _onError);
      } catch (e) {
        _onError(e);
      }
    }, onProgress, _onError);
  }

  setDRACOLoader(dracoLoader) {
    this.dracoLoader = dracoLoader;
    return this;
  }

  setDDSLoader() {
    throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".');
  }

  setKTX2Loader(ktx2Loader) {
    this.ktx2Loader = ktx2Loader;
    return this;
  }

  setMeshoptDecoder(meshoptDecoder) {
    this.meshoptDecoder = meshoptDecoder;
    return this;
  }

  register(callback) {
    if (this.pluginCallbacks.indexOf(callback) === -1) {
      this.pluginCallbacks.push(callback);
    }

    return this;
  }

  unregister(callback) {
    if (this.pluginCallbacks.indexOf(callback) !== -1) {
      this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(callback), 1);
    }

    return this;
  }

  parse(data, path, onLoad, onError) {
    let content;
    const extensions = {};
    const plugins = {};

    if (typeof data === 'string') {
      content = data;
    } else {
      const magic = LoaderUtils.decodeText(new Uint8Array(data, 0, 4));

      if (magic === BINARY_EXTENSION_HEADER_MAGIC) {
        try {
          extensions[EXTENSIONS.KHR_BINARY_GLTF] = new GLTFBinaryExtension(data);
        } catch (error) {
          if (onError) onError(error);
          return;
        }

        content = extensions[EXTENSIONS.KHR_BINARY_GLTF].content;
      } else {
        content = LoaderUtils.decodeText(new Uint8Array(data));
      }
    }

    const json = JSON.parse(content);

    if (json.asset === undefined || json.asset.version[0] < 2) {
      if (onError) onError(new Error('THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.'));
      return;
    }

    const parser = new GLTFParser(json, {
      path: path || this.resourcePath || '',
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    parser.fileLoader.setRequestHeader(this.requestHeader);

    for (let i = 0; i < this.pluginCallbacks.length; i++) {
      const plugin = this.pluginCallbacks[i](parser);
      plugins[plugin.name] = plugin; // Workaround to avoid determining as unknown extension
      // in addUnknownExtensionsToUserData().
      // Remove this workaround if we move all the existing
      // extension handlers to plugin system

      extensions[plugin.name] = true;
    }

    if (json.extensionsUsed) {
      for (let i = 0; i < json.extensionsUsed.length; ++i) {
        const extensionName = json.extensionsUsed[i];
        const extensionsRequired = json.extensionsRequired || [];

        switch (extensionName) {
          case EXTENSIONS.KHR_MATERIALS_UNLIT:
            extensions[extensionName] = new GLTFMaterialsUnlitExtension();
            break;

          case EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
            extensions[extensionName] = new GLTFMaterialsPbrSpecularGlossinessExtension();
            break;

          case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
            extensions[extensionName] = new GLTFDracoMeshCompressionExtension(json, this.dracoLoader);
            break;

          case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
            extensions[extensionName] = new GLTFTextureTransformExtension();
            break;

          case EXTENSIONS.KHR_MESH_QUANTIZATION:
            extensions[extensionName] = new GLTFMeshQuantizationExtension();
            break;

          default:
            if (extensionsRequired.indexOf(extensionName) >= 0 && plugins[extensionName] === undefined) {
              console.warn('THREE.GLTFLoader: Unknown extension "' + extensionName + '".');
            }

        }
      }
    }

    parser.setExtensions(extensions);
    parser.setPlugins(plugins);
    parser.parse(onLoad, onError);
  }

}
/* GLTFREGISTRY */


function GLTFRegistry() {
  let objects = {};
  return {
    get: function (key) {
      return objects[key];
    },
    add: function (key, object) {
      objects[key] = object;
    },
    remove: function (key) {
      delete objects[key];
    },
    removeAll: function () {
      objects = {};
    }
  };
}
/*********************************/

/********** EXTENSIONS ***********/

/*********************************/


const EXTENSIONS = {
  KHR_BINARY_GLTF: 'KHR_binary_glTF',
  KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
  KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
  KHR_MATERIALS_CLEARCOAT: 'KHR_materials_clearcoat',
  KHR_MATERIALS_IOR: 'KHR_materials_ior',
  KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: 'KHR_materials_pbrSpecularGlossiness',
  KHR_MATERIALS_SPECULAR: 'KHR_materials_specular',
  KHR_MATERIALS_TRANSMISSION: 'KHR_materials_transmission',
  KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
  KHR_MATERIALS_VOLUME: 'KHR_materials_volume',
  KHR_TEXTURE_BASISU: 'KHR_texture_basisu',
  KHR_TEXTURE_TRANSFORM: 'KHR_texture_transform',
  KHR_MESH_QUANTIZATION: 'KHR_mesh_quantization',
  EXT_TEXTURE_WEBP: 'EXT_texture_webp',
  EXT_MESHOPT_COMPRESSION: 'EXT_meshopt_compression'
};
/**
 * Punctual Lights Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual
 */

class GLTFLightsExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL; // Object3D instance caches

    this.cache = {
      refs: {},
      uses: {}
    };
  }

  _markDefs() {
    const parser = this.parser;
    const nodeDefs = this.parser.json.nodes || [];

    for (let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      const nodeDef = nodeDefs[nodeIndex];

      if (nodeDef.extensions && nodeDef.extensions[this.name] && nodeDef.extensions[this.name].light !== undefined) {
        parser._addNodeRef(this.cache, nodeDef.extensions[this.name].light);
      }
    }
  }

  _loadLight(lightIndex) {
    const parser = this.parser;
    const cacheKey = 'light:' + lightIndex;
    let dependency = parser.cache.get(cacheKey);
    if (dependency) return dependency;
    const json = parser.json;
    const extensions = json.extensions && json.extensions[this.name] || {};
    const lightDefs = extensions.lights || [];
    const lightDef = lightDefs[lightIndex];
    let lightNode;
    const color = new Color(0xffffff);
    if (lightDef.color !== undefined) color.fromArray(lightDef.color);
    const range = lightDef.range !== undefined ? lightDef.range : 0;

    switch (lightDef.type) {
      case 'directional':
        lightNode = new DirectionalLight(color);
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;

      case 'point':
        lightNode = new PointLight(color);
        lightNode.distance = range;
        break;

      case 'spot':
        lightNode = new SpotLight(color);
        lightNode.distance = range; // Handle spotlight properties.

        lightDef.spot = lightDef.spot || {};
        lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== undefined ? lightDef.spot.innerConeAngle : 0;
        lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== undefined ? lightDef.spot.outerConeAngle : Math.PI / 4.0;
        lightNode.angle = lightDef.spot.outerConeAngle;
        lightNode.penumbra = 1.0 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;

      default:
        throw new Error('THREE.GLTFLoader: Unexpected light type: ' + lightDef.type);
    } // Some lights (e.g. spot) default to a position other than the origin. Reset the position
    // here, because node-level parsing will only override position if explicitly specified.


    lightNode.position.set(0, 0, 0);
    lightNode.decay = 2;
    if (lightDef.intensity !== undefined) lightNode.intensity = lightDef.intensity;
    lightNode.name = parser.createUniqueName(lightDef.name || 'light_' + lightIndex);
    dependency = Promise.resolve(lightNode);
    parser.cache.add(cacheKey, dependency);
    return dependency;
  }

  createNodeAttachment(nodeIndex) {
    const self = this;
    const parser = this.parser;
    const json = parser.json;
    const nodeDef = json.nodes[nodeIndex];
    const lightDef = nodeDef.extensions && nodeDef.extensions[this.name] || {};
    const lightIndex = lightDef.light;
    if (lightIndex === undefined) return null;
    return this._loadLight(lightIndex).then(function (light) {
      return parser._getNodeRef(self.cache, lightIndex, light);
    });
  }

}
/**
 * Unlit Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit
 */


class GLTFMaterialsUnlitExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;
  }

  getMaterialType() {
    return MeshBasicMaterial;
  }

  extendParams(materialParams, materialDef, parser) {
    const pending = [];
    materialParams.color = new Color(1.0, 1.0, 1.0);
    materialParams.opacity = 1.0;
    const metallicRoughness = materialDef.pbrMetallicRoughness;

    if (metallicRoughness) {
      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        const array = metallicRoughness.baseColorFactor;
        materialParams.color.fromArray(array);
        materialParams.opacity = array[3];
      }

      if (metallicRoughness.baseColorTexture !== undefined) {
        pending.push(parser.assignTexture(materialParams, 'map', metallicRoughness.baseColorTexture));
      }
    }

    return Promise.all(pending);
  }

}
/**
 * Clearcoat Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_clearcoat
 */


class GLTFMaterialsClearcoatExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT;
  }

  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }

  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];

    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }

    const pending = [];
    const extension = materialDef.extensions[this.name];

    if (extension.clearcoatFactor !== undefined) {
      materialParams.clearcoat = extension.clearcoatFactor;
    }

    if (extension.clearcoatTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'clearcoatMap', extension.clearcoatTexture));
    }

    if (extension.clearcoatRoughnessFactor !== undefined) {
      materialParams.clearcoatRoughness = extension.clearcoatRoughnessFactor;
    }

    if (extension.clearcoatRoughnessTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'clearcoatRoughnessMap', extension.clearcoatRoughnessTexture));
    }

    if (extension.clearcoatNormalTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'clearcoatNormalMap', extension.clearcoatNormalTexture));

      if (extension.clearcoatNormalTexture.scale !== undefined) {
        const scale = extension.clearcoatNormalTexture.scale; // https://github.com/mrdoob/three.js/issues/11438#issuecomment-507003995

        materialParams.clearcoatNormalScale = new Vector2(scale, -scale);
      }
    }

    return Promise.all(pending);
  }

}
/**
 * Transmission Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_transmission
 * Draft: https://github.com/KhronosGroup/glTF/pull/1698
 */


class GLTFMaterialsTransmissionExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION;
  }

  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }

  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];

    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }

    const pending = [];
    const extension = materialDef.extensions[this.name];

    if (extension.transmissionFactor !== undefined) {
      materialParams.transmission = extension.transmissionFactor;
    }

    if (extension.transmissionTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'transmissionMap', extension.transmissionTexture));
    }

    return Promise.all(pending);
  }

}
/**
 * Materials Volume Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_volume
 */


class GLTFMaterialsVolumeExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_VOLUME;
  }

  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }

  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];

    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }

    const pending = [];
    const extension = materialDef.extensions[this.name];
    materialParams.thickness = extension.thicknessFactor !== undefined ? extension.thicknessFactor : 0;

    if (extension.thicknessTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'thicknessMap', extension.thicknessTexture));
    }

    materialParams.attenuationDistance = extension.attenuationDistance || 0;
    const colorArray = extension.attenuationColor || [1, 1, 1];
    materialParams.attenuationTint = new Color(colorArray[0], colorArray[1], colorArray[2]);
    return Promise.all(pending);
  }

}
/**
 * Materials ior Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_ior
 */


class GLTFMaterialsIorExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_IOR;
  }

  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }

  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];

    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }

    const extension = materialDef.extensions[this.name];
    materialParams.ior = extension.ior !== undefined ? extension.ior : 1.5;
    return Promise.resolve();
  }

}
/**
 * Materials specular Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_specular
 */


class GLTFMaterialsSpecularExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR;
  }

  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }

  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];

    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }

    const pending = [];
    const extension = materialDef.extensions[this.name];
    materialParams.specularIntensity = extension.specularFactor !== undefined ? extension.specularFactor : 1.0;

    if (extension.specularTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'specularIntensityMap', extension.specularTexture));
    }

    const colorArray = extension.specularColorFactor || [1, 1, 1];
    materialParams.specularTint = new Color(colorArray[0], colorArray[1], colorArray[2]);

    if (extension.specularColorTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'specularTintMap', extension.specularColorTexture).then(function (texture) {
        texture.encoding = sRGBEncoding;
      }));
    }

    return Promise.all(pending);
  }

}
/**
 * BasisU Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_basisu
 */


class GLTFTextureBasisUExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_TEXTURE_BASISU;
  }

  loadTexture(textureIndex) {
    const parser = this.parser;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];

    if (!textureDef.extensions || !textureDef.extensions[this.name]) {
      return null;
    }

    const extension = textureDef.extensions[this.name];
    const source = json.images[extension.source];
    const loader = parser.options.ktx2Loader;

    if (!loader) {
      if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
        throw new Error('THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures');
      } else {
        // Assumes that the extension is optional and that a fallback texture is present
        return null;
      }
    }

    return parser.loadTextureImage(textureIndex, source, loader);
  }

}
/**
 * WebP Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_texture_webp
 */


class GLTFTextureWebPExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_TEXTURE_WEBP;
    this.isSupported = null;
  }

  loadTexture(textureIndex) {
    const name = this.name;
    const parser = this.parser;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];

    if (!textureDef.extensions || !textureDef.extensions[name]) {
      return null;
    }

    const extension = textureDef.extensions[name];
    const source = json.images[extension.source];
    let loader = parser.textureLoader;

    if (source.uri) {
      const handler = parser.options.manager.getHandler(source.uri);
      if (handler !== null) loader = handler;
    }

    return this.detectSupport().then(function (isSupported) {
      if (isSupported) return parser.loadTextureImage(textureIndex, source, loader);

      if (json.extensionsRequired && json.extensionsRequired.indexOf(name) >= 0) {
        throw new Error('THREE.GLTFLoader: WebP required by asset but unsupported.');
      } // Fall back to PNG or JPEG.


      return parser.loadTexture(textureIndex);
    });
  }

  detectSupport() {
    if (!this.isSupported) {
      this.isSupported = new Promise(function (resolve) {
        const image = new Image(); // Lossy test image. Support for lossy images doesn't guarantee support for all
        // WebP images, unfortunately.

        image.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';

        image.onload = image.onerror = function () {
          resolve(image.height === 1);
        };
      });
    }

    return this.isSupported;
  }

}
/**
 * meshopt BufferView Compression Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_meshopt_compression
 */


class GLTFMeshoptCompression {
  constructor(parser) {
    this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION;
    this.parser = parser;
  }

  loadBufferView(index) {
    const json = this.parser.json;
    const bufferView = json.bufferViews[index];

    if (bufferView.extensions && bufferView.extensions[this.name]) {
      const extensionDef = bufferView.extensions[this.name];
      const buffer = this.parser.getDependency('buffer', extensionDef.buffer);
      const decoder = this.parser.options.meshoptDecoder;

      if (!decoder || !decoder.supported) {
        if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
          throw new Error('THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files');
        } else {
          // Assumes that the extension is optional and that fallback buffer data is present
          return null;
        }
      }

      return Promise.all([buffer, decoder.ready]).then(function (res) {
        const byteOffset = extensionDef.byteOffset || 0;
        const byteLength = extensionDef.byteLength || 0;
        const count = extensionDef.count;
        const stride = extensionDef.byteStride;
        const result = new ArrayBuffer(count * stride);
        const source = new Uint8Array(res[0], byteOffset, byteLength);
        decoder.decodeGltfBuffer(new Uint8Array(result), count, stride, source, extensionDef.mode, extensionDef.filter);
        return result;
      });
    } else {
      return null;
    }
  }

}
/* BINARY EXTENSION */


const BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
const BINARY_EXTENSION_HEADER_LENGTH = 12;
const BINARY_EXTENSION_CHUNK_TYPES = {
  JSON: 0x4e4f534a,
  BIN: 0x004e4942
};

class GLTFBinaryExtension {
  constructor(data) {
    this.name = EXTENSIONS.KHR_BINARY_GLTF;
    this.content = null;
    this.body = null;
    const headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH);
    this.header = {
      magic: LoaderUtils.decodeText(new Uint8Array(data.slice(0, 4))),
      version: headerView.getUint32(4, true),
      length: headerView.getUint32(8, true)
    };

    if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {
      throw new Error('THREE.GLTFLoader: Unsupported glTF-Binary header.');
    } else if (this.header.version < 2.0) {
      throw new Error('THREE.GLTFLoader: Legacy binary file detected.');
    }

    const chunkContentsLength = this.header.length - BINARY_EXTENSION_HEADER_LENGTH;
    const chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH);
    let chunkIndex = 0;

    while (chunkIndex < chunkContentsLength) {
      const chunkLength = chunkView.getUint32(chunkIndex, true);
      chunkIndex += 4;
      const chunkType = chunkView.getUint32(chunkIndex, true);
      chunkIndex += 4;

      if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {
        const contentArray = new Uint8Array(data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength);
        this.content = LoaderUtils.decodeText(contentArray);
      } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {
        const byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
        this.body = data.slice(byteOffset, byteOffset + chunkLength);
      } // Clients must ignore chunks with unknown types.


      chunkIndex += chunkLength;
    }

    if (this.content === null) {
      throw new Error('THREE.GLTFLoader: JSON content not found.');
    }
  }

}
/**
 * DRACO Mesh Compression Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression
 */


class GLTFDracoMeshCompressionExtension {
  constructor(json, dracoLoader) {
    if (!dracoLoader) {
      throw new Error('THREE.GLTFLoader: No DRACOLoader instance provided.');
    }

    this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
    this.json = json;
    this.dracoLoader = dracoLoader;
    this.dracoLoader.preload();
  }

  decodePrimitive(primitive, parser) {
    const json = this.json;
    const dracoLoader = this.dracoLoader;
    const bufferViewIndex = primitive.extensions[this.name].bufferView;
    const gltfAttributeMap = primitive.extensions[this.name].attributes;
    const threeAttributeMap = {};
    const attributeNormalizedMap = {};
    const attributeTypeMap = {};

    for (const attributeName in gltfAttributeMap) {
      const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
      threeAttributeMap[threeAttributeName] = gltfAttributeMap[attributeName];
    }

    for (const attributeName in primitive.attributes) {
      const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();

      if (gltfAttributeMap[attributeName] !== undefined) {
        const accessorDef = json.accessors[primitive.attributes[attributeName]];
        const componentType = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
        attributeTypeMap[threeAttributeName] = componentType;
        attributeNormalizedMap[threeAttributeName] = accessorDef.normalized === true;
      }
    }

    return parser.getDependency('bufferView', bufferViewIndex).then(function (bufferView) {
      return new Promise(function (resolve) {
        dracoLoader.decodeDracoFile(bufferView, function (geometry) {
          for (const attributeName in geometry.attributes) {
            const attribute = geometry.attributes[attributeName];
            const normalized = attributeNormalizedMap[attributeName];
            if (normalized !== undefined) attribute.normalized = normalized;
          }

          resolve(geometry);
        }, threeAttributeMap, attributeTypeMap);
      });
    });
  }

}
/**
 * Texture Transform Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_transform
 */


class GLTFTextureTransformExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;
  }

  extendTexture(texture, transform) {
    if (transform.texCoord !== undefined) {
      console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.');
    }

    if (transform.offset === undefined && transform.rotation === undefined && transform.scale === undefined) {
      // See https://github.com/mrdoob/three.js/issues/21819.
      return texture;
    }

    texture = texture.clone();

    if (transform.offset !== undefined) {
      texture.offset.fromArray(transform.offset);
    }

    if (transform.rotation !== undefined) {
      texture.rotation = transform.rotation;
    }

    if (transform.scale !== undefined) {
      texture.repeat.fromArray(transform.scale);
    }

    texture.needsUpdate = true;
    return texture;
  }

}
/**
 * Specular-Glossiness Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness
 */

/**
 * A sub class of StandardMaterial with some of the functionality
 * changed via the `onBeforeCompile` callback
 * @pailhead
 */


class GLTFMeshStandardSGMaterial extends MeshStandardMaterial {
  constructor(params) {
    super();
    this.isGLTFSpecularGlossinessMaterial = true; //various chunks that need replacing

    const specularMapParsFragmentChunk = ['#ifdef USE_SPECULARMAP', '	uniform sampler2D specularMap;', '#endif'].join('\n');
    const glossinessMapParsFragmentChunk = ['#ifdef USE_GLOSSINESSMAP', '	uniform sampler2D glossinessMap;', '#endif'].join('\n');
    const specularMapFragmentChunk = ['vec3 specularFactor = specular;', '#ifdef USE_SPECULARMAP', '	vec4 texelSpecular = texture2D( specularMap, vUv );', '	texelSpecular = sRGBToLinear( texelSpecular );', '	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture', '	specularFactor *= texelSpecular.rgb;', '#endif'].join('\n');
    const glossinessMapFragmentChunk = ['float glossinessFactor = glossiness;', '#ifdef USE_GLOSSINESSMAP', '	vec4 texelGlossiness = texture2D( glossinessMap, vUv );', '	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture', '	glossinessFactor *= texelGlossiness.a;', '#endif'].join('\n');
    const lightPhysicalFragmentChunk = ['PhysicalMaterial material;', 'material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );', 'vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );', 'float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );', 'material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.', 'material.specularRoughness += geometryRoughness;', 'material.specularRoughness = min( material.specularRoughness, 1.0 );', 'material.specularColor = specularFactor;'].join('\n');
    const uniforms = {
      specular: {
        value: new Color().setHex(0xffffff)
      },
      glossiness: {
        value: 1
      },
      specularMap: {
        value: null
      },
      glossinessMap: {
        value: null
      }
    };
    this._extraUniforms = uniforms;

    this.onBeforeCompile = function (shader) {
      for (const uniformName in uniforms) {
        shader.uniforms[uniformName] = uniforms[uniformName];
      }

      shader.fragmentShader = shader.fragmentShader.replace('uniform float roughness;', 'uniform vec3 specular;').replace('uniform float metalness;', 'uniform float glossiness;').replace('#include <roughnessmap_pars_fragment>', specularMapParsFragmentChunk).replace('#include <metalnessmap_pars_fragment>', glossinessMapParsFragmentChunk).replace('#include <roughnessmap_fragment>', specularMapFragmentChunk).replace('#include <metalnessmap_fragment>', glossinessMapFragmentChunk).replace('#include <lights_physical_fragment>', lightPhysicalFragmentChunk);
    };

    Object.defineProperties(this, {
      specular: {
        get: function () {
          return uniforms.specular.value;
        },
        set: function (v) {
          uniforms.specular.value = v;
        }
      },
      specularMap: {
        get: function () {
          return uniforms.specularMap.value;
        },
        set: function (v) {
          uniforms.specularMap.value = v;

          if (v) {
            this.defines.USE_SPECULARMAP = ''; // USE_UV is set by the renderer for specular maps
          } else {
            delete this.defines.USE_SPECULARMAP;
          }
        }
      },
      glossiness: {
        get: function () {
          return uniforms.glossiness.value;
        },
        set: function (v) {
          uniforms.glossiness.value = v;
        }
      },
      glossinessMap: {
        get: function () {
          return uniforms.glossinessMap.value;
        },
        set: function (v) {
          uniforms.glossinessMap.value = v;

          if (v) {
            this.defines.USE_GLOSSINESSMAP = '';
            this.defines.USE_UV = '';
          } else {
            delete this.defines.USE_GLOSSINESSMAP;
            delete this.defines.USE_UV;
          }
        }
      }
    });
    delete this.metalness;
    delete this.roughness;
    delete this.metalnessMap;
    delete this.roughnessMap;
    this.setValues(params);
  }

  copy(source) {
    super.copy(source);
    this.specularMap = source.specularMap;
    this.specular.copy(source.specular);
    this.glossinessMap = source.glossinessMap;
    this.glossiness = source.glossiness;
    delete this.metalness;
    delete this.roughness;
    delete this.metalnessMap;
    delete this.roughnessMap;
    return this;
  }

}

class GLTFMaterialsPbrSpecularGlossinessExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS;
    this.specularGlossinessParams = ['color', 'map', 'lightMap', 'lightMapIntensity', 'aoMap', 'aoMapIntensity', 'emissive', 'emissiveIntensity', 'emissiveMap', 'bumpMap', 'bumpScale', 'normalMap', 'normalMapType', 'displacementMap', 'displacementScale', 'displacementBias', 'specularMap', 'specular', 'glossinessMap', 'glossiness', 'alphaMap', 'envMap', 'envMapIntensity', 'refractionRatio'];
  }

  getMaterialType() {
    return GLTFMeshStandardSGMaterial;
  }

  extendParams(materialParams, materialDef, parser) {
    const pbrSpecularGlossiness = materialDef.extensions[this.name];
    materialParams.color = new Color(1.0, 1.0, 1.0);
    materialParams.opacity = 1.0;
    const pending = [];

    if (Array.isArray(pbrSpecularGlossiness.diffuseFactor)) {
      const array = pbrSpecularGlossiness.diffuseFactor;
      materialParams.color.fromArray(array);
      materialParams.opacity = array[3];
    }

    if (pbrSpecularGlossiness.diffuseTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'map', pbrSpecularGlossiness.diffuseTexture));
    }

    materialParams.emissive = new Color(0.0, 0.0, 0.0);
    materialParams.glossiness = pbrSpecularGlossiness.glossinessFactor !== undefined ? pbrSpecularGlossiness.glossinessFactor : 1.0;
    materialParams.specular = new Color(1.0, 1.0, 1.0);

    if (Array.isArray(pbrSpecularGlossiness.specularFactor)) {
      materialParams.specular.fromArray(pbrSpecularGlossiness.specularFactor);
    }

    if (pbrSpecularGlossiness.specularGlossinessTexture !== undefined) {
      const specGlossMapDef = pbrSpecularGlossiness.specularGlossinessTexture;
      pending.push(parser.assignTexture(materialParams, 'glossinessMap', specGlossMapDef));
      pending.push(parser.assignTexture(materialParams, 'specularMap', specGlossMapDef));
    }

    return Promise.all(pending);
  }

  createMaterial(materialParams) {
    const material = new GLTFMeshStandardSGMaterial(materialParams);
    material.fog = true;
    material.color = materialParams.color;
    material.map = materialParams.map === undefined ? null : materialParams.map;
    material.lightMap = null;
    material.lightMapIntensity = 1.0;
    material.aoMap = materialParams.aoMap === undefined ? null : materialParams.aoMap;
    material.aoMapIntensity = 1.0;
    material.emissive = materialParams.emissive;
    material.emissiveIntensity = 1.0;
    material.emissiveMap = materialParams.emissiveMap === undefined ? null : materialParams.emissiveMap;
    material.bumpMap = materialParams.bumpMap === undefined ? null : materialParams.bumpMap;
    material.bumpScale = 1;
    material.normalMap = materialParams.normalMap === undefined ? null : materialParams.normalMap;
    material.normalMapType = TangentSpaceNormalMap;
    if (materialParams.normalScale) material.normalScale = materialParams.normalScale;
    material.displacementMap = null;
    material.displacementScale = 1;
    material.displacementBias = 0;
    material.specularMap = materialParams.specularMap === undefined ? null : materialParams.specularMap;
    material.specular = materialParams.specular;
    material.glossinessMap = materialParams.glossinessMap === undefined ? null : materialParams.glossinessMap;
    material.glossiness = materialParams.glossiness;
    material.alphaMap = null;
    material.envMap = materialParams.envMap === undefined ? null : materialParams.envMap;
    material.envMapIntensity = 1.0;
    material.refractionRatio = 0.98;
    return material;
  }

}
/**
 * Mesh Quantization Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization
 */


class GLTFMeshQuantizationExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;
  }

}
/*********************************/

/********** INTERPOLATION ********/

/*********************************/
// Spline Interpolation
// Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation


class GLTFCubicSplineInterpolant extends Interpolant {
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }

  copySampleValue_(index) {
    // Copies a sample value to the result buffer. See description of glTF
    // CUBICSPLINE values layout in interpolate_() function below.
    const result = this.resultBuffer,
          values = this.sampleValues,
          valueSize = this.valueSize,
          offset = index * valueSize * 3 + valueSize;

    for (let i = 0; i !== valueSize; i++) {
      result[i] = values[offset + i];
    }

    return result;
  }

}

GLTFCubicSplineInterpolant.prototype.beforeStart_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;
GLTFCubicSplineInterpolant.prototype.afterEnd_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;

GLTFCubicSplineInterpolant.prototype.interpolate_ = function (i1, t0, t, t1) {
  const result = this.resultBuffer;
  const values = this.sampleValues;
  const stride = this.valueSize;
  const stride2 = stride * 2;
  const stride3 = stride * 3;
  const td = t1 - t0;
  const p = (t - t0) / td;
  const pp = p * p;
  const ppp = pp * p;
  const offset1 = i1 * stride3;
  const offset0 = offset1 - stride3;
  const s2 = -2 * ppp + 3 * pp;
  const s3 = ppp - pp;
  const s0 = 1 - s2;
  const s1 = s3 - pp + p; // Layout of keyframe output values for CUBICSPLINE animations:
  //   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]

  for (let i = 0; i !== stride; i++) {
    const p0 = values[offset0 + i + stride]; // splineVertex_k

    const m0 = values[offset0 + i + stride2] * td; // outTangent_k * (t_k+1 - t_k)

    const p1 = values[offset1 + i + stride]; // splineVertex_k+1

    const m1 = values[offset1 + i] * td; // inTangent_k+1 * (t_k+1 - t_k)

    result[i] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;
  }

  return result;
};
/*********************************/

/********** INTERNALS ************/

/*********************************/

/* CONSTANTS */


const WEBGL_CONSTANTS = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
};
const WEBGL_COMPONENT_TYPES = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
const WEBGL_FILTERS = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter
};
const WEBGL_WRAPPINGS = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
};
const WEBGL_TYPE_SIZES = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
const ATTRIBUTES = {
  POSITION: 'position',
  NORMAL: 'normal',
  TANGENT: 'tangent',
  TEXCOORD_0: 'uv',
  TEXCOORD_1: 'uv2',
  COLOR_0: 'color',
  WEIGHTS_0: 'skinWeight',
  JOINTS_0: 'skinIndex'
};
const PATH_PROPERTIES = {
  scale: 'scale',
  translation: 'position',
  rotation: 'quaternion',
  weights: 'morphTargetInfluences'
};
const INTERPOLATION = {
  CUBICSPLINE: undefined,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
};
const ALPHA_MODES = {
  OPAQUE: 'OPAQUE',
  MASK: 'MASK',
  BLEND: 'BLEND'
};
/* UTILITY FUNCTIONS */

function resolveURL(url, path) {
  // Invalid URL
  if (typeof url !== 'string' || url === '') return ''; // Host Relative URL

  if (/^https?:\/\//i.test(path) && /^\//.test(url)) {
    path = path.replace(/(^https?:\/\/[^\/]+).*/i, '$1');
  } // Absolute URL http://,https://,//


  if (/^(https?:)?\/\//i.test(url)) return url; // Data URI

  if (/^data:.*,.*$/i.test(url)) return url; // Blob URL

  if (/^blob:.*$/i.test(url)) return url; // Relative URL

  return path + url;
}
/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
 */


function createDefaultMaterial(cache) {
  if (cache['DefaultMaterial'] === undefined) {
    cache['DefaultMaterial'] = new MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x000000,
      metalness: 1,
      roughness: 1,
      transparent: false,
      depthTest: true,
      side: FrontSide
    });
  }

  return cache['DefaultMaterial'];
}

function addUnknownExtensionsToUserData(knownExtensions, object, objectDef) {
  // Add unknown glTF extensions to an object's userData.
  for (const name in objectDef.extensions) {
    if (knownExtensions[name] === undefined) {
      object.userData.gltfExtensions = object.userData.gltfExtensions || {};
      object.userData.gltfExtensions[name] = objectDef.extensions[name];
    }
  }
}
/**
 * @param {Object3D|Material|BufferGeometry} object
 * @param {GLTF.definition} gltfDef
 */


function assignExtrasToUserData(object, gltfDef) {
  if (gltfDef.extras !== undefined) {
    if (typeof gltfDef.extras === 'object') {
      Object.assign(object.userData, gltfDef.extras);
    } else {
      console.warn('THREE.GLTFLoader: Ignoring primitive type .extras, ' + gltfDef.extras);
    }
  }
}
/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
 *
 * @param {BufferGeometry} geometry
 * @param {Array<GLTF.Target>} targets
 * @param {GLTFParser} parser
 * @return {Promise<BufferGeometry>}
 */


function addMorphTargets(geometry, targets, parser) {
  let hasMorphPosition = false;
  let hasMorphNormal = false;

  for (let i = 0, il = targets.length; i < il; i++) {
    const target = targets[i];
    if (target.POSITION !== undefined) hasMorphPosition = true;
    if (target.NORMAL !== undefined) hasMorphNormal = true;
    if (hasMorphPosition && hasMorphNormal) break;
  }

  if (!hasMorphPosition && !hasMorphNormal) return Promise.resolve(geometry);
  const pendingPositionAccessors = [];
  const pendingNormalAccessors = [];

  for (let i = 0, il = targets.length; i < il; i++) {
    const target = targets[i];

    if (hasMorphPosition) {
      const pendingAccessor = target.POSITION !== undefined ? parser.getDependency('accessor', target.POSITION) : geometry.attributes.position;
      pendingPositionAccessors.push(pendingAccessor);
    }

    if (hasMorphNormal) {
      const pendingAccessor = target.NORMAL !== undefined ? parser.getDependency('accessor', target.NORMAL) : geometry.attributes.normal;
      pendingNormalAccessors.push(pendingAccessor);
    }
  }

  return Promise.all([Promise.all(pendingPositionAccessors), Promise.all(pendingNormalAccessors)]).then(function (accessors) {
    const morphPositions = accessors[0];
    const morphNormals = accessors[1];
    if (hasMorphPosition) geometry.morphAttributes.position = morphPositions;
    if (hasMorphNormal) geometry.morphAttributes.normal = morphNormals;
    geometry.morphTargetsRelative = true;
    return geometry;
  });
}
/**
 * @param {Mesh} mesh
 * @param {GLTF.Mesh} meshDef
 */


function updateMorphTargets(mesh, meshDef) {
  mesh.updateMorphTargets();

  if (meshDef.weights !== undefined) {
    for (let i = 0, il = meshDef.weights.length; i < il; i++) {
      mesh.morphTargetInfluences[i] = meshDef.weights[i];
    }
  } // .extras has user-defined data, so check that .extras.targetNames is an array.


  if (meshDef.extras && Array.isArray(meshDef.extras.targetNames)) {
    const targetNames = meshDef.extras.targetNames;

    if (mesh.morphTargetInfluences.length === targetNames.length) {
      mesh.morphTargetDictionary = {};

      for (let i = 0, il = targetNames.length; i < il; i++) {
        mesh.morphTargetDictionary[targetNames[i]] = i;
      }
    } else {
      console.warn('THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.');
    }
  }
}

function createPrimitiveKey(primitiveDef) {
  const dracoExtension = primitiveDef.extensions && primitiveDef.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
  let geometryKey;

  if (dracoExtension) {
    geometryKey = 'draco:' + dracoExtension.bufferView + ':' + dracoExtension.indices + ':' + createAttributesKey(dracoExtension.attributes);
  } else {
    geometryKey = primitiveDef.indices + ':' + createAttributesKey(primitiveDef.attributes) + ':' + primitiveDef.mode;
  }

  return geometryKey;
}

function createAttributesKey(attributes) {
  let attributesKey = '';
  const keys = Object.keys(attributes).sort();

  for (let i = 0, il = keys.length; i < il; i++) {
    attributesKey += keys[i] + ':' + attributes[keys[i]] + ';';
  }

  return attributesKey;
}

function getNormalizedComponentScale(constructor) {
  // Reference:
  // https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization#encoding-quantized-data
  switch (constructor) {
    case Int8Array:
      return 1 / 127;

    case Uint8Array:
      return 1 / 255;

    case Int16Array:
      return 1 / 32767;

    case Uint16Array:
      return 1 / 65535;

    default:
      throw new Error('THREE.GLTFLoader: Unsupported normalized accessor component type.');
  }
}
/* GLTF PARSER */


class GLTFParser {
  constructor(json = {}, options = {}) {
    this.json = json;
    this.extensions = {};
    this.plugins = {};
    this.options = options; // loader object cache

    this.cache = new GLTFRegistry(); // associations between Three.js objects and glTF elements

    this.associations = new Map(); // BufferGeometry caching

    this.primitiveCache = {}; // Object3D instance caches

    this.meshCache = {
      refs: {},
      uses: {}
    };
    this.cameraCache = {
      refs: {},
      uses: {}
    };
    this.lightCache = {
      refs: {},
      uses: {}
    };
    this.textureCache = {}; // Track node names, to ensure no duplicates

    this.nodeNamesUsed = {}; // Use an ImageBitmapLoader if imageBitmaps are supported. Moves much of the
    // expensive work of uploading a texture to the GPU off the main thread.

    if (typeof createImageBitmap !== 'undefined' && /Firefox/.test(navigator.userAgent) === false) {
      this.textureLoader = new ImageBitmapLoader(this.options.manager);
    } else {
      this.textureLoader = new TextureLoader(this.options.manager);
    }

    this.textureLoader.setCrossOrigin(this.options.crossOrigin);
    this.textureLoader.setRequestHeader(this.options.requestHeader);
    this.fileLoader = new FileLoader(this.options.manager);
    this.fileLoader.setResponseType('arraybuffer');

    if (this.options.crossOrigin === 'use-credentials') {
      this.fileLoader.setWithCredentials(true);
    }
  }

  setExtensions(extensions) {
    this.extensions = extensions;
  }

  setPlugins(plugins) {
    this.plugins = plugins;
  }

  parse(onLoad, onError) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions; // Clear the loader cache

    this.cache.removeAll(); // Mark the special nodes/meshes in json for efficient parse

    this._invokeAll(function (ext) {
      return ext._markDefs && ext._markDefs();
    });

    Promise.all(this._invokeAll(function (ext) {
      return ext.beforeRoot && ext.beforeRoot();
    })).then(function () {
      return Promise.all([parser.getDependencies('scene'), parser.getDependencies('animation'), parser.getDependencies('camera')]);
    }).then(function (dependencies) {
      const result = {
        scene: dependencies[0][json.scene || 0],
        scenes: dependencies[0],
        animations: dependencies[1],
        cameras: dependencies[2],
        asset: json.asset,
        parser: parser,
        userData: {}
      };
      addUnknownExtensionsToUserData(extensions, result, json);
      assignExtrasToUserData(result, json);
      Promise.all(parser._invokeAll(function (ext) {
        return ext.afterRoot && ext.afterRoot(result);
      })).then(function () {
        onLoad(result);
      });
    }).catch(onError);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */


  _markDefs() {
    const nodeDefs = this.json.nodes || [];
    const skinDefs = this.json.skins || [];
    const meshDefs = this.json.meshes || []; // Nothing in the node definition indicates whether it is a Bone or an
    // Object3D. Use the skins' joint references to mark bones.

    for (let skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex++) {
      const joints = skinDefs[skinIndex].joints;

      for (let i = 0, il = joints.length; i < il; i++) {
        nodeDefs[joints[i]].isBone = true;
      }
    } // Iterate over all nodes, marking references to shared resources,
    // as well as skeleton joints.


    for (let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      const nodeDef = nodeDefs[nodeIndex];

      if (nodeDef.mesh !== undefined) {
        this._addNodeRef(this.meshCache, nodeDef.mesh); // Nothing in the mesh definition indicates whether it is
        // a SkinnedMesh or Mesh. Use the node's mesh reference
        // to mark SkinnedMesh if node has skin.


        if (nodeDef.skin !== undefined) {
          meshDefs[nodeDef.mesh].isSkinnedMesh = true;
        }
      }

      if (nodeDef.camera !== undefined) {
        this._addNodeRef(this.cameraCache, nodeDef.camera);
      }
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */


  _addNodeRef(cache, index) {
    if (index === undefined) return;

    if (cache.refs[index] === undefined) {
      cache.refs[index] = cache.uses[index] = 0;
    }

    cache.refs[index]++;
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */


  _getNodeRef(cache, index, object) {
    if (cache.refs[index] <= 1) return object;
    const ref = object.clone();
    ref.name += '_instance_' + cache.uses[index]++;
    return ref;
  }

  _invokeOne(func) {
    const extensions = Object.values(this.plugins);
    extensions.push(this);

    for (let i = 0; i < extensions.length; i++) {
      const result = func(extensions[i]);
      if (result) return result;
    }

    return null;
  }

  _invokeAll(func) {
    const extensions = Object.values(this.plugins);
    extensions.unshift(this);
    const pending = [];

    for (let i = 0; i < extensions.length; i++) {
      const result = func(extensions[i]);
      if (result) pending.push(result);
    }

    return pending;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */


  getDependency(type, index) {
    const cacheKey = type + ':' + index;
    let dependency = this.cache.get(cacheKey);

    if (!dependency) {
      switch (type) {
        case 'scene':
          dependency = this.loadScene(index);
          break;

        case 'node':
          dependency = this.loadNode(index);
          break;

        case 'mesh':
          dependency = this._invokeOne(function (ext) {
            return ext.loadMesh && ext.loadMesh(index);
          });
          break;

        case 'accessor':
          dependency = this.loadAccessor(index);
          break;

        case 'bufferView':
          dependency = this._invokeOne(function (ext) {
            return ext.loadBufferView && ext.loadBufferView(index);
          });
          break;

        case 'buffer':
          dependency = this.loadBuffer(index);
          break;

        case 'material':
          dependency = this._invokeOne(function (ext) {
            return ext.loadMaterial && ext.loadMaterial(index);
          });
          break;

        case 'texture':
          dependency = this._invokeOne(function (ext) {
            return ext.loadTexture && ext.loadTexture(index);
          });
          break;

        case 'skin':
          dependency = this.loadSkin(index);
          break;

        case 'animation':
          dependency = this.loadAnimation(index);
          break;

        case 'camera':
          dependency = this.loadCamera(index);
          break;

        default:
          throw new Error('Unknown type: ' + type);
      }

      this.cache.add(cacheKey, dependency);
    }

    return dependency;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */


  getDependencies(type) {
    let dependencies = this.cache.get(type);

    if (!dependencies) {
      const parser = this;
      const defs = this.json[type + (type === 'mesh' ? 'es' : 's')] || [];
      dependencies = Promise.all(defs.map(function (def, index) {
        return parser.getDependency(type, index);
      }));
      this.cache.add(type, dependencies);
    }

    return dependencies;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */


  loadBuffer(bufferIndex) {
    const bufferDef = this.json.buffers[bufferIndex];
    const loader = this.fileLoader;

    if (bufferDef.type && bufferDef.type !== 'arraybuffer') {
      throw new Error('THREE.GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.');
    } // If present, GLB container is required to be the first buffer.


    if (bufferDef.uri === undefined && bufferIndex === 0) {
      return Promise.resolve(this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body);
    }

    const options = this.options;
    return new Promise(function (resolve, reject) {
      loader.load(resolveURL(bufferDef.uri, options.path), resolve, undefined, function () {
        reject(new Error('THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */


  loadBufferView(bufferViewIndex) {
    const bufferViewDef = this.json.bufferViews[bufferViewIndex];
    return this.getDependency('buffer', bufferViewDef.buffer).then(function (buffer) {
      const byteLength = bufferViewDef.byteLength || 0;
      const byteOffset = bufferViewDef.byteOffset || 0;
      return buffer.slice(byteOffset, byteOffset + byteLength);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */


  loadAccessor(accessorIndex) {
    const parser = this;
    const json = this.json;
    const accessorDef = this.json.accessors[accessorIndex];

    if (accessorDef.bufferView === undefined && accessorDef.sparse === undefined) {
      // Ignore empty accessors, which may be used to declare runtime
      // information about attributes coming from another source (e.g. Draco
      // compression extension).
      return Promise.resolve(null);
    }

    const pendingBufferViews = [];

    if (accessorDef.bufferView !== undefined) {
      pendingBufferViews.push(this.getDependency('bufferView', accessorDef.bufferView));
    } else {
      pendingBufferViews.push(null);
    }

    if (accessorDef.sparse !== undefined) {
      pendingBufferViews.push(this.getDependency('bufferView', accessorDef.sparse.indices.bufferView));
      pendingBufferViews.push(this.getDependency('bufferView', accessorDef.sparse.values.bufferView));
    }

    return Promise.all(pendingBufferViews).then(function (bufferViews) {
      const bufferView = bufferViews[0];
      const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
      const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType]; // For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.

      const elementBytes = TypedArray.BYTES_PER_ELEMENT;
      const itemBytes = elementBytes * itemSize;
      const byteOffset = accessorDef.byteOffset || 0;
      const byteStride = accessorDef.bufferView !== undefined ? json.bufferViews[accessorDef.bufferView].byteStride : undefined;
      const normalized = accessorDef.normalized === true;
      let array, bufferAttribute; // The buffer is not interleaved if the stride is the item size in bytes.

      if (byteStride && byteStride !== itemBytes) {
        // Each "slice" of the buffer, as defined by 'count' elements of 'byteStride' bytes, gets its own InterleavedBuffer
        // This makes sure that IBA.count reflects accessor.count properly
        const ibSlice = Math.floor(byteOffset / byteStride);
        const ibCacheKey = 'InterleavedBuffer:' + accessorDef.bufferView + ':' + accessorDef.componentType + ':' + ibSlice + ':' + accessorDef.count;
        let ib = parser.cache.get(ibCacheKey);

        if (!ib) {
          array = new TypedArray(bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes); // Integer parameters to IB/IBA are in array elements, not bytes.

          ib = new InterleavedBuffer(array, byteStride / elementBytes);
          parser.cache.add(ibCacheKey, ib);
        }

        bufferAttribute = new InterleavedBufferAttribute(ib, itemSize, byteOffset % byteStride / elementBytes, normalized);
      } else {
        if (bufferView === null) {
          array = new TypedArray(accessorDef.count * itemSize);
        } else {
          array = new TypedArray(bufferView, byteOffset, accessorDef.count * itemSize);
        }

        bufferAttribute = new BufferAttribute(array, itemSize, normalized);
      } // https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors


      if (accessorDef.sparse !== undefined) {
        const itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
        const TypedArrayIndices = WEBGL_COMPONENT_TYPES[accessorDef.sparse.indices.componentType];
        const byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
        const byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;
        const sparseIndices = new TypedArrayIndices(bufferViews[1], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices);
        const sparseValues = new TypedArray(bufferViews[2], byteOffsetValues, accessorDef.sparse.count * itemSize);

        if (bufferView !== null) {
          // Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
          bufferAttribute = new BufferAttribute(bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized);
        }

        for (let i = 0, il = sparseIndices.length; i < il; i++) {
          const index = sparseIndices[i];
          bufferAttribute.setX(index, sparseValues[i * itemSize]);
          if (itemSize >= 2) bufferAttribute.setY(index, sparseValues[i * itemSize + 1]);
          if (itemSize >= 3) bufferAttribute.setZ(index, sparseValues[i * itemSize + 2]);
          if (itemSize >= 4) bufferAttribute.setW(index, sparseValues[i * itemSize + 3]);
          if (itemSize >= 5) throw new Error('THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.');
        }
      }

      return bufferAttribute;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture>}
   */


  loadTexture(textureIndex) {
    const json = this.json;
    const options = this.options;
    const textureDef = json.textures[textureIndex];
    const source = json.images[textureDef.source];
    let loader = this.textureLoader;

    if (source.uri) {
      const handler = options.manager.getHandler(source.uri);
      if (handler !== null) loader = handler;
    }

    return this.loadTextureImage(textureIndex, source, loader);
  }

  loadTextureImage(textureIndex, source, loader) {
    const parser = this;
    const json = this.json;
    const options = this.options;
    const textureDef = json.textures[textureIndex];
    const cacheKey = (source.uri || source.bufferView) + ':' + textureDef.sampler;

    if (this.textureCache[cacheKey]) {
      // See https://github.com/mrdoob/three.js/issues/21559.
      return this.textureCache[cacheKey];
    }

    const URL = self.URL || self.webkitURL;
    let sourceURI = source.uri || '';
    let isObjectURL = false;
    let hasAlpha = true;
    const isJPEG = sourceURI.search(/\.jpe?g($|\?)/i) > 0 || sourceURI.search(/^data\:image\/jpeg/) === 0;
    if (source.mimeType === 'image/jpeg' || isJPEG) hasAlpha = false;

    if (source.bufferView !== undefined) {
      // Load binary image data from bufferView, if provided.
      sourceURI = parser.getDependency('bufferView', source.bufferView).then(function (bufferView) {
        if (source.mimeType === 'image/png') {
          // Inspect the PNG 'IHDR' chunk to determine whether the image could have an
          // alpha channel. This check is conservative — the image could have an alpha
          // channel with all values == 1, and the indexed type (colorType == 3) only
          // sometimes contains alpha.
          //
          // https://en.wikipedia.org/wiki/Portable_Network_Graphics#File_header
          const colorType = new DataView(bufferView, 25, 1).getUint8(0, false);
          hasAlpha = colorType === 6 || colorType === 4 || colorType === 3;
        }

        isObjectURL = true;
        const blob = new Blob([bufferView], {
          type: source.mimeType
        });
        sourceURI = URL.createObjectURL(blob);
        return sourceURI;
      });
    } else if (source.uri === undefined) {
      throw new Error('THREE.GLTFLoader: Image ' + textureIndex + ' is missing URI and bufferView');
    }

    const promise = Promise.resolve(sourceURI).then(function (sourceURI) {
      return new Promise(function (resolve, reject) {
        let onLoad = resolve;

        if (loader.isImageBitmapLoader === true) {
          onLoad = function (imageBitmap) {
            const texture = new Texture(imageBitmap);
            texture.needsUpdate = true;
            resolve(texture);
          };
        }

        loader.load(resolveURL(sourceURI, options.path), onLoad, undefined, reject);
      });
    }).then(function (texture) {
      // Clean up resources and configure Texture.
      if (isObjectURL === true) {
        URL.revokeObjectURL(sourceURI);
      }

      texture.flipY = false;
      if (textureDef.name) texture.name = textureDef.name; // When there is definitely no alpha channel in the texture, set RGBFormat to save space.

      if (!hasAlpha) texture.format = RGBFormat;
      const samplers = json.samplers || {};
      const sampler = samplers[textureDef.sampler] || {};
      texture.magFilter = WEBGL_FILTERS[sampler.magFilter] || LinearFilter;
      texture.minFilter = WEBGL_FILTERS[sampler.minFilter] || LinearMipmapLinearFilter;
      texture.wrapS = WEBGL_WRAPPINGS[sampler.wrapS] || RepeatWrapping;
      texture.wrapT = WEBGL_WRAPPINGS[sampler.wrapT] || RepeatWrapping;
      parser.associations.set(texture, {
        type: 'textures',
        index: textureIndex
      });
      return texture;
    }).catch(function () {
      console.error("THREE.GLTFLoader: Couldn't load texture", sourceURI);
      return null;
    });
    this.textureCache[cacheKey] = promise;
    return promise;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */


  assignTexture(materialParams, mapName, mapDef) {
    const parser = this;
    return this.getDependency('texture', mapDef.index).then(function (texture) {
      // Materials sample aoMap from UV set 1 and other maps from UV set 0 - this can't be configured
      // However, we will copy UV set 0 to UV set 1 on demand for aoMap
      if (mapDef.texCoord !== undefined && mapDef.texCoord != 0 && !(mapName === 'aoMap' && mapDef.texCoord == 1)) {
        console.warn('THREE.GLTFLoader: Custom UV set ' + mapDef.texCoord + ' for texture ' + mapName + ' not yet supported.');
      }

      if (parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]) {
        const transform = mapDef.extensions !== undefined ? mapDef.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] : undefined;

        if (transform) {
          const gltfReference = parser.associations.get(texture);
          texture = parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM].extendTexture(texture, transform);
          parser.associations.set(texture, gltfReference);
        }
      }

      materialParams[mapName] = texture;
      return texture;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */


  assignFinalMaterial(mesh) {
    const geometry = mesh.geometry;
    let material = mesh.material;
    const useVertexTangents = geometry.attributes.tangent !== undefined;
    const useVertexColors = geometry.attributes.color !== undefined;
    const useFlatShading = geometry.attributes.normal === undefined;

    if (mesh.isPoints) {
      const cacheKey = 'PointsMaterial:' + material.uuid;
      let pointsMaterial = this.cache.get(cacheKey);

      if (!pointsMaterial) {
        pointsMaterial = new PointsMaterial();
        Material.prototype.copy.call(pointsMaterial, material);
        pointsMaterial.color.copy(material.color);
        pointsMaterial.map = material.map;
        pointsMaterial.sizeAttenuation = false; // glTF spec says points should be 1px

        this.cache.add(cacheKey, pointsMaterial);
      }

      material = pointsMaterial;
    } else if (mesh.isLine) {
      const cacheKey = 'LineBasicMaterial:' + material.uuid;
      let lineMaterial = this.cache.get(cacheKey);

      if (!lineMaterial) {
        lineMaterial = new LineBasicMaterial();
        Material.prototype.copy.call(lineMaterial, material);
        lineMaterial.color.copy(material.color);
        this.cache.add(cacheKey, lineMaterial);
      }

      material = lineMaterial;
    } // Clone the material if it will be modified


    if (useVertexTangents || useVertexColors || useFlatShading) {
      let cacheKey = 'ClonedMaterial:' + material.uuid + ':';
      if (material.isGLTFSpecularGlossinessMaterial) cacheKey += 'specular-glossiness:';
      if (useVertexTangents) cacheKey += 'vertex-tangents:';
      if (useVertexColors) cacheKey += 'vertex-colors:';
      if (useFlatShading) cacheKey += 'flat-shading:';
      let cachedMaterial = this.cache.get(cacheKey);

      if (!cachedMaterial) {
        cachedMaterial = material.clone();
        if (useVertexColors) cachedMaterial.vertexColors = true;
        if (useFlatShading) cachedMaterial.flatShading = true;

        if (useVertexTangents) {
          // https://github.com/mrdoob/three.js/issues/11438#issuecomment-507003995
          if (cachedMaterial.normalScale) cachedMaterial.normalScale.y *= -1;
          if (cachedMaterial.clearcoatNormalScale) cachedMaterial.clearcoatNormalScale.y *= -1;
        }

        this.cache.add(cacheKey, cachedMaterial);
        this.associations.set(cachedMaterial, this.associations.get(material));
      }

      material = cachedMaterial;
    } // workarounds for mesh and geometry


    if (material.aoMap && geometry.attributes.uv2 === undefined && geometry.attributes.uv !== undefined) {
      geometry.setAttribute('uv2', geometry.attributes.uv);
    }

    mesh.material = material;
  }

  getMaterialType()
  /* materialIndex */
  {
    return MeshStandardMaterial;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */


  loadMaterial(materialIndex) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions;
    const materialDef = json.materials[materialIndex];
    let materialType;
    const materialParams = {};
    const materialExtensions = materialDef.extensions || {};
    const pending = [];

    if (materialExtensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
      const sgExtension = extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
      materialType = sgExtension.getMaterialType();
      pending.push(sgExtension.extendParams(materialParams, materialDef, parser));
    } else if (materialExtensions[EXTENSIONS.KHR_MATERIALS_UNLIT]) {
      const kmuExtension = extensions[EXTENSIONS.KHR_MATERIALS_UNLIT];
      materialType = kmuExtension.getMaterialType();
      pending.push(kmuExtension.extendParams(materialParams, materialDef, parser));
    } else {
      // Specification:
      // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material
      const metallicRoughness = materialDef.pbrMetallicRoughness || {};
      materialParams.color = new Color(1.0, 1.0, 1.0);
      materialParams.opacity = 1.0;

      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        const array = metallicRoughness.baseColorFactor;
        materialParams.color.fromArray(array);
        materialParams.opacity = array[3];
      }

      if (metallicRoughness.baseColorTexture !== undefined) {
        pending.push(parser.assignTexture(materialParams, 'map', metallicRoughness.baseColorTexture));
      }

      materialParams.metalness = metallicRoughness.metallicFactor !== undefined ? metallicRoughness.metallicFactor : 1.0;
      materialParams.roughness = metallicRoughness.roughnessFactor !== undefined ? metallicRoughness.roughnessFactor : 1.0;

      if (metallicRoughness.metallicRoughnessTexture !== undefined) {
        pending.push(parser.assignTexture(materialParams, 'metalnessMap', metallicRoughness.metallicRoughnessTexture));
        pending.push(parser.assignTexture(materialParams, 'roughnessMap', metallicRoughness.metallicRoughnessTexture));
      }

      materialType = this._invokeOne(function (ext) {
        return ext.getMaterialType && ext.getMaterialType(materialIndex);
      });
      pending.push(Promise.all(this._invokeAll(function (ext) {
        return ext.extendMaterialParams && ext.extendMaterialParams(materialIndex, materialParams);
      })));
    }

    if (materialDef.doubleSided === true) {
      materialParams.side = DoubleSide;
    }

    const alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;

    if (alphaMode === ALPHA_MODES.BLEND) {
      materialParams.transparent = true; // See: https://github.com/mrdoob/three.js/issues/17706

      materialParams.depthWrite = false;
    } else {
      materialParams.transparent = false;

      if (alphaMode === ALPHA_MODES.MASK) {
        materialParams.alphaTest = materialDef.alphaCutoff !== undefined ? materialDef.alphaCutoff : 0.5;
      }
    }

    if (materialDef.normalTexture !== undefined && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, 'normalMap', materialDef.normalTexture)); // https://github.com/mrdoob/three.js/issues/11438#issuecomment-507003995

      materialParams.normalScale = new Vector2(1, -1);

      if (materialDef.normalTexture.scale !== undefined) {
        materialParams.normalScale.set(materialDef.normalTexture.scale, -materialDef.normalTexture.scale);
      }
    }

    if (materialDef.occlusionTexture !== undefined && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, 'aoMap', materialDef.occlusionTexture));

      if (materialDef.occlusionTexture.strength !== undefined) {
        materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;
      }
    }

    if (materialDef.emissiveFactor !== undefined && materialType !== MeshBasicMaterial) {
      materialParams.emissive = new Color().fromArray(materialDef.emissiveFactor);
    }

    if (materialDef.emissiveTexture !== undefined && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, 'emissiveMap', materialDef.emissiveTexture));
    }

    return Promise.all(pending).then(function () {
      let material;

      if (materialType === GLTFMeshStandardSGMaterial) {
        material = extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(materialParams);
      } else {
        material = new materialType(materialParams);
      }

      if (materialDef.name) material.name = materialDef.name; // baseColorTexture, emissiveTexture, and specularGlossinessTexture use sRGB encoding.

      if (material.map) material.map.encoding = sRGBEncoding;
      if (material.emissiveMap) material.emissiveMap.encoding = sRGBEncoding;
      assignExtrasToUserData(material, materialDef);
      parser.associations.set(material, {
        type: 'materials',
        index: materialIndex
      });
      if (materialDef.extensions) addUnknownExtensionsToUserData(extensions, material, materialDef);
      return material;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */


  createUniqueName(originalName) {
    const sanitizedName = PropertyBinding.sanitizeNodeName(originalName || '');
    let name = sanitizedName;

    for (let i = 1; this.nodeNamesUsed[name]; ++i) {
      name = sanitizedName + '_' + i;
    }

    this.nodeNamesUsed[name] = true;
    return name;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */


  loadGeometries(primitives) {
    const parser = this;
    const extensions = this.extensions;
    const cache = this.primitiveCache;

    function createDracoPrimitive(primitive) {
      return extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(primitive, parser).then(function (geometry) {
        return addPrimitiveAttributes(geometry, primitive, parser);
      });
    }

    const pending = [];

    for (let i = 0, il = primitives.length; i < il; i++) {
      const primitive = primitives[i];
      const cacheKey = createPrimitiveKey(primitive); // See if we've already created this geometry

      const cached = cache[cacheKey];

      if (cached) {
        // Use the cached geometry if it exists
        pending.push(cached.promise);
      } else {
        let geometryPromise;

        if (primitive.extensions && primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]) {
          // Use DRACO geometry if available
          geometryPromise = createDracoPrimitive(primitive);
        } else {
          // Otherwise create a new geometry
          geometryPromise = addPrimitiveAttributes(new BufferGeometry(), primitive, parser);
        } // Cache this geometry


        cache[cacheKey] = {
          primitive: primitive,
          promise: geometryPromise
        };
        pending.push(geometryPromise);
      }
    }

    return Promise.all(pending);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */


  loadMesh(meshIndex) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions;
    const meshDef = json.meshes[meshIndex];
    const primitives = meshDef.primitives;
    const pending = [];

    for (let i = 0, il = primitives.length; i < il; i++) {
      const material = primitives[i].material === undefined ? createDefaultMaterial(this.cache) : this.getDependency('material', primitives[i].material);
      pending.push(material);
    }

    pending.push(parser.loadGeometries(primitives));
    return Promise.all(pending).then(function (results) {
      const materials = results.slice(0, results.length - 1);
      const geometries = results[results.length - 1];
      const meshes = [];

      for (let i = 0, il = geometries.length; i < il; i++) {
        const geometry = geometries[i];
        const primitive = primitives[i]; // 1. create Mesh

        let mesh;
        const material = materials[i];

        if (primitive.mode === WEBGL_CONSTANTS.TRIANGLES || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN || primitive.mode === undefined) {
          // .isSkinnedMesh isn't in glTF spec. See ._markDefs()
          mesh = meshDef.isSkinnedMesh === true ? new SkinnedMesh(geometry, material) : new Mesh(geometry, material);

          if (mesh.isSkinnedMesh === true && !mesh.geometry.attributes.skinWeight.normalized) {
            // we normalize floating point skin weight array to fix malformed assets (see #15319)
            // it's important to skip this for non-float32 data since normalizeSkinWeights assumes non-normalized inputs
            mesh.normalizeSkinWeights();
          }

          if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleStripDrawMode);
          } else if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleFanDrawMode);
          }
        } else if (primitive.mode === WEBGL_CONSTANTS.LINES) {
          mesh = new LineSegments(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_STRIP) {
          mesh = new Line$1(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_LOOP) {
          mesh = new LineLoop(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.POINTS) {
          mesh = new Points(geometry, material);
        } else {
          throw new Error('THREE.GLTFLoader: Primitive mode unsupported: ' + primitive.mode);
        }

        if (Object.keys(mesh.geometry.morphAttributes).length > 0) {
          updateMorphTargets(mesh, meshDef);
        }

        mesh.name = parser.createUniqueName(meshDef.name || 'mesh_' + meshIndex);
        assignExtrasToUserData(mesh, meshDef);
        if (primitive.extensions) addUnknownExtensionsToUserData(extensions, mesh, primitive);
        parser.assignFinalMaterial(mesh);
        meshes.push(mesh);
      }

      if (meshes.length === 1) {
        return meshes[0];
      }

      const group = new Group();

      for (let i = 0, il = meshes.length; i < il; i++) {
        group.add(meshes[i]);
      }

      return group;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */


  loadCamera(cameraIndex) {
    let camera;
    const cameraDef = this.json.cameras[cameraIndex];
    const params = cameraDef[cameraDef.type];

    if (!params) {
      console.warn('THREE.GLTFLoader: Missing camera parameters.');
      return;
    }

    if (cameraDef.type === 'perspective') {
      camera = new PerspectiveCamera(MathUtils.radToDeg(params.yfov), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6);
    } else if (cameraDef.type === 'orthographic') {
      camera = new OrthographicCamera$1(-params.xmag, params.xmag, params.ymag, -params.ymag, params.znear, params.zfar);
    }

    if (cameraDef.name) camera.name = this.createUniqueName(cameraDef.name);
    assignExtrasToUserData(camera, cameraDef);
    return Promise.resolve(camera);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Object>}
   */


  loadSkin(skinIndex) {
    const skinDef = this.json.skins[skinIndex];
    const skinEntry = {
      joints: skinDef.joints
    };

    if (skinDef.inverseBindMatrices === undefined) {
      return Promise.resolve(skinEntry);
    }

    return this.getDependency('accessor', skinDef.inverseBindMatrices).then(function (accessor) {
      skinEntry.inverseBindMatrices = accessor;
      return skinEntry;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */


  loadAnimation(animationIndex) {
    const json = this.json;
    const animationDef = json.animations[animationIndex];
    const pendingNodes = [];
    const pendingInputAccessors = [];
    const pendingOutputAccessors = [];
    const pendingSamplers = [];
    const pendingTargets = [];

    for (let i = 0, il = animationDef.channels.length; i < il; i++) {
      const channel = animationDef.channels[i];
      const sampler = animationDef.samplers[channel.sampler];
      const target = channel.target;
      const name = target.node !== undefined ? target.node : target.id; // NOTE: target.id is deprecated.

      const input = animationDef.parameters !== undefined ? animationDef.parameters[sampler.input] : sampler.input;
      const output = animationDef.parameters !== undefined ? animationDef.parameters[sampler.output] : sampler.output;
      pendingNodes.push(this.getDependency('node', name));
      pendingInputAccessors.push(this.getDependency('accessor', input));
      pendingOutputAccessors.push(this.getDependency('accessor', output));
      pendingSamplers.push(sampler);
      pendingTargets.push(target);
    }

    return Promise.all([Promise.all(pendingNodes), Promise.all(pendingInputAccessors), Promise.all(pendingOutputAccessors), Promise.all(pendingSamplers), Promise.all(pendingTargets)]).then(function (dependencies) {
      const nodes = dependencies[0];
      const inputAccessors = dependencies[1];
      const outputAccessors = dependencies[2];
      const samplers = dependencies[3];
      const targets = dependencies[4];
      const tracks = [];

      for (let i = 0, il = nodes.length; i < il; i++) {
        const node = nodes[i];
        const inputAccessor = inputAccessors[i];
        const outputAccessor = outputAccessors[i];
        const sampler = samplers[i];
        const target = targets[i];
        if (node === undefined) continue;
        node.updateMatrix();
        node.matrixAutoUpdate = true;
        let TypedKeyframeTrack;

        switch (PATH_PROPERTIES[target.path]) {
          case PATH_PROPERTIES.weights:
            TypedKeyframeTrack = NumberKeyframeTrack;
            break;

          case PATH_PROPERTIES.rotation:
            TypedKeyframeTrack = QuaternionKeyframeTrack;
            break;

          case PATH_PROPERTIES.position:
          case PATH_PROPERTIES.scale:
          default:
            TypedKeyframeTrack = VectorKeyframeTrack;
            break;
        }

        const targetName = node.name ? node.name : node.uuid;
        const interpolation = sampler.interpolation !== undefined ? INTERPOLATION[sampler.interpolation] : InterpolateLinear;
        const targetNames = [];

        if (PATH_PROPERTIES[target.path] === PATH_PROPERTIES.weights) {
          // Node may be a Group (glTF mesh with several primitives) or a Mesh.
          node.traverse(function (object) {
            if (object.isMesh === true && object.morphTargetInfluences) {
              targetNames.push(object.name ? object.name : object.uuid);
            }
          });
        } else {
          targetNames.push(targetName);
        }

        let outputArray = outputAccessor.array;

        if (outputAccessor.normalized) {
          const scale = getNormalizedComponentScale(outputArray.constructor);
          const scaled = new Float32Array(outputArray.length);

          for (let j = 0, jl = outputArray.length; j < jl; j++) {
            scaled[j] = outputArray[j] * scale;
          }

          outputArray = scaled;
        }

        for (let j = 0, jl = targetNames.length; j < jl; j++) {
          const track = new TypedKeyframeTrack(targetNames[j] + '.' + PATH_PROPERTIES[target.path], inputAccessor.array, outputArray, interpolation); // Override interpolation with custom factory method.

          if (sampler.interpolation === 'CUBICSPLINE') {
            track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline(result) {
              // A CUBICSPLINE keyframe in glTF has three output values for each input value,
              // representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
              // must be divided by three to get the interpolant's sampleSize argument.
              return new GLTFCubicSplineInterpolant(this.times, this.values, this.getValueSize() / 3, result);
            }; // Mark as CUBICSPLINE. `track.getInterpolation()` doesn't support custom interpolants.


            track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
          }

          tracks.push(track);
        }
      }

      const name = animationDef.name ? animationDef.name : 'animation_' + animationIndex;
      return new AnimationClip(name, undefined, tracks);
    });
  }

  createNodeMesh(nodeIndex) {
    const json = this.json;
    const parser = this;
    const nodeDef = json.nodes[nodeIndex];
    if (nodeDef.mesh === undefined) return null;
    return parser.getDependency('mesh', nodeDef.mesh).then(function (mesh) {
      const node = parser._getNodeRef(parser.meshCache, nodeDef.mesh, mesh); // if weights are provided on the node, override weights on the mesh.


      if (nodeDef.weights !== undefined) {
        node.traverse(function (o) {
          if (!o.isMesh) return;

          for (let i = 0, il = nodeDef.weights.length; i < il; i++) {
            o.morphTargetInfluences[i] = nodeDef.weights[i];
          }
        });
      }

      return node;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */


  loadNode(nodeIndex) {
    const json = this.json;
    const extensions = this.extensions;
    const parser = this;
    const nodeDef = json.nodes[nodeIndex]; // reserve node's name before its dependencies, so the root has the intended name.

    const nodeName = nodeDef.name ? parser.createUniqueName(nodeDef.name) : '';
    return function () {
      const pending = [];

      const meshPromise = parser._invokeOne(function (ext) {
        return ext.createNodeMesh && ext.createNodeMesh(nodeIndex);
      });

      if (meshPromise) {
        pending.push(meshPromise);
      }

      if (nodeDef.camera !== undefined) {
        pending.push(parser.getDependency('camera', nodeDef.camera).then(function (camera) {
          return parser._getNodeRef(parser.cameraCache, nodeDef.camera, camera);
        }));
      }

      parser._invokeAll(function (ext) {
        return ext.createNodeAttachment && ext.createNodeAttachment(nodeIndex);
      }).forEach(function (promise) {
        pending.push(promise);
      });

      return Promise.all(pending);
    }().then(function (objects) {
      let node; // .isBone isn't in glTF spec. See ._markDefs

      if (nodeDef.isBone === true) {
        node = new Bone();
      } else if (objects.length > 1) {
        node = new Group();
      } else if (objects.length === 1) {
        node = objects[0];
      } else {
        node = new Object3D();
      }

      if (node !== objects[0]) {
        for (let i = 0, il = objects.length; i < il; i++) {
          node.add(objects[i]);
        }
      }

      if (nodeDef.name) {
        node.userData.name = nodeDef.name;
        node.name = nodeName;
      }

      assignExtrasToUserData(node, nodeDef);
      if (nodeDef.extensions) addUnknownExtensionsToUserData(extensions, node, nodeDef);

      if (nodeDef.matrix !== undefined) {
        const matrix = new Matrix4();
        matrix.fromArray(nodeDef.matrix);
        node.applyMatrix4(matrix);
      } else {
        if (nodeDef.translation !== undefined) {
          node.position.fromArray(nodeDef.translation);
        }

        if (nodeDef.rotation !== undefined) {
          node.quaternion.fromArray(nodeDef.rotation);
        }

        if (nodeDef.scale !== undefined) {
          node.scale.fromArray(nodeDef.scale);
        }
      }

      parser.associations.set(node, {
        type: 'nodes',
        index: nodeIndex
      });
      return node;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */


  loadScene(sceneIndex) {
    const json = this.json;
    const extensions = this.extensions;
    const sceneDef = this.json.scenes[sceneIndex];
    const parser = this; // Loader returns Group, not Scene.
    // See: https://github.com/mrdoob/three.js/issues/18342#issuecomment-578981172

    const scene = new Group();
    if (sceneDef.name) scene.name = parser.createUniqueName(sceneDef.name);
    assignExtrasToUserData(scene, sceneDef);
    if (sceneDef.extensions) addUnknownExtensionsToUserData(extensions, scene, sceneDef);
    const nodeIds = sceneDef.nodes || [];
    const pending = [];

    for (let i = 0, il = nodeIds.length; i < il; i++) {
      pending.push(buildNodeHierachy(nodeIds[i], scene, json, parser));
    }

    return Promise.all(pending).then(function () {
      return scene;
    });
  }

}

function buildNodeHierachy(nodeId, parentObject, json, parser) {
  const nodeDef = json.nodes[nodeId];
  return parser.getDependency('node', nodeId).then(function (node) {
    if (nodeDef.skin === undefined) return node; // build skeleton here as well

    let skinEntry;
    return parser.getDependency('skin', nodeDef.skin).then(function (skin) {
      skinEntry = skin;
      const pendingJoints = [];

      for (let i = 0, il = skinEntry.joints.length; i < il; i++) {
        pendingJoints.push(parser.getDependency('node', skinEntry.joints[i]));
      }

      return Promise.all(pendingJoints);
    }).then(function (jointNodes) {
      node.traverse(function (mesh) {
        if (!mesh.isMesh) return;
        const bones = [];
        const boneInverses = [];

        for (let j = 0, jl = jointNodes.length; j < jl; j++) {
          const jointNode = jointNodes[j];

          if (jointNode) {
            bones.push(jointNode);
            const mat = new Matrix4();

            if (skinEntry.inverseBindMatrices !== undefined) {
              mat.fromArray(skinEntry.inverseBindMatrices.array, j * 16);
            }

            boneInverses.push(mat);
          } else {
            console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', skinEntry.joints[j]);
          }
        }

        mesh.bind(new Skeleton(bones, boneInverses), mesh.matrixWorld);
      });
      return node;
    });
  }).then(function (node) {
    // build node hierachy
    parentObject.add(node);
    const pending = [];

    if (nodeDef.children) {
      const children = nodeDef.children;

      for (let i = 0, il = children.length; i < il; i++) {
        const child = children[i];
        pending.push(buildNodeHierachy(child, node, json, parser));
      }
    }

    return Promise.all(pending);
  });
}
/**
 * @param {BufferGeometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 */


function computeBounds(geometry, primitiveDef, parser) {
  const attributes = primitiveDef.attributes;
  const box = new Box3();

  if (attributes.POSITION !== undefined) {
    const accessor = parser.json.accessors[attributes.POSITION];
    const min = accessor.min;
    const max = accessor.max; // glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

    if (min !== undefined && max !== undefined) {
      box.set(new Vector3(min[0], min[1], min[2]), new Vector3(max[0], max[1], max[2]));

      if (accessor.normalized) {
        const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
        box.min.multiplyScalar(boxScale);
        box.max.multiplyScalar(boxScale);
      }
    } else {
      console.warn('THREE.GLTFLoader: Missing min/max properties for accessor POSITION.');
      return;
    }
  } else {
    return;
  }

  const targets = primitiveDef.targets;

  if (targets !== undefined) {
    const maxDisplacement = new Vector3();
    const vector = new Vector3();

    for (let i = 0, il = targets.length; i < il; i++) {
      const target = targets[i];

      if (target.POSITION !== undefined) {
        const accessor = parser.json.accessors[target.POSITION];
        const min = accessor.min;
        const max = accessor.max; // glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

        if (min !== undefined && max !== undefined) {
          // we need to get max of absolute components because target weight is [-1,1]
          vector.setX(Math.max(Math.abs(min[0]), Math.abs(max[0])));
          vector.setY(Math.max(Math.abs(min[1]), Math.abs(max[1])));
          vector.setZ(Math.max(Math.abs(min[2]), Math.abs(max[2])));

          if (accessor.normalized) {
            const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
            vector.multiplyScalar(boxScale);
          } // Note: this assumes that the sum of all weights is at most 1. This isn't quite correct - it's more conservative
          // to assume that each target can have a max weight of 1. However, for some use cases - notably, when morph targets
          // are used to implement key-frame animations and as such only two are active at a time - this results in very large
          // boxes. So for now we make a box that's sometimes a touch too small but is hopefully mostly of reasonable size.


          maxDisplacement.max(vector);
        } else {
          console.warn('THREE.GLTFLoader: Missing min/max properties for accessor POSITION.');
        }
      }
    } // As per comment above this box isn't conservative, but has a reasonable size for a very large number of morph targets.


    box.expandByVector(maxDisplacement);
  }

  geometry.boundingBox = box;
  const sphere = new Sphere();
  box.getCenter(sphere.center);
  sphere.radius = box.min.distanceTo(box.max) / 2;
  geometry.boundingSphere = sphere;
}
/**
 * @param {BufferGeometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 * @return {Promise<BufferGeometry>}
 */


function addPrimitiveAttributes(geometry, primitiveDef, parser) {
  const attributes = primitiveDef.attributes;
  const pending = [];

  function assignAttributeAccessor(accessorIndex, attributeName) {
    return parser.getDependency('accessor', accessorIndex).then(function (accessor) {
      geometry.setAttribute(attributeName, accessor);
    });
  }

  for (const gltfAttributeName in attributes) {
    const threeAttributeName = ATTRIBUTES[gltfAttributeName] || gltfAttributeName.toLowerCase(); // Skip attributes already provided by e.g. Draco extension.

    if (threeAttributeName in geometry.attributes) continue;
    pending.push(assignAttributeAccessor(attributes[gltfAttributeName], threeAttributeName));
  }

  if (primitiveDef.indices !== undefined && !geometry.index) {
    const accessor = parser.getDependency('accessor', primitiveDef.indices).then(function (accessor) {
      geometry.setIndex(accessor);
    });
    pending.push(accessor);
  }

  assignExtrasToUserData(geometry, primitiveDef);
  computeBounds(geometry, primitiveDef, parser);
  return Promise.all(pending).then(function () {
    return primitiveDef.targets !== undefined ? addMorphTargets(geometry, primitiveDef.targets, parser) : geometry;
  });
}
/**
 * @param {BufferGeometry} geometry
 * @param {Number} drawMode
 * @return {BufferGeometry}
 */


function toTrianglesDrawMode(geometry, drawMode) {
  let index = geometry.getIndex(); // generate index if not present

  if (index === null) {
    const indices = [];
    const position = geometry.getAttribute('position');

    if (position !== undefined) {
      for (let i = 0; i < position.count; i++) {
        indices.push(i);
      }

      geometry.setIndex(indices);
      index = geometry.getIndex();
    } else {
      console.error('THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.');
      return geometry;
    }
  } //


  const numberOfTriangles = index.count - 2;
  const newIndices = [];

  if (drawMode === TriangleFanDrawMode) {
    // gl.TRIANGLE_FAN
    for (let i = 1; i <= numberOfTriangles; i++) {
      newIndices.push(index.getX(0));
      newIndices.push(index.getX(i));
      newIndices.push(index.getX(i + 1));
    }
  } else {
    // gl.TRIANGLE_STRIP
    for (let i = 0; i < numberOfTriangles; i++) {
      if (i % 2 === 0) {
        newIndices.push(index.getX(i));
        newIndices.push(index.getX(i + 1));
        newIndices.push(index.getX(i + 2));
      } else {
        newIndices.push(index.getX(i + 2));
        newIndices.push(index.getX(i + 1));
        newIndices.push(index.getX(i));
      }
    }
  }

  if (newIndices.length / 3 !== numberOfTriangles) {
    console.error('THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.');
  } // build final geometry


  const newGeometry = geometry.clone();
  newGeometry.setIndex(newIndices);
  return newGeometry;
}

// http://en.wikipedia.org/wiki/RGBE_image_format

class RGBELoader extends DataTextureLoader {
  constructor(manager) {
    super(manager);
    this.type = UnsignedByteType;
  } // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html


  parse(buffer) {
    const
    /* return codes for rgbe routines */
    //RGBE_RETURN_SUCCESS = 0,
    RGBE_RETURN_FAILURE = -1,

    /* default error routine.  change this to change error handling */
    rgbe_read_error = 1,
          rgbe_write_error = 2,
          rgbe_format_error = 3,
          rgbe_memory_error = 4,
          rgbe_error = function (rgbe_error_code, msg) {
      switch (rgbe_error_code) {
        case rgbe_read_error:
          console.error('THREE.RGBELoader Read Error: ' + (msg || ''));
          break;

        case rgbe_write_error:
          console.error('THREE.RGBELoader Write Error: ' + (msg || ''));
          break;

        case rgbe_format_error:
          console.error('THREE.RGBELoader Bad File Format: ' + (msg || ''));
          break;

        default:
        case rgbe_memory_error:
          console.error('THREE.RGBELoader: Error: ' + (msg || ''));
      }

      return RGBE_RETURN_FAILURE;
    },

    /* offsets to red, green, and blue components in a data (float) pixel */
    //RGBE_DATA_RED = 0,
    //RGBE_DATA_GREEN = 1,
    //RGBE_DATA_BLUE = 2,

    /* number of floats per pixel, use 4 since stored in rgba image format */
    //RGBE_DATA_SIZE = 4,

    /* flags indicating which fields in an rgbe_header_info are valid */
    RGBE_VALID_PROGRAMTYPE = 1,
          RGBE_VALID_FORMAT = 2,
          RGBE_VALID_DIMENSIONS = 4,
          NEWLINE = '\n',
          fgets = function (buffer, lineLimit, consume) {
      const chunkSize = 128;
      lineLimit = !lineLimit ? 1024 : lineLimit;
      let p = buffer.pos,
          i = -1,
          len = 0,
          s = '',
          chunk = String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));

      while (0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer.byteLength) {
        s += chunk;
        len += chunk.length;
        p += chunkSize;
        chunk += String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));
      }

      if (-1 < i) {
        /*for (i=l-1; i>=0; i--) {
        byteCode = m.charCodeAt(i);
        if (byteCode > 0x7f && byteCode <= 0x7ff) byteLen++;
        else if (byteCode > 0x7ff && byteCode <= 0xffff) byteLen += 2;
        if (byteCode >= 0xDC00 && byteCode <= 0xDFFF) i--; //trail surrogate
        }*/
        if (false !== consume) buffer.pos += len + i + 1;
        return s + chunk.slice(0, i);
      }

      return false;
    },

    /* minimal header reading.  modify if you want to parse more information */
    RGBE_ReadHeader = function (buffer) {
      // regexes to parse header info fields
      const magic_token_re = /^#\?(\S+)/,
            gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,
            exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,
            format_re = /^\s*FORMAT=(\S+)\s*$/,
            dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,
            // RGBE format header struct
      header = {
        valid: 0
        /* indicate which fields are valid */
        ,
        string: ''
        /* the actual header string */
        ,
        comments: ''
        /* comments found in header */
        ,
        programtype: 'RGBE'
        /* listed at beginning of file to identify it after "#?". defaults to "RGBE" */
        ,
        format: ''
        /* RGBE format, default 32-bit_rle_rgbe */
        ,
        gamma: 1.0
        /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */
        ,
        exposure: 1.0
        /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */
        ,
        width: 0,
        height: 0
        /* image dimensions, width/height */

      };
      let line, match;

      if (buffer.pos >= buffer.byteLength || !(line = fgets(buffer))) {
        return rgbe_error(rgbe_read_error, 'no header found');
      }
      /* if you want to require the magic token then uncomment the next line */


      if (!(match = line.match(magic_token_re))) {
        return rgbe_error(rgbe_format_error, 'bad initial token');
      }

      header.valid |= RGBE_VALID_PROGRAMTYPE;
      header.programtype = match[1];
      header.string += line + '\n';

      while (true) {
        line = fgets(buffer);
        if (false === line) break;
        header.string += line + '\n';

        if ('#' === line.charAt(0)) {
          header.comments += line + '\n';
          continue; // comment line
        }

        if (match = line.match(gamma_re)) {
          header.gamma = parseFloat(match[1], 10);
        }

        if (match = line.match(exposure_re)) {
          header.exposure = parseFloat(match[1], 10);
        }

        if (match = line.match(format_re)) {
          header.valid |= RGBE_VALID_FORMAT;
          header.format = match[1]; //'32-bit_rle_rgbe';
        }

        if (match = line.match(dimensions_re)) {
          header.valid |= RGBE_VALID_DIMENSIONS;
          header.height = parseInt(match[1], 10);
          header.width = parseInt(match[2], 10);
        }

        if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS) break;
      }

      if (!(header.valid & RGBE_VALID_FORMAT)) {
        return rgbe_error(rgbe_format_error, 'missing format specifier');
      }

      if (!(header.valid & RGBE_VALID_DIMENSIONS)) {
        return rgbe_error(rgbe_format_error, 'missing image size specifier');
      }

      return header;
    },
          RGBE_ReadPixels_RLE = function (buffer, w, h) {
      const scanline_width = w;

      if ( // run length encoding is not allowed so read flat
      scanline_width < 8 || scanline_width > 0x7fff || // this file is not run length encoded
      2 !== buffer[0] || 2 !== buffer[1] || buffer[2] & 0x80) {
        // return the flat buffer
        return new Uint8Array(buffer);
      }

      if (scanline_width !== (buffer[2] << 8 | buffer[3])) {
        return rgbe_error(rgbe_format_error, 'wrong scanline width');
      }

      const data_rgba = new Uint8Array(4 * w * h);

      if (!data_rgba.length) {
        return rgbe_error(rgbe_memory_error, 'unable to allocate buffer space');
      }

      let offset = 0,
          pos = 0;
      const ptr_end = 4 * scanline_width;
      const rgbeStart = new Uint8Array(4);
      const scanline_buffer = new Uint8Array(ptr_end);
      let num_scanlines = h; // read in each successive scanline

      while (num_scanlines > 0 && pos < buffer.byteLength) {
        if (pos + 4 > buffer.byteLength) {
          return rgbe_error(rgbe_read_error);
        }

        rgbeStart[0] = buffer[pos++];
        rgbeStart[1] = buffer[pos++];
        rgbeStart[2] = buffer[pos++];
        rgbeStart[3] = buffer[pos++];

        if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) {
          return rgbe_error(rgbe_format_error, 'bad rgbe scanline format');
        } // read each of the four channels for the scanline into the buffer
        // first red, then green, then blue, then exponent


        let ptr = 0,
            count;

        while (ptr < ptr_end && pos < buffer.byteLength) {
          count = buffer[pos++];
          const isEncodedRun = count > 128;
          if (isEncodedRun) count -= 128;

          if (0 === count || ptr + count > ptr_end) {
            return rgbe_error(rgbe_format_error, 'bad scanline data');
          }

          if (isEncodedRun) {
            // a (encoded) run of the same value
            const byteValue = buffer[pos++];

            for (let i = 0; i < count; i++) {
              scanline_buffer[ptr++] = byteValue;
            } //ptr += count;

          } else {
            // a literal-run
            scanline_buffer.set(buffer.subarray(pos, pos + count), ptr);
            ptr += count;
            pos += count;
          }
        } // now convert data from buffer into rgba
        // first red, then green, then blue, then exponent (alpha)


        const l = scanline_width; //scanline_buffer.byteLength;

        for (let i = 0; i < l; i++) {
          let off = 0;
          data_rgba[offset] = scanline_buffer[i + off];
          off += scanline_width; //1;

          data_rgba[offset + 1] = scanline_buffer[i + off];
          off += scanline_width; //1;

          data_rgba[offset + 2] = scanline_buffer[i + off];
          off += scanline_width; //1;

          data_rgba[offset + 3] = scanline_buffer[i + off];
          offset += 4;
        }

        num_scanlines--;
      }

      return data_rgba;
    };

    const RGBEByteToRGBFloat = function (sourceArray, sourceOffset, destArray, destOffset) {
      const e = sourceArray[sourceOffset + 3];
      const scale = Math.pow(2.0, e - 128.0) / 255.0;
      destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale;
      destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale;
      destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale;
    };

    const RGBEByteToRGBHalf = function (sourceArray, sourceOffset, destArray, destOffset) {
      const e = sourceArray[sourceOffset + 3];
      const scale = Math.pow(2.0, e - 128.0) / 255.0;
      destArray[destOffset + 0] = DataUtils.toHalfFloat(sourceArray[sourceOffset + 0] * scale);
      destArray[destOffset + 1] = DataUtils.toHalfFloat(sourceArray[sourceOffset + 1] * scale);
      destArray[destOffset + 2] = DataUtils.toHalfFloat(sourceArray[sourceOffset + 2] * scale);
    };

    const byteArray = new Uint8Array(buffer);
    byteArray.pos = 0;
    const rgbe_header_info = RGBE_ReadHeader(byteArray);

    if (RGBE_RETURN_FAILURE !== rgbe_header_info) {
      const w = rgbe_header_info.width,
            h = rgbe_header_info.height,
            image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);

      if (RGBE_RETURN_FAILURE !== image_rgba_data) {
        let data, format, type;
        let numElements;

        switch (this.type) {
          case UnsignedByteType:
            data = image_rgba_data;
            format = RGBEFormat; // handled as THREE.RGBAFormat in shaders

            type = UnsignedByteType;
            break;

          case FloatType:
            numElements = image_rgba_data.length / 4 * 3;
            const floatArray = new Float32Array(numElements);

            for (let j = 0; j < numElements; j++) {
              RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 3);
            }

            data = floatArray;
            format = RGBFormat;
            type = FloatType;
            break;

          case HalfFloatType:
            numElements = image_rgba_data.length / 4 * 3;
            const halfArray = new Uint16Array(numElements);

            for (let j = 0; j < numElements; j++) {
              RGBEByteToRGBHalf(image_rgba_data, j * 4, halfArray, j * 3);
            }

            data = halfArray;
            format = RGBFormat;
            type = HalfFloatType;
            break;

          default:
            console.error('THREE.RGBELoader: unsupported type: ', this.type);
            break;
        }

        return {
          width: w,
          height: h,
          data: data,
          header: rgbe_header_info.string,
          gamma: rgbe_header_info.gamma,
          exposure: rgbe_header_info.exposure,
          format: format,
          type: type
        };
      }
    }

    return null;
  }

  setDataType(value) {
    this.type = value;
    return this;
  }

  load(url, onLoad, onProgress, onError) {
    function onLoadCallback(texture, texData) {
      switch (texture.type) {
        case UnsignedByteType:
          texture.encoding = RGBEEncoding;
          texture.minFilter = NearestFilter;
          texture.magFilter = NearestFilter;
          texture.generateMipmaps = false;
          texture.flipY = true;
          break;

        case FloatType:
          texture.encoding = LinearEncoding;
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          texture.generateMipmaps = false;
          texture.flipY = true;
          break;

        case HalfFloatType:
          texture.encoding = LinearEncoding;
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          texture.generateMipmaps = false;
          texture.flipY = true;
          break;
      }

      if (onLoad) onLoad(texture, texData);
    }

    return super.load(url, onLoadCallback, onProgress, onError);
  }

}

const _taskCache = new WeakMap();

class DRACOLoader extends Loader {
  constructor(manager) {
    super(manager);
    this.decoderPath = '';
    this.decoderConfig = {};
    this.decoderBinary = null;
    this.decoderPending = null;
    this.workerLimit = 4;
    this.workerPool = [];
    this.workerNextTaskID = 1;
    this.workerSourceURL = '';
    this.defaultAttributeIDs = {
      position: 'POSITION',
      normal: 'NORMAL',
      color: 'COLOR',
      uv: 'TEX_COORD'
    };
    this.defaultAttributeTypes = {
      position: 'Float32Array',
      normal: 'Float32Array',
      color: 'Float32Array',
      uv: 'Float32Array'
    };
  }

  setDecoderPath(path) {
    this.decoderPath = path;
    return this;
  }

  setDecoderConfig(config) {
    this.decoderConfig = config;
    return this;
  }

  setWorkerLimit(workerLimit) {
    this.workerLimit = workerLimit;
    return this;
  }

  load(url, onLoad, onProgress, onError) {
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType('arraybuffer');
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, buffer => {
      const taskConfig = {
        attributeIDs: this.defaultAttributeIDs,
        attributeTypes: this.defaultAttributeTypes,
        useUniqueIDs: false
      };
      this.decodeGeometry(buffer, taskConfig).then(onLoad).catch(onError);
    }, onProgress, onError);
  }
  /** @deprecated Kept for backward-compatibility with previous DRACOLoader versions. */


  decodeDracoFile(buffer, callback, attributeIDs, attributeTypes) {
    const taskConfig = {
      attributeIDs: attributeIDs || this.defaultAttributeIDs,
      attributeTypes: attributeTypes || this.defaultAttributeTypes,
      useUniqueIDs: !!attributeIDs
    };
    this.decodeGeometry(buffer, taskConfig).then(callback);
  }

  decodeGeometry(buffer, taskConfig) {
    // TODO: For backward-compatibility, support 'attributeTypes' objects containing
    // references (rather than names) to typed array constructors. These must be
    // serialized before sending them to the worker.
    for (const attribute in taskConfig.attributeTypes) {
      const type = taskConfig.attributeTypes[attribute];

      if (type.BYTES_PER_ELEMENT !== undefined) {
        taskConfig.attributeTypes[attribute] = type.name;
      }
    } //


    const taskKey = JSON.stringify(taskConfig); // Check for an existing task using this buffer. A transferred buffer cannot be transferred
    // again from this thread.

    if (_taskCache.has(buffer)) {
      const cachedTask = _taskCache.get(buffer);

      if (cachedTask.key === taskKey) {
        return cachedTask.promise;
      } else if (buffer.byteLength === 0) {
        // Technically, it would be possible to wait for the previous task to complete,
        // transfer the buffer back, and decode again with the second configuration. That
        // is complex, and I don't know of any reason to decode a Draco buffer twice in
        // different ways, so this is left unimplemented.
        throw new Error('THREE.DRACOLoader: Unable to re-decode a buffer with different ' + 'settings. Buffer has already been transferred.');
      }
    } //


    let worker;
    const taskID = this.workerNextTaskID++;
    const taskCost = buffer.byteLength; // Obtain a worker and assign a task, and construct a geometry instance
    // when the task completes.

    const geometryPending = this._getWorker(taskID, taskCost).then(_worker => {
      worker = _worker;
      return new Promise((resolve, reject) => {
        worker._callbacks[taskID] = {
          resolve,
          reject
        };
        worker.postMessage({
          type: 'decode',
          id: taskID,
          taskConfig,
          buffer
        }, [buffer]); // this.debug();
      });
    }).then(message => this._createGeometry(message.geometry)); // Remove task from the task list.
    // Note: replaced '.finally()' with '.catch().then()' block - iOS 11 support (#19416)


    geometryPending.catch(() => true).then(() => {
      if (worker && taskID) {
        this._releaseTask(worker, taskID); // this.debug();

      }
    }); // Cache the task result.

    _taskCache.set(buffer, {
      key: taskKey,
      promise: geometryPending
    });

    return geometryPending;
  }

  _createGeometry(geometryData) {
    const geometry = new BufferGeometry();

    if (geometryData.index) {
      geometry.setIndex(new BufferAttribute(geometryData.index.array, 1));
    }

    for (let i = 0; i < geometryData.attributes.length; i++) {
      const attribute = geometryData.attributes[i];
      const name = attribute.name;
      const array = attribute.array;
      const itemSize = attribute.itemSize;
      geometry.setAttribute(name, new BufferAttribute(array, itemSize));
    }

    return geometry;
  }

  _loadLibrary(url, responseType) {
    const loader = new FileLoader(this.manager);
    loader.setPath(this.decoderPath);
    loader.setResponseType(responseType);
    loader.setWithCredentials(this.withCredentials);
    return new Promise((resolve, reject) => {
      loader.load(url, resolve, undefined, reject);
    });
  }

  preload() {
    this._initDecoder();

    return this;
  }

  _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    const useJS = typeof WebAssembly !== 'object' || this.decoderConfig.type === 'js';
    const librariesPending = [];

    if (useJS) {
      librariesPending.push(this._loadLibrary('draco_decoder.js', 'text'));
    } else {
      librariesPending.push(this._loadLibrary('draco_wasm_wrapper.js', 'text'));
      librariesPending.push(this._loadLibrary('draco_decoder.wasm', 'arraybuffer'));
    }

    this.decoderPending = Promise.all(librariesPending).then(libraries => {
      const jsContent = libraries[0];

      if (!useJS) {
        this.decoderConfig.wasmBinary = libraries[1];
      }

      const fn = DRACOWorker.toString();
      const body = ['/* draco decoder */', jsContent, '', '/* worker */', fn.substring(fn.indexOf('{') + 1, fn.lastIndexOf('}'))].join('\n');
      this.workerSourceURL = URL.createObjectURL(new Blob([body]));
    });
    return this.decoderPending;
  }

  _getWorker(taskID, taskCost) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const worker = new Worker(this.workerSourceURL);
        worker._callbacks = {};
        worker._taskCosts = {};
        worker._taskLoad = 0;
        worker.postMessage({
          type: 'init',
          decoderConfig: this.decoderConfig
        });

        worker.onmessage = function (e) {
          const message = e.data;

          switch (message.type) {
            case 'decode':
              worker._callbacks[message.id].resolve(message);

              break;

            case 'error':
              worker._callbacks[message.id].reject(message);

              break;

            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + message.type + '"');
          }
        };

        this.workerPool.push(worker);
      } else {
        this.workerPool.sort(function (a, b) {
          return a._taskLoad > b._taskLoad ? -1 : 1;
        });
      }

      const worker = this.workerPool[this.workerPool.length - 1];
      worker._taskCosts[taskID] = taskCost;
      worker._taskLoad += taskCost;
      return worker;
    });
  }

  _releaseTask(worker, taskID) {
    worker._taskLoad -= worker._taskCosts[taskID];
    delete worker._callbacks[taskID];
    delete worker._taskCosts[taskID];
  }

  debug() {
    console.log('Task load: ', this.workerPool.map(worker => worker._taskLoad));
  }

  dispose() {
    for (let i = 0; i < this.workerPool.length; ++i) {
      this.workerPool[i].terminate();
    }

    this.workerPool.length = 0;
    return this;
  }

}
/* WEB WORKER */


function DRACOWorker() {
  let decoderConfig;
  let decoderPending;

  onmessage = function (e) {
    const message = e.data;

    switch (message.type) {
      case 'init':
        decoderConfig = message.decoderConfig;
        decoderPending = new Promise(function (resolve
        /*, reject*/
        ) {
          decoderConfig.onModuleLoaded = function (draco) {
            // Module is Promise-like. Wrap before resolving to avoid loop.
            resolve({
              draco: draco
            });
          };

          DracoDecoderModule(decoderConfig); // eslint-disable-line no-undef
        });
        break;

      case 'decode':
        const buffer = message.buffer;
        const taskConfig = message.taskConfig;
        decoderPending.then(module => {
          const draco = module.draco;
          const decoder = new draco.Decoder();
          const decoderBuffer = new draco.DecoderBuffer();
          decoderBuffer.Init(new Int8Array(buffer), buffer.byteLength);

          try {
            const geometry = decodeGeometry(draco, decoder, decoderBuffer, taskConfig);
            const buffers = geometry.attributes.map(attr => attr.array.buffer);
            if (geometry.index) buffers.push(geometry.index.array.buffer);
            self.postMessage({
              type: 'decode',
              id: message.id,
              geometry
            }, buffers);
          } catch (error) {
            console.error(error);
            self.postMessage({
              type: 'error',
              id: message.id,
              error: error.message
            });
          } finally {
            draco.destroy(decoderBuffer);
            draco.destroy(decoder);
          }
        });
        break;
    }
  };

  function decodeGeometry(draco, decoder, decoderBuffer, taskConfig) {
    const attributeIDs = taskConfig.attributeIDs;
    const attributeTypes = taskConfig.attributeTypes;
    let dracoGeometry;
    let decodingStatus;
    const geometryType = decoder.GetEncodedGeometryType(decoderBuffer);

    if (geometryType === draco.TRIANGULAR_MESH) {
      dracoGeometry = new draco.Mesh();
      decodingStatus = decoder.DecodeBufferToMesh(decoderBuffer, dracoGeometry);
    } else if (geometryType === draco.POINT_CLOUD) {
      dracoGeometry = new draco.PointCloud();
      decodingStatus = decoder.DecodeBufferToPointCloud(decoderBuffer, dracoGeometry);
    } else {
      throw new Error('THREE.DRACOLoader: Unexpected geometry type.');
    }

    if (!decodingStatus.ok() || dracoGeometry.ptr === 0) {
      throw new Error('THREE.DRACOLoader: Decoding failed: ' + decodingStatus.error_msg());
    }

    const geometry = {
      index: null,
      attributes: []
    }; // Gather all vertex attributes.

    for (const attributeName in attributeIDs) {
      const attributeType = self[attributeTypes[attributeName]];
      let attribute;
      let attributeID; // A Draco file may be created with default vertex attributes, whose attribute IDs
      // are mapped 1:1 from their semantic name (POSITION, NORMAL, ...). Alternatively,
      // a Draco file may contain a custom set of attributes, identified by known unique
      // IDs. glTF files always do the latter, and `.drc` files typically do the former.

      if (taskConfig.useUniqueIDs) {
        attributeID = attributeIDs[attributeName];
        attribute = decoder.GetAttributeByUniqueId(dracoGeometry, attributeID);
      } else {
        attributeID = decoder.GetAttributeId(dracoGeometry, draco[attributeIDs[attributeName]]);
        if (attributeID === -1) continue;
        attribute = decoder.GetAttribute(dracoGeometry, attributeID);
      }

      geometry.attributes.push(decodeAttribute(draco, decoder, dracoGeometry, attributeName, attributeType, attribute));
    } // Add index.


    if (geometryType === draco.TRIANGULAR_MESH) {
      geometry.index = decodeIndex(draco, decoder, dracoGeometry);
    }

    draco.destroy(dracoGeometry);
    return geometry;
  }

  function decodeIndex(draco, decoder, dracoGeometry) {
    const numFaces = dracoGeometry.num_faces();
    const numIndices = numFaces * 3;
    const byteLength = numIndices * 4;

    const ptr = draco._malloc(byteLength);

    decoder.GetTrianglesUInt32Array(dracoGeometry, byteLength, ptr);
    const index = new Uint32Array(draco.HEAPF32.buffer, ptr, numIndices).slice();

    draco._free(ptr);

    return {
      array: index,
      itemSize: 1
    };
  }

  function decodeAttribute(draco, decoder, dracoGeometry, attributeName, attributeType, attribute) {
    const numComponents = attribute.num_components();
    const numPoints = dracoGeometry.num_points();
    const numValues = numPoints * numComponents;
    const byteLength = numValues * attributeType.BYTES_PER_ELEMENT;
    const dataType = getDracoDataType(draco, attributeType);

    const ptr = draco._malloc(byteLength);

    decoder.GetAttributeDataArrayForAllPoints(dracoGeometry, attribute, dataType, byteLength, ptr);
    const array = new attributeType(draco.HEAPF32.buffer, ptr, numValues).slice();

    draco._free(ptr);

    return {
      name: attributeName,
      array: array,
      itemSize: numComponents
    };
  }

  function getDracoDataType(draco, attributeType) {
    switch (attributeType) {
      case Float32Array:
        return draco.DT_FLOAT32;

      case Int8Array:
        return draco.DT_INT8;

      case Int16Array:
        return draco.DT_INT16;

      case Int32Array:
        return draco.DT_INT32;

      case Uint8Array:
        return draco.DT_UINT8;

      case Uint16Array:
        return draco.DT_UINT16;

      case Uint32Array:
        return draco.DT_UINT32;
    }
  }
}

class LineSegmentsGeometry extends InstancedBufferGeometry {
  constructor() {
    super();

    _defineProperty(this, "isLineSegmentsGeometry", true);

    _defineProperty(this, "type", 'LineSegmentsGeometry');

    _defineProperty(this, "boundingBox", null);

    _defineProperty(this, "boundingSphere", null);

    _defineProperty(this, "box", new Box3());

    _defineProperty(this, "vector", new Vector3());

    const positions = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0];
    const uvs = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2];
    const index = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];
    this.setIndex(index);
    this.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  }

  applyMatrix4(matrix) {
    const start = this.attributes.instanceStart;
    const end = this.attributes.instanceEnd;

    if (start !== undefined) {
      start.applyMatrix4(matrix);
      end.applyMatrix4(matrix);
      start.needsUpdate = true;
    }

    if (this.boundingBox !== null) {
      this.computeBoundingBox();
    }

    if (this.boundingSphere !== null) {
      this.computeBoundingSphere();
    }

    return this;
  }

  setPositions(array) {
    let lineSegments;

    if (array instanceof Float32Array) {
      lineSegments = array;
    } else if (Array.isArray(array)) {
      lineSegments = new Float32Array(array);
    } else {
      console.error('LineSegmentsGeometry.setPosition requires either a Float32Array or regular array of numbers');
      return this;
    }

    const instanceBuffer = new InstancedInterleavedBuffer(lineSegments, 6, 1); // xyz, xyz

    this.setAttribute('instanceStart', new InterleavedBufferAttribute(instanceBuffer, 3, 0)); // xyz

    this.setAttribute('instanceEnd', new InterleavedBufferAttribute(instanceBuffer, 3, 3)); // xyz
    //

    this.computeBoundingBox();
    this.computeBoundingSphere();
    return this;
  }

  setColors(array) {
    let colors;

    if (array instanceof Float32Array) {
      colors = array;
    } else if (Array.isArray(array)) {
      colors = new Float32Array(array);
    } else {
      console.error('LineSegmentsGeometry.setColors requires either a Float32Array or regular array of numbers');
      return this;
    }

    const instanceColorBuffer = new InstancedInterleavedBuffer(colors, 6, 1); // rgb, rgb

    this.setAttribute('instanceColorStart', new InterleavedBufferAttribute(instanceColorBuffer, 3, 0)); // rgb

    this.setAttribute('instanceColorEnd', new InterleavedBufferAttribute(instanceColorBuffer, 3, 3)); // rgb

    return this;
  }

  fromWireframeGeometry(geometry) {
    this.setPositions(Array.from(geometry.attributes.position.array));
    return this;
  }

  fromEdgesGeometry(geometry) {
    this.setPositions(Array.from(geometry.attributes.position.array));
    return this;
  }

  fromMesh(mesh) {
    this.fromWireframeGeometry(new WireframeGeometry(mesh.geometry));
    return this;
  }

  fromLineSegments(lineSegments) {
    const geometry = lineSegments.geometry;

    if (geometry.isBufferGeometry) {
      this.setPositions(Array.from(geometry.attributes.position.array)); // assumes non-indexed
    } // set colors, maybe


    return this;
  }

  computeBoundingBox() {
    if (this.boundingBox === null) {
      this.boundingBox = new Box3();
    }

    const start = this.attributes.instanceStart;
    const end = this.attributes.instanceEnd;

    if (start !== undefined && end !== undefined) {
      this.boundingBox.setFromBufferAttribute(start);
      this.box.setFromBufferAttribute(end);
      this.boundingBox.union(this.box);
    }
  }

  computeBoundingSphere() {
    if (this.boundingSphere === null) {
      this.boundingSphere = new Sphere();
    }

    if (this.boundingBox === null) {
      this.computeBoundingBox();
    }

    const start = this.attributes.instanceStart;
    const end = this.attributes.instanceEnd;

    if (start !== undefined && end !== undefined) {
      const center = this.boundingSphere.center;

      if (this.boundingBox) {
        this.boundingBox.getCenter(center);
      }

      let maxRadiusSq = 0;

      for (let i = 0, il = start.count; i < il; i++) {
        this.vector.fromBufferAttribute(start, i);
        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(this.vector));
        this.vector.fromBufferAttribute(end, i);
        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(this.vector));
      }

      this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

      if (isNaN(this.boundingSphere.radius)) {
        console.error('THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.', this);
      }
    }
  }

  toJSON() {// todo
  }

}

class LineGeometry extends LineSegmentsGeometry {
  constructor() {
    super();

    _defineProperty(this, "type", 'LineGeometry');

    _defineProperty(this, "isLineGeometry", true);

    _defineProperty(this, "setColors", array => {
      // converts [ r1, g1, b1,  r2, g2, b2, ... ] to pairs format
      const length = array.length - 3;
      const colors = new Float32Array(2 * length);

      for (let i = 0; i < length; i += 3) {
        colors[2 * i] = array[i];
        colors[2 * i + 1] = array[i + 1];
        colors[2 * i + 2] = array[i + 2];
        colors[2 * i + 3] = array[i + 3];
        colors[2 * i + 4] = array[i + 4];
        colors[2 * i + 5] = array[i + 5];
      }

      super.setColors(colors);
      return this;
    });

    _defineProperty(this, "fromLine", line => {
      const geometry = line.geometry;

      if (geometry.isBufferGeometry) {
        this.setPositions(Array.from(geometry.attributes.position.array)); // assumes non-indexed
      } // set colors, maybe


      return this;
    });

    _defineProperty(this, "copy", () => {
      // todo
      return this;
    });
  }

  setPositions(array) {
    // converts [ x1, y1, z1,  x2, y2, z2, ... ] to pairs format
    const length = array.length - 3;
    const points = new Float32Array(2 * length);

    for (let i = 0; i < length; i += 3) {
      points[2 * i] = array[i];
      points[2 * i + 1] = array[i + 1];
      points[2 * i + 2] = array[i + 2];
      points[2 * i + 3] = array[i + 3];
      points[2 * i + 4] = array[i + 4];
      points[2 * i + 5] = array[i + 5];
    }

    super.setPositions(points);
    return this;
  }

}

/**
 * parameters = {
 *  color: <hex>,
 *  linewidth: <float>,
 *  dashed: <boolean>,
 *  dashScale: <float>,
 *  dashSize: <float>,
 *  dashOffset: <float>,
 *  gapSize: <float>,
 *  resolution: <Vector2>, // to be set by renderer
 * }
 */
const LineUniforms = {
  linewidth: {
    value: 1
  },
  resolution: {
    value: new Vector2(1, 1)
  },
  dashScale: {
    value: 1
  },
  dashSize: {
    value: 1
  },
  dashOffset: {
    value: 0
  },
  gapSize: {
    value: 1
  },
  // todo FIX - maybe change to totalSize
  opacity: {
    value: 1
  }
};
ShaderLib['line'] = {
  uniforms: UniformsUtils.merge([UniformsLib.common, UniformsLib.fog, LineUniforms]),
  vertexShader:
  /* glsl */
  `
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		varying vec2 vUv;

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			vUv = uv;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec2 ndcStart = clipStart.xy / clipStart.w;
			vec2 ndcEnd = clipEnd.xy / clipEnd.w;

			// direction
			vec2 dir = ndcEnd - ndcStart;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			// perpendicular to dir
			vec2 offset = vec2( dir.y, - dir.x );

			// undo aspect ratio adjustment
			dir.x /= aspect;
			offset.x /= aspect;

			// sign flip
			if ( position.x < 0.0 ) offset *= - 1.0;

			// endcaps
			if ( position.y < 0.0 ) {

				offset += - dir;

			} else if ( position.y > 1.0 ) {

				offset += dir;

			}

			// adjust for linewidth
			offset *= linewidth;

			// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
			offset /= resolution.y;

			// select end
			vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

			// back to clip space
			offset *= clip.w;

			clip.xy += offset;

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,
  fragmentShader:
  /* glsl */
  `
		uniform vec3 diffuse;
		uniform float opacity;

		#ifdef USE_DASH

			uniform float dashSize;
			uniform float dashOffset;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		varying vec2 vUv;

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef ALPHA_TO_COVERAGE

			// artifacts appear on some hardware if a derivative is taken within a conditional
			float a = vUv.x;
			float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
			float len2 = a * a + b * b;
			float dlen = fwidth( len2 );

			if ( abs( vUv.y ) > 1.0 ) {

				alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

			}

			#else

			if ( abs( vUv.y ) > 1.0 ) {

				float a = vUv.x;
				float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
				float len2 = a * a + b * b;

				if ( len2 > 1.0 ) discard;

			}

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`
};

class LineMaterial extends ShaderMaterial {
  constructor(parameters = {}) {
    super({
      uniforms: UniformsUtils.clone(ShaderLib['line'].uniforms),
      vertexShader: ShaderLib['line'].vertexShader,
      fragmentShader: ShaderLib['line'].fragmentShader,
      clipping: true // required for clipping support

    });
    /**
     * Everytime I remove this, everything just breaks,
     * so I'm just gonna leave it here.
     */

    _defineProperty(this, "isLineMaterial", true);

    _defineProperty(this, "dashed", false);

    _defineProperty(this, "color", new Color(0x000000));

    _defineProperty(this, "lineWidth", 0);

    _defineProperty(this, "dashScale", 0);

    _defineProperty(this, "dashOffset", 0);

    _defineProperty(this, "dashSize", 0);

    _defineProperty(this, "opacity", 0);

    _defineProperty(this, "resolution", new Vector2());

    _defineProperty(this, "alphaToCoverage", false);

    Object.defineProperties(this, {
      color: {
        enumerable: true,
        get: function () {
          return this.uniforms.diffuse.value;
        },
        set: function (value) {
          const colorObj = new Color(value);
          this.uniforms.diffuse.value = colorObj.getHex();
        }
      },
      linewidth: {
        enumerable: true,
        get: function () {
          return this.uniforms.linewidth.value;
        },
        set: function (value) {
          this.uniforms.linewidth.value = value;
        }
      },
      dashScale: {
        enumerable: true,
        get: function () {
          return this.uniforms.dashScale.value;
        },
        set: function (value) {
          this.uniforms.dashScale.value = value;
        }
      },
      dashSize: {
        enumerable: true,
        get: function () {
          return this.uniforms.dashSize.value;
        },
        set: function (value) {
          this.uniforms.dashSize.value = value;
        }
      },
      dashOffset: {
        enumerable: true,
        get: function () {
          return this.uniforms.dashOffset.value;
        },
        set: function (value) {
          this.uniforms.dashOffset.value = value;
        }
      },
      gapSize: {
        enumerable: true,
        get: function () {
          return this.uniforms.gapSize.value;
        },
        set: function (value) {
          this.uniforms.gapSize.value = value;
        }
      },
      opacity: {
        enumerable: true,
        get: function () {
          return this.uniforms.opacity.value;
        },
        set: function (value) {
          this.uniforms.opacity.value = value;
        }
      },
      resolution: {
        enumerable: true,
        get: function () {
          return this.uniforms.resolution.value;
        },
        set: function (value) {
          this.uniforms.resolution.value.copy(value);
        }
      },
      alphaToCoverage: {
        enumerable: true,
        get: function () {
          return Boolean('ALPHA_TO_COVERAGE' in this.defines);
        },
        set: function (value) {
          if (Boolean(value) !== Boolean('ALPHA_TO_COVERAGE' in this.defines)) {
            this.needsUpdate = true;
          }

          if (value) {
            this.defines.ALPHA_TO_COVERAGE = '';
            this.extensions.derivatives = true;
          } else {
            delete this.defines.ALPHA_TO_COVERAGE;
            this.extensions.derivatives = false;
          }
        }
      },
      dashed: {
        enumerable: true,
        get: function () {
          return Boolean('USE_DASH' in this.defines);
        },
        set: function (value) {
          if (Boolean(value) !== Boolean('USE_DASH' in this.defines)) {
            this.needsUpdate = true;
          }

          if (value) {
            this.defines.USE_DASH = '';
          } else {
            delete this.defines.USE_DASH;
          }
        }
      }
    });
    this.setValues(parameters);
  }

}

class LineSegments2 extends Mesh {
  constructor(_geometry = new LineSegmentsGeometry(), _material = new LineMaterial({
    color: Math.random() * 0xffffff
  })) {
    super(_geometry, _material);

    _defineProperty(this, "type", 'LineSegments2');

    _defineProperty(this, "isLineSegments2", true);

    _defineProperty(this, "distStart", new Vector3());

    _defineProperty(this, "distEnd", new Vector3());

    _defineProperty(this, "computeLineDistances", () => {
      const geometry = this.geometry;
      const instanceStart = geometry.attributes.instanceStart;
      const instanceEnd = geometry.attributes.instanceEnd;
      const lineDistances = new Float32Array(2 * instanceStart.data.count);

      for (let i = 0, j = 0, l = instanceStart.data.count; i < l; i++, j += 2) {
        this.distStart.fromBufferAttribute(instanceStart, i);
        this.distEnd.fromBufferAttribute(instanceEnd, i);
        lineDistances[j] = j === 0 ? 0 : lineDistances[j - 1];
        lineDistances[j + 1] = lineDistances[j] + this.distStart.distanceTo(this.distEnd);
      }

      const instanceDistanceBuffer = new InstancedInterleavedBuffer(lineDistances, 2, 1); // d0, d1

      geometry.setAttribute('instanceDistanceStart', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 0)); // d0

      geometry.setAttribute('instanceDistanceEnd', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 1)); // d1

      return this;
    });

    _defineProperty(this, "rayStart", new Vector4());

    _defineProperty(this, "rayEnd", new Vector4());

    _defineProperty(this, "ssOrigin", new Vector4());

    _defineProperty(this, "ssOrigin3", new Vector3());

    _defineProperty(this, "mvMatrix", new Matrix4());

    _defineProperty(this, "line", new Line3());

    _defineProperty(this, "closestPoint", new Vector3());

    _defineProperty(this, "raycast", (raycaster, intersects) => {
      if (raycaster.camera === null) {
        console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2.');
      }

      const threshold = 0;
      const ray = raycaster.ray;
      const camera = raycaster.camera;
      const projectionMatrix = camera.projectionMatrix;
      const geometry = this.geometry;
      const material = this.material;
      const resolution = material.resolution;
      const lineWidth = material.linewidth + threshold;
      const instanceStart = geometry.attributes.instanceStart;
      const instanceEnd = geometry.attributes.instanceEnd; // camera forward is negative

      const near = -camera.near; // pick a point 1 unit out along the ray to avoid the ray origin
      // sitting at the camera origin which will cause "w" to be 0 when
      // applying the projection matrix.

      ray.at(1, this.ssOrigin); // ndc space [ - 1.0, 1.0 ]

      this.ssOrigin.w = 1;
      this.ssOrigin.applyMatrix4(camera.matrixWorldInverse);
      this.ssOrigin.applyMatrix4(projectionMatrix);
      this.ssOrigin.multiplyScalar(1 / this.ssOrigin.w); // screen space

      this.ssOrigin.x *= resolution.x / 2;
      this.ssOrigin.y *= resolution.y / 2;
      this.ssOrigin.z = 0;
      this.ssOrigin3.set(this.ssOrigin.x, this.ssOrigin.y, this.ssOrigin.z);
      const matrixWorld = this.matrixWorld;
      this.mvMatrix.multiplyMatrices(camera.matrixWorldInverse, matrixWorld);

      for (let i = 0, l = instanceStart.count; i < l; i++) {
        this.rayStart.fromBufferAttribute(instanceStart, i);
        this.rayEnd.fromBufferAttribute(instanceEnd, i);
        this.rayStart.w = 1;
        this.rayEnd.w = 1; // camera space

        this.rayStart.applyMatrix4(this.mvMatrix);
        this.rayEnd.applyMatrix4(this.mvMatrix); // skip the segment if it's entirely behind the camera

        const isBehindCameraNear = this.rayStart.z > near && this.rayEnd.z > near;

        if (isBehindCameraNear) {
          continue;
        } // trim the segment if it extends behind camera near


        if (this.rayStart.z > near) {
          const deltaDist = this.rayStart.z - this.rayEnd.z;
          const t = (this.rayStart.z - near) / deltaDist;
          this.rayStart.lerp(this.rayEnd, t);
        } else if (this.rayEnd.z > near) {
          const deltaDist = this.rayEnd.z - this.rayStart.z;
          const t = (this.rayEnd.z - near) / deltaDist;
          this.rayEnd.lerp(this.rayStart, t);
        } // clip space


        this.rayStart.applyMatrix4(projectionMatrix);
        this.rayEnd.applyMatrix4(projectionMatrix); // ndc space [ - 1.0, 1.0 ]

        this.rayStart.multiplyScalar(1 / this.rayStart.w);
        this.rayEnd.multiplyScalar(1 / this.rayEnd.w); // screen space

        this.rayStart.x *= resolution.x / 2;
        this.rayStart.y *= resolution.y / 2;
        this.rayEnd.x *= resolution.x / 2;
        this.rayEnd.y *= resolution.y / 2; // create 2d segment

        this.line.start.set(this.rayStart.x, this.rayStart.y, this.rayStart.z);
        this.line.start.z = 0;
        this.line.end.set(this.rayEnd.x, this.rayEnd.y, this.rayEnd.z);
        this.line.end.z = 0; // get closest point on ray to segment

        const param = this.line.closestPointToPointParameter(this.ssOrigin3, true);
        this.line.at(param, this.closestPoint); // check if the intersection point is within clip space

        const zPos = MathUtils.lerp(this.rayStart.z, this.rayEnd.z, param);
        const isInClipSpace = zPos >= -1 && zPos <= 1;
        const isInside = this.ssOrigin3.distanceTo(this.closestPoint) < lineWidth * 0.5;

        if (isInClipSpace && isInside) {
          this.line.start.fromBufferAttribute(instanceStart, i);
          this.line.end.fromBufferAttribute(instanceEnd, i);
          this.line.start.applyMatrix4(matrixWorld);
          this.line.end.applyMatrix4(matrixWorld);
          const pointOnLine = new Vector3();
          const point = new Vector3();
          ray.distanceSqToSegment(this.line.start, this.line.end, point, pointOnLine);
          intersects.push({
            distance: ray.origin.distanceTo(point),
            point: point,
            face: null,
            faceIndex: i,
            object: this,
            uv: undefined,
            pointOnLine
          });
        }
      }
    });
  }

}

class Line2 extends LineSegments2 {
  constructor(geometry = new LineGeometry(), material = new LineMaterial({
    color: Math.random() * 0xffffff
  })) {
    super(geometry, material);

    _defineProperty(this, "type", 'Line2');

    _defineProperty(this, "isLine2", true);
  }

}

// This file is part of meshoptimizer library and is distributed under the terms of MIT License.
// Copyright (C) 2016-2020, by Arseny Kapoulkine (arseny.kapoulkine@gmail.com)
const MeshoptDecoder = (() => {
  // Built with clang version 11.0.0 (https://github.com/llvm/llvm-project.git 0160ad802e899c2922bc9b29564080c22eb0908c)
  // Built from meshoptimizer 0.14
  var wasm_base = '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';
  var wasm_simd = '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'; // Uses bulk-memory and simd extensions

  var detector = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11]); // Used to unpack wasm

  var wasmpack = new Uint8Array([32, 0, 65, 253, 3, 1, 2, 34, 4, 106, 6, 5, 11, 8, 7, 20, 13, 33, 12, 16, 128, 9, 116, 64, 19, 113, 127, 15, 10, 21, 22, 14, 255, 66, 24, 54, 136, 107, 18, 23, 192, 26, 114, 118, 132, 17, 77, 101, 130, 144, 27, 87, 131, 44, 45, 74, 156, 154, 70, 167]);

  if (typeof WebAssembly !== 'object') {
    // This module requires WebAssembly to function
    return {
      supported: false
    };
  }

  var wasm = wasm_base;

  if (WebAssembly.validate(detector)) {
    wasm = wasm_simd;
    console.log('Warning: meshopt_decoder is using experimental SIMD support');
  }

  var instance;
  var promise = WebAssembly.instantiate(unpack(wasm), {}).then(function (result) {
    instance = result.instance;

    instance.exports.__wasm_call_ctors();
  });

  function unpack(data) {
    var result = new Uint8Array(data.length);

    for (var i = 0; i < data.length; ++i) {
      var ch = data.charCodeAt(i);
      result[i] = ch > 96 ? ch - 71 : ch > 64 ? ch - 65 : ch > 47 ? ch + 4 : ch > 46 ? 63 : 62;
    }

    var write = 0;

    for (var i = 0; i < data.length; ++i) {
      result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
    }

    return result.buffer.slice(0, write);
  }

  function decode(fun, target, count, size, source, filter) {
    var sbrk = instance.exports.sbrk;
    var count4 = count + 3 & ~3; // pad for SIMD filter

    var tp = sbrk(count4 * size);
    var sp = sbrk(source.length);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(source, sp);
    var res = fun(tp, count, size, sp, source.length);

    if (res == 0 && filter) {
      filter(tp, count4, size);
    }

    target.set(heap.subarray(tp, tp + count * size));
    sbrk(tp - sbrk(0));

    if (res != 0) {
      throw new Error('Malformed buffer data: ' + res);
    }
  }

  var filters = {
    // legacy index-based enums for glTF
    0: '',
    1: 'meshopt_decodeFilterOct',
    2: 'meshopt_decodeFilterQuat',
    3: 'meshopt_decodeFilterExp',
    // string-based enums for glTF
    NONE: '',
    OCTAHEDRAL: 'meshopt_decodeFilterOct',
    QUATERNION: 'meshopt_decodeFilterQuat',
    EXPONENTIAL: 'meshopt_decodeFilterExp'
  };
  var decoders = {
    // legacy index-based enums for glTF
    0: 'meshopt_decodeVertexBuffer',
    1: 'meshopt_decodeIndexBuffer',
    2: 'meshopt_decodeIndexSequence',
    // string-based enums for glTF
    ATTRIBUTES: 'meshopt_decodeVertexBuffer',
    TRIANGLES: 'meshopt_decodeIndexBuffer',
    INDICES: 'meshopt_decodeIndexSequence'
  };
  return {
    ready: promise,
    supported: true,
    decodeVertexBuffer: function (target, count, size, source, filter) {
      decode(instance.exports.meshopt_decodeVertexBuffer, target, count, size, source, instance.exports[filters[filter]]);
    },
    decodeIndexBuffer: function (target, count, size, source) {
      decode(instance.exports.meshopt_decodeIndexBuffer, target, count, size, source);
    },
    decodeIndexSequence: function (target, count, size, source) {
      decode(instance.exports.meshopt_decodeIndexSequence, target, count, size, source);
    },
    decodeGltfBuffer: function (target, count, size, source, mode, filter) {
      decode(instance.exports[decoders[mode]], target, count, size, source, instance.exports[filters[filter]]);
    }
  };
})();

const Line = /*#__PURE__*/react.forwardRef(function Line({
  points,
  color = 'black',
  vertexColors,
  lineWidth,
  dashed,
  ...rest
}, ref) {
  const [line2] = react.useState(() => new Line2());
  const [lineMaterial] = react.useState(() => new LineMaterial());
  const [resolution] = react.useState(() => new Vector2(512, 512));
  const lineGeom = react.useMemo(() => {
    const geom = new LineGeometry();
    const pValues = points.map(p => p instanceof Vector3 ? p.toArray() : p);
    geom.setPositions(pValues.flat());

    if (vertexColors) {
      const cValues = vertexColors.map(c => c instanceof Color ? c.toArray() : c);
      geom.setColors(cValues.flat());
    }

    return geom;
  }, [points, vertexColors]);
  react.useLayoutEffect(() => {
    line2.computeLineDistances();
  }, [points, line2]);
  react.useLayoutEffect(() => {
    if (dashed) {
      lineMaterial.defines.USE_DASH = '';
    } else {
      // Setting lineMaterial.defines.USE_DASH to undefined is apparently not sufficient.
      delete lineMaterial.defines.USE_DASH;
    }

    lineMaterial.needsUpdate = true;
  }, [dashed, lineMaterial]);
  react.useEffect(() => {
    return () => lineGeom.dispose();
  }, [lineGeom]);
  return /*#__PURE__*/react.createElement("primitive", _extends({
    object: line2,
    ref: ref
  }, rest), /*#__PURE__*/react.createElement("primitive", {
    object: lineGeom,
    attach: "geometry"
  }), /*#__PURE__*/react.createElement("primitive", _extends({
    object: lineMaterial,
    attach: "material",
    color: color,
    vertexColors: Boolean(vertexColors),
    resolution: resolution,
    linewidth: lineWidth,
    dashed: dashed
  }, rest)));
});

/* SNOWPACK PROCESS POLYFILL (based on https://github.com/calvinmetcalf/node-process-es6) */
function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
var globalContext;
if (typeof window !== 'undefined') {
    globalContext = window;
} else if (typeof self !== 'undefined') {
    globalContext = self;
} else {
    globalContext = {};
}
if (typeof globalContext.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof globalContext.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = globalContext.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: {"NODE_ENV":"production"},
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

/**
 * Lightweight thenable implementation that is entirely self-contained within a single
 * function with no external dependencies so it can be easily shipped across to a WorkerModule.
 *
 * This implementation conforms fully to the Promises/A+ spec so it can safely interoperate
 * with other thenable implementations. https://github.com/promises-aplus/promises-spec
 *
 * *However*, it is _not_ a full implementation of ES2015 Promises, e.g. it does not
 * have the same constructor signature and does not expose a `catch` method or the static
 * `resolve`/`reject`/`all`/`race` initializer methods. If you need to hand a Thenable
 * instance off to consuming code that may expect a true Promise, you'll want to wrap it
 * in a native-or-polyfilled Promise first.
 *
 * (Why yet another Promises/A+ implementation? Great question. We needed a polyfill-like
 * thing that was (a) wrapped in a single function for easy serialization across to a Worker,
 * and (b) was as small as possible -- at ~900B minified (~500B gzipped) this is the smallest
 * implementation I've found. And also, exercises like this are challenging and fun.)
 */
function BespokeThenable() {
  var state = 0; // 0=pending, 1=fulfilled, -1=rejected
  var queue = [];
  var value;
  var scheduled = 0;
  var completeCalled = 0;

  function then(onResolve, onReject) {
    var nextThenable = BespokeThenable();

    function handleNext() {
      var cb = state > 0 ? onResolve : onReject;
      if (isFn(cb)) {
        try {
          var result = cb(value);
          if (result === nextThenable) {
            recursiveError();
          }
          var resultThen = getThenableThen(result);
          if (resultThen) {
            resultThen.call(result, nextThenable.resolve, nextThenable.reject);
          } else {
            nextThenable.resolve(result);
          }
        } catch (err) {
          nextThenable.reject(err);
        }
      } else {
        nextThenable[state > 0 ? 'resolve' : 'reject'](value);
      }
    }

    queue.push(handleNext);
    if (state) {
      scheduleQueueFlush();
    }
    return nextThenable
  }

  var resolve = oneTime(function (val) {
    if (!completeCalled) {
      complete(1, val);
    }
  });

  var reject = oneTime(function (reason) {
    if (!completeCalled) {
      complete(-1, reason);
    }
  });

  function complete(st, val) {
    completeCalled++;
    var ignoreThrow = 0;
    try {
      if (val === thenableObj) {
        recursiveError();
      }
      var valThen = st > 0 && getThenableThen(val);
      if (valThen) {
        valThen.call(val, oneTime(function (v) {
          ignoreThrow++;
          complete(1, v);
        }), oneTime(function (v) {
          ignoreThrow++;
          complete(-1, v);
        }));
      } else {
        state = st;
        value = val;
        scheduleQueueFlush();
      }
    } catch(e) {
      if (!state && !ignoreThrow) {
        complete(-1, e);
      }
    }
  }

  function scheduleQueueFlush() {
    if (!scheduled) {
      setTimeout(flushQueue, 0); //TODO setImmediate or postMessage approach if available?
      scheduled = 1;
    }
  }

  function flushQueue() {
    var q = queue;
    scheduled = 0;
    queue = [];
    q.forEach(callIt);
  }

  function callIt(fn) {
    fn();
  }

  function getThenableThen(val) {
    var valThen = val && (isFn(val) || typeof val === 'object') && val.then;
    return isFn(valThen) && valThen
  }

  function oneTime(fn) {
    var called = 0;
    return function() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (!called++) {
        fn.apply(this, args);
      }
    }
  }

  function recursiveError() {
    throw new TypeError('Chaining cycle detected')
  }

  var isFn = function (v) { return typeof v === 'function'; };

  var thenableObj = {
    then: then,
    resolve: resolve,
    reject: reject
  };
  return thenableObj
}


/**
 * Thenable implementation that uses a native Promise under the covers. This implementation
 * is preferred if Promise is available, for better performance and dev tools integration.
 * @constructor
 */
function NativePromiseThenable() {
  var resolve, reject;
  var promise = new Promise(function (res, rej) {
    resolve = res;
    reject = rej;
  });
  return {
    then: promise.then.bind(promise),
    resolve: resolve,
    reject: reject
  }
}

/**
 * Promise.all() impl:
 */
BespokeThenable.all = NativePromiseThenable.all = function(items) {
  var resultCount = 0;
  var results = [];
  var out = DefaultThenable();
  if (items.length === 0) {
    out.resolve([]);
  } else {
    items.forEach(function (item, i) {
      var itemThenable = DefaultThenable();
      itemThenable.resolve(item);
      itemThenable.then(function (res) {
        resultCount++;
        results[i] = res;
        if (resultCount === items.length) {
          out.resolve(results);
        }
      }, out.reject);
    });
  }
  return out
};


/**
 * Choose the best Thenable implementation and export it as the default.
 */
var DefaultThenable = typeof Promise === 'function' ? NativePromiseThenable : BespokeThenable;

/**
 * Main content for the worker that handles the loading and execution of
 * modules within it.
 */
function workerBootstrap() {
  var modules = Object.create(null);

  // Handle messages for registering a module
  function registerModule(ref, callback) {
    var id = ref.id;
    var name = ref.name;
    var dependencies = ref.dependencies; if ( dependencies === void 0 ) dependencies = [];
    var init = ref.init; if ( init === void 0 ) init = function(){};
    var getTransferables = ref.getTransferables; if ( getTransferables === void 0 ) getTransferables = null;

    // Only register once
    if (modules[id]) { return }

    try {
      // If any dependencies are modules, ensure they're registered and grab their value
      dependencies = dependencies.map(function (dep) {
        if (dep && dep.isWorkerModule) {
          registerModule(dep, function (depResult) {
            if (depResult instanceof Error) { throw depResult }
          });
          dep = modules[dep.id].value;
        }
        return dep
      });

      // Rehydrate functions
      init = rehydrate(("<" + name + ">.init"), init);
      if (getTransferables) {
        getTransferables = rehydrate(("<" + name + ">.getTransferables"), getTransferables);
      }

      // Initialize the module and store its value
      var value = null;
      if (typeof init === 'function') {
        value = init.apply(void 0, dependencies);
      } else {
        console.error('worker module init function failed to rehydrate');
      }
      modules[id] = {
        id: id,
        value: value,
        getTransferables: getTransferables
      };
      callback(value);
    } catch(err) {
      if (!(err && err.noLog)) {
        console.error(err);
      }
      callback(err);
    }
  }

  // Handle messages for calling a registered module's result function
  function callModule(ref, callback) {
    var ref$1;

    var id = ref.id;
    var args = ref.args;
    if (!modules[id] || typeof modules[id].value !== 'function') {
      callback(new Error(("Worker module " + id + ": not found or its 'init' did not return a function")));
    }
    try {
      var result = (ref$1 = modules[id]).value.apply(ref$1, args);
      if (result && typeof result.then === 'function') {
        result.then(handleResult, function (rej) { return callback(rej instanceof Error ? rej : new Error('' + rej)); });
      } else {
        handleResult(result);
      }
    } catch(err) {
      callback(err);
    }
    function handleResult(result) {
      try {
        var tx = modules[id].getTransferables && modules[id].getTransferables(result);
        if (!tx || !Array.isArray(tx) || !tx.length) {
          tx = undefined; //postMessage is very picky about not passing null or empty transferables
        }
        callback(result, tx);
      } catch(err) {
        console.error(err);
        callback(err);
      }
    }
  }

  function rehydrate(name, str) {
    var result = void 0;
    self.troikaDefine = function (r) { return result = r; };
    var url = URL.createObjectURL(
      new Blob(
        [("/** " + (name.replace(/\*/g, '')) + " **/\n\ntroikaDefine(\n" + str + "\n)")],
        {type: 'application/javascript'}
      )
    );
    try {
      importScripts(url);
    } catch(err) {
      console.error(err);
    }
    URL.revokeObjectURL(url);
    delete self.troikaDefine;
    return result
  }

  // Handler for all messages within the worker
  self.addEventListener('message', function (e) {
    var ref = e.data;
    var messageId = ref.messageId;
    var action = ref.action;
    var data = ref.data;
    try {
      // Module registration
      if (action === 'registerModule') {
        registerModule(data, function (result) {
          if (result instanceof Error) {
            postMessage({
              messageId: messageId,
              success: false,
              error: result.message
            });
          } else {
            postMessage({
              messageId: messageId,
              success: true,
              result: {isCallable: typeof result === 'function'}
            });
          }
        });
      }
      // Invocation
      if (action === 'callModule') {
        callModule(data, function (result, transferables) {
          if (result instanceof Error) {
            postMessage({
              messageId: messageId,
              success: false,
              error: result.message
            });
          } else {
            postMessage({
              messageId: messageId,
              success: true,
              result: result
            }, transferables || undefined);
          }
        });
      }
    } catch(err) {
      postMessage({
        messageId: messageId,
        success: false,
        error: err.stack
      });
    }
  });
}

/**
 * Fallback for `defineWorkerModule` that behaves identically but runs in the main
 * thread, for when the execution environment doesn't support web workers or they
 * are disallowed due to e.g. CSP security restrictions.
 */
function defineMainThreadModule(options) {
  var moduleFunc = function() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return moduleFunc._getInitResult().then(function (initResult) {
      if (typeof initResult === 'function') {
        return initResult.apply(void 0, args)
      } else {
        throw new Error('Worker module function was called but `init` did not return a callable function')
      }
    })
  };
  moduleFunc._getInitResult = function() {
    // We can ignore getTransferables in main thread. TODO workerId?
    var dependencies = options.dependencies;
    var init = options.init;

    // Resolve dependencies
    dependencies = Array.isArray(dependencies) ? dependencies.map(function (dep) { return dep && dep._getInitResult ? dep._getInitResult() : dep; }
    ) : [];

    // Invoke init with the resolved dependencies
    var initThenable = DefaultThenable.all(dependencies).then(function (deps) {
      return init.apply(null, deps)
    });

    // Cache the resolved promise for subsequent calls
    moduleFunc._getInitResult = function () { return initThenable; };

    return initThenable
  };
  return moduleFunc
}

var supportsWorkers = function () {
  var supported = false;

  // Only attempt worker initialization in browsers; elsewhere it would just be
  // noise e.g. loading into a Node environment for SSR.
  if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    try {
      // TODO additional checks for things like importScripts within the worker?
      //  Would need to be an async check.
      var worker = new Worker(
        URL.createObjectURL(new Blob([''], { type: 'application/javascript' }))
      );
      worker.terminate();
      supported = true;
    } catch (err) {
      if (typeof process !== 'undefined' && "production" === 'test') ; else {
        console.log(
          ("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: [" + (err.message) + "]")
        );
      }
    }
  }

  // Cached result
  supportsWorkers = function () { return supported; };
  return supported
};

var _workerModuleId = 0;
var _messageId = 0;
var _allowInitAsString = false;
var workers = Object.create(null);
var openRequests = /*#__PURE__*/(function () {
  var obj = Object.create(null);
  obj._count = 0;
  return obj
})();


/**
 * Define a module of code that will be executed with a web worker. This provides a simple
 * interface for moving chunks of logic off the main thread, and managing their dependencies
 * among one another.
 *
 * @param {object} options
 * @param {function} options.init
 * @param {array} [options.dependencies]
 * @param {function} [options.getTransferables]
 * @param {string} [options.name]
 * @param {string} [options.workerId]
 * @return {function(...[*]): {then}}
 */
function defineWorkerModule(options) {
  if ((!options || typeof options.init !== 'function') && !_allowInitAsString) {
    throw new Error('requires `options.init` function')
  }
  var dependencies = options.dependencies;
  var init = options.init;
  var getTransferables = options.getTransferables;
  var workerId = options.workerId;

  if (!supportsWorkers()) {
    return defineMainThreadModule(options)
  }

  if (workerId == null) {
    workerId = '#default';
  }
  var id = "workerModule" + (++_workerModuleId);
  var name = options.name || id;
  var registrationThenable = null;

  dependencies = dependencies && dependencies.map(function (dep) {
    // Wrap raw functions as worker modules with no dependencies
    if (typeof dep === 'function' && !dep.workerModuleData) {
      _allowInitAsString = true;
      dep = defineWorkerModule({
        workerId: workerId,
        name: ("<" + name + "> function dependency: " + (dep.name)),
        init: ("function(){return (\n" + (stringifyFunction(dep)) + "\n)}")
      });
      _allowInitAsString = false;
    }
    // Grab postable data for worker modules
    if (dep && dep.workerModuleData) {
      dep = dep.workerModuleData;
    }
    return dep
  });

  function moduleFunc() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    // Register this module if needed
    if (!registrationThenable) {
      registrationThenable = callWorker(workerId,'registerModule', moduleFunc.workerModuleData);
    }

    // Invoke the module, returning a thenable
    return registrationThenable.then(function (ref) {
      var isCallable = ref.isCallable;

      if (isCallable) {
        return callWorker(workerId,'callModule', {id: id, args: args})
      } else {
        throw new Error('Worker module function was called but `init` did not return a callable function')
      }
    })
  }
  moduleFunc.workerModuleData = {
    isWorkerModule: true,
    id: id,
    name: name,
    dependencies: dependencies,
    init: stringifyFunction(init),
    getTransferables: getTransferables && stringifyFunction(getTransferables)
  };
  return moduleFunc
}

/**
 * Stringifies a function into a form that can be deserialized in the worker
 * @param fn
 */
function stringifyFunction(fn) {
  var str = fn.toString();
  // If it was defined in object method/property format, it needs to be modified
  if (!/^function/.test(str) && /^\w+\s*\(/.test(str)) {
    str = 'function ' + str;
  }
  return str
}


function getWorker(workerId) {
  var worker = workers[workerId];
  if (!worker) {
    // Bootstrap the worker's content
    var bootstrap = stringifyFunction(workerBootstrap);

    // Create the worker from the bootstrap function content
    worker = workers[workerId] = new Worker(
      URL.createObjectURL(
        new Blob(
          [("/** Worker Module Bootstrap: " + (workerId.replace(/\*/g, '')) + " **/\n\n;(" + bootstrap + ")()")],
          {type: 'application/javascript'}
        )
      )
    );

    // Single handler for response messages from the worker
    worker.onmessage = function (e) {
      var response = e.data;
      var msgId = response.messageId;
      var callback = openRequests[msgId];
      if (!callback) {
        throw new Error('WorkerModule response with empty or unknown messageId')
      }
      delete openRequests[msgId];
      openRequests._count--;
      callback(response);
    };
  }
  return worker
}

// Issue a call to the worker with a callback to handle the response
function callWorker(workerId, action, data) {
  var thenable = DefaultThenable();
  var messageId = ++_messageId;
  openRequests[messageId] = function (response) {
    if (response.success) {
      thenable.resolve(response.result);
    } else {
      thenable.reject(new Error(("Error in worker " + action + " call: " + (response.error))));
    }
  };
  openRequests._count++;
  if (openRequests._count > 1000) { //detect leaks
    console.warn('Large number of open WorkerModule requests, some may not be returning');
  }
  getWorker(workerId).postMessage({
    messageId: messageId,
    action: action,
    data: data
  });
  return thenable
}

/**
 * Just the {@link Thenable} function wrapped as a worker module. If another worker
 * module needs Thenable as a dependency, it's better to pass this module rather than
 * the raw function in its `dependencies` array so it only gets registered once.
 */
var ThenableWorkerModule = /*#__PURE__*/defineWorkerModule({
  name: 'Thenable',
  dependencies: [DefaultThenable],
  init: function(Thenable) {
    return Thenable
  }
});

function bidiFactory() {
  var bidi = function(exports) {
    var DATA = {
      R: "13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",
      EN: "1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",
      ES: "17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",
      ET: "z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",
      AN: "16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",
      CS: "18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",
      B: "a,3,f+2,2v,690",
      S: "9,2,k",
      WS: "c,k,4f4,1vk+a,u,1j,335",
      ON: "x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",
      BN: "0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",
      NSM: "lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",
      AL: "16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",
      LRO: "6ct",
      RLO: "6cu",
      LRE: "6cq",
      RLE: "6cr",
      PDF: "6cs",
      LRI: "6ee",
      RLI: "6ef",
      FSI: "6eg",
      PDI: "6eh"
    };
    var TYPES = {};
    var TYPES_TO_NAMES = {};
    TYPES.L = 1;
    TYPES_TO_NAMES[1] = "L";
    Object.keys(DATA).forEach(function(type, i) {
      TYPES[type] = 1 << i + 1;
      TYPES_TO_NAMES[TYPES[type]] = type;
    });
    Object.freeze(TYPES);
    var ISOLATE_INIT_TYPES = TYPES.LRI | TYPES.RLI | TYPES.FSI;
    var STRONG_TYPES = TYPES.L | TYPES.R | TYPES.AL;
    var NEUTRAL_ISOLATE_TYPES = TYPES.B | TYPES.S | TYPES.WS | TYPES.ON | TYPES.FSI | TYPES.LRI | TYPES.RLI | TYPES.PDI;
    var BN_LIKE_TYPES = TYPES.BN | TYPES.RLE | TYPES.LRE | TYPES.RLO | TYPES.LRO | TYPES.PDF;
    var TRAILING_TYPES = TYPES.S | TYPES.WS | TYPES.B | ISOLATE_INIT_TYPES | TYPES.PDI | BN_LIKE_TYPES;
    var map = null;
    function parseData() {
      if (!map) {
        map = new Map();
        var loop = function(type2) {
          if (DATA.hasOwnProperty(type2)) {
            var lastCode = 0;
            DATA[type2].split(",").forEach(function(range) {
              var ref = range.split("+");
              var skip = ref[0];
              var step = ref[1];
              skip = parseInt(skip, 36);
              step = step ? parseInt(step, 36) : 0;
              map.set(lastCode += skip, TYPES[type2]);
              for (var i = 0; i < step; i++) {
                map.set(++lastCode, TYPES[type2]);
              }
            });
          }
        };
        for (var type in DATA)
          loop(type);
      }
    }
    function getBidiCharType(char) {
      parseData();
      return map.get(char.codePointAt(0)) || TYPES.L;
    }
    function getBidiCharTypeName(char) {
      return TYPES_TO_NAMES[getBidiCharType(char)];
    }
    var data$1 = {
      pairs: "14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",
      canonical: "6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"
    };
    function parseCharacterMap(encodedString, includeReverse) {
      var radix = 36;
      var lastCode = 0;
      var map2 = new Map();
      var reverseMap = includeReverse && new Map();
      var prevPair;
      encodedString.split(",").forEach(function visit(entry) {
        if (entry.indexOf("+") !== -1) {
          for (var i = +entry; i--; ) {
            visit(prevPair);
          }
        } else {
          prevPair = entry;
          var ref = entry.split(">");
          var a = ref[0];
          var b = ref[1];
          a = String.fromCodePoint(lastCode += parseInt(a, radix));
          b = String.fromCodePoint(lastCode += parseInt(b, radix));
          map2.set(a, b);
          includeReverse && reverseMap.set(b, a);
        }
      });
      return {map: map2, reverseMap};
    }
    var openToClose, closeToOpen, canonical;
    function parse$1() {
      if (!openToClose) {
        var ref = parseCharacterMap(data$1.pairs, true);
        var map2 = ref.map;
        var reverseMap = ref.reverseMap;
        openToClose = map2;
        closeToOpen = reverseMap;
        canonical = parseCharacterMap(data$1.canonical, false).map;
      }
    }
    function openingToClosingBracket(char) {
      parse$1();
      return openToClose.get(char) || null;
    }
    function closingToOpeningBracket(char) {
      parse$1();
      return closeToOpen.get(char) || null;
    }
    function getCanonicalBracket(char) {
      parse$1();
      return canonical.get(char) || null;
    }
    var TYPE_L = TYPES.L;
    var TYPE_R = TYPES.R;
    var TYPE_EN = TYPES.EN;
    var TYPE_ES = TYPES.ES;
    var TYPE_ET = TYPES.ET;
    var TYPE_AN = TYPES.AN;
    var TYPE_CS = TYPES.CS;
    var TYPE_B = TYPES.B;
    var TYPE_S = TYPES.S;
    var TYPE_ON = TYPES.ON;
    var TYPE_BN = TYPES.BN;
    var TYPE_NSM = TYPES.NSM;
    var TYPE_AL = TYPES.AL;
    var TYPE_LRO = TYPES.LRO;
    var TYPE_RLO = TYPES.RLO;
    var TYPE_LRE = TYPES.LRE;
    var TYPE_RLE = TYPES.RLE;
    var TYPE_PDF = TYPES.PDF;
    var TYPE_LRI = TYPES.LRI;
    var TYPE_RLI = TYPES.RLI;
    var TYPE_FSI = TYPES.FSI;
    var TYPE_PDI = TYPES.PDI;
    function getEmbeddingLevels(string, baseDirection) {
      var MAX_DEPTH = 125;
      var charTypes = new Uint32Array(string.length);
      for (var i = 0; i < string.length; i++) {
        charTypes[i] = getBidiCharType(string[i]);
      }
      var charTypeCounts = new Map();
      function changeCharType(i2, type2) {
        var oldType = charTypes[i2];
        charTypes[i2] = type2;
        charTypeCounts.set(oldType, charTypeCounts.get(oldType) - 1);
        if (oldType & NEUTRAL_ISOLATE_TYPES) {
          charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) - 1);
        }
        charTypeCounts.set(type2, (charTypeCounts.get(type2) || 0) + 1);
        if (type2 & NEUTRAL_ISOLATE_TYPES) {
          charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) || 0) + 1);
        }
      }
      var embedLevels = new Uint8Array(string.length);
      var isolationPairs = new Map();
      var paragraphs = [];
      var paragraph = null;
      for (var i$1 = 0; i$1 < string.length; i$1++) {
        if (!paragraph) {
          paragraphs.push(paragraph = {
            start: i$1,
            end: string.length - 1,
            level: baseDirection === "rtl" ? 1 : baseDirection === "ltr" ? 0 : determineAutoEmbedLevel(i$1, false)
          });
        }
        if (charTypes[i$1] & TYPE_B) {
          paragraph.end = i$1;
          paragraph = null;
        }
      }
      var FORMATTING_TYPES = TYPE_RLE | TYPE_LRE | TYPE_RLO | TYPE_LRO | ISOLATE_INIT_TYPES | TYPE_PDI | TYPE_PDF | TYPE_B;
      var nextEven = function(n) {
        return n + (n & 1 ? 1 : 2);
      };
      var nextOdd = function(n) {
        return n + (n & 1 ? 2 : 1);
      };
      for (var paraIdx = 0; paraIdx < paragraphs.length; paraIdx++) {
        paragraph = paragraphs[paraIdx];
        var statusStack = [{
          _level: paragraph.level,
          _override: 0,
          _isolate: 0
        }];
        var stackTop = void 0;
        var overflowIsolateCount = 0;
        var overflowEmbeddingCount = 0;
        var validIsolateCount = 0;
        charTypeCounts.clear();
        for (var i$2 = paragraph.start; i$2 <= paragraph.end; i$2++) {
          var charType = charTypes[i$2];
          stackTop = statusStack[statusStack.length - 1];
          charTypeCounts.set(charType, (charTypeCounts.get(charType) || 0) + 1);
          if (charType & NEUTRAL_ISOLATE_TYPES) {
            charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) || 0) + 1);
          }
          if (charType & FORMATTING_TYPES) {
            if (charType & (TYPE_RLE | TYPE_LRE)) {
              embedLevels[i$2] = stackTop._level;
              var level = (charType === TYPE_RLE ? nextOdd : nextEven)(stackTop._level);
              if (level <= MAX_DEPTH && !overflowIsolateCount && !overflowEmbeddingCount) {
                statusStack.push({
                  _level: level,
                  _override: 0,
                  _isolate: 0
                });
              } else if (!overflowIsolateCount) {
                overflowEmbeddingCount++;
              }
            } else if (charType & (TYPE_RLO | TYPE_LRO)) {
              embedLevels[i$2] = stackTop._level;
              var level$1 = (charType === TYPE_RLO ? nextOdd : nextEven)(stackTop._level);
              if (level$1 <= MAX_DEPTH && !overflowIsolateCount && !overflowEmbeddingCount) {
                statusStack.push({
                  _level: level$1,
                  _override: charType & TYPE_RLO ? TYPE_R : TYPE_L,
                  _isolate: 0
                });
              } else if (!overflowIsolateCount) {
                overflowEmbeddingCount++;
              }
            } else if (charType & ISOLATE_INIT_TYPES) {
              if (charType & TYPE_FSI) {
                charType = determineAutoEmbedLevel(i$2 + 1, true) === 1 ? TYPE_RLI : TYPE_LRI;
              }
              embedLevels[i$2] = stackTop._level;
              if (stackTop._override) {
                changeCharType(i$2, stackTop._override);
              }
              var level$2 = (charType === TYPE_RLI ? nextOdd : nextEven)(stackTop._level);
              if (level$2 <= MAX_DEPTH && overflowIsolateCount === 0 && overflowEmbeddingCount === 0) {
                validIsolateCount++;
                statusStack.push({
                  _level: level$2,
                  _override: 0,
                  _isolate: 1,
                  _isolInitIndex: i$2
                });
              } else {
                overflowIsolateCount++;
              }
            } else if (charType & TYPE_PDI) {
              if (overflowIsolateCount > 0) {
                overflowIsolateCount--;
              } else if (validIsolateCount > 0) {
                overflowEmbeddingCount = 0;
                while (!statusStack[statusStack.length - 1]._isolate) {
                  statusStack.pop();
                }
                var isolInitIndex = statusStack[statusStack.length - 1]._isolInitIndex;
                if (isolInitIndex != null) {
                  isolationPairs.set(isolInitIndex, i$2);
                  isolationPairs.set(i$2, isolInitIndex);
                }
                statusStack.pop();
                validIsolateCount--;
              }
              stackTop = statusStack[statusStack.length - 1];
              embedLevels[i$2] = stackTop._level;
              if (stackTop._override) {
                changeCharType(i$2, stackTop._override);
              }
            } else if (charType & TYPE_PDF) {
              if (overflowIsolateCount === 0) {
                if (overflowEmbeddingCount > 0) {
                  overflowEmbeddingCount--;
                } else if (!stackTop._isolate && statusStack.length > 1) {
                  statusStack.pop();
                  stackTop = statusStack[statusStack.length - 1];
                }
              }
              embedLevels[i$2] = stackTop._level;
            } else if (charType & TYPE_B) {
              embedLevels[i$2] = paragraph.level;
            }
          } else {
            embedLevels[i$2] = stackTop._level;
            if (stackTop._override && charType !== TYPE_BN) {
              changeCharType(i$2, stackTop._override);
            }
          }
        }
        var levelRuns = [];
        var currentRun = null;
        for (var i$3 = paragraph.start; i$3 <= paragraph.end; i$3++) {
          var charType$1 = charTypes[i$3];
          if (!(charType$1 & BN_LIKE_TYPES)) {
            var lvl = embedLevels[i$3];
            var isIsolInit = charType$1 & ISOLATE_INIT_TYPES;
            var isPDI = charType$1 === TYPE_PDI;
            if (currentRun && lvl === currentRun._level) {
              currentRun._end = i$3;
              currentRun._endsWithIsolInit = isIsolInit;
            } else {
              levelRuns.push(currentRun = {
                _start: i$3,
                _end: i$3,
                _level: lvl,
                _startsWithPDI: isPDI,
                _endsWithIsolInit: isIsolInit
              });
            }
          }
        }
        var isolatingRunSeqs = [];
        for (var runIdx = 0; runIdx < levelRuns.length; runIdx++) {
          var run = levelRuns[runIdx];
          if (!run._startsWithPDI || run._startsWithPDI && !isolationPairs.has(run._start)) {
            var seqRuns = [currentRun = run];
            for (var pdiIndex = void 0; currentRun && currentRun._endsWithIsolInit && (pdiIndex = isolationPairs.get(currentRun._end)) != null; ) {
              for (var i$4 = runIdx + 1; i$4 < levelRuns.length; i$4++) {
                if (levelRuns[i$4]._start === pdiIndex) {
                  seqRuns.push(currentRun = levelRuns[i$4]);
                  break;
                }
              }
            }
            var seqIndices = [];
            for (var i$5 = 0; i$5 < seqRuns.length; i$5++) {
              var run$1 = seqRuns[i$5];
              for (var j = run$1._start; j <= run$1._end; j++) {
                seqIndices.push(j);
              }
            }
            var firstLevel = embedLevels[seqIndices[0]];
            var prevLevel = paragraph.level;
            for (var i$6 = seqIndices[0] - 1; i$6 >= 0; i$6--) {
              if (!(charTypes[i$6] & BN_LIKE_TYPES)) {
                prevLevel = embedLevels[i$6];
                break;
              }
            }
            var lastIndex = seqIndices[seqIndices.length - 1];
            var lastLevel = embedLevels[lastIndex];
            var nextLevel = paragraph.level;
            if (!(charTypes[lastIndex] & ISOLATE_INIT_TYPES)) {
              for (var i$7 = lastIndex + 1; i$7 <= paragraph.end; i$7++) {
                if (!(charTypes[i$7] & BN_LIKE_TYPES)) {
                  nextLevel = embedLevels[i$7];
                  break;
                }
              }
            }
            isolatingRunSeqs.push({
              _seqIndices: seqIndices,
              _sosType: Math.max(prevLevel, firstLevel) % 2 ? TYPE_R : TYPE_L,
              _eosType: Math.max(nextLevel, lastLevel) % 2 ? TYPE_R : TYPE_L
            });
          }
        }
        for (var seqIdx = 0; seqIdx < isolatingRunSeqs.length; seqIdx++) {
          var ref = isolatingRunSeqs[seqIdx];
          var seqIndices$1 = ref._seqIndices;
          var sosType = ref._sosType;
          var eosType = ref._eosType;
          if (charTypeCounts.get(TYPE_NSM)) {
            for (var si = 0; si < seqIndices$1.length; si++) {
              var i$8 = seqIndices$1[si];
              if (charTypes[i$8] & TYPE_NSM) {
                var prevType = sosType;
                for (var sj = si - 1; sj >= 0; sj--) {
                  if (!(charTypes[seqIndices$1[sj]] & BN_LIKE_TYPES)) {
                    prevType = charTypes[seqIndices$1[sj]];
                    break;
                  }
                }
                changeCharType(i$8, prevType & (ISOLATE_INIT_TYPES | TYPE_PDI) ? TYPE_ON : prevType);
              }
            }
          }
          if (charTypeCounts.get(TYPE_EN)) {
            for (var si$1 = 0; si$1 < seqIndices$1.length; si$1++) {
              var i$9 = seqIndices$1[si$1];
              if (charTypes[i$9] & TYPE_EN) {
                for (var sj$1 = si$1 - 1; sj$1 >= -1; sj$1--) {
                  var prevCharType = sj$1 === -1 ? sosType : charTypes[seqIndices$1[sj$1]];
                  if (prevCharType & STRONG_TYPES) {
                    if (prevCharType === TYPE_AL) {
                      changeCharType(i$9, TYPE_AN);
                    }
                    break;
                  }
                }
              }
            }
          }
          if (charTypeCounts.get(TYPE_AL)) {
            for (var si$2 = 0; si$2 < seqIndices$1.length; si$2++) {
              var i$10 = seqIndices$1[si$2];
              if (charTypes[i$10] & TYPE_AL) {
                changeCharType(i$10, TYPE_R);
              }
            }
          }
          if (charTypeCounts.get(TYPE_ES) || charTypeCounts.get(TYPE_CS)) {
            for (var si$3 = 1; si$3 < seqIndices$1.length - 1; si$3++) {
              var i$11 = seqIndices$1[si$3];
              if (charTypes[i$11] & (TYPE_ES | TYPE_CS)) {
                var prevType$1 = 0, nextType = 0;
                for (var sj$2 = si$3 - 1; sj$2 >= 0; sj$2--) {
                  prevType$1 = charTypes[seqIndices$1[sj$2]];
                  if (!(prevType$1 & BN_LIKE_TYPES)) {
                    break;
                  }
                }
                for (var sj$3 = si$3 + 1; sj$3 < seqIndices$1.length; sj$3++) {
                  nextType = charTypes[seqIndices$1[sj$3]];
                  if (!(nextType & BN_LIKE_TYPES)) {
                    break;
                  }
                }
                if (prevType$1 === nextType && (charTypes[i$11] === TYPE_ES ? prevType$1 === TYPE_EN : prevType$1 & (TYPE_EN | TYPE_AN))) {
                  changeCharType(i$11, prevType$1);
                }
              }
            }
          }
          if (charTypeCounts.get(TYPE_EN)) {
            for (var si$4 = 0; si$4 < seqIndices$1.length; si$4++) {
              var i$12 = seqIndices$1[si$4];
              if (charTypes[i$12] & TYPE_EN) {
                for (var sj$4 = si$4 - 1; sj$4 >= 0 && charTypes[seqIndices$1[sj$4]] & (TYPE_ET | BN_LIKE_TYPES); sj$4--) {
                  changeCharType(seqIndices$1[sj$4], TYPE_EN);
                }
                for (var sj$5 = si$4 + 1; sj$5 < seqIndices$1.length && charTypes[seqIndices$1[sj$5]] & (TYPE_ET | BN_LIKE_TYPES); sj$5++) {
                  changeCharType(seqIndices$1[sj$5], TYPE_EN);
                }
              }
            }
          }
          if (charTypeCounts.get(TYPE_ET) || charTypeCounts.get(TYPE_ES) || charTypeCounts.get(TYPE_CS)) {
            for (var si$5 = 0; si$5 < seqIndices$1.length; si$5++) {
              var i$13 = seqIndices$1[si$5];
              if (charTypes[i$13] & (TYPE_ET | TYPE_ES | TYPE_CS)) {
                changeCharType(i$13, TYPE_ON);
                for (var sj$6 = si$5 - 1; sj$6 >= 0 && charTypes[seqIndices$1[sj$6]] & BN_LIKE_TYPES; sj$6--) {
                  changeCharType(seqIndices$1[sj$6], TYPE_ON);
                }
                for (var sj$7 = si$5 + 1; sj$7 < seqIndices$1.length && charTypes[seqIndices$1[sj$7]] & BN_LIKE_TYPES; sj$7++) {
                  changeCharType(seqIndices$1[sj$7], TYPE_ON);
                }
              }
            }
          }
          if (charTypeCounts.get(TYPE_EN)) {
            for (var si$6 = 0, prevStrongType = sosType; si$6 < seqIndices$1.length; si$6++) {
              var i$14 = seqIndices$1[si$6];
              var type = charTypes[i$14];
              if (type & TYPE_EN) {
                if (prevStrongType === TYPE_L) {
                  changeCharType(i$14, TYPE_L);
                }
              } else if (type & STRONG_TYPES) {
                prevStrongType = type;
              }
            }
          }
          if (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES)) {
            var R_TYPES_FOR_N_STEPS = TYPE_R | TYPE_EN | TYPE_AN;
            var STRONG_TYPES_FOR_N_STEPS = R_TYPES_FOR_N_STEPS | TYPE_L;
            var bracketPairs = [];
            {
              var openerStack = [];
              for (var si$7 = 0; si$7 < seqIndices$1.length; si$7++) {
                if (charTypes[seqIndices$1[si$7]] & NEUTRAL_ISOLATE_TYPES) {
                  var char = string[seqIndices$1[si$7]];
                  var oppositeBracket = void 0;
                  if (openingToClosingBracket(char) !== null) {
                    if (openerStack.length < 63) {
                      openerStack.push({char, seqIndex: si$7});
                    } else {
                      break;
                    }
                  } else if ((oppositeBracket = closingToOpeningBracket(char)) !== null) {
                    for (var stackIdx = openerStack.length - 1; stackIdx >= 0; stackIdx--) {
                      var stackChar = openerStack[stackIdx].char;
                      if (stackChar === oppositeBracket || stackChar === closingToOpeningBracket(getCanonicalBracket(char)) || openingToClosingBracket(getCanonicalBracket(stackChar)) === char) {
                        bracketPairs.push([openerStack[stackIdx].seqIndex, si$7]);
                        openerStack.length = stackIdx;
                        break;
                      }
                    }
                  }
                }
              }
              bracketPairs.sort(function(a, b) {
                return a[0] - b[0];
              });
            }
            for (var pairIdx = 0; pairIdx < bracketPairs.length; pairIdx++) {
              var ref$1 = bracketPairs[pairIdx];
              var openSeqIdx = ref$1[0];
              var closeSeqIdx = ref$1[1];
              var foundStrongType = false;
              var useStrongType = 0;
              for (var si$8 = openSeqIdx + 1; si$8 < closeSeqIdx; si$8++) {
                var i$15 = seqIndices$1[si$8];
                if (charTypes[i$15] & STRONG_TYPES_FOR_N_STEPS) {
                  foundStrongType = true;
                  var lr = charTypes[i$15] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
                  if (lr === getEmbedDirection(i$15)) {
                    useStrongType = lr;
                    break;
                  }
                }
              }
              if (foundStrongType && !useStrongType) {
                useStrongType = sosType;
                for (var si$9 = openSeqIdx - 1; si$9 >= 0; si$9--) {
                  var i$16 = seqIndices$1[si$9];
                  if (charTypes[i$16] & STRONG_TYPES_FOR_N_STEPS) {
                    var lr$1 = charTypes[i$16] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
                    if (lr$1 !== getEmbedDirection(i$16)) {
                      useStrongType = lr$1;
                    } else {
                      useStrongType = getEmbedDirection(i$16);
                    }
                    break;
                  }
                }
              }
              if (useStrongType) {
                charTypes[seqIndices$1[openSeqIdx]] = charTypes[seqIndices$1[closeSeqIdx]] = useStrongType;
                if (useStrongType !== getEmbedDirection(seqIndices$1[openSeqIdx])) {
                  for (var si$10 = openSeqIdx + 1; si$10 < seqIndices$1.length; si$10++) {
                    if (!(charTypes[seqIndices$1[si$10]] & BN_LIKE_TYPES)) {
                      if (getBidiCharType(string[seqIndices$1[si$10]]) & TYPE_NSM) {
                        charTypes[seqIndices$1[si$10]] = useStrongType;
                      }
                      break;
                    }
                  }
                }
                if (useStrongType !== getEmbedDirection(seqIndices$1[closeSeqIdx])) {
                  for (var si$11 = closeSeqIdx + 1; si$11 < seqIndices$1.length; si$11++) {
                    if (!(charTypes[seqIndices$1[si$11]] & BN_LIKE_TYPES)) {
                      if (getBidiCharType(string[seqIndices$1[si$11]]) & TYPE_NSM) {
                        charTypes[seqIndices$1[si$11]] = useStrongType;
                      }
                      break;
                    }
                  }
                }
              }
            }
            for (var si$12 = 0; si$12 < seqIndices$1.length; si$12++) {
              if (charTypes[seqIndices$1[si$12]] & NEUTRAL_ISOLATE_TYPES) {
                var niRunStart = si$12, niRunEnd = si$12;
                var prevType$2 = sosType;
                for (var si2 = si$12 - 1; si2 >= 0; si2--) {
                  if (charTypes[seqIndices$1[si2]] & BN_LIKE_TYPES) {
                    niRunStart = si2;
                  } else {
                    prevType$2 = charTypes[seqIndices$1[si2]] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
                    break;
                  }
                }
                var nextType$1 = eosType;
                for (var si2$1 = si$12 + 1; si2$1 < seqIndices$1.length; si2$1++) {
                  if (charTypes[seqIndices$1[si2$1]] & (NEUTRAL_ISOLATE_TYPES | BN_LIKE_TYPES)) {
                    niRunEnd = si2$1;
                  } else {
                    nextType$1 = charTypes[seqIndices$1[si2$1]] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
                    break;
                  }
                }
                for (var sj$8 = niRunStart; sj$8 <= niRunEnd; sj$8++) {
                  charTypes[seqIndices$1[sj$8]] = prevType$2 === nextType$1 ? prevType$2 : getEmbedDirection(seqIndices$1[sj$8]);
                }
                si$12 = niRunEnd;
              }
            }
          }
        }
        for (var i$17 = paragraph.start; i$17 <= paragraph.end; i$17++) {
          var level$3 = embedLevels[i$17];
          var type$1 = charTypes[i$17];
          if (level$3 & 1) {
            if (type$1 & (TYPE_L | TYPE_EN | TYPE_AN)) {
              embedLevels[i$17]++;
            }
          } else {
            if (type$1 & TYPE_R) {
              embedLevels[i$17]++;
            } else if (type$1 & (TYPE_AN | TYPE_EN)) {
              embedLevels[i$17] += 2;
            }
          }
          if (type$1 & BN_LIKE_TYPES) {
            embedLevels[i$17] = i$17 === 0 ? paragraph.level : embedLevels[i$17 - 1];
          }
          if (i$17 === paragraph.end || getBidiCharType(string[i$17]) & (TYPE_S | TYPE_B)) {
            for (var j$1 = i$17; j$1 >= 0 && getBidiCharType(string[j$1]) & TRAILING_TYPES; j$1--) {
              embedLevels[j$1] = paragraph.level;
            }
          }
        }
      }
      return {
        levels: embedLevels,
        paragraphs
      };
      function determineAutoEmbedLevel(start, isFSI) {
        for (var i2 = start; i2 < string.length; i2++) {
          var charType2 = charTypes[i2];
          if (charType2 & (TYPE_R | TYPE_AL)) {
            return 1;
          }
          if (charType2 & (TYPE_B | TYPE_L) || isFSI && charType2 === TYPE_PDI) {
            return 0;
          }
          if (charType2 & ISOLATE_INIT_TYPES) {
            var pdi = indexOfMatchingPDI(i2);
            i2 = pdi === -1 ? string.length : pdi;
          }
        }
        return 0;
      }
      function indexOfMatchingPDI(isolateStart) {
        var isolationLevel = 1;
        for (var i2 = isolateStart + 1; i2 < string.length; i2++) {
          var charType2 = charTypes[i2];
          if (charType2 & TYPE_B) {
            break;
          }
          if (charType2 & TYPE_PDI) {
            if (--isolationLevel === 0) {
              return i2;
            }
          } else if (charType2 & ISOLATE_INIT_TYPES) {
            isolationLevel++;
          }
        }
        return -1;
      }
      function getEmbedDirection(i2) {
        return embedLevels[i2] & 1 ? TYPE_R : TYPE_L;
      }
    }
    var data = "14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1";
    var mirrorMap;
    function parse() {
      if (!mirrorMap) {
        var ref = parseCharacterMap(data, true);
        var map2 = ref.map;
        var reverseMap = ref.reverseMap;
        reverseMap.forEach(function(value, key) {
          map2.set(key, value);
        });
        mirrorMap = map2;
      }
    }
    function getMirroredCharacter(char) {
      parse();
      return mirrorMap.get(char) || null;
    }
    function getMirroredCharactersMap(string, embeddingLevels, start, end) {
      var strLen = string.length;
      start = Math.max(0, start == null ? 0 : +start);
      end = Math.min(strLen - 1, end == null ? strLen - 1 : +end);
      var map2 = new Map();
      for (var i = start; i <= end; i++) {
        if (embeddingLevels[i] & 1) {
          var mirror = getMirroredCharacter(string[i]);
          if (mirror !== null) {
            map2.set(i, mirror);
          }
        }
      }
      return map2;
    }
    function getReorderSegments(string, embeddingLevelsResult, start, end) {
      var strLen = string.length;
      start = Math.max(0, start == null ? 0 : +start);
      end = Math.min(strLen - 1, end == null ? strLen - 1 : +end);
      var segments = [];
      embeddingLevelsResult.paragraphs.forEach(function(paragraph) {
        var lineStart = Math.max(start, paragraph.start);
        var lineEnd = Math.min(end, paragraph.end);
        if (lineStart < lineEnd) {
          var lineLevels = embeddingLevelsResult.levels.slice(lineStart, lineEnd + 1);
          for (var i = lineEnd; i >= lineStart && getBidiCharType(string[i]) & TRAILING_TYPES; i--) {
            lineLevels[i] = paragraph.level;
          }
          var maxLevel = paragraph.level;
          var minOddLevel = Infinity;
          for (var i$1 = 0; i$1 < lineLevels.length; i$1++) {
            var level = lineLevels[i$1];
            if (level > maxLevel) {
              maxLevel = level;
            }
            if (level < minOddLevel) {
              minOddLevel = level | 1;
            }
          }
          for (var lvl = maxLevel; lvl >= minOddLevel; lvl--) {
            for (var i$2 = 0; i$2 < lineLevels.length; i$2++) {
              if (lineLevels[i$2] >= lvl) {
                var segStart = i$2;
                while (i$2 + 1 < lineLevels.length && lineLevels[i$2 + 1] >= lvl) {
                  i$2++;
                }
                if (i$2 > segStart) {
                  segments.push([segStart + start, i$2 + start]);
                }
              }
            }
          }
        }
      });
      return segments;
    }
    function getReorderedString(string, embedLevelsResult, start, end) {
      var indices = getReorderedIndices(string, embedLevelsResult, start, end);
      var chars = [].concat(string);
      indices.forEach(function(charIndex, i) {
        chars[i] = (embedLevelsResult.levels[charIndex] & 1 ? getMirroredCharacter(string[charIndex]) : null) || string[charIndex];
      });
      return chars.join("");
    }
    function getReorderedIndices(string, embedLevelsResult, start, end) {
      var segments = getReorderSegments(string, embedLevelsResult, start, end);
      var indices = [];
      for (var i = 0; i < string.length; i++) {
        indices[i] = i;
      }
      segments.forEach(function(ref) {
        var start2 = ref[0];
        var end2 = ref[1];
        var slice = indices.slice(start2, end2 + 1);
        for (var i2 = slice.length; i2--; ) {
          indices[end2 - i2] = slice[i2];
        }
      });
      return indices;
    }
    exports.closingToOpeningBracket = closingToOpeningBracket;
    exports.getBidiCharType = getBidiCharType;
    exports.getBidiCharTypeName = getBidiCharTypeName;
    exports.getCanonicalBracket = getCanonicalBracket;
    exports.getEmbeddingLevels = getEmbeddingLevels;
    exports.getMirroredCharacter = getMirroredCharacter;
    exports.getMirroredCharactersMap = getMirroredCharactersMap;
    exports.getReorderSegments = getReorderSegments;
    exports.getReorderedIndices = getReorderedIndices;
    exports.getReorderedString = getReorderedString;
    exports.openingToClosingBracket = openingToClosingBracket;
    Object.defineProperty(exports, "__esModule", {value: true});
    return exports;
  }({});
  return bidi;
}

/**
 * Regular expression for matching the `void main() {` opener line in GLSL.
 * @type {RegExp}
 */
const voidMainRegExp = /\bvoid\s+main\s*\(\s*\)\s*{/g;

/**
 * Recursively expands all `#include <xyz>` statements within string of shader code.
 * Copied from three's WebGLProgram#parseIncludes for external use.
 *
 * @param {string} source - The GLSL source code to evaluate
 * @return {string} The GLSL code with all includes expanded
 */
function expandShaderIncludes( source ) {
  const pattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function replace(match, include) {
    let chunk = ShaderChunk[include];
    return chunk ? expandShaderIncludes(chunk) : match
  }
  return source.replace( pattern, replace )
}

/*
 * This is a direct copy of MathUtils.generateUUID from Three.js, to preserve compatibility with three
 * versions before 0.113.0 as it was changed from Math to MathUtils in that version.
 * https://github.com/mrdoob/three.js/blob/dd8b5aa3b270c17096b90945cd2d6d1b13aaec53/src/math/MathUtils.js#L16
 */

const _lut = [];

for (let i = 0; i < 256; i++) {
  _lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
}

function generateUUID() {

  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

  const d0 = Math.random() * 0xffffffff | 0;
  const d1 = Math.random() * 0xffffffff | 0;
  const d2 = Math.random() * 0xffffffff | 0;
  const d3 = Math.random() * 0xffffffff | 0;
  const uuid = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' +
    _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' +
    _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] +
    _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];

  // .toUpperCase() here flattens concatenated strings to save heap memory space.
  return uuid.toUpperCase()

}

// Local assign polyfill to avoid importing troika-core
const assign = Object.assign || function(/*target, ...sources*/) {
  let target = arguments[0];
  for (let i = 1, len = arguments.length; i < len; i++) {
    let source = arguments[i];
    if (source) {
      for (let prop in source) {
        if (source.hasOwnProperty(prop)) {
          target[prop] = source[prop];
        }
      }
    }
  }
  return target
};


const epoch = Date.now();
const CONSTRUCTOR_CACHE = new WeakMap();
const SHADER_UPGRADE_CACHE = new Map();

// Material ids must be integers, but we can't access the increment from Three's `Material` module,
// so let's choose a sufficiently large starting value that should theoretically never collide.
let materialInstanceId = 1e10;

/**
 * A utility for creating a custom shader material derived from another material's
 * shaders. This allows you to inject custom shader logic and transforms into the
 * builtin ThreeJS materials without having to recreate them from scratch.
 *
 * @param {THREE.Material} baseMaterial - the original material to derive from
 *
 * @param {Object} options - How the base material should be modified.
 * @param {Object} options.defines - Custom `defines` for the material
 * @param {Object} options.extensions - Custom `extensions` for the material, e.g. `{derivatives: true}`
 * @param {Object} options.uniforms - Custom `uniforms` for use in the modified shader. These can
 *        be accessed and manipulated via the resulting material's `uniforms` property, just like
 *        in a ShaderMaterial. You do not need to repeat the base material's own uniforms here.
 * @param {String} options.timeUniform - If specified, a uniform of this name will be injected into
 *        both shaders, and it will automatically be updated on each render frame with a number of
 *        elapsed milliseconds. The "zero" epoch time is not significant so don't rely on this as a
 *        true calendar time.
 * @param {String} options.vertexDefs - Custom GLSL code to inject into the vertex shader's top-level
 *        definitions, above the `void main()` function.
 * @param {String} options.vertexMainIntro - Custom GLSL code to inject at the top of the vertex
 *        shader's `void main` function.
 * @param {String} options.vertexMainOutro - Custom GLSL code to inject at the end of the vertex
 *        shader's `void main` function.
 * @param {String} options.vertexTransform - Custom GLSL code to manipulate the `position`, `normal`,
 *        and/or `uv` vertex attributes. This code will be wrapped within a standalone function with
 *        those attributes exposed by their normal names as read/write values.
 * @param {String} options.fragmentDefs - Custom GLSL code to inject into the fragment shader's top-level
 *        definitions, above the `void main()` function.
 * @param {String} options.fragmentMainIntro - Custom GLSL code to inject at the top of the fragment
 *        shader's `void main` function.
 * @param {String} options.fragmentMainOutro - Custom GLSL code to inject at the end of the fragment
 *        shader's `void main` function. You can manipulate `gl_FragColor` here but keep in mind it goes
 *        after any of ThreeJS's color postprocessing shader chunks (tonemapping, fog, etc.), so if you
 *        want those to apply to your changes use `fragmentColorTransform` instead.
 * @param {String} options.fragmentColorTransform - Custom GLSL code to manipulate the `gl_FragColor`
 *        output value. Will be injected near the end of the `void main` function, but before any
 *        of ThreeJS's color postprocessing shader chunks (tonemapping, fog, etc.), and before the
 *        `fragmentMainOutro`.
 * @param {function<{vertexShader,fragmentShader}>:{vertexShader,fragmentShader}} options.customRewriter - A function
 *        for performing custom rewrites of the full shader code. Useful if you need to do something
 *        special that's not covered by the other builtin options. This function will be executed before
 *        any other transforms are applied.
 * @param {boolean} options.chained - Set to `true` to prototype-chain the derived material to the base
 *        material, rather than the default behavior of copying it. This allows the derived material to
 *        automatically pick up changes made to the base material and its properties. This can be useful
 *        where the derived material is hidden from the user as an implementation detail, allowing them
 *        to work with the original material like normal. But it can result in unexpected behavior if not
 *        handled carefully.
 *
 * @return {THREE.Material}
 *
 * The returned material will also have two new methods, `getDepthMaterial()` and `getDistanceMaterial()`,
 * which can be called to get a variant of the derived material for use in shadow casting. If the
 * target mesh is expected to cast shadows, then you can assign these to the mesh's `customDepthMaterial`
 * (for directional and spot lights) and/or `customDistanceMaterial` (for point lights) properties to
 * allow the cast shadow to honor your derived shader's vertex transforms and discarded fragments. These
 * will also set a custom `#define IS_DEPTH_MATERIAL` or `#define IS_DISTANCE_MATERIAL` that you can look
 * for in your derived shaders with `#ifdef` to customize their behavior for the depth or distance
 * scenarios, e.g. skipping antialiasing or expensive shader logic.
 */
function createDerivedMaterial(baseMaterial, options) {
  // Generate a key that is unique to the content of these `options`. We'll use this
  // throughout for caching and for generating the upgraded shader code. This increases
  // the likelihood that the resulting shaders will line up across multiple calls so
  // their GL programs can be shared and cached.
  const optionsKey = getKeyForOptions(options);

  // First check to see if we've already derived from this baseMaterial using this
  // unique set of options, and if so reuse the constructor to avoid some allocations.
  let ctorsByDerivation = CONSTRUCTOR_CACHE.get(baseMaterial);
  if (!ctorsByDerivation) {
    CONSTRUCTOR_CACHE.set(baseMaterial, (ctorsByDerivation = Object.create(null)));
  }
  if (ctorsByDerivation[optionsKey]) {
    return new ctorsByDerivation[optionsKey]()
  }

  const privateBeforeCompileProp = `_onBeforeCompile${optionsKey}`;

  // Private onBeforeCompile handler that injects the modified shaders and uniforms when
  // the renderer switches to this material's program
  const onBeforeCompile = function (shaderInfo) {
    baseMaterial.onBeforeCompile.call(this, shaderInfo);

    // Upgrade the shaders, caching the result by incoming source code
    const cacheKey = optionsKey + '|||' + shaderInfo.vertexShader + '|||' + shaderInfo.fragmentShader;
    let upgradedShaders = SHADER_UPGRADE_CACHE[cacheKey];
    if (!upgradedShaders) {
      const upgraded = upgradeShaders(shaderInfo, options, optionsKey);
      upgradedShaders = SHADER_UPGRADE_CACHE[cacheKey] = upgraded;
    }

    // Inject upgraded shaders and uniforms into the program
    shaderInfo.vertexShader = upgradedShaders.vertexShader;
    shaderInfo.fragmentShader = upgradedShaders.fragmentShader;
    assign(shaderInfo.uniforms, this.uniforms);

    // Inject auto-updating time uniform if requested
    if (options.timeUniform) {
      shaderInfo.uniforms[options.timeUniform] = {
        get value() {return Date.now() - epoch}
      };
    }

    // Users can still add their own handlers on top of ours
    if (this[privateBeforeCompileProp]) {
      this[privateBeforeCompileProp](shaderInfo);
    }
  };

  const DerivedMaterial = function DerivedMaterial() {
    return derive(options.chained ? baseMaterial : baseMaterial.clone())
  };

  const derive = function(base) {
    // Prototype chain to the base material
    const derived = Object.create(base, descriptor);

    // Store the baseMaterial for reference; this is always the original even when cloning
    Object.defineProperty(derived, 'baseMaterial', { value: baseMaterial });

    // Needs its own ids
    Object.defineProperty(derived, 'id', { value: materialInstanceId++ });
    derived.uuid = generateUUID();

    // Merge uniforms, defines, and extensions
    derived.uniforms = assign({}, base.uniforms, options.uniforms);
    derived.defines = assign({}, base.defines, options.defines);
    derived.defines[`TROIKA_DERIVED_MATERIAL_${optionsKey}`] = ''; //force a program change from the base material
    derived.extensions = assign({}, base.extensions, options.extensions);

    // Don't inherit EventDispatcher listeners
    derived._listeners = undefined;

    return derived
  };

  const descriptor = {
    constructor: {value: DerivedMaterial},
    isDerivedMaterial: {value: true},

    customProgramCacheKey: {
      writable: true,
      configurable: true,
      value: function () {
        return optionsKey
      }
    },

    onBeforeCompile: {
      get() {
        return onBeforeCompile
      },
      set(fn) {
        this[privateBeforeCompileProp] = fn;
      }
    },

    copy: {
      writable: true,
      configurable: true,
      value: function (source) {
        baseMaterial.copy.call(this, source);
        if (!baseMaterial.isShaderMaterial && !baseMaterial.isDerivedMaterial) {
          assign(this.extensions, source.extensions);
          assign(this.defines, source.defines);
          assign(this.uniforms, UniformsUtils.clone(source.uniforms));
        }
        return this
      }
    },

    clone: {
      writable: true,
      configurable: true,
      value: function () {
        const newBase = new baseMaterial.constructor();
        return derive(newBase).copy(this)
      }
    },

    /**
     * Utility to get a MeshDepthMaterial that will honor this derived material's vertex
     * transformations and discarded fragments.
     */
    getDepthMaterial: {
      writable: true,
      configurable: true,
      value: function() {
        let depthMaterial = this._depthMaterial;
        if (!depthMaterial) {
          depthMaterial = this._depthMaterial = createDerivedMaterial(
            baseMaterial.isDerivedMaterial
              ? baseMaterial.getDepthMaterial()
              : new MeshDepthMaterial({ depthPacking: RGBADepthPacking }),
            options
          );
          depthMaterial.defines.IS_DEPTH_MATERIAL = '';
          depthMaterial.uniforms = this.uniforms; //automatically recieve same uniform values
        }
        return depthMaterial
      }
    },

    /**
     * Utility to get a MeshDistanceMaterial that will honor this derived material's vertex
     * transformations and discarded fragments.
     */
    getDistanceMaterial: {
      writable: true,
      configurable: true,
      value: function() {
        let distanceMaterial = this._distanceMaterial;
        if (!distanceMaterial) {
          distanceMaterial = this._distanceMaterial = createDerivedMaterial(
            baseMaterial.isDerivedMaterial
              ? baseMaterial.getDistanceMaterial()
              : new MeshDistanceMaterial(),
            options
          );
          distanceMaterial.defines.IS_DISTANCE_MATERIAL = '';
          distanceMaterial.uniforms = this.uniforms; //automatically recieve same uniform values
        }
        return distanceMaterial
      }
    },

    dispose: {
      writable: true,
      configurable: true,
      value() {
        const {_depthMaterial, _distanceMaterial} = this;
        if (_depthMaterial) _depthMaterial.dispose();
        if (_distanceMaterial) _distanceMaterial.dispose();
        baseMaterial.dispose.call(this);
      }
    }
  };

  ctorsByDerivation[optionsKey] = DerivedMaterial;
  return new DerivedMaterial()
}


function upgradeShaders({vertexShader, fragmentShader}, options, key) {
  let {
    vertexDefs,
    vertexMainIntro,
    vertexMainOutro,
    vertexTransform,
    fragmentDefs,
    fragmentMainIntro,
    fragmentMainOutro,
    fragmentColorTransform,
    customRewriter,
    timeUniform
  } = options;

  vertexDefs = vertexDefs || '';
  vertexMainIntro = vertexMainIntro || '';
  vertexMainOutro = vertexMainOutro || '';
  fragmentDefs = fragmentDefs || '';
  fragmentMainIntro = fragmentMainIntro || '';
  fragmentMainOutro = fragmentMainOutro || '';

  // Expand includes if needed
  if (vertexTransform || customRewriter) {
    vertexShader = expandShaderIncludes(vertexShader);
  }
  if (fragmentColorTransform || customRewriter) {
    // We need to be able to find postprocessing chunks after include expansion in order to
    // put them after the fragmentColorTransform, so mark them with comments first. Even if
    // this particular derivation doesn't have a fragmentColorTransform, other derivations may,
    // so we still mark them.
    fragmentShader = fragmentShader.replace(
      /^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,
      '\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n'
    );
    fragmentShader = expandShaderIncludes(fragmentShader);
  }

  // Apply custom rewriter function
  if (customRewriter) {
    let res = customRewriter({vertexShader, fragmentShader});
    vertexShader = res.vertexShader;
    fragmentShader = res.fragmentShader;
  }

  // The fragmentColorTransform needs to go before any postprocessing chunks, so extract
  // those and re-insert them into the outro in the correct place:
  if (fragmentColorTransform) {
    let postChunks = [];
    fragmentShader = fragmentShader.replace(
      /^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm, // [^]+? = non-greedy match of any chars including newlines
      match => {
        postChunks.push(match);
        return ''
      }
    );
    fragmentMainOutro = `${fragmentColorTransform}\n${postChunks.join('\n')}\n${fragmentMainOutro}`;
  }

  // Inject auto-updating time uniform if requested
  if (timeUniform) {
    const code = `\nuniform float ${timeUniform};\n`;
    vertexDefs = code + vertexDefs;
    fragmentDefs = code + fragmentDefs;
  }

  // Inject a function for the vertexTransform and rename all usages of position/normal/uv
  if (vertexTransform) {
    // Hoist these defs to the very top so they work in other function defs
    vertexShader = `vec3 troika_position_${key};
vec3 troika_normal_${key};
vec2 troika_uv_${key};
${vertexShader}
`;
    vertexDefs = `${vertexDefs}
void troikaVertexTransform${key}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${vertexTransform}
}
`;
    vertexMainIntro = `
troika_position_${key} = vec3(position);
troika_normal_${key} = vec3(normal);
troika_uv_${key} = vec2(uv);
troikaVertexTransform${key}(troika_position_${key}, troika_normal_${key}, troika_uv_${key});
${vertexMainIntro}
`;
    vertexShader = vertexShader.replace(/\b(position|normal|uv)\b/g, (match, match1, index, fullStr) => {
      return /\battribute\s+vec[23]\s+$/.test(fullStr.substr(0, index)) ? match1 : `troika_${match1}_${key}`
    });
  }

  // Inject defs and intro/outro snippets
  vertexShader = injectIntoShaderCode(vertexShader, key, vertexDefs, vertexMainIntro, vertexMainOutro);
  fragmentShader = injectIntoShaderCode(fragmentShader, key, fragmentDefs, fragmentMainIntro, fragmentMainOutro);

  return {
    vertexShader,
    fragmentShader
  }
}

function injectIntoShaderCode(shaderCode, id, defs, intro, outro) {
  if (intro || outro || defs) {
    shaderCode = shaderCode.replace(voidMainRegExp, `
${defs}
void troikaOrigMain${id}() {`
    );
    shaderCode += `
void main() {
  ${intro}
  troikaOrigMain${id}();
  ${outro}
}`;
  }
  return shaderCode
}


function optionsJsonReplacer(key, value) {
  return key === 'uniforms' ? undefined : typeof value === 'function' ? value.toString() : value
}

let _idCtr = 0;
const optionsHashesToIds = new Map();
function getKeyForOptions(options) {
  const optionsHash = JSON.stringify(options, optionsJsonReplacer);
  let id = optionsHashesToIds.get(optionsHash);
  if (id == null) {
    optionsHashesToIds.set(optionsHash, (id = ++_idCtr));
  }
  return id
}

/**
 * Initializes and returns a function to generate an SDF texture for a given glyph.
 * @param {function} createGlyphSegmentsIndex - factory for a GlyphSegmentsIndex implementation.
 * @param {number} config.sdfExponent
 * @param {number} config.sdfMargin
 *
 * @return {function(Object): {renderingBounds: [minX, minY, maxX, maxY], textureData: Uint8Array}}
 */
function createSDFGenerator(createGlyphSegmentsIndex, config) {
  const { sdfExponent, sdfMargin } = config;

  /**
   * How many straight line segments to use when approximating a glyph's quadratic/cubic bezier curves.
   */
  const CURVE_POINTS = 16;

  /**
   * Find the point on a quadratic bezier curve at t where t is in the range [0, 1]
   */
  function pointOnQuadraticBezier(x0, y0, x1, y1, x2, y2, t) {
    const t2 = 1 - t;
    return {
      x: t2 * t2 * x0 + 2 * t2 * t * x1 + t * t * x2,
      y: t2 * t2 * y0 + 2 * t2 * t * y1 + t * t * y2
    }
  }

  /**
   * Find the point on a cubic bezier curve at t where t is in the range [0, 1]
   */
  function pointOnCubicBezier(x0, y0, x1, y1, x2, y2, x3, y3, t) {
    const t2 = 1 - t;
    return {
      x: t2 * t2 * t2 * x0 + 3 * t2 * t2 * t * x1 + 3 * t2 * t * t * x2 + t * t * t * x3,
      y: t2 * t2 * t2 * y0 + 3 * t2 * t2 * t * y1 + 3 * t2 * t * t * y2 + t * t * t * y3
    }
  }

  /**
   * Generate an SDF texture segment for a single glyph.
   * @param {object} glyphObj
   * @param {number} sdfSize - the length of one side of the SDF image.
   *        Larger images encode more details. Must be a power of 2.
   * @return {{textureData: Uint8Array, renderingBounds: *[]}}
   */
  function generateSDF(glyphObj, sdfSize) {
    //console.time('glyphSDF')

    const textureData = new Uint8Array(sdfSize * sdfSize);

    // Determine mapping between glyph grid coords and sdf grid coords
    const glyphW = glyphObj.xMax - glyphObj.xMin;
    const glyphH = glyphObj.yMax - glyphObj.yMin;

    // Choose a maximum search distance radius in font units, based on the glyph's max dimensions
    const fontUnitsMaxSearchDist = Math.max(glyphW, glyphH);

    // Margin - add an extra 0.5 over the configured value because the outer 0.5 doesn't contain
    // useful interpolated values and will be ignored anyway.
    const fontUnitsMargin = Math.max(glyphW, glyphH) / sdfSize * (sdfMargin * sdfSize + 0.5);

    // Metrics of the texture/quad in font units
    const textureMinFontX = glyphObj.xMin - fontUnitsMargin;
    const textureMinFontY = glyphObj.yMin - fontUnitsMargin;
    const textureMaxFontX = glyphObj.xMax + fontUnitsMargin;
    const textureMaxFontY = glyphObj.yMax + fontUnitsMargin;
    const fontUnitsTextureWidth = textureMaxFontX - textureMinFontX;
    const fontUnitsTextureHeight = textureMaxFontY - textureMinFontY;
    const fontUnitsTextureMaxDim = Math.max(fontUnitsTextureWidth, fontUnitsTextureHeight);

    function textureXToFontX(x) {
      return textureMinFontX + fontUnitsTextureWidth * x / sdfSize
    }

    function textureYToFontY(y) {
      return textureMinFontY + fontUnitsTextureHeight * y / sdfSize
    }

    if (glyphObj.pathCommandCount) { //whitespace chars will have no commands, so we can skip all this
      // Decompose all paths into straight line segments and add them to a quadtree
      const lineSegmentsIndex = createGlyphSegmentsIndex(glyphObj);
      let firstX, firstY, prevX, prevY;
      glyphObj.forEachPathCommand((type, x0, y0, x1, y1, x2, y2) => {
        switch (type) {
          case 'M':
            prevX = firstX = x0;
            prevY = firstY = y0;
            break
          case 'L':
            if (x0 !== prevX || y0 !== prevY) { //yup, some fonts have zero-length line commands
              lineSegmentsIndex.addLineSegment(prevX, prevY, (prevX = x0), (prevY = y0));
            }
            break
          case 'Q': {
            let prevPoint = {x: prevX, y: prevY};
            for (let i = 1; i < CURVE_POINTS; i++) {
              let nextPoint = pointOnQuadraticBezier(
                prevX, prevY,
                x0, y0,
                x1, y1,
                i / (CURVE_POINTS - 1)
              );
              lineSegmentsIndex.addLineSegment(prevPoint.x, prevPoint.y, nextPoint.x, nextPoint.y);
              prevPoint = nextPoint;
            }
            prevX = x1;
            prevY = y1;
            break
          }
          case 'C': {
            let prevPoint = {x: prevX, y: prevY};
            for (let i = 1; i < CURVE_POINTS; i++) {
              let nextPoint = pointOnCubicBezier(
                prevX, prevY,
                x0, y0,
                x1, y1,
                x2, y2,
                i / (CURVE_POINTS - 1)
              );
              lineSegmentsIndex.addLineSegment(prevPoint.x, prevPoint.y, nextPoint.x, nextPoint.y);
              prevPoint = nextPoint;
            }
            prevX = x2;
            prevY = y2;
            break
          }
          case 'Z':
            if (prevX !== firstX || prevY !== firstY) {
              lineSegmentsIndex.addLineSegment(prevX, prevY, firstX, firstY);
            }
            break
        }
      });

      // For each target SDF texel, find the distance from its center to its nearest line segment,
      // map that distance to an alpha value, and write that alpha to the texel
      for (let sdfX = 0; sdfX < sdfSize; sdfX++) {
        for (let sdfY = 0; sdfY < sdfSize; sdfY++) {
          const signedDist = lineSegmentsIndex.findNearestSignedDistance(
            textureXToFontX(sdfX + 0.5),
            textureYToFontY(sdfY + 0.5),
            fontUnitsMaxSearchDist
          );

          // Use an exponential scale to ensure the texels very near the glyph path have adequate
          // precision, while allowing the distance field to cover the entire texture, given that
          // there are only 8 bits available. Formula visualized: https://www.desmos.com/calculator/uiaq5aqiam
          let alpha = Math.pow((1 - Math.abs(signedDist) / fontUnitsTextureMaxDim), sdfExponent) / 2;
          if (signedDist < 0) {
            alpha = 1 - alpha;
          }

          alpha = Math.max(0, Math.min(255, Math.round(alpha * 255))); //clamp
          textureData[sdfY * sdfSize + sdfX] = alpha;
        }
      }
    }

    //console.timeEnd('glyphSDF')

    return {
      textureData: textureData,

      renderingBounds: [
        textureMinFontX,
        textureMinFontY,
        textureMaxFontX,
        textureMaxFontY
      ]
    }
  }


  return generateSDF
}

/**
 * Creates a self-contained environment for processing text rendering requests.
 *
 * It is important that this function has no closure dependencies, so that it can be easily injected
 * into the source for a Worker without requiring a build step or complex dependency loading. All its
 * dependencies must be passed in at initialization.
 *
 * @param {function} fontParser - a function that accepts an ArrayBuffer of the font data and returns
 * a standardized structure giving access to the font and its glyphs:
 *   {
 *     unitsPerEm: number,
 *     ascender: number,
 *     descender: number,
 *     forEachGlyph(string, fontSize, letterSpacing, callback) {
 *       //invokes callback for each glyph to render, passing it an object:
 *       callback({
 *         index: number,
 *         advanceWidth: number,
 *         xMin: number,
 *         yMin: number,
 *         xMax: number,
 *         yMax: number,
 *         pathCommandCount: number,
 *         forEachPathCommand(callback) {
 *           //invokes callback for each path command, with args:
 *           callback(
 *             type: 'M|L|C|Q|Z',
 *             ...args //0 to 6 args depending on the type
 *           )
 *         }
 *       })
 *     }
 *   }
 * @param {function} sdfGenerator - a function that accepts a glyph object and generates an SDF texture
 * from it.
 * @param {Object} config
 * @return {Object}
 */
function createFontProcessor(fontParser, sdfGenerator, bidi, config) {

  const {
    defaultFontURL
  } = config;


  /**
   * @private
   * Holds data about font glyphs and how they relate to SDF atlases
   *
   * {
   *   'fontUrl@sdfSize': {
   *     fontObj: {}, //result of the fontParser
   *     glyphs: {
   *       [glyphIndex]: {
   *         atlasIndex: 0,
   *         glyphObj: {}, //glyph object from the fontParser
   *         renderingBounds: [x0, y0, x1, y1]
   *       },
   *       ...
   *     },
   *     glyphCount: 123
   *   }
   * }
   */
  const fontAtlases = Object.create(null);

  /**
   * Holds parsed font objects by url
   */
  const fonts = Object.create(null);

  const INF = Infinity;

  // Set of Unicode Default_Ignorable_Code_Point characters, these will not produce visible glyphs
  const DEFAULT_IGNORABLE_CHARS = /[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/;

  /**
   * Load a given font url
   */
  function doLoadFont(url, callback) {
    function tryLoad() {
      const onError = err => {
        console.error(`Failure loading font ${url}${url === defaultFontURL ? '' : '; trying fallback'}`, err);
        if (url !== defaultFontURL) {
          url = defaultFontURL;
          tryLoad();
        }
      };
      try {
        const request = new XMLHttpRequest();
        request.open('get', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
          if (request.status >= 400) {
            onError(new Error(request.statusText));
          }
          else if (request.status > 0) {
            try {
              const fontObj = fontParser(request.response);
              callback(fontObj);
            } catch (e) {
              onError(e);
            }
          }
        };
        request.onerror = onError;
        request.send();
      } catch(err) {
        onError(err);
      }
    }
    tryLoad();
  }


  /**
   * Load a given font url if needed, invoking a callback when it's loaded. If already
   * loaded, the callback will be called synchronously.
   */
  function loadFont(fontUrl, callback) {
    if (!fontUrl) fontUrl = defaultFontURL;
    let font = fonts[fontUrl];
    if (font) {
      // if currently loading font, add to callbacks, otherwise execute immediately
      if (font.pending) {
        font.pending.push(callback);
      } else {
        callback(font);
      }
    } else {
      fonts[fontUrl] = {pending: [callback]};
      doLoadFont(fontUrl, fontObj => {
        let callbacks = fonts[fontUrl].pending;
        fonts[fontUrl] = fontObj;
        callbacks.forEach(cb => cb(fontObj));
      });
    }
  }


  /**
   * Get the atlas data for a given font url, loading it from the network and initializing
   * its atlas data objects if necessary.
   */
  function getSdfAtlas(fontUrl, sdfGlyphSize, callback) {
    if (!fontUrl) fontUrl = defaultFontURL;
    let atlasKey = `${fontUrl}@${sdfGlyphSize}`;
    let atlas = fontAtlases[atlasKey];
    if (atlas) {
      callback(atlas);
    } else {
      loadFont(fontUrl, fontObj => {
        atlas = fontAtlases[atlasKey] || (fontAtlases[atlasKey] = {
          fontObj: fontObj,
          glyphs: {},
          glyphCount: 0
        });
        callback(atlas);
      });
    }
  }


  /**
   * Main entry point.
   * Process a text string with given font and formatting parameters, and return all info
   * necessary to render all its glyphs.
   */
  function process(
    {
      text='',
      font=defaultFontURL,
      sdfGlyphSize=64,
      fontSize=1,
      letterSpacing=0,
      lineHeight='normal',
      maxWidth=INF,
      direction,
      textAlign='left',
      textIndent=0,
      whiteSpace='normal',
      overflowWrap='normal',
      anchorX = 0,
      anchorY = 0,
      includeCaretPositions=false,
      chunkedBoundsSize=8192,
      colorRanges=null
    },
    callback,
    metricsOnly=false
  ) {
    const mainStart = now();
    const timings = {total: 0, fontLoad: 0, layout: 0, sdf: {}, sdfTotal: 0};

    // Ensure newlines are normalized
    if (text.indexOf('\r') > -1) {
      console.warn('FontProcessor.process: got text with \\r chars; normalizing to \\n');
      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    }

    // Ensure we've got numbers not strings
    fontSize = +fontSize;
    letterSpacing = +letterSpacing;
    maxWidth = +maxWidth;
    lineHeight = lineHeight || 'normal';
    textIndent = +textIndent;

    getSdfAtlas(font, sdfGlyphSize, atlas => {
      const fontObj = atlas.fontObj;
      const hasMaxWidth = isFinite(maxWidth);
      let newGlyphs = null;
      let glyphBounds = null;
      let glyphAtlasIndices = null;
      let glyphColors = null;
      let caretPositions = null;
      let visibleBounds = null;
      let chunkedBounds = null;
      let maxLineWidth = 0;
      let renderableGlyphCount = 0;
      let canWrap = whiteSpace !== 'nowrap';
      const {ascender, descender, unitsPerEm} = fontObj;
      timings.fontLoad = now() - mainStart;
      const layoutStart = now();

      // Find conversion between native font units and fontSize units; this will already be done
      // for the gx/gy values below but everything else we'll need to convert
      const fontSizeMult = fontSize / unitsPerEm;

      // Determine appropriate value for 'normal' line height based on the font's actual metrics
      // TODO this does not guarantee individual glyphs won't exceed the line height, e.g. Roboto; should we use yMin/Max instead?
      if (lineHeight === 'normal') {
        lineHeight = (ascender - descender) / unitsPerEm;
      }

      // Determine line height and leading adjustments
      lineHeight = lineHeight * fontSize;
      const halfLeading = (lineHeight - (ascender - descender) * fontSizeMult) / 2;
      const topBaseline = -(ascender * fontSizeMult + halfLeading);
      const caretHeight = Math.min(lineHeight, (ascender - descender) * fontSizeMult);
      const caretBottomOffset = (ascender + descender) / 2 * fontSizeMult - caretHeight / 2;

      // Distribute glyphs into lines based on wrapping
      let lineXOffset = textIndent;
      let currentLine = new TextLine();
      const lines = [currentLine];

      fontObj.forEachGlyph(text, fontSize, letterSpacing, (glyphObj, glyphX, charIndex) => {
        const char = text.charAt(charIndex);
        const glyphWidth = glyphObj.advanceWidth * fontSizeMult;
        const curLineCount = currentLine.count;
        let nextLine;

        // Calc isWhitespace and isEmpty once per glyphObj
        if (!('isEmpty' in glyphObj)) {
          glyphObj.isWhitespace = !!char && /\s/.test(char);
          glyphObj.isEmpty = glyphObj.xMin === glyphObj.xMax || glyphObj.yMin === glyphObj.yMax || DEFAULT_IGNORABLE_CHARS.test(char);
        }
        if (!glyphObj.isWhitespace && !glyphObj.isEmpty) {
          renderableGlyphCount++;
        }

        // If a non-whitespace character overflows the max width, we need to soft-wrap
        if (canWrap && hasMaxWidth && !glyphObj.isWhitespace && glyphX + glyphWidth + lineXOffset > maxWidth && curLineCount) {
          // If it's the first char after a whitespace, start a new line
          if (currentLine.glyphAt(curLineCount - 1).glyphObj.isWhitespace) {
            nextLine = new TextLine();
            lineXOffset = -glyphX;
          } else {
            // Back up looking for a whitespace character to wrap at
            for (let i = curLineCount; i--;) {
              // If we got the start of the line there's no soft break point; make hard break if overflowWrap='break-word'
              if (i === 0 && overflowWrap === 'break-word') {
                nextLine = new TextLine();
                lineXOffset = -glyphX;
                break
              }
              // Found a soft break point; move all chars since it to a new line
              else if (currentLine.glyphAt(i).glyphObj.isWhitespace) {
                nextLine = currentLine.splitAt(i + 1);
                const adjustX = nextLine.glyphAt(0).x;
                lineXOffset -= adjustX;
                for (let j = nextLine.count; j--;) {
                  nextLine.glyphAt(j).x -= adjustX;
                }
                break
              }
            }
          }
          if (nextLine) {
            currentLine.isSoftWrapped = true;
            currentLine = nextLine;
            lines.push(currentLine);
            maxLineWidth = maxWidth; //after soft wrapping use maxWidth as calculated width
          }
        }

        let fly = currentLine.glyphAt(currentLine.count);
        fly.glyphObj = glyphObj;
        fly.x = glyphX + lineXOffset;
        fly.width = glyphWidth;
        fly.charIndex = charIndex;

        // Handle hard line breaks
        if (char === '\n') {
          currentLine = new TextLine();
          lines.push(currentLine);
          lineXOffset = -(glyphX + glyphWidth + (letterSpacing * fontSize)) + textIndent;
        }
      });

      // Calculate width of each line (excluding trailing whitespace) and maximum block width
      lines.forEach(line => {
        for (let i = line.count; i--;) {
          let {glyphObj, x, width} = line.glyphAt(i);
          if (!glyphObj.isWhitespace) {
            line.width = x + width;
            if (line.width > maxLineWidth) {
              maxLineWidth = line.width;
            }
            return
          }
        }
      });

      // Find overall position adjustments for anchoring
      let anchorXOffset = 0;
      let anchorYOffset = 0;
      if (anchorX) {
        if (typeof anchorX === 'number') {
          anchorXOffset = -anchorX;
        }
        else if (typeof anchorX === 'string') {
          anchorXOffset = -maxLineWidth * (
            anchorX === 'left' ? 0 :
            anchorX === 'center' ? 0.5 :
            anchorX === 'right' ? 1 :
            parsePercent(anchorX)
          );
        }
      }
      if (anchorY) {
        if (typeof anchorY === 'number') {
          anchorYOffset = -anchorY;
        }
        else if (typeof anchorY === 'string') {
          let height = lines.length * lineHeight;
          anchorYOffset = anchorY === 'top' ? 0 :
            anchorY === 'top-baseline' ? -topBaseline :
            anchorY === 'middle' ? height / 2 :
            anchorY === 'bottom' ? height :
            anchorY === 'bottom-baseline' ? height - halfLeading + descender * fontSizeMult :
            parsePercent(anchorY) * height;
        }
      }

      if (!metricsOnly) {
        // Resolve bidi levels
        const bidiLevelsResult = bidi.getEmbeddingLevels(text, direction);

        // Process each line, applying alignment offsets, adding each glyph to the atlas, and
        // collecting all renderable glyphs into a single collection.
        glyphBounds = new Float32Array(renderableGlyphCount * 4);
        glyphAtlasIndices = new Float32Array(renderableGlyphCount);
        visibleBounds = [INF, INF, -INF, -INF];
        chunkedBounds = [];
        let lineYOffset = topBaseline;
        if (includeCaretPositions) {
          caretPositions = new Float32Array(text.length * 3);
        }
        if (colorRanges) {
          glyphColors = new Uint8Array(renderableGlyphCount * 3);
        }
        let renderableGlyphIndex = 0;
        let prevCharIndex = -1;
        let colorCharIndex = -1;
        let chunk;
        let currentColor;
        lines.forEach((line, lineIndex) => {
          let {count:lineGlyphCount, width:lineWidth} = line;

          // Ignore empty lines
          if (lineGlyphCount > 0) {
            // Count trailing whitespaces, we want to ignore these for certain things
            let trailingWhitespaceCount = 0;
            for (let i = lineGlyphCount; i-- && line.glyphAt(i).glyphObj.isWhitespace;) {
              trailingWhitespaceCount++;
            }

            // Apply horizontal alignment adjustments
            let lineXOffset = 0;
            let justifyAdjust = 0;
            if (textAlign === 'center') {
              lineXOffset = (maxLineWidth - lineWidth) / 2;
            } else if (textAlign === 'right') {
              lineXOffset = maxLineWidth - lineWidth;
            } else if (textAlign === 'justify' && line.isSoftWrapped) {
              // count non-trailing whitespace characters, and we'll adjust the offsets per character in the next loop
              let whitespaceCount = 0;
              for (let i = lineGlyphCount - trailingWhitespaceCount; i--;) {
                if (line.glyphAt(i).glyphObj.isWhitespace) {
                  whitespaceCount++;
                }
              }
              justifyAdjust = (maxLineWidth - lineWidth) / whitespaceCount;
            }
            if (justifyAdjust || lineXOffset) {
              let justifyOffset = 0;
              for (let i = 0; i < lineGlyphCount; i++) {
                let glyphInfo = line.glyphAt(i);
                const glyphObj = glyphInfo.glyphObj;
                glyphInfo.x += lineXOffset + justifyOffset;
                // Expand non-trailing whitespaces for justify alignment
                if (justifyAdjust !== 0 && glyphObj.isWhitespace && i < lineGlyphCount - trailingWhitespaceCount) {
                  justifyOffset += justifyAdjust;
                  glyphInfo.width += justifyAdjust;
                }
              }
            }

            // Perform bidi range flipping
            const flips = bidi.getReorderSegments(
              text, bidiLevelsResult, line.glyphAt(0).charIndex, line.glyphAt(line.count - 1).charIndex
            );
            for (let fi = 0; fi < flips.length; fi++) {
              const [start, end] = flips[fi];
              // Map start/end string indices to indices in the line
              let left = Infinity, right = -Infinity;
              for (let i = 0; i < lineGlyphCount; i++) {
                if (line.glyphAt(i).charIndex >= start) { // gte to handle removed characters
                  let startInLine = i, endInLine = i;
                  for (; endInLine < lineGlyphCount; endInLine++) {
                    let info = line.glyphAt(endInLine);
                    if (info.charIndex > end) {
                      break
                    }
                    if (endInLine < lineGlyphCount - trailingWhitespaceCount) { //don't include trailing ws in flip width
                      left = Math.min(left, info.x);
                      right = Math.max(right, info.x + info.width);
                    }
                  }
                  for (let j = startInLine; j < endInLine; j++) {
                    const glyphInfo = line.glyphAt(j);
                    glyphInfo.x = right - (glyphInfo.x + glyphInfo.width - left);
                  }
                  break
                }
              }
            }

            // Assemble final data arrays
            let glyphObj;
            const setGlyphObj = g => glyphObj = g;
            for (let i = 0; i < lineGlyphCount; i++) {
              let glyphInfo = line.glyphAt(i);
              glyphObj = glyphInfo.glyphObj;

              // Replace mirrored characters in rtl
              const rtl = bidiLevelsResult.levels[glyphInfo.charIndex] & 1; //odd level means rtl
              if (rtl) {
                const mirrored = bidi.getMirroredCharacter(text[glyphInfo.charIndex]);
                if (mirrored) {
                  fontObj.forEachGlyph(mirrored, 0, 0, setGlyphObj);
                }
              }

              // Add caret positions
              if (includeCaretPositions) {
                const {charIndex} = glyphInfo;
                const caretLeft = glyphInfo.x + anchorXOffset;
                const caretRight = glyphInfo.x + glyphInfo.width + anchorXOffset;
                caretPositions[charIndex * 3] = rtl ? caretRight : caretLeft; //start edge x
                caretPositions[charIndex * 3 + 1] = rtl ? caretLeft : caretRight; //end edge x
                caretPositions[charIndex * 3 + 2] = lineYOffset + caretBottomOffset + anchorYOffset; //common bottom y

                // If we skipped any chars from the previous glyph (due to ligature subs), copy the
                // previous glyph's info to those missing char indices. In the future we may try to
                // use the font's LigatureCaretList table to get interior caret positions.
                while (charIndex - prevCharIndex > 1) {
                  caretPositions[(prevCharIndex + 1) * 3] = caretPositions[prevCharIndex * 3];
                  caretPositions[(prevCharIndex + 1) * 3 + 1] = caretPositions[prevCharIndex * 3 + 1];
                  caretPositions[(prevCharIndex + 1) * 3 + 2] = caretPositions[prevCharIndex * 3 + 2];
                  prevCharIndex++;
                }
                prevCharIndex = charIndex;
              }

              // Track current color range
              if (colorRanges) {
                const {charIndex} = glyphInfo;
                while(charIndex > colorCharIndex) {
                  colorCharIndex++;
                  if (colorRanges.hasOwnProperty(colorCharIndex)) {
                    currentColor = colorRanges[colorCharIndex];
                  }
                }
              }

              // Get atlas data for renderable glyphs
              if (!glyphObj.isWhitespace && !glyphObj.isEmpty) {
                const idx = renderableGlyphIndex++;

                // If we haven't seen this glyph yet, generate its SDF
                let glyphAtlasInfo = atlas.glyphs[glyphObj.index];
                if (!glyphAtlasInfo) {
                  const sdfStart = now();
                  const glyphSDFData = sdfGenerator(glyphObj, sdfGlyphSize);
                  timings.sdf[text.charAt(glyphInfo.charIndex)] = now() - sdfStart;

                  // Assign this glyph the next available atlas index
                  glyphSDFData.atlasIndex = atlas.glyphCount++;

                  // Queue it up in the response's newGlyphs list
                  if (!newGlyphs) newGlyphs = [];
                  newGlyphs.push(glyphSDFData);

                  // Store its metadata (not the texture) in our atlas info
                  glyphAtlasInfo = atlas.glyphs[glyphObj.index] = {
                    atlasIndex: glyphSDFData.atlasIndex,
                    glyphObj: glyphObj,
                    renderingBounds: glyphSDFData.renderingBounds
                  };
                }

                // Determine final glyph quad bounds and add them to the glyphBounds array
                const bounds = glyphAtlasInfo.renderingBounds;
                const startIdx = idx * 4;
                const xStart = glyphInfo.x + anchorXOffset;
                const yStart = lineYOffset + anchorYOffset;
                glyphBounds[startIdx] = xStart + bounds[0] * fontSizeMult;
                glyphBounds[startIdx + 1] = yStart + bounds[1] * fontSizeMult;
                glyphBounds[startIdx + 2] = xStart + bounds[2] * fontSizeMult;
                glyphBounds[startIdx + 3] = yStart + bounds[3] * fontSizeMult;

                // Track total visible bounds
                const visX0 = xStart + glyphObj.xMin * fontSizeMult;
                const visY0 = yStart + glyphObj.yMin * fontSizeMult;
                const visX1 = xStart + glyphObj.xMax * fontSizeMult;
                const visY1 = yStart + glyphObj.yMax * fontSizeMult;
                if (visX0 < visibleBounds[0]) visibleBounds[0] = visX0;
                if (visY0 < visibleBounds[1]) visibleBounds[1] = visY0;
                if (visX1 > visibleBounds[2]) visibleBounds[2] = visX1;
                if (visY1 > visibleBounds[3]) visibleBounds[3] = visY1;

                // Track bounding rects for each chunk of N glyphs
                if (idx % chunkedBoundsSize === 0) {
                  chunk = {start: idx, end: idx, rect: [INF, INF, -INF, -INF]};
                  chunkedBounds.push(chunk);
                }
                chunk.end++;
                const chunkRect = chunk.rect;
                if (visX0 < chunkRect[0]) chunkRect[0] = visX0;
                if (visY0 < chunkRect[1]) chunkRect[1] = visY0;
                if (visX1 > chunkRect[2]) chunkRect[2] = visX1;
                if (visY1 > chunkRect[3]) chunkRect[3] = visY1;

                // Add to atlas indices array
                glyphAtlasIndices[idx] = glyphAtlasInfo.atlasIndex;

                // Add colors
                if (colorRanges) {
                  const start = idx * 3;
                  glyphColors[start] = currentColor >> 16 & 255;
                  glyphColors[start + 1] = currentColor >> 8 & 255;
                  glyphColors[start + 2] = currentColor & 255;
                }
              }
            }
          }

          // Increment y offset for next line
          lineYOffset -= lineHeight;
        });
      }

      // Timing stats
      for (let ch in timings.sdf) {
        timings.sdfTotal += timings.sdf[ch];
      }
      timings.layout = now() - layoutStart - timings.sdfTotal;
      timings.total = now() - mainStart;

      callback({
        glyphBounds, //rendering quad bounds for each glyph [x1, y1, x2, y2]
        glyphAtlasIndices, //atlas indices for each glyph
        caretPositions, //x,y of bottom of cursor position before each char, plus one after last char
        caretHeight, //height of cursor from bottom to top
        glyphColors, //color for each glyph, if color ranges supplied
        chunkedBounds, //total rects per (n=chunkedBoundsSize) consecutive glyphs
        ascender: ascender * fontSizeMult, //font ascender
        descender: descender * fontSizeMult, //font descender
        lineHeight, //computed line height
        topBaseline, //y coordinate of the top line's baseline
        blockBounds: [ //bounds for the whole block of text, including vertical padding for lineHeight
          anchorXOffset,
          anchorYOffset - lines.length * lineHeight,
          anchorXOffset + maxLineWidth,
          anchorYOffset
        ],
        visibleBounds, //total bounds of visible text paths, may be larger or smaller than totalBounds
        newGlyphSDFs: newGlyphs, //if this request included any new SDFs for the atlas, they'll be included here
        timings
      });
    });
  }


  /**
   * For a given text string and font parameters, determine the resulting block dimensions
   * after wrapping for the given maxWidth.
   * @param args
   * @param callback
   */
  function measure(args, callback) {
    process(args, (result) => {
      const [x0, y0, x1, y1] = result.blockBounds;
      callback({
        width: x1 - x0,
        height: y1 - y0
      });
    }, {metricsOnly: true});
  }

  function parsePercent(str) {
    let match = str.match(/^([\d.]+)%$/);
    let pct = match ? parseFloat(match[1]) : NaN;
    return isNaN(pct) ? 0 : pct / 100
  }

  function now() {
    return (self.performance || Date).now()
  }

  // Array-backed structure for a single line's glyphs data
  function TextLine() {
    this.data = [];
  }
  const textLineProps = ['glyphObj', 'x', 'width', 'charIndex'];
  TextLine.prototype = {
    width: 0,
    isSoftWrapped: false,
    get count() {
      return Math.ceil(this.data.length / textLineProps.length)
    },
    glyphAt(i) {
      let fly = TextLine.flyweight;
      fly.data = this.data;
      fly.index = i;
      return fly
    },
    splitAt(i) {
      let newLine = new TextLine();
      newLine.data = this.data.splice(i * textLineProps.length);
      return newLine
    }
  };
  TextLine.flyweight = textLineProps.reduce((obj, prop, i, all) => {
    Object.defineProperty(obj, prop, {
      get() {
        return this.data[this.index * textLineProps.length + i]
      },
      set(val) {
        this.data[this.index * textLineProps.length + i] = val;
      }
    });
    return obj
  }, {data: null, index: 0});


  return {
    process,
    measure,
    loadFont
  }
}

/**
 * Index for performing fast spatial searches of a glyph's line segments.
 * @return {{addLineSegment:function, findNearestSignedDistance:function}}
 */
function createGlyphSegmentsIndex() {
  let needsSort = false;
  const segments = [];

  function sortSegments() {
    if (needsSort) {
      // sort by maxX, this will let us short-circuit some loops below
      segments.sort(function(a, b) {
        return a.maxX - b.maxX
      });
      needsSort = false;
    }
  }

  /**
   * Add a line segment to the index.
   * @param x0
   * @param y0
   * @param x1
   * @param y1
   */
  function addLineSegment(x0, y0, x1, y1) {
    const segment = {
      x0, y0, x1, y1,
      minX: Math.min(x0, x1),
      minY: Math.min(y0, y1),
      maxX: Math.max(x0, x1),
      maxY: Math.max(y0, y1)
    };
    segments.push(segment);
    needsSort = true;
  }

  /**
   * For a given x/y, search the index for the closest line segment and return
   * its signed distance. Negative = inside, positive = outside, zero = on edge
   * @param x
   * @param y
   * @returns {number}
   */
  function findNearestSignedDistance(x, y) {
    sortSegments();
    let closestDistSq = Infinity;
    let closestDist = Infinity;

    for (let i = segments.length; i--;) {
      const seg = segments[i];
      if (seg.maxX + closestDist <= x) break //sorting by maxX means no more can be closer, so we can short-circuit
      if (x + closestDist > seg.minX && y - closestDist < seg.maxY && y + closestDist > seg.minY) {
        const distSq = absSquareDistanceToLineSegment(x, y, seg.x0, seg.y0, seg.x1, seg.y1);
        if (distSq < closestDistSq) {
          closestDistSq = distSq;
          closestDist = Math.sqrt(closestDistSq);
        }
      }
    }

    // Flip to negative distance if inside the poly
    if (isPointInPoly(x, y)) {
      closestDist = -closestDist;
    }
    return closestDist
  }

  // Determine whether the given point lies inside or outside the glyph. Uses a simple
  // ray casting algorithm using a ray pointing east from the point.
  function isPointInPoly(x, y) {
    sortSegments();
    let inside = false;
    for (let i = segments.length; i--;) {
      const seg = segments[i];
      if (seg.maxX <= x) break //sorting by maxX means no more can cross, so we can short-circuit
      if (seg.minY < y && seg.maxY > y) {
        const intersects = ((seg.y0 > y) !== (seg.y1 > y)) && (x < (seg.x1 - seg.x0) * (y - seg.y0) / (seg.y1 - seg.y0) + seg.x0);
        if (intersects) {
          inside = !inside;
        }
      }
    }
    return inside
  }

  // Find the absolute distance from a point to a line segment at closest approach
  function absSquareDistanceToLineSegment(x, y, lineX0, lineY0, lineX1, lineY1) {
    const ldx = lineX1 - lineX0;
    const ldy = lineY1 - lineY0;
    const lengthSq = ldx * ldx + ldy * ldy;
    const t = lengthSq ? Math.max(0, Math.min(1, ((x - lineX0) * ldx + (y - lineY0) * ldy) / lengthSq)) : 0;
    const dx = x - (lineX0 + t * ldx);
    const dy = y - (lineY0 + t * ldy);
    return dx * dx + dy * dy
  }

  return {
    addLineSegment,
    findNearestSignedDistance
  }
}

/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/
function typrFactory(){return "undefined"==typeof window&&(self.window=self),function(r){var e={parse:function(r){var t=e._bin,a=new Uint8Array(r);if("ttcf"==t.readASCII(a,0,4)){var n=4;t.readUshort(a,n),n+=2,t.readUshort(a,n),n+=2;var o=t.readUint(a,n);n+=4;for(var s=[],i=0;i<o;i++){var h=t.readUint(a,n);n+=4,s.push(e._readFont(a,h));}return s}return [e._readFont(a,0)]},_readFont:function(r,t){var a=e._bin,n=t;a.readFixed(r,t),t+=4;var o=a.readUshort(r,t);t+=2,a.readUshort(r,t),t+=2,a.readUshort(r,t),t+=2,a.readUshort(r,t),t+=2;for(var s=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GPOS","GSUB","SVG "],i={_data:r,_offset:n},h={},f=0;f<o;f++){var d=a.readASCII(r,t,4);t+=4,a.readUint(r,t),t+=4;var u=a.readUint(r,t);t+=4;var l=a.readUint(r,t);t+=4,h[d]={offset:u,length:l};}for(f=0;f<s.length;f++){var v=s[f];h[v]&&(i[v.trim()]=e[v.trim()].parse(r,h[v].offset,h[v].length,i));}return i},_tabOffset:function(r,t,a){for(var n=e._bin,o=n.readUshort(r,a+4),s=a+12,i=0;i<o;i++){var h=n.readASCII(r,s,4);s+=4,n.readUint(r,s),s+=4;var f=n.readUint(r,s);if(s+=4,n.readUint(r,s),s+=4,h==t)return f}return 0}};e._bin={readFixed:function(r,e){return (r[e]<<8|r[e+1])+(r[e+2]<<8|r[e+3])/65540},readF2dot14:function(r,t){return e._bin.readShort(r,t)/16384},readInt:function(r,t){var a=e._bin.t.uint8;return a[0]=r[t+3],a[1]=r[t+2],a[2]=r[t+1],a[3]=r[t],e._bin.t.int32[0]},readInt8:function(r,t){return e._bin.t.uint8[0]=r[t],e._bin.t.int8[0]},readShort:function(r,t){var a=e._bin.t.uint8;return a[1]=r[t],a[0]=r[t+1],e._bin.t.int16[0]},readUshort:function(r,e){return r[e]<<8|r[e+1]},readUshorts:function(r,t,a){for(var n=[],o=0;o<a;o++)n.push(e._bin.readUshort(r,t+2*o));return n},readUint:function(r,t){var a=e._bin.t.uint8;return a[3]=r[t],a[2]=r[t+1],a[1]=r[t+2],a[0]=r[t+3],e._bin.t.uint32[0]},readUint64:function(r,t){return 4294967296*e._bin.readUint(r,t)+e._bin.readUint(r,t+4)},readASCII:function(r,e,t){for(var a="",n=0;n<t;n++)a+=String.fromCharCode(r[e+n]);return a},readUnicode:function(r,e,t){for(var a="",n=0;n<t;n++){var o=r[e++]<<8|r[e++];a+=String.fromCharCode(o);}return a},_tdec:"undefined"!=typeof window&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(r,t,a){var n=e._bin._tdec;return n&&0==t&&a==r.length?n.decode(r):e._bin.readASCII(r,t,a)},readBytes:function(r,e,t){for(var a=[],n=0;n<t;n++)a.push(r[e+n]);return a},readASCIIArray:function(r,e,t){for(var a=[],n=0;n<t;n++)a.push(String.fromCharCode(r[e+n]));return a}},e._bin.t={buff:new ArrayBuffer(8)},e._bin.t.int8=new Int8Array(e._bin.t.buff),e._bin.t.uint8=new Uint8Array(e._bin.t.buff),e._bin.t.int16=new Int16Array(e._bin.t.buff),e._bin.t.uint16=new Uint16Array(e._bin.t.buff),e._bin.t.int32=new Int32Array(e._bin.t.buff),e._bin.t.uint32=new Uint32Array(e._bin.t.buff),e._lctf={},e._lctf.parse=function(r,t,a,n,o){var s=e._bin,i={},h=t;s.readFixed(r,t),t+=4;var f=s.readUshort(r,t);t+=2;var d=s.readUshort(r,t);t+=2;var u=s.readUshort(r,t);return t+=2,i.scriptList=e._lctf.readScriptList(r,h+f),i.featureList=e._lctf.readFeatureList(r,h+d),i.lookupList=e._lctf.readLookupList(r,h+u,o),i},e._lctf.readLookupList=function(r,t,a){var n=e._bin,o=t,s=[],i=n.readUshort(r,t);t+=2;for(var h=0;h<i;h++){var f=n.readUshort(r,t);t+=2;var d=e._lctf.readLookupTable(r,o+f,a);s.push(d);}return s},e._lctf.readLookupTable=function(r,t,a){var n=e._bin,o=t,s={tabs:[]};s.ltype=n.readUshort(r,t),t+=2,s.flag=n.readUshort(r,t),t+=2;var i=n.readUshort(r,t);t+=2;for(var h=s.ltype,f=0;f<i;f++){var d=n.readUshort(r,t);t+=2;var u=a(r,h,o+d,s);s.tabs.push(u);}return s},e._lctf.numOfOnes=function(r){for(var e=0,t=0;t<32;t++)0!=(r>>>t&1)&&e++;return e},e._lctf.readClassDef=function(r,t){var a=e._bin,n=[],o=a.readUshort(r,t);if(t+=2,1==o){var s=a.readUshort(r,t);t+=2;var i=a.readUshort(r,t);t+=2;for(var h=0;h<i;h++)n.push(s+h),n.push(s+h),n.push(a.readUshort(r,t)),t+=2;}if(2==o){var f=a.readUshort(r,t);t+=2;for(h=0;h<f;h++)n.push(a.readUshort(r,t)),t+=2,n.push(a.readUshort(r,t)),t+=2,n.push(a.readUshort(r,t)),t+=2;}return n},e._lctf.getInterval=function(r,e){for(var t=0;t<r.length;t+=3){var a=r[t],n=r[t+1];if(r[t+2],a<=e&&e<=n)return t}return -1},e._lctf.readCoverage=function(r,t){var a=e._bin,n={};n.fmt=a.readUshort(r,t),t+=2;var o=a.readUshort(r,t);return t+=2,1==n.fmt&&(n.tab=a.readUshorts(r,t,o)),2==n.fmt&&(n.tab=a.readUshorts(r,t,3*o)),n},e._lctf.coverageIndex=function(r,t){var a=r.tab;if(1==r.fmt)return a.indexOf(t);if(2==r.fmt){var n=e._lctf.getInterval(a,t);if(-1!=n)return a[n+2]+(t-a[n])}return -1},e._lctf.readFeatureList=function(r,t){var a=e._bin,n=t,o=[],s=a.readUshort(r,t);t+=2;for(var i=0;i<s;i++){var h=a.readASCII(r,t,4);t+=4;var f=a.readUshort(r,t);t+=2;var d=e._lctf.readFeatureTable(r,n+f);d.tag=h.trim(),o.push(d);}return o},e._lctf.readFeatureTable=function(r,t){var a=e._bin,n=t,o={},s=a.readUshort(r,t);t+=2,s>0&&(o.featureParams=n+s);var i=a.readUshort(r,t);t+=2,o.tab=[];for(var h=0;h<i;h++)o.tab.push(a.readUshort(r,t+2*h));return o},e._lctf.readScriptList=function(r,t){var a=e._bin,n=t,o={},s=a.readUshort(r,t);t+=2;for(var i=0;i<s;i++){var h=a.readASCII(r,t,4);t+=4;var f=a.readUshort(r,t);t+=2,o[h.trim()]=e._lctf.readScriptTable(r,n+f);}return o},e._lctf.readScriptTable=function(r,t){var a=e._bin,n=t,o={},s=a.readUshort(r,t);t+=2,o.default=e._lctf.readLangSysTable(r,n+s);var i=a.readUshort(r,t);t+=2;for(var h=0;h<i;h++){var f=a.readASCII(r,t,4);t+=4;var d=a.readUshort(r,t);t+=2,o[f.trim()]=e._lctf.readLangSysTable(r,n+d);}return o},e._lctf.readLangSysTable=function(r,t){var a=e._bin,n={};a.readUshort(r,t),t+=2,n.reqFeature=a.readUshort(r,t),t+=2;var o=a.readUshort(r,t);return t+=2,n.features=a.readUshorts(r,t,o),n},e.CFF={},e.CFF.parse=function(r,t,a){var n=e._bin;(r=new Uint8Array(r.buffer,t,a))[t=0],r[++t],r[++t],r[++t],t++;var o=[];t=e.CFF.readIndex(r,t,o);for(var s=[],i=0;i<o.length-1;i++)s.push(n.readASCII(r,t+o[i],o[i+1]-o[i]));t+=o[o.length-1];var h=[];t=e.CFF.readIndex(r,t,h);var f=[];for(i=0;i<h.length-1;i++)f.push(e.CFF.readDict(r,t+h[i],t+h[i+1]));t+=h[h.length-1];var d=f[0],u=[];t=e.CFF.readIndex(r,t,u);var l=[];for(i=0;i<u.length-1;i++)l.push(n.readASCII(r,t+u[i],u[i+1]-u[i]));if(t+=u[u.length-1],e.CFF.readSubrs(r,t,d),d.CharStrings){t=d.CharStrings;u=[];t=e.CFF.readIndex(r,t,u);var v=[];for(i=0;i<u.length-1;i++)v.push(n.readBytes(r,t+u[i],u[i+1]-u[i]));d.CharStrings=v;}if(d.ROS){t=d.FDArray;var c=[];t=e.CFF.readIndex(r,t,c),d.FDArray=[];for(i=0;i<c.length-1;i++){var p=e.CFF.readDict(r,t+c[i],t+c[i+1]);e.CFF._readFDict(r,p,l),d.FDArray.push(p);}t+=c[c.length-1],t=d.FDSelect,d.FDSelect=[];var U=r[t];if(t++,3!=U)throw U;var g=n.readUshort(r,t);t+=2;for(i=0;i<g+1;i++)d.FDSelect.push(n.readUshort(r,t),r[t+2]),t+=3;}return d.Encoding&&(d.Encoding=e.CFF.readEncoding(r,d.Encoding,d.CharStrings.length)),d.charset&&(d.charset=e.CFF.readCharset(r,d.charset,d.CharStrings.length)),e.CFF._readFDict(r,d,l),d},e.CFF._readFDict=function(r,t,a){var n;for(var o in t.Private&&(n=t.Private[1],t.Private=e.CFF.readDict(r,n,n+t.Private[0]),t.Private.Subrs&&e.CFF.readSubrs(r,n+t.Private.Subrs,t.Private)),t)-1!=["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)&&(t[o]=a[t[o]-426+35]);},e.CFF.readSubrs=function(r,t,a){var n=e._bin,o=[];t=e.CFF.readIndex(r,t,o);var s,i=o.length;s=i<1240?107:i<33900?1131:32768,a.Bias=s,a.Subrs=[];for(var h=0;h<o.length-1;h++)a.Subrs.push(n.readBytes(r,t+o[h],o[h+1]-o[h]));},e.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],e.CFF.glyphByUnicode=function(r,e){for(var t=0;t<r.charset.length;t++)if(r.charset[t]==e)return t;return -1},e.CFF.glyphBySE=function(r,t){return t<0||t>255?-1:e.CFF.glyphByUnicode(r,e.CFF.tableSE[t])},e.CFF.readEncoding=function(r,t,a){e._bin;var n=[".notdef"],o=r[t];if(t++,0!=o)throw "error: unknown encoding format: "+o;var s=r[t];t++;for(var i=0;i<s;i++)n.push(r[t+i]);return n},e.CFF.readCharset=function(r,t,a){var n=e._bin,o=[".notdef"],s=r[t];if(t++,0==s)for(var i=0;i<a;i++){var h=n.readUshort(r,t);t+=2,o.push(h);}else {if(1!=s&&2!=s)throw "error: format: "+s;for(;o.length<a;){h=n.readUshort(r,t);t+=2;var f=0;1==s?(f=r[t],t++):(f=n.readUshort(r,t),t+=2);for(i=0;i<=f;i++)o.push(h),h++;}}return o},e.CFF.readIndex=function(r,t,a){var n=e._bin,o=n.readUshort(r,t)+1,s=r[t+=2];if(t++,1==s)for(var i=0;i<o;i++)a.push(r[t+i]);else if(2==s)for(i=0;i<o;i++)a.push(n.readUshort(r,t+2*i));else if(3==s)for(i=0;i<o;i++)a.push(16777215&n.readUint(r,t+3*i-1));else if(1!=o)throw "unsupported offset size: "+s+", count: "+o;return (t+=o*s)-1},e.CFF.getCharString=function(r,t,a){var n=e._bin,o=r[t],s=r[t+1];r[t+2],r[t+3],r[t+4];var i=1,h=null,f=null;o<=20&&(h=o,i=1),12==o&&(h=100*o+s,i=2),21<=o&&o<=27&&(h=o,i=1),28==o&&(f=n.readShort(r,t+1),i=3),29<=o&&o<=31&&(h=o,i=1),32<=o&&o<=246&&(f=o-139,i=1),247<=o&&o<=250&&(f=256*(o-247)+s+108,i=2),251<=o&&o<=254&&(f=256*-(o-251)-s-108,i=2),255==o&&(f=n.readInt(r,t+1)/65535,i=5),a.val=null!=f?f:"o"+h,a.size=i;},e.CFF.readCharString=function(r,t,a){for(var n=t+a,o=e._bin,s=[];t<n;){var i=r[t],h=r[t+1];r[t+2],r[t+3],r[t+4];var f=1,d=null,u=null;i<=20&&(d=i,f=1),12==i&&(d=100*i+h,f=2),19!=i&&20!=i||(d=i,f=2),21<=i&&i<=27&&(d=i,f=1),28==i&&(u=o.readShort(r,t+1),f=3),29<=i&&i<=31&&(d=i,f=1),32<=i&&i<=246&&(u=i-139,f=1),247<=i&&i<=250&&(u=256*(i-247)+h+108,f=2),251<=i&&i<=254&&(u=256*-(i-251)-h-108,f=2),255==i&&(u=o.readInt(r,t+1)/65535,f=5),s.push(null!=u?u:"o"+d),t+=f;}return s},e.CFF.readDict=function(r,t,a){for(var n=e._bin,o={},s=[];t<a;){var i=r[t],h=r[t+1];r[t+2],r[t+3],r[t+4];var f=1,d=null,u=null;if(28==i&&(u=n.readShort(r,t+1),f=3),29==i&&(u=n.readInt(r,t+1),f=5),32<=i&&i<=246&&(u=i-139,f=1),247<=i&&i<=250&&(u=256*(i-247)+h+108,f=2),251<=i&&i<=254&&(u=256*-(i-251)-h-108,f=2),255==i)throw u=n.readInt(r,t+1)/65535,f=5,"unknown number";if(30==i){var l=[];for(f=1;;){var v=r[t+f];f++;var c=v>>4,p=15&v;if(15!=c&&l.push(c),15!=p&&l.push(p),15==p)break}for(var U="",g=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],S=0;S<l.length;S++)U+=g[l[S]];u=parseFloat(U);}if(i<=21)if(d=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][i],f=1,12==i)d=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][h],f=2;null!=d?(o[d]=1==s.length?s[0]:s,s=[]):s.push(u),t+=f;}return o},e.cmap={},e.cmap.parse=function(r,t,a){r=new Uint8Array(r.buffer,t,a),t=0;var n=e._bin,o={};n.readUshort(r,t),t+=2;var s=n.readUshort(r,t);t+=2;var i=[];o.tables=[];for(var h=0;h<s;h++){var f=n.readUshort(r,t);t+=2;var d=n.readUshort(r,t);t+=2;var u=n.readUint(r,t);t+=4;var l="p"+f+"e"+d,v=i.indexOf(u);if(-1==v){var c;v=o.tables.length,i.push(u);var p=n.readUshort(r,u);0==p?c=e.cmap.parse0(r,u):4==p?c=e.cmap.parse4(r,u):6==p?c=e.cmap.parse6(r,u):12==p?c=e.cmap.parse12(r,u):console.debug("unknown format: "+p,f,d,u),o.tables.push(c);}if(null!=o[l])throw "multiple tables for one platform+encoding";o[l]=v;}return o},e.cmap.parse0=function(r,t){var a=e._bin,n={};n.format=a.readUshort(r,t),t+=2;var o=a.readUshort(r,t);t+=2,a.readUshort(r,t),t+=2,n.map=[];for(var s=0;s<o-6;s++)n.map.push(r[t+s]);return n},e.cmap.parse4=function(r,t){var a=e._bin,n=t,o={};o.format=a.readUshort(r,t),t+=2;var s=a.readUshort(r,t);t+=2,a.readUshort(r,t),t+=2;var i=a.readUshort(r,t);t+=2;var h=i/2;o.searchRange=a.readUshort(r,t),t+=2,o.entrySelector=a.readUshort(r,t),t+=2,o.rangeShift=a.readUshort(r,t),t+=2,o.endCount=a.readUshorts(r,t,h),t+=2*h,t+=2,o.startCount=a.readUshorts(r,t,h),t+=2*h,o.idDelta=[];for(var f=0;f<h;f++)o.idDelta.push(a.readShort(r,t)),t+=2;for(o.idRangeOffset=a.readUshorts(r,t,h),t+=2*h,o.glyphIdArray=[];t<n+s;)o.glyphIdArray.push(a.readUshort(r,t)),t+=2;return o},e.cmap.parse6=function(r,t){var a=e._bin,n={};n.format=a.readUshort(r,t),t+=2,a.readUshort(r,t),t+=2,a.readUshort(r,t),t+=2,n.firstCode=a.readUshort(r,t),t+=2;var o=a.readUshort(r,t);t+=2,n.glyphIdArray=[];for(var s=0;s<o;s++)n.glyphIdArray.push(a.readUshort(r,t)),t+=2;return n},e.cmap.parse12=function(r,t){var a=e._bin,n={};n.format=a.readUshort(r,t),t+=2,t+=2,a.readUint(r,t),t+=4,a.readUint(r,t),t+=4;var o=a.readUint(r,t);t+=4,n.groups=[];for(var s=0;s<o;s++){var i=t+12*s,h=a.readUint(r,i+0),f=a.readUint(r,i+4),d=a.readUint(r,i+8);n.groups.push([h,f,d]);}return n},e.glyf={},e.glyf.parse=function(r,e,t,a){for(var n=[],o=0;o<a.maxp.numGlyphs;o++)n.push(null);return n},e.glyf._parseGlyf=function(r,t){var a=e._bin,n=r._data,o=e._tabOffset(n,"glyf",r._offset)+r.loca[t];if(r.loca[t]==r.loca[t+1])return null;var s={};if(s.noc=a.readShort(n,o),o+=2,s.xMin=a.readShort(n,o),o+=2,s.yMin=a.readShort(n,o),o+=2,s.xMax=a.readShort(n,o),o+=2,s.yMax=a.readShort(n,o),o+=2,s.xMin>=s.xMax||s.yMin>=s.yMax)return null;if(s.noc>0){s.endPts=[];for(var i=0;i<s.noc;i++)s.endPts.push(a.readUshort(n,o)),o+=2;var h=a.readUshort(n,o);if(o+=2,n.length-o<h)return null;s.instructions=a.readBytes(n,o,h),o+=h;var f=s.endPts[s.noc-1]+1;s.flags=[];for(i=0;i<f;i++){var d=n[o];if(o++,s.flags.push(d),0!=(8&d)){var u=n[o];o++;for(var l=0;l<u;l++)s.flags.push(d),i++;}}s.xs=[];for(i=0;i<f;i++){var v=0!=(2&s.flags[i]),c=0!=(16&s.flags[i]);v?(s.xs.push(c?n[o]:-n[o]),o++):c?s.xs.push(0):(s.xs.push(a.readShort(n,o)),o+=2);}s.ys=[];for(i=0;i<f;i++){v=0!=(4&s.flags[i]),c=0!=(32&s.flags[i]);v?(s.ys.push(c?n[o]:-n[o]),o++):c?s.ys.push(0):(s.ys.push(a.readShort(n,o)),o+=2);}var p=0,U=0;for(i=0;i<f;i++)p+=s.xs[i],U+=s.ys[i],s.xs[i]=p,s.ys[i]=U;}else {var g;s.parts=[];do{g=a.readUshort(n,o),o+=2;var S={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(s.parts.push(S),S.glyphIndex=a.readUshort(n,o),o+=2,1&g){var m=a.readShort(n,o);o+=2;var b=a.readShort(n,o);o+=2;}else {m=a.readInt8(n,o);o++;b=a.readInt8(n,o);o++;}2&g?(S.m.tx=m,S.m.ty=b):(S.p1=m,S.p2=b),8&g?(S.m.a=S.m.d=a.readF2dot14(n,o),o+=2):64&g?(S.m.a=a.readF2dot14(n,o),o+=2,S.m.d=a.readF2dot14(n,o),o+=2):128&g&&(S.m.a=a.readF2dot14(n,o),o+=2,S.m.b=a.readF2dot14(n,o),o+=2,S.m.c=a.readF2dot14(n,o),o+=2,S.m.d=a.readF2dot14(n,o),o+=2);}while(32&g);if(256&g){var y=a.readUshort(n,o);o+=2,s.instr=[];for(i=0;i<y;i++)s.instr.push(n[o]),o++;}}return s},e.GPOS={},e.GPOS.parse=function(r,t,a,n){return e._lctf.parse(r,t,a,n,e.GPOS.subt)},e.GPOS.subt=function(r,t,a,n){var o=e._bin,s=a,i={};if(i.fmt=o.readUshort(r,a),a+=2,1==t||2==t||3==t||7==t||8==t&&i.fmt<=2){var h=o.readUshort(r,a);a+=2,i.coverage=e._lctf.readCoverage(r,h+s);}if(1==t&&1==i.fmt){var f=o.readUshort(r,a);a+=2;var d=e._lctf.numOfOnes(f);0!=f&&(i.pos=e.GPOS.readValueRecord(r,a,f));}else if(2==t&&i.fmt>=1&&i.fmt<=2){f=o.readUshort(r,a);a+=2;var u=o.readUshort(r,a);a+=2;d=e._lctf.numOfOnes(f);var l=e._lctf.numOfOnes(u);if(1==i.fmt){i.pairsets=[];var v=o.readUshort(r,a);a+=2;for(var c=0;c<v;c++){var p=s+o.readUshort(r,a);a+=2;var U=o.readUshort(r,p);p+=2;for(var g=[],S=0;S<U;S++){var m=o.readUshort(r,p);p+=2,0!=f&&(x=e.GPOS.readValueRecord(r,p,f),p+=2*d),0!=u&&(P=e.GPOS.readValueRecord(r,p,u),p+=2*l),g.push({gid2:m,val1:x,val2:P});}i.pairsets.push(g);}}if(2==i.fmt){var b=o.readUshort(r,a);a+=2;var y=o.readUshort(r,a);a+=2;var F=o.readUshort(r,a);a+=2;var _=o.readUshort(r,a);a+=2,i.classDef1=e._lctf.readClassDef(r,s+b),i.classDef2=e._lctf.readClassDef(r,s+y),i.matrix=[];for(c=0;c<F;c++){var C=[];for(S=0;S<_;S++){var x=null,P=null;0!=f&&(x=e.GPOS.readValueRecord(r,a,f),a+=2*d),0!=u&&(P=e.GPOS.readValueRecord(r,a,u),a+=2*l),C.push({val1:x,val2:P});}i.matrix.push(C);}}}else {if(9==t&&1==i.fmt){var I=o.readUshort(r,a);a+=2;var w=o.readUint(r,a);if(a+=4,9==n.ltype)n.ltype=I;else if(n.ltype!=I)throw "invalid extension substitution";return e.GPOS.subt(r,n.ltype,s+w)}console.debug("unsupported GPOS table LookupType",t,"format",i.fmt);}return i},e.GPOS.readValueRecord=function(r,t,a){var n=e._bin,o=[];return o.push(1&a?n.readShort(r,t):0),t+=1&a?2:0,o.push(2&a?n.readShort(r,t):0),t+=2&a?2:0,o.push(4&a?n.readShort(r,t):0),t+=4&a?2:0,o.push(8&a?n.readShort(r,t):0),t+=8&a?2:0,o},e.GSUB={},e.GSUB.parse=function(r,t,a,n){return e._lctf.parse(r,t,a,n,e.GSUB.subt)},e.GSUB.subt=function(r,t,a,n){var o=e._bin,s=a,i={};if(i.fmt=o.readUshort(r,a),a+=2,1!=t&&4!=t&&5!=t&&6!=t)return null;if(1==t||4==t||5==t&&i.fmt<=2||6==t&&i.fmt<=2){var h=o.readUshort(r,a);a+=2,i.coverage=e._lctf.readCoverage(r,s+h);}if(1==t&&i.fmt>=1&&i.fmt<=2){if(1==i.fmt)i.delta=o.readShort(r,a),a+=2;else if(2==i.fmt){var f=o.readUshort(r,a);a+=2,i.newg=o.readUshorts(r,a,f),a+=2*i.newg.length;}}else if(4==t){i.vals=[];f=o.readUshort(r,a);a+=2;for(var d=0;d<f;d++){var u=o.readUshort(r,a);a+=2,i.vals.push(e.GSUB.readLigatureSet(r,s+u));}}else if(5==t&&2==i.fmt){if(2==i.fmt){var l=o.readUshort(r,a);a+=2,i.cDef=e._lctf.readClassDef(r,s+l),i.scset=[];var v=o.readUshort(r,a);a+=2;for(d=0;d<v;d++){var c=o.readUshort(r,a);a+=2,i.scset.push(0==c?null:e.GSUB.readSubClassSet(r,s+c));}}}else if(6==t&&3==i.fmt){if(3==i.fmt){for(d=0;d<3;d++){f=o.readUshort(r,a);a+=2;for(var p=[],U=0;U<f;U++)p.push(e._lctf.readCoverage(r,s+o.readUshort(r,a+2*U)));a+=2*f,0==d&&(i.backCvg=p),1==d&&(i.inptCvg=p),2==d&&(i.ahedCvg=p);}f=o.readUshort(r,a);a+=2,i.lookupRec=e.GSUB.readSubstLookupRecords(r,a,f);}}else {if(7==t&&1==i.fmt){var g=o.readUshort(r,a);a+=2;var S=o.readUint(r,a);if(a+=4,9==n.ltype)n.ltype=g;else if(n.ltype!=g)throw "invalid extension substitution";return e.GSUB.subt(r,n.ltype,s+S)}console.debug("unsupported GSUB table LookupType",t,"format",i.fmt);}return i},e.GSUB.readSubClassSet=function(r,t){var a=e._bin.readUshort,n=t,o=[],s=a(r,t);t+=2;for(var i=0;i<s;i++){var h=a(r,t);t+=2,o.push(e.GSUB.readSubClassRule(r,n+h));}return o},e.GSUB.readSubClassRule=function(r,t){var a=e._bin.readUshort,n={},o=a(r,t),s=a(r,t+=2);t+=2,n.input=[];for(var i=0;i<o-1;i++)n.input.push(a(r,t)),t+=2;return n.substLookupRecords=e.GSUB.readSubstLookupRecords(r,t,s),n},e.GSUB.readSubstLookupRecords=function(r,t,a){for(var n=e._bin.readUshort,o=[],s=0;s<a;s++)o.push(n(r,t),n(r,t+2)),t+=4;return o},e.GSUB.readChainSubClassSet=function(r,t){var a=e._bin,n=t,o=[],s=a.readUshort(r,t);t+=2;for(var i=0;i<s;i++){var h=a.readUshort(r,t);t+=2,o.push(e.GSUB.readChainSubClassRule(r,n+h));}return o},e.GSUB.readChainSubClassRule=function(r,t){for(var a=e._bin,n={},o=["backtrack","input","lookahead"],s=0;s<o.length;s++){var i=a.readUshort(r,t);t+=2,1==s&&i--,n[o[s]]=a.readUshorts(r,t,i),t+=2*n[o[s]].length;}i=a.readUshort(r,t);return t+=2,n.subst=a.readUshorts(r,t,2*i),t+=2*n.subst.length,n},e.GSUB.readLigatureSet=function(r,t){var a=e._bin,n=t,o=[],s=a.readUshort(r,t);t+=2;for(var i=0;i<s;i++){var h=a.readUshort(r,t);t+=2,o.push(e.GSUB.readLigature(r,n+h));}return o},e.GSUB.readLigature=function(r,t){var a=e._bin,n={chain:[]};n.nglyph=a.readUshort(r,t),t+=2;var o=a.readUshort(r,t);t+=2;for(var s=0;s<o-1;s++)n.chain.push(a.readUshort(r,t)),t+=2;return n},e.head={},e.head.parse=function(r,t,a){var n=e._bin,o={};return n.readFixed(r,t),t+=4,o.fontRevision=n.readFixed(r,t),t+=4,n.readUint(r,t),t+=4,n.readUint(r,t),t+=4,o.flags=n.readUshort(r,t),t+=2,o.unitsPerEm=n.readUshort(r,t),t+=2,o.created=n.readUint64(r,t),t+=8,o.modified=n.readUint64(r,t),t+=8,o.xMin=n.readShort(r,t),t+=2,o.yMin=n.readShort(r,t),t+=2,o.xMax=n.readShort(r,t),t+=2,o.yMax=n.readShort(r,t),t+=2,o.macStyle=n.readUshort(r,t),t+=2,o.lowestRecPPEM=n.readUshort(r,t),t+=2,o.fontDirectionHint=n.readShort(r,t),t+=2,o.indexToLocFormat=n.readShort(r,t),t+=2,o.glyphDataFormat=n.readShort(r,t),t+=2,o},e.hhea={},e.hhea.parse=function(r,t,a){var n=e._bin,o={};return n.readFixed(r,t),t+=4,o.ascender=n.readShort(r,t),t+=2,o.descender=n.readShort(r,t),t+=2,o.lineGap=n.readShort(r,t),t+=2,o.advanceWidthMax=n.readUshort(r,t),t+=2,o.minLeftSideBearing=n.readShort(r,t),t+=2,o.minRightSideBearing=n.readShort(r,t),t+=2,o.xMaxExtent=n.readShort(r,t),t+=2,o.caretSlopeRise=n.readShort(r,t),t+=2,o.caretSlopeRun=n.readShort(r,t),t+=2,o.caretOffset=n.readShort(r,t),t+=2,t+=8,o.metricDataFormat=n.readShort(r,t),t+=2,o.numberOfHMetrics=n.readUshort(r,t),t+=2,o},e.hmtx={},e.hmtx.parse=function(r,t,a,n){for(var o=e._bin,s={aWidth:[],lsBearing:[]},i=0,h=0,f=0;f<n.maxp.numGlyphs;f++)f<n.hhea.numberOfHMetrics&&(i=o.readUshort(r,t),t+=2,h=o.readShort(r,t),t+=2),s.aWidth.push(i),s.lsBearing.push(h);return s},e.kern={},e.kern.parse=function(r,t,a,n){var o=e._bin,s=o.readUshort(r,t);if(t+=2,1==s)return e.kern.parseV1(r,t-2,a,n);var i=o.readUshort(r,t);t+=2;for(var h={glyph1:[],rval:[]},f=0;f<i;f++){t+=2;a=o.readUshort(r,t);t+=2;var d=o.readUshort(r,t);t+=2;var u=d>>>8;if(0!=(u&=15))throw "unknown kern table format: "+u;t=e.kern.readFormat0(r,t,h);}return h},e.kern.parseV1=function(r,t,a,n){var o=e._bin;o.readFixed(r,t),t+=4;var s=o.readUint(r,t);t+=4;for(var i={glyph1:[],rval:[]},h=0;h<s;h++){o.readUint(r,t),t+=4;var f=o.readUshort(r,t);t+=2,o.readUshort(r,t),t+=2;var d=f>>>8;if(0!=(d&=15))throw "unknown kern table format: "+d;t=e.kern.readFormat0(r,t,i);}return i},e.kern.readFormat0=function(r,t,a){var n=e._bin,o=-1,s=n.readUshort(r,t);t+=2,n.readUshort(r,t),t+=2,n.readUshort(r,t),t+=2,n.readUshort(r,t),t+=2;for(var i=0;i<s;i++){var h=n.readUshort(r,t);t+=2;var f=n.readUshort(r,t);t+=2;var d=n.readShort(r,t);t+=2,h!=o&&(a.glyph1.push(h),a.rval.push({glyph2:[],vals:[]}));var u=a.rval[a.rval.length-1];u.glyph2.push(f),u.vals.push(d),o=h;}return t},e.loca={},e.loca.parse=function(r,t,a,n){var o=e._bin,s=[],i=n.head.indexToLocFormat,h=n.maxp.numGlyphs+1;if(0==i)for(var f=0;f<h;f++)s.push(o.readUshort(r,t+(f<<1))<<1);if(1==i)for(f=0;f<h;f++)s.push(o.readUint(r,t+(f<<2)));return s},e.maxp={},e.maxp.parse=function(r,t,a){var n=e._bin,o={},s=n.readUint(r,t);return t+=4,o.numGlyphs=n.readUshort(r,t),t+=2,65536==s&&(o.maxPoints=n.readUshort(r,t),t+=2,o.maxContours=n.readUshort(r,t),t+=2,o.maxCompositePoints=n.readUshort(r,t),t+=2,o.maxCompositeContours=n.readUshort(r,t),t+=2,o.maxZones=n.readUshort(r,t),t+=2,o.maxTwilightPoints=n.readUshort(r,t),t+=2,o.maxStorage=n.readUshort(r,t),t+=2,o.maxFunctionDefs=n.readUshort(r,t),t+=2,o.maxInstructionDefs=n.readUshort(r,t),t+=2,o.maxStackElements=n.readUshort(r,t),t+=2,o.maxSizeOfInstructions=n.readUshort(r,t),t+=2,o.maxComponentElements=n.readUshort(r,t),t+=2,o.maxComponentDepth=n.readUshort(r,t),t+=2),o},e.name={},e.name.parse=function(r,t,a){var n=e._bin,o={};n.readUshort(r,t),t+=2;var s=n.readUshort(r,t);t+=2,n.readUshort(r,t);for(var i,h=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],f=t+=2,d=0;d<s;d++){var u=n.readUshort(r,t);t+=2;var l=n.readUshort(r,t);t+=2;var v=n.readUshort(r,t);t+=2;var c=n.readUshort(r,t);t+=2;var p=n.readUshort(r,t);t+=2;var U=n.readUshort(r,t);t+=2;var g,S=h[c],m=f+12*s+U;if(0==u)g=n.readUnicode(r,m,p/2);else if(3==u&&0==l)g=n.readUnicode(r,m,p/2);else if(0==l)g=n.readASCII(r,m,p);else if(1==l)g=n.readUnicode(r,m,p/2);else if(3==l)g=n.readUnicode(r,m,p/2);else {if(1!=u)throw "unknown encoding "+l+", platformID: "+u;g=n.readASCII(r,m,p),console.debug("reading unknown MAC encoding "+l+" as ASCII");}var b="p"+u+","+v.toString(16);null==o[b]&&(o[b]={}),o[b][void 0!==S?S:c]=g,o[b]._lang=v;}for(var y in o)if(null!=o[y].postScriptName&&1033==o[y]._lang)return o[y];for(var y in o)if(null!=o[y].postScriptName&&0==o[y]._lang)return o[y];for(var y in o)if(null!=o[y].postScriptName&&3084==o[y]._lang)return o[y];for(var y in o)if(null!=o[y].postScriptName)return o[y];for(var y in o){i=y;break}return console.debug("returning name table with languageID "+o[i]._lang),o[i]},e["OS/2"]={},e["OS/2"].parse=function(r,t,a){var n=e._bin.readUshort(r,t);t+=2;var o={};if(0==n)e["OS/2"].version0(r,t,o);else if(1==n)e["OS/2"].version1(r,t,o);else if(2==n||3==n||4==n)e["OS/2"].version2(r,t,o);else {if(5!=n)throw "unknown OS/2 table version: "+n;e["OS/2"].version5(r,t,o);}return o},e["OS/2"].version0=function(r,t,a){var n=e._bin;return a.xAvgCharWidth=n.readShort(r,t),t+=2,a.usWeightClass=n.readUshort(r,t),t+=2,a.usWidthClass=n.readUshort(r,t),t+=2,a.fsType=n.readUshort(r,t),t+=2,a.ySubscriptXSize=n.readShort(r,t),t+=2,a.ySubscriptYSize=n.readShort(r,t),t+=2,a.ySubscriptXOffset=n.readShort(r,t),t+=2,a.ySubscriptYOffset=n.readShort(r,t),t+=2,a.ySuperscriptXSize=n.readShort(r,t),t+=2,a.ySuperscriptYSize=n.readShort(r,t),t+=2,a.ySuperscriptXOffset=n.readShort(r,t),t+=2,a.ySuperscriptYOffset=n.readShort(r,t),t+=2,a.yStrikeoutSize=n.readShort(r,t),t+=2,a.yStrikeoutPosition=n.readShort(r,t),t+=2,a.sFamilyClass=n.readShort(r,t),t+=2,a.panose=n.readBytes(r,t,10),t+=10,a.ulUnicodeRange1=n.readUint(r,t),t+=4,a.ulUnicodeRange2=n.readUint(r,t),t+=4,a.ulUnicodeRange3=n.readUint(r,t),t+=4,a.ulUnicodeRange4=n.readUint(r,t),t+=4,a.achVendID=[n.readInt8(r,t),n.readInt8(r,t+1),n.readInt8(r,t+2),n.readInt8(r,t+3)],t+=4,a.fsSelection=n.readUshort(r,t),t+=2,a.usFirstCharIndex=n.readUshort(r,t),t+=2,a.usLastCharIndex=n.readUshort(r,t),t+=2,a.sTypoAscender=n.readShort(r,t),t+=2,a.sTypoDescender=n.readShort(r,t),t+=2,a.sTypoLineGap=n.readShort(r,t),t+=2,a.usWinAscent=n.readUshort(r,t),t+=2,a.usWinDescent=n.readUshort(r,t),t+=2},e["OS/2"].version1=function(r,t,a){var n=e._bin;return t=e["OS/2"].version0(r,t,a),a.ulCodePageRange1=n.readUint(r,t),t+=4,a.ulCodePageRange2=n.readUint(r,t),t+=4},e["OS/2"].version2=function(r,t,a){var n=e._bin;return t=e["OS/2"].version1(r,t,a),a.sxHeight=n.readShort(r,t),t+=2,a.sCapHeight=n.readShort(r,t),t+=2,a.usDefault=n.readUshort(r,t),t+=2,a.usBreak=n.readUshort(r,t),t+=2,a.usMaxContext=n.readUshort(r,t),t+=2},e["OS/2"].version5=function(r,t,a){var n=e._bin;return t=e["OS/2"].version2(r,t,a),a.usLowerOpticalPointSize=n.readUshort(r,t),t+=2,a.usUpperOpticalPointSize=n.readUshort(r,t),t+=2},e.post={},e.post.parse=function(r,t,a){var n=e._bin,o={};return o.version=n.readFixed(r,t),t+=4,o.italicAngle=n.readFixed(r,t),t+=4,o.underlinePosition=n.readShort(r,t),t+=2,o.underlineThickness=n.readShort(r,t),t+=2,o},null==e&&(e={}),null==e.U&&(e.U={}),e.U.codeToGlyph=function(r,e){var t=r.cmap,a=-1;if(null!=t.p0e4?a=t.p0e4:null!=t.p3e1?a=t.p3e1:null!=t.p1e0?a=t.p1e0:null!=t.p0e3&&(a=t.p0e3),-1==a)throw "no familiar platform and encoding!";var n=t.tables[a];if(0==n.format)return e>=n.map.length?0:n.map[e];if(4==n.format){for(var o=-1,s=0;s<n.endCount.length;s++)if(e<=n.endCount[s]){o=s;break}if(-1==o)return 0;if(n.startCount[o]>e)return 0;return 65535&(0!=n.idRangeOffset[o]?n.glyphIdArray[e-n.startCount[o]+(n.idRangeOffset[o]>>1)-(n.idRangeOffset.length-o)]:e+n.idDelta[o])}if(12==n.format){if(e>n.groups[n.groups.length-1][1])return 0;for(s=0;s<n.groups.length;s++){var i=n.groups[s];if(i[0]<=e&&e<=i[1])return i[2]+(e-i[0])}return 0}throw "unknown cmap table format "+n.format},e.U.glyphToPath=function(r,t){var a={cmds:[],crds:[]};if(r.SVG&&r.SVG.entries[t]){var n=r.SVG.entries[t];return null==n?a:("string"==typeof n&&(n=e.SVG.toPath(n),r.SVG.entries[t]=n),n)}if(r.CFF){var o={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:r.CFF.Private?r.CFF.Private.defaultWidthX:0,open:!1},s=r.CFF,i=r.CFF.Private;if(s.ROS){for(var h=0;s.FDSelect[h+2]<=t;)h+=2;i=s.FDArray[s.FDSelect[h+1]].Private;}e.U._drawCFF(r.CFF.CharStrings[t],o,s,i,a);}else r.glyf&&e.U._drawGlyf(t,r,a);return a},e.U._drawGlyf=function(r,t,a){var n=t.glyf[r];null==n&&(n=t.glyf[r]=e.glyf._parseGlyf(t,r)),null!=n&&(n.noc>-1?e.U._simpleGlyph(n,a):e.U._compoGlyph(n,t,a));},e.U._simpleGlyph=function(r,t){for(var a=0;a<r.noc;a++){for(var n=0==a?0:r.endPts[a-1]+1,o=r.endPts[a],s=n;s<=o;s++){var i=s==n?o:s-1,h=s==o?n:s+1,f=1&r.flags[s],d=1&r.flags[i],u=1&r.flags[h],l=r.xs[s],v=r.ys[s];if(s==n)if(f){if(!d){e.U.P.moveTo(t,l,v);continue}e.U.P.moveTo(t,r.xs[i],r.ys[i]);}else d?e.U.P.moveTo(t,r.xs[i],r.ys[i]):e.U.P.moveTo(t,(r.xs[i]+l)/2,(r.ys[i]+v)/2);f?d&&e.U.P.lineTo(t,l,v):u?e.U.P.qcurveTo(t,l,v,r.xs[h],r.ys[h]):e.U.P.qcurveTo(t,l,v,(l+r.xs[h])/2,(v+r.ys[h])/2);}e.U.P.closePath(t);}},e.U._compoGlyph=function(r,t,a){for(var n=0;n<r.parts.length;n++){var o={cmds:[],crds:[]},s=r.parts[n];e.U._drawGlyf(s.glyphIndex,t,o);for(var i=s.m,h=0;h<o.crds.length;h+=2){var f=o.crds[h],d=o.crds[h+1];a.crds.push(f*i.a+d*i.b+i.tx),a.crds.push(f*i.c+d*i.d+i.ty);}for(h=0;h<o.cmds.length;h++)a.cmds.push(o.cmds[h]);}},e.U._getGlyphClass=function(r,t){var a=e._lctf.getInterval(t,r);return -1==a?0:t[a+2]},e.U.getPairAdjustment=function(r,t,a){var n=0;if(r.GPOS)for(var o=r.GPOS,s=o.lookupList,i=o.featureList,h=[],f=0;f<i.length;f++){var d=i[f];if("kern"==d.tag)for(var u=0;u<d.tab.length;u++)if(!h[d.tab[u]]){h[d.tab[u]]=!0;for(var l=s[d.tab[u]],v=0;v<l.tabs.length;v++)if(null!=l.tabs[v]){var c,p=l.tabs[v];if(!p.coverage||-1!=(c=e._lctf.coverageIndex(p.coverage,t)))if(1==l.ltype);else if(2==l.ltype){var U;if(1==p.fmt){var g=p.pairsets[c];for(f=0;f<g.length;f++)g[f].gid2==a&&(U=g[f]);}else if(2==p.fmt){var S=e.U._getGlyphClass(t,p.classDef1),m=e.U._getGlyphClass(a,p.classDef2);U=p.matrix[S][m];}U&&U.val1&&U.val1[2]&&(n+=U.val1[2]),U&&U.val2&&U.val2[0]&&(n+=U.val2[0]);}}}}if(r.kern){var b=r.kern.glyph1.indexOf(t);if(-1!=b){var y=r.kern.rval[b].glyph2.indexOf(a);-1!=y&&(n+=r.kern.rval[b].vals[y]);}}return n},e.U._applySubs=function(r,t,a,n){for(var o=r.length-t-1,s=0;s<a.tabs.length;s++)if(null!=a.tabs[s]){var i,h=a.tabs[s];if(!h.coverage||-1!=(i=e._lctf.coverageIndex(h.coverage,r[t])))if(1==a.ltype)r[t],1==h.fmt?r[t]=r[t]+h.delta:r[t]=h.newg[i];else if(4==a.ltype)for(var f=h.vals[i],d=0;d<f.length;d++){var u=f[d],l=u.chain.length;if(!(l>o)){for(var v=!0,c=0,p=0;p<l;p++){for(;-1==r[t+c+(1+p)];)c++;u.chain[p]!=r[t+c+(1+p)]&&(v=!1);}if(v){r[t]=u.nglyph;for(p=0;p<l+c;p++)r[t+p+1]=-1;break}}}else if(5==a.ltype&&2==h.fmt)for(var U=e._lctf.getInterval(h.cDef,r[t]),g=h.cDef[U+2],S=h.scset[g],m=0;m<S.length;m++){var b=S[m],y=b.input;if(!(y.length>o)){for(v=!0,p=0;p<y.length;p++){var F=e._lctf.getInterval(h.cDef,r[t+1+p]);if(-1==U&&h.cDef[F+2]!=y[p]){v=!1;break}}if(v){var _=b.substLookupRecords;for(d=0;d<_.length;d+=2)_[d],_[d+1];}}}else if(6==a.ltype&&3==h.fmt){if(!e.U._glsCovered(r,h.backCvg,t-h.backCvg.length))continue;if(!e.U._glsCovered(r,h.inptCvg,t))continue;if(!e.U._glsCovered(r,h.ahedCvg,t+h.inptCvg.length))continue;var C=h.lookupRec;for(m=0;m<C.length;m+=2){U=C[m];var x=n[C[m+1]];e.U._applySubs(r,t+U,x,n);}}}},e.U._glsCovered=function(r,t,a){for(var n=0;n<t.length;n++){if(-1==e._lctf.coverageIndex(t[n],r[a+n]))return !1}return !0},e.U.glyphsToPath=function(r,t,a){for(var n={cmds:[],crds:[]},o=0,s=0;s<t.length;s++){var i=t[s];if(-1!=i){for(var h=s<t.length-1&&-1!=t[s+1]?t[s+1]:0,f=e.U.glyphToPath(r,i),d=0;d<f.crds.length;d+=2)n.crds.push(f.crds[d]+o),n.crds.push(f.crds[d+1]);a&&n.cmds.push(a);for(d=0;d<f.cmds.length;d++)n.cmds.push(f.cmds[d]);a&&n.cmds.push("X"),o+=r.hmtx.aWidth[i],s<t.length-1&&(o+=e.U.getPairAdjustment(r,i,h));}}return n},e.U.P={},e.U.P.moveTo=function(r,e,t){r.cmds.push("M"),r.crds.push(e,t);},e.U.P.lineTo=function(r,e,t){r.cmds.push("L"),r.crds.push(e,t);},e.U.P.curveTo=function(r,e,t,a,n,o,s){r.cmds.push("C"),r.crds.push(e,t,a,n,o,s);},e.U.P.qcurveTo=function(r,e,t,a,n){r.cmds.push("Q"),r.crds.push(e,t,a,n);},e.U.P.closePath=function(r){r.cmds.push("Z");},e.U._drawCFF=function(r,t,a,n,o){for(var s=t.stack,i=t.nStems,h=t.haveWidth,f=t.width,d=t.open,u=0,l=t.x,v=t.y,c=0,p=0,U=0,g=0,S=0,m=0,b=0,y=0,F=0,_=0,C={val:0,size:0};u<r.length;){e.CFF.getCharString(r,u,C);var x=C.val;if(u+=C.size,"o1"==x||"o18"==x)s.length%2!=0&&!h&&(f=s.shift()+n.nominalWidthX),i+=s.length>>1,s.length=0,h=!0;else if("o3"==x||"o23"==x){s.length%2!=0&&!h&&(f=s.shift()+n.nominalWidthX),i+=s.length>>1,s.length=0,h=!0;}else if("o4"==x)s.length>1&&!h&&(f=s.shift()+n.nominalWidthX,h=!0),d&&e.U.P.closePath(o),v+=s.pop(),e.U.P.moveTo(o,l,v),d=!0;else if("o5"==x)for(;s.length>0;)l+=s.shift(),v+=s.shift(),e.U.P.lineTo(o,l,v);else if("o6"==x||"o7"==x)for(var P=s.length,I="o6"==x,w=0;w<P;w++){var O=s.shift();I?l+=O:v+=O,I=!I,e.U.P.lineTo(o,l,v);}else if("o8"==x||"o24"==x){P=s.length;for(var T=0;T+6<=P;)c=l+s.shift(),p=v+s.shift(),U=c+s.shift(),g=p+s.shift(),l=U+s.shift(),v=g+s.shift(),e.U.P.curveTo(o,c,p,U,g,l,v),T+=6;"o24"==x&&(l+=s.shift(),v+=s.shift(),e.U.P.lineTo(o,l,v));}else {if("o11"==x)break;if("o1234"==x||"o1235"==x||"o1236"==x||"o1237"==x)"o1234"==x&&(p=v,U=(c=l+s.shift())+s.shift(),_=g=p+s.shift(),m=g,y=v,l=(b=(S=(F=U+s.shift())+s.shift())+s.shift())+s.shift(),e.U.P.curveTo(o,c,p,U,g,F,_),e.U.P.curveTo(o,S,m,b,y,l,v)),"o1235"==x&&(c=l+s.shift(),p=v+s.shift(),U=c+s.shift(),g=p+s.shift(),F=U+s.shift(),_=g+s.shift(),S=F+s.shift(),m=_+s.shift(),b=S+s.shift(),y=m+s.shift(),l=b+s.shift(),v=y+s.shift(),s.shift(),e.U.P.curveTo(o,c,p,U,g,F,_),e.U.P.curveTo(o,S,m,b,y,l,v)),"o1236"==x&&(c=l+s.shift(),p=v+s.shift(),U=c+s.shift(),_=g=p+s.shift(),m=g,b=(S=(F=U+s.shift())+s.shift())+s.shift(),y=m+s.shift(),l=b+s.shift(),e.U.P.curveTo(o,c,p,U,g,F,_),e.U.P.curveTo(o,S,m,b,y,l,v)),"o1237"==x&&(c=l+s.shift(),p=v+s.shift(),U=c+s.shift(),g=p+s.shift(),F=U+s.shift(),_=g+s.shift(),S=F+s.shift(),m=_+s.shift(),b=S+s.shift(),y=m+s.shift(),Math.abs(b-l)>Math.abs(y-v)?l=b+s.shift():v=y+s.shift(),e.U.P.curveTo(o,c,p,U,g,F,_),e.U.P.curveTo(o,S,m,b,y,l,v));else if("o14"==x){if(s.length>0&&!h&&(f=s.shift()+a.nominalWidthX,h=!0),4==s.length){var k=s.shift(),G=s.shift(),D=s.shift(),B=s.shift(),A=e.CFF.glyphBySE(a,D),R=e.CFF.glyphBySE(a,B);e.U._drawCFF(a.CharStrings[A],t,a,n,o),t.x=k,t.y=G,e.U._drawCFF(a.CharStrings[R],t,a,n,o);}d&&(e.U.P.closePath(o),d=!1);}else if("o19"==x||"o20"==x){s.length%2!=0&&!h&&(f=s.shift()+n.nominalWidthX),i+=s.length>>1,s.length=0,h=!0,u+=i+7>>3;}else if("o21"==x)s.length>2&&!h&&(f=s.shift()+n.nominalWidthX,h=!0),v+=s.pop(),l+=s.pop(),d&&e.U.P.closePath(o),e.U.P.moveTo(o,l,v),d=!0;else if("o22"==x)s.length>1&&!h&&(f=s.shift()+n.nominalWidthX,h=!0),l+=s.pop(),d&&e.U.P.closePath(o),e.U.P.moveTo(o,l,v),d=!0;else if("o25"==x){for(;s.length>6;)l+=s.shift(),v+=s.shift(),e.U.P.lineTo(o,l,v);c=l+s.shift(),p=v+s.shift(),U=c+s.shift(),g=p+s.shift(),l=U+s.shift(),v=g+s.shift(),e.U.P.curveTo(o,c,p,U,g,l,v);}else if("o26"==x)for(s.length%2&&(l+=s.shift());s.length>0;)c=l,p=v+s.shift(),l=U=c+s.shift(),v=(g=p+s.shift())+s.shift(),e.U.P.curveTo(o,c,p,U,g,l,v);else if("o27"==x)for(s.length%2&&(v+=s.shift());s.length>0;)p=v,U=(c=l+s.shift())+s.shift(),g=p+s.shift(),l=U+s.shift(),v=g,e.U.P.curveTo(o,c,p,U,g,l,v);else if("o10"==x||"o29"==x){var L="o10"==x?n:a;if(0==s.length)console.debug("error: empty stack");else {var W=s.pop(),M=L.Subrs[W+L.Bias];t.x=l,t.y=v,t.nStems=i,t.haveWidth=h,t.width=f,t.open=d,e.U._drawCFF(M,t,a,n,o),l=t.x,v=t.y,i=t.nStems,h=t.haveWidth,f=t.width,d=t.open;}}else if("o30"==x||"o31"==x){var N=s.length,V=(T=0,"o31"==x);for(T+=N-(P=-3&N);T<P;)V?(p=v,U=(c=l+s.shift())+s.shift(),v=(g=p+s.shift())+s.shift(),P-T==5?(l=U+s.shift(),T++):l=U,V=!1):(c=l,p=v+s.shift(),U=c+s.shift(),g=p+s.shift(),l=U+s.shift(),P-T==5?(v=g+s.shift(),T++):v=g,V=!0),e.U.P.curveTo(o,c,p,U,g,l,v),T+=4;}else {if("o"==(x+"").charAt(0))throw console.debug("Unknown operation: "+x,r),x;s.push(x);}}}t.x=l,t.y=v,t.nStems=i,t.haveWidth=h,t.width=f,t.open=d;};var t=e,a={Typr:t};return r.Typr=t,r.default=a,Object.defineProperty(r,"__esModule",{value:!0}),r}({}).Typr}

/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/
function woff2otfFactory(){return function(r){var e=Uint8Array,n=Uint16Array,t=Uint32Array,a=new e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),f=new e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),i=new e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),o=function(r,e){for(var a=new n(31),f=0;f<31;++f)a[f]=e+=1<<r[f-1];var i=new t(a[30]);for(f=1;f<30;++f)for(var o=a[f];o<a[f+1];++o)i[o]=o-a[f]<<5|f;return [a,i]},u=o(a,2),v=u[0],s=u[1];v[28]=258,s[258]=28;for(var l=o(f,0)[0],c=new n(32768),g=0;g<32768;++g){var h=(43690&g)>>>1|(21845&g)<<1;h=(61680&(h=(52428&h)>>>2|(13107&h)<<2))>>>4|(3855&h)<<4,c[g]=((65280&h)>>>8|(255&h)<<8)>>>1;}var w=function(r,e,t){for(var a=r.length,f=0,i=new n(e);f<a;++f)++i[r[f]-1];var o,u=new n(e);for(f=0;f<e;++f)u[f]=u[f-1]+i[f-1]<<1;if(t){o=new n(1<<e);var v=15-e;for(f=0;f<a;++f)if(r[f])for(var s=f<<4|r[f],l=e-r[f],g=u[r[f]-1]++<<l,h=g|(1<<l)-1;g<=h;++g)o[c[g]>>>v]=s;}else for(o=new n(a),f=0;f<a;++f)o[f]=c[u[r[f]-1]++]>>>15-r[f];return o},m=new e(288);for(g=0;g<144;++g)m[g]=8;for(g=144;g<256;++g)m[g]=9;for(g=256;g<280;++g)m[g]=7;for(g=280;g<288;++g)m[g]=8;var b=new e(32);for(g=0;g<32;++g)b[g]=5;var p=w(m,9,1),d=w(b,5,1),L=function(r){for(var e=r[0],n=1;n<r.length;++n)r[n]>e&&(e=r[n]);return e},y=function(r,e,n){var t=e/8>>0;return (r[t]|r[t+1]<<8)>>>(7&e)&n},U=function(r,e){var n=e/8>>0;return (r[n]|r[n+1]<<8|r[n+2]<<16)>>>(7&e)},O=function(r,o,u){var s=r.length,c=!o||u,g=!u||u.i;u||(u={}),o||(o=new e(3*s));var h,m=function(r){var n=o.length;if(r>n){var t=new e(Math.max(2*n,r));t.set(o),o=t;}},b=u.f||0,O=u.p||0,A=u.b||0,k=u.l,x=u.d,E=u.m,T=u.n,F=8*s;do{if(!k){u.f=b=y(r,O,1);var V=y(r,O+1,3);if(O+=3,!V){var M=r[(I=((h=O)/8>>0)+(7&h&&1)+4)-4]|r[I-3]<<8,C=I+M;if(C>s){if(g)throw "unexpected EOF";break}c&&m(A+M),o.set(r.subarray(I,C),A),u.b=A+=M,u.p=O=8*C;continue}if(1==V)k=p,x=d,E=9,T=5;else {if(2!=V)throw "invalid block type";var D=y(r,O,31)+257,S=y(r,O+10,15)+4,_=D+y(r,O+5,31)+1;O+=14;for(var j=new e(_),z=new e(19),q=0;q<S;++q)z[i[q]]=y(r,O+3*q,7);O+=3*S;var B=L(z),G=(1<<B)-1;if(!g&&O+_*(B+7)>F)break;var H=w(z,B,1);for(q=0;q<_;){var I,J=H[y(r,O,G)];if(O+=15&J,(I=J>>>4)<16)j[q++]=I;else {var K=0,N=0;for(16==I?(N=3+y(r,O,3),O+=2,K=j[q-1]):17==I?(N=3+y(r,O,7),O+=3):18==I&&(N=11+y(r,O,127),O+=7);N--;)j[q++]=K;}}var P=j.subarray(0,D),Q=j.subarray(D);E=L(P),T=L(Q),k=w(P,E,1),x=w(Q,T,1);}if(O>F)throw "unexpected EOF"}c&&m(A+131072);for(var R=(1<<E)-1,W=(1<<T)-1,X=E+T+18;g||O+X<F;){var Y=(K=k[U(r,O)&R])>>>4;if((O+=15&K)>F)throw "unexpected EOF";if(!K)throw "invalid length/literal";if(Y<256)o[A++]=Y;else {if(256==Y){k=null;break}var Z=Y-254;if(Y>264){var $=a[q=Y-257];Z=y(r,O,(1<<$)-1)+v[q],O+=$;}var rr=x[U(r,O)&W],er=rr>>>4;if(!rr)throw "invalid distance";O+=15&rr;Q=l[er];if(er>3){$=f[er];Q+=U(r,O)&(1<<$)-1,O+=$;}if(O>F)throw "unexpected EOF";c&&m(A+131072);for(var nr=A+Z;A<nr;A+=4)o[A]=o[A-Q],o[A+1]=o[A+1-Q],o[A+2]=o[A+2-Q],o[A+3]=o[A+3-Q];A=nr;}}u.l=k,u.p=O,u.b=A,k&&(b=1,u.m=E,u.d=x,u.n=T);}while(!b);return A==o.length?o:function(r,a,f){(null==a||a<0)&&(a=0),(null==f||f>r.length)&&(f=r.length);var i=new(r instanceof n?n:r instanceof t?t:e)(f-a);return i.set(r.subarray(a,f)),i}(o,0,A)};return r.convert_streams=function(r){var e=new DataView(r),n=0;function t(){var r=e.getUint16(n);return n+=2,r}function a(){var r=e.getUint32(n);return n+=4,r}function f(r){b.setUint16(p,r),p+=2;}function i(r){b.setUint32(p,r),p+=4;}for(var o={signature:a(),flavor:a(),length:a(),numTables:t(),reserved:t(),totalSfntSize:a(),majorVersion:t(),minorVersion:t(),metaOffset:a(),metaLength:a(),metaOrigLength:a(),privOffset:a(),privLength:a()},u=0;Math.pow(2,u)<=o.numTables;)u++;u--;for(var v=16*Math.pow(2,u),s=16*o.numTables-v,l=12,c=[],g=0;g<o.numTables;g++)c.push({tag:a(),offset:a(),compLength:a(),origLength:a(),origChecksum:a()}),l+=16;var h,w=new Uint8Array(12+16*c.length+c.reduce((function(r,e){return r+e.origLength+4}),0)),m=w.buffer,b=new DataView(m),p=0;return i(o.flavor),f(o.numTables),f(v),f(u),f(s),c.forEach((function(r){i(r.tag),i(r.origChecksum),i(l),i(r.origLength),r.outOffset=l,(l+=r.origLength)%4!=0&&(l+=4-l%4);})),c.forEach((function(e){var n,t=r.slice(e.offset,e.offset+e.compLength);if(e.compLength!=e.origLength){var a=new Uint8Array(e.origLength);n=new Uint8Array(t,2),O(n,a);}else a=new Uint8Array(t);w.set(a,e.outOffset);var f=0;(l=e.outOffset+e.origLength)%4!=0&&(f=4-l%4),w.set(new Uint8Array(f).buffer,e.outOffset+e.origLength),h=l+f;})),m.slice(0,h)},r}({}).convert_streams}

/**
 * An adapter that allows Typr.js to be used as if it were (a subset of) the OpenType.js API.
 * Also adds support for WOFF files (not WOFF2).
 */

function parserFactory(Typr, woff2otf) {
  const cmdArgLengths = {
    M: 2,
    L: 2,
    Q: 4,
    C: 6,
    Z: 0
  };

  // {joinType: "skip+step,..."}
  const joiningTypeRawData = {"C":"18g,ca,368,1kz","D":"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v","R":"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6","L":"x9u,jff,a,fd,jv","T":"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"};

  const JT_LEFT = 1, //indicates that a character joins with the subsequent character, but does not join with the preceding character.
    JT_RIGHT = 2, //indicates that a character joins with the preceding character, but does not join with the subsequent character.
    JT_DUAL = 4, //indicates that a character joins with the preceding character and joins with the subsequent character.
    JT_TRANSPARENT = 8, //indicates that the character does not join with adjacent characters and that the character must be skipped over when the shaping engine is evaluating the joining positions in a sequence of characters. When a JT_TRANSPARENT character is encountered in a sequence, the JOINING_TYPE of the preceding character passes through. Diacritical marks are frequently assigned this value.
    JT_JOIN_CAUSING = 16, //indicates that the character forces the use of joining forms with the preceding and subsequent characters. Kashidas and the Zero Width Joiner (U+200D) are both JOIN_CAUSING characters.
    JT_NON_JOINING = 32; //indicates that a character does not join with the preceding or with the subsequent character.,

  let joiningTypeMap;
  function getCharJoiningType(ch) {
    if (!joiningTypeMap) {
      const m = {
        R: JT_RIGHT,
        L: JT_LEFT,
        D: JT_DUAL,
        C: JT_JOIN_CAUSING,
        U: JT_NON_JOINING,
        T: JT_TRANSPARENT
      };
      joiningTypeMap = new Map();
      for (let type in joiningTypeRawData) {
        let lastCode = 0;
        joiningTypeRawData[type].split(',').forEach(range => {
          let [skip, step] = range.split('+');
          skip = parseInt(skip,36);
          step = step ? parseInt(step, 36) : 0;
          joiningTypeMap.set(lastCode += skip, m[type]);
          for (let i = step; i--;) {
            joiningTypeMap.set(++lastCode, m[type]);
          }
        });
      }
    }
    return joiningTypeMap.get(ch) || JT_NON_JOINING
  }

  const ISOL = 1, INIT = 2, FINA = 3, MEDI = 4;
  const formsToFeatures = [null, 'isol', 'init', 'fina', 'medi'];

  function detectJoiningForms(str) {
    // This implements the algorithm described here:
    // https://github.com/n8willis/opentype-shaping-documents/blob/master/opentype-shaping-arabic-general.md
    const joiningForms = new Uint8Array(str.length);
    let prevJoiningType = JT_NON_JOINING;
    let prevForm = ISOL;
    let prevIndex = -1;
    for (let i = 0; i < str.length; i++) {
      const code = str.codePointAt(i);
      let joiningType = getCharJoiningType(code) | 0;
      let form = ISOL;
      if (joiningType & JT_TRANSPARENT) {
        continue
      }
      if (prevJoiningType & (JT_LEFT | JT_DUAL | JT_JOIN_CAUSING)) {
        if (joiningType & (JT_RIGHT | JT_DUAL | JT_JOIN_CAUSING)) {
          form = FINA;
          // isol->init, fina->medi
          if (prevForm === ISOL || prevForm === FINA) {
            joiningForms[prevIndex]++;
          }
        }
        else if (joiningType & (JT_LEFT | JT_NON_JOINING)) {
          // medi->fina, init->isol
          if (prevForm === INIT || prevForm === MEDI) {
            joiningForms[prevIndex]--;
          }
        }
      }
      else if (prevJoiningType & (JT_RIGHT | JT_NON_JOINING)) {
        // medi->fina, init->isol
        if (prevForm === INIT || prevForm === MEDI) {
          joiningForms[prevIndex]--;
        }
      }
      prevForm = joiningForms[i] = form;
      prevJoiningType = joiningType;
      prevIndex = i;
      if (code > 0xffff) i++;
    }
    // console.log(str.split('').map(ch => ch.codePointAt(0).toString(16)))
    // console.log(str.split('').map(ch => getCharJoiningType(ch.codePointAt(0))))
    // console.log(Array.from(joiningForms).map(f => formsToFeatures[f] || 'none'))
    return joiningForms
  }

  function stringToGlyphs (font, str) {
    const glyphIds = [];
    for (let i = 0; i < str.length; i++) {
      const cc = str.codePointAt(i);
      if (cc > 0xffff) i++;
      glyphIds.push(Typr.U.codeToGlyph(font, cc));
    }

    const gsub = font['GSUB'];
    if (gsub) {
      const {lookupList, featureList} = gsub;
      let joiningForms;
      const supportedFeatures = /^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws)$/;
      const usedLookups = [];
      featureList.forEach(feature => {
        if (supportedFeatures.test(feature.tag)) {
          for (let ti = 0; ti < feature.tab.length; ti++) {
            if (usedLookups[feature.tab[ti]]) continue
            usedLookups[feature.tab[ti]] = true;
            const tab = lookupList[feature.tab[ti]];
            const isJoiningFeature = /^(isol|init|fina|medi)$/.test(feature.tag);
            if (isJoiningFeature && !joiningForms) { //lazy
              joiningForms = detectJoiningForms(str);
            }
            for (let ci = 0; ci < glyphIds.length; ci++) {
              if (!joiningForms || !isJoiningFeature || formsToFeatures[joiningForms[ci]] === feature.tag) {
                Typr.U._applySubs(glyphIds, ci, tab, lookupList);
              }
            }
          }
        }
      });
    }

    return glyphIds
  }


  function wrapFontObj(typrFont) {
    const glyphMap = Object.create(null);

    const fontObj = {
      unitsPerEm: typrFont.head.unitsPerEm,
      ascender: typrFont.hhea.ascender,
      descender: typrFont.hhea.descender,
      forEachGlyph(text, fontSize, letterSpacing, callback) {
        let glyphX = 0;
        const fontScale = 1 / fontObj.unitsPerEm * fontSize;

        const glyphIndices = stringToGlyphs(typrFont, text);
        let charIndex = 0;
        let prevGlyphIndex = -1;
        glyphIndices.forEach((glyphIndex, i) => {
          // Typr returns a glyph index per string codepoint, with -1s in place of those that
          // were omitted due to ligature substitution. So we can track original index in the
          // string via simple increment, and skip everything else when seeing a -1.
          if (glyphIndex !== -1) {
            let glyphObj = glyphMap[glyphIndex];
            if (!glyphObj) {
              const {cmds, crds} = Typr.U.glyphToPath(typrFont, glyphIndex);

              // Find extents - Glyf gives this in metadata but not CFF, and Typr doesn't
              // normalize the two, so it's simplest just to iterate ourselves.
              let xMin, yMin, xMax, yMax;
              if (crds.length) {
                xMin = yMin = Infinity;
                xMax = yMax = -Infinity;
                for (let i = 0, len = crds.length; i < len; i += 2) {
                  let x = crds[i];
                  let y = crds[i + 1];
                  if (x < xMin) xMin = x;
                  if (y < yMin) yMin = y;
                  if (x > xMax) xMax = x;
                  if (y > yMax) yMax = y;
                }
              } else {
                xMin = xMax = yMin = yMax = 0;
              }

              glyphObj = glyphMap[glyphIndex] = {
                index: glyphIndex,
                advanceWidth: typrFont.hmtx.aWidth[glyphIndex],
                xMin,
                yMin,
                xMax,
                yMax,
                pathCommandCount: cmds.length,
                forEachPathCommand(callback) {
                  let argsIndex = 0;
                  const argsArray = [];
                  for (let i = 0, len = cmds.length; i < len; i++) {
                    const numArgs = cmdArgLengths[cmds[i]];
                    argsArray.length = 1 + numArgs;
                    argsArray[0] = cmds[i];
                    for (let j = 1; j <= numArgs; j++) {
                      argsArray[j] = crds[argsIndex++];
                    }
                    callback.apply(null, argsArray);
                  }
                }
              };
            }

            // Kerning
            if (prevGlyphIndex !== -1) {
              glyphX += Typr.U.getPairAdjustment(typrFont, prevGlyphIndex, glyphIndex) * fontScale;
            }

            callback.call(null, glyphObj, glyphX, charIndex);

            if (glyphObj.advanceWidth) {
              glyphX += glyphObj.advanceWidth * fontScale;
            }
            if (letterSpacing) {
              glyphX += letterSpacing * fontSize;
            }

            prevGlyphIndex = glyphIndex;
          }
          charIndex += (text.codePointAt(charIndex) > 0xffff ? 2 : 1);
        });
        return glyphX
      }
    };

    return fontObj
  }

  return function parse(buffer) {
    // Look to see if we have a WOFF file and convert it if so:
    const peek = new Uint8Array(buffer, 0, 4);
    const tag = Typr._bin.readASCII(peek, 0, 4);
    if (tag === 'wOFF') {
      buffer = woff2otf(buffer);
    } else if (tag === 'wOF2') {
      throw new Error('woff2 fonts not supported')
    }
    return wrapFontObj(Typr.parse(buffer)[0])
  }
}


const workerModule = /*#__PURE__*/defineWorkerModule({
  name: 'Typr Font Parser',
  dependencies: [typrFactory, woff2otfFactory, parserFactory],
  init(typrFactory, woff2otfFactory, parserFactory) {
    const Typr = typrFactory();
    const woff2otf = woff2otfFactory();
    return parserFactory(Typr, woff2otf)
  }
});

// import fontParser from './worker/FontParser_OpenType.js'


const CONFIG = {
  defaultFontURL: 'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff', //Roboto Regular
  sdfGlyphSize: 64,
  sdfMargin: 1 / 16,
  sdfExponent: 9,
  textureWidth: 2048
};
const tempColor = /*#__PURE__*/new Color();

/**
 * Repository for all font SDF atlas textures
 *
 *   {
 *     [font]: {
 *       sdfTexture: DataTexture
 *     }
 *   }
 */
const atlases = Object.create(null);

/**
 * @typedef {object} TroikaTextRenderInfo - Format of the result from `getTextRenderInfo`.
 * @property {object} parameters - The normalized input arguments to the render call.
 * @property {DataTexture} sdfTexture - The SDF atlas texture.
 * @property {number} sdfGlyphSize - The size of each glyph's SDF; see `configureTextBuilder`.
 * @property {number} sdfExponent - The exponent used in encoding the SDF's values; see `configureTextBuilder`.
 * @property {Float32Array} glyphBounds - List of [minX, minY, maxX, maxY] quad bounds for each glyph.
 * @property {Float32Array} glyphAtlasIndices - List holding each glyph's index in the SDF atlas.
 * @property {Uint8Array} [glyphColors] - List holding each glyph's [r, g, b] color, if `colorRanges` was supplied.
 * @property {Float32Array} [caretPositions] - A list of caret positions for all glyphs; this is
 *           the bottom [x,y] of the cursor position before each char, plus one after the last char.
 * @property {number} [caretHeight] - An appropriate height for all selection carets.
 * @property {number} ascender - The font's ascender metric.
 * @property {number} descender - The font's descender metric.
 * @property {number} lineHeight - The final computed lineHeight measurement.
 * @property {number} topBaseline - The y position of the top line's baseline.
 * @property {Array<number>} blockBounds - The total [minX, minY, maxX, maxY] rect of the whole text block;
 *           this can include extra vertical space beyond the visible glyphs due to lineHeight, and is
 *           equivalent to the dimensions of a block-level text element in CSS.
 * @property {Array<number>} visibleBounds - The total [minX, minY, maxX, maxY] rect of the whole text block;
 *           unlike `blockBounds` this is tightly wrapped to the visible glyph paths.
 * @property {Array<number>} totalBounds - DEPRECATED; use blockBounds instead.
 * @property {Array<number>} totalBlockSize - DEPRECATED; use blockBounds instead
 * @property {Array<object>} chunkedBounds - List of bounding rects for each consecutive set of N glyphs,
 *           in the format `{start:N, end:N, rect:[minX, minY, maxX, maxY]}`.
 * @property {object} timings - Timing info for various parts of the rendering logic including SDF
 *           generation, layout, etc.
 * @frozen
 */

/**
 * @callback getTextRenderInfo~callback
 * @param {TroikaTextRenderInfo} textRenderInfo
 */

/**
 * Main entry point for requesting the data needed to render a text string with given font parameters.
 * This is an asynchronous call, performing most of the logic in a web worker thread.
 * @param {object} args
 * @param {getTextRenderInfo~callback} callback
 */
function getTextRenderInfo(args, callback) {
  args = assign$1({}, args);

  // Apply default font here to avoid a 'null' atlas, and convert relative
  // URLs to absolute so they can be resolved in the worker
  args.font = toAbsoluteURL(args.font || CONFIG.defaultFontURL);

  // Normalize text to a string
  args.text = '' + args.text;

  args.sdfGlyphSize = args.sdfGlyphSize || CONFIG.sdfGlyphSize;

  // Normalize colors
  if (args.colorRanges != null) {
    let colors = {};
    for (let key in args.colorRanges) {
      if (args.colorRanges.hasOwnProperty(key)) {
        let val = args.colorRanges[key];
        if (typeof val !== 'number') {
          val = tempColor.set(val).getHex();
        }
        colors[key] = val;
      }
    }
    args.colorRanges = colors;
  }

  Object.freeze(args);

  // Init the atlas for this font if needed
  const {textureWidth, sdfExponent} = CONFIG;
  const {sdfGlyphSize} = args;
  let atlasKey = `${args.font}@${sdfGlyphSize}`;
  let atlas = atlases[atlasKey];
  if (!atlas) {
    atlas = atlases[atlasKey] = {
      sdfTexture: new DataTexture(
        new Uint8Array(sdfGlyphSize * textureWidth * 4),
        textureWidth,
        sdfGlyphSize,
        RGBAFormat,
        undefined,
        undefined,
        undefined,
        undefined,
        LinearFilter,
        LinearFilter
      )
    };
    atlas.sdfTexture.font = args.font;
  }

  // Issue request to the FontProcessor in the worker
  processInWorker(args).then(result => {
    // If the response has newGlyphs, copy them into the atlas texture at the specified indices
    if (result.newGlyphSDFs) {
      result.newGlyphSDFs.forEach(({textureData, atlasIndex}) => {
        const texImg = atlas.sdfTexture.image;

        // Grow the texture by power of 2 if needed
        while (texImg.data.length < (atlasIndex + 1) * sdfGlyphSize * sdfGlyphSize) {
          const biggerArray = new Uint8Array(texImg.data.length * 2);
          biggerArray.set(texImg.data);
          texImg.data = biggerArray;
          texImg.height *= 2;
        }

        // Insert the new glyph's data into the full texture image at the correct offsets
        // Glyphs are packed sequentially into the R,G,B,A channels of a square, advancing
        // to the next square every 4 glyphs.
        const squareIndex = Math.floor(atlasIndex / 4);
        const cols = texImg.width / sdfGlyphSize;
        const baseStartIndex = Math.floor(squareIndex / cols) * texImg.width * sdfGlyphSize * 4 //full rows
          + (squareIndex % cols) * sdfGlyphSize * 4 //partial row
          + (atlasIndex % 4); //color channel
        for (let y = 0; y < sdfGlyphSize; y++) {
          const srcStartIndex = y * sdfGlyphSize;
          const rowStartIndex = baseStartIndex + (y * texImg.width * 4);
          for (let x = 0; x < sdfGlyphSize; x++) {
            texImg.data[rowStartIndex + x * 4] = textureData[srcStartIndex + x];
          }
        }
      });
      atlas.sdfTexture.needsUpdate = true;
    }

    // Invoke callback with the text layout arrays and updated texture
    callback(Object.freeze({
      parameters: args,
      sdfTexture: atlas.sdfTexture,
      sdfGlyphSize,
      sdfExponent,
      glyphBounds: result.glyphBounds,
      glyphAtlasIndices: result.glyphAtlasIndices,
      glyphColors: result.glyphColors,
      caretPositions: result.caretPositions,
      caretHeight: result.caretHeight,
      chunkedBounds: result.chunkedBounds,
      ascender: result.ascender,
      descender: result.descender,
      lineHeight: result.lineHeight,
      topBaseline: result.topBaseline,
      blockBounds: result.blockBounds,
      visibleBounds: result.visibleBounds,
      timings: result.timings,
      get totalBounds() {
        console.log('totalBounds deprecated, use blockBounds instead');
        return result.blockBounds
      },
      get totalBlockSize() {
        console.log('totalBlockSize deprecated, use blockBounds instead');
        const [x0, y0, x1, y1] = result.blockBounds;
        return [x1 - x0, y1 - y0]
      }
    }));
  });
}


// Local assign impl so we don't have to import troika-core
function assign$1(toObj, fromObj) {
  for (let key in fromObj) {
    if (fromObj.hasOwnProperty(key)) {
      toObj[key] = fromObj[key];
    }
  }
  return toObj
}

// Utility for making URLs absolute
let linkEl;
function toAbsoluteURL(path) {
  if (!linkEl) {
    linkEl = typeof document === 'undefined' ? {} : document.createElement('a');
  }
  linkEl.href = path;
  return linkEl.href
}


const fontProcessorWorkerModule = /*#__PURE__*/defineWorkerModule({
  name: 'FontProcessor',
  dependencies: [
    CONFIG,
    workerModule,
    createGlyphSegmentsIndex,
    createSDFGenerator,
    createFontProcessor,
    bidiFactory
  ],
  init(config, fontParser, createGlyphSegmentsIndex, createSDFGenerator, createFontProcessor, bidiFactory) {
    const {sdfExponent, sdfMargin, defaultFontURL} = config;
    const sdfGenerator = createSDFGenerator(createGlyphSegmentsIndex, { sdfExponent, sdfMargin });
    return createFontProcessor(fontParser, sdfGenerator, bidiFactory(), { defaultFontURL })
  }
});

const processInWorker = /*#__PURE__*/defineWorkerModule({
  name: 'TextBuilder',
  dependencies: [fontProcessorWorkerModule, ThenableWorkerModule],
  init(fontProcessor, Thenable) {
    return function(args) {
      const thenable = new Thenable();
      fontProcessor.process(args, thenable.resolve);
      return thenable
    }
  },
  getTransferables(result) {
    // Mark array buffers as transferable to avoid cloning during postMessage
    const transferables = [
      result.glyphBounds.buffer,
      result.glyphAtlasIndices.buffer
    ];
    if (result.caretPositions) {
      transferables.push(result.caretPositions.buffer);
    }
    if (result.newGlyphSDFs) {
      result.newGlyphSDFs.forEach(d => {
        transferables.push(d.textureData.buffer);
      });
    }
    return transferables
  }
});

const GlyphsGeometry = /*#__PURE__*/(() => {

  const templateGeometries = {};
  function getTemplateGeometry(detail) {
    let geom = templateGeometries[detail];
    if (!geom) {
      geom = templateGeometries[detail] = new PlaneGeometry(1, 1, detail, detail).translate(0.5, 0.5, 0);
    }
    return geom
  }

  const glyphBoundsAttrName = 'aTroikaGlyphBounds';
  const glyphIndexAttrName = 'aTroikaGlyphIndex';
  const glyphColorAttrName = 'aTroikaGlyphColor';

  /**
  @class GlyphsGeometry

  A specialized Geometry for rendering a set of text glyphs. Uses InstancedBufferGeometry to
  render the glyphs using GPU instancing of a single quad, rather than constructing a whole
  geometry with vertices, for much smaller attribute arraybuffers according to this math:

    Where N = number of glyphs...

    Instanced:
    - position: 4 * 3
    - index: 2 * 3
    - normal: 4 * 3
    - uv: 4 * 2
    - glyph x/y bounds: N * 4
    - glyph indices: N * 1
    = 5N + 38

    Non-instanced:
    - position: N * 4 * 3
    - index: N * 2 * 3
    - normal: N * 4 * 3
    - uv: N * 4 * 2
    - glyph indices: N * 1
    = 39N

  A downside of this is the rare-but-possible lack of the instanced arrays extension,
  which we could potentially work around with a fallback non-instanced implementation.

  */
  class GlyphsGeometry extends InstancedBufferGeometry {
    constructor() {
      super();

      this.detail = 1;
      this.curveRadius = 0;

      // Define groups for rendering text outline as a separate pass; these will only
      // be used when the `material` getter returns an array, i.e. outlineWidth > 0.
      this.groups = [
        {start: 0, count: Infinity, materialIndex: 0},
        {start: 0, count: Infinity, materialIndex: 1}
      ];

      // Preallocate empty bounding objects
      this.boundingSphere = new Sphere();
      this.boundingBox = new Box3();
    }

    computeBoundingSphere () {
      // No-op; we'll sync the boundingSphere proactively when needed.
    }

    computeBoundingBox() {
      // No-op; we'll sync the boundingBox proactively when needed.
    }

    set detail(detail) {
      if (detail !== this._detail) {
        this._detail = detail;
        if (typeof detail !== 'number' || detail < 1) {
          detail = 1;
        }
        let tpl = getTemplateGeometry(detail)
        ;['position', 'normal', 'uv'].forEach(attr => {
          this.attributes[attr] = tpl.attributes[attr].clone();
        });
        this.setIndex(tpl.getIndex().clone());
      }
    }
    get detail() {
      return this._detail
    }

    set curveRadius(r) {
      if (r !== this._curveRadius) {
        this._curveRadius = r;
        this._updateBounds();
      }
    }
    get curveRadius() {
      return this._curveRadius
    }

    /**
     * Update the geometry for a new set of glyphs.
     * @param {Float32Array} glyphBounds - An array holding the planar bounds for all glyphs
     *        to be rendered, 4 entries for each glyph: x1,x2,y1,y1
     * @param {Float32Array} glyphAtlasIndices - An array holding the index of each glyph within
     *        the SDF atlas texture.
     * @param {Array} blockBounds - An array holding the [minX, minY, maxX, maxY] across all glyphs
     * @param {Array} [chunkedBounds] - An array of objects describing bounds for each chunk of N
     *        consecutive glyphs: `{start:N, end:N, rect:[minX, minY, maxX, maxY]}`. This can be
     *        used with `applyClipRect` to choose an optimized `instanceCount`.
     * @param {Uint8Array} [glyphColors] - An array holding r,g,b values for each glyph.
     */
    updateGlyphs(glyphBounds, glyphAtlasIndices, blockBounds, chunkedBounds, glyphColors) {
      // Update the instance attributes
      updateBufferAttr(this, glyphBoundsAttrName, glyphBounds, 4);
      updateBufferAttr(this, glyphIndexAttrName, glyphAtlasIndices, 1);
      updateBufferAttr(this, glyphColorAttrName, glyphColors, 3);
      this._blockBounds = blockBounds;
      this._chunkedBounds = chunkedBounds;
      setInstanceCount(this, glyphAtlasIndices.length);
      this._updateBounds();
    }

    _updateBounds() {
      const bounds = this._blockBounds;
      if (bounds) {
        const { curveRadius, boundingBox: bbox } = this;
        if (curveRadius) {
          const { PI, floor, min, max, sin, cos } = Math;
          const halfPi = PI / 2;
          const twoPi = PI * 2;
          const absR = Math.abs(curveRadius);
          const leftAngle = bounds[0] / absR;
          const rightAngle = bounds[2] / absR;
          const minX = floor((leftAngle + halfPi) / twoPi) !== floor((rightAngle + halfPi) / twoPi)
            ? -absR : min(sin(leftAngle) * absR, sin(rightAngle) * absR);
          const maxX = floor((leftAngle - halfPi) / twoPi) !== floor((rightAngle - halfPi) / twoPi)
            ? absR : max(sin(leftAngle) * absR, sin(rightAngle) * absR);
          const maxZ = floor((leftAngle + PI) / twoPi) !== floor((rightAngle + PI) / twoPi)
            ? absR * 2 : max(absR - cos(leftAngle) * absR, absR - cos(rightAngle) * absR);
          bbox.min.set(minX, bounds[1], curveRadius < 0 ? -maxZ : 0);
          bbox.max.set(maxX, bounds[3], curveRadius < 0 ? 0 : maxZ);
        } else {
          bbox.min.set(bounds[0], bounds[1], 0);
          bbox.max.set(bounds[2], bounds[3], 0);
        }
        bbox.getBoundingSphere(this.boundingSphere);
      }
    }

    /**
     * Given a clipping rect, and the chunkedBounds from the last updateGlyphs call, choose the lowest
     * `instanceCount` that will show all glyphs within the clipped view. This is an optimization
     * for long blocks of text that are clipped, to skip vertex shader evaluation for glyphs that would
     * be clipped anyway.
     *
     * Note that since `drawElementsInstanced[ANGLE]` only accepts an instance count and not a starting
     * offset, this optimization becomes less effective as the clipRect moves closer to the end of the
     * text block. We could fix that by switching from instancing to a full geometry with a drawRange,
     * but at the expense of much larger attribute buffers (see classdoc above.)
     *
     * @param {Vector4} clipRect
     */
    applyClipRect(clipRect) {
      let count = this.getAttribute(glyphIndexAttrName).count;
      let chunks = this._chunkedBounds;
      if (chunks) {
        for (let i = chunks.length; i--;) {
          count = chunks[i].end;
          let rect = chunks[i].rect;
          // note: both rects are l-b-r-t
          if (rect[1] < clipRect.w && rect[3] > clipRect.y && rect[0] < clipRect.z && rect[2] > clipRect.x) {
            break
          }
        }
      }
      setInstanceCount(this, count);
    }
  }

  // Compat for pre r109:
  if (!GlyphsGeometry.prototype.setAttribute) {
    GlyphsGeometry.prototype.setAttribute = function(name, attribute) {
      this.attributes[ name ] = attribute;
      return this
    };
  }


  function updateBufferAttr(geom, attrName, newArray, itemSize) {
    const attr = geom.getAttribute(attrName);
    if (newArray) {
      // If length isn't changing, just update the attribute's array data
      if (attr && attr.array.length === newArray.length) {
        attr.array.set(newArray);
        attr.needsUpdate = true;
      } else {
        geom.setAttribute(attrName, new InstancedBufferAttribute(newArray, itemSize));
        // If the new attribute has a different size, we also have to (as of r117) manually clear the
        // internal cached max instance count. See https://github.com/mrdoob/three.js/issues/19706
        // It's unclear if this is a threejs bug or a truly unsupported scenario; discussion in
        // that ticket is ambiguous as to whether replacing a BufferAttribute with one of a
        // different size is supported, but https://github.com/mrdoob/three.js/pull/17418 strongly
        // implies it should be supported. It's possible we need to
        delete geom._maxInstanceCount; //for r117+, could be fragile
        geom.dispose(); //for r118+, more robust feeling, but more heavy-handed than I'd like
      }
    } else if (attr) {
      geom.deleteAttribute(attrName);
    }
  }

  // Handle maxInstancedCount -> instanceCount rename that happened in three r117
  function setInstanceCount(geom, count) {
    geom[geom.hasOwnProperty('instanceCount') ? 'instanceCount' : 'maxInstancedCount'] = count;
  }

  return GlyphsGeometry
})();

// language=GLSL
const VERTEX_DEFS = `
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaDistanceOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`;

// language=GLSL prefix="void main() {" suffix="}"
const VERTEX_TRANSFORM = `
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaDistanceOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaDistanceOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);

${''/* NOTE: it seems important to calculate the glyph's bounding texture UVs here in the
  vertex shader, rather than in the fragment shader, as the latter gives strange artifacts
  on some glyphs (those in the leftmost texture column) on some systems. The exact reason
  isn't understood but doing this here, then mix()-ing in the fragment shader, seems to work. */}
float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`;

// language=GLSL
const FRAGMENT_DEFS = `
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaDistanceOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaOutlineOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of encoding in SDFGenerator.js
  ${''/* TODO - there's some slight inaccuracy here when dealing with interpolated alpha values; those
    are linearly interpolated where the encoding is exponential. Look into improving this by rounding
    to nearest 2 whole texels, decoding those exponential values, and linearly interpolating the result.
  */}
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  ${''/*
    When the standard derivatives extension is available, we choose an antialiasing alpha threshold based
    on the potential change in the SDF's alpha from this fragment to its neighbor. This strategy maximizes 
    readability and edge crispness at all sizes and screen resolutions.
  */}
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  ${''/* 
  // TODO more refined extrapolated distance by adjusting for angle of gradient at edge...
  // This has potential but currently gives very jagged extensions, maybe due to precision issues?
  float uvStep = 1.0 / uTroikaSDFGlyphSize;
  vec2 neighbor1UV = clampedGlyphUV + (
    vTroikaGlyphUV.x != clampedGlyphUV.x ? vec2(0.0, uvStep * sign(0.5 - vTroikaGlyphUV.y)) :
    vTroikaGlyphUV.y != clampedGlyphUV.y ? vec2(uvStep * sign(0.5 - vTroikaGlyphUV.x), 0.0) :
    vec2(0.0)
  );
  vec2 neighbor2UV = clampedGlyphUV + (
    vTroikaGlyphUV.x != clampedGlyphUV.x ? vec2(0.0, uvStep * -sign(0.5 - vTroikaGlyphUV.y)) :
    vTroikaGlyphUV.y != clampedGlyphUV.y ? vec2(uvStep * -sign(0.5 - vTroikaGlyphUV.x), 0.0) :
    vec2(0.0)
  );
  float neighbor1Distance = troikaGlyphUvToDistance(neighbor1UV);
  float neighbor2Distance = troikaGlyphUvToDistance(neighbor2UV);
  float distToUnclamped = length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);
  float distToNeighbor = length((clampedGlyphUV - neighbor1UV) * vTroikaGlyphDimensions);
  float gradientAngle1 = min(asin(abs(neighbor1Distance - distance) / distToNeighbor), PI / 2.0);
  float gradientAngle2 = min(asin(abs(neighbor2Distance - distance) / distToNeighbor), PI / 2.0);
  distance += (cos(gradientAngle1) + cos(gradientAngle2)) / 2.0 * distToUnclamped;
  */}

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`;

// language=GLSL prefix="void main() {" suffix="}"
const FRAGMENT_TRANSFORM = `
float aaDist = troikaGetAADist();
float distance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(distance, uTroikaDistanceOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  distance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;


/**
 * Create a material for rendering text, derived from a baseMaterial
 */
function createTextDerivedMaterial(baseMaterial) {
  const textMaterial = createDerivedMaterial(baseMaterial, {
    chained: true,
    extensions: {
      derivatives: true
    },
    uniforms: {
      uTroikaSDFTexture: {value: null},
      uTroikaSDFTextureSize: {value: new Vector2()},
      uTroikaSDFGlyphSize: {value: 0},
      uTroikaSDFExponent: {value: 0},
      uTroikaTotalBounds: {value: new Vector4(0,0,0,0)},
      uTroikaClipRect: {value: new Vector4(0,0,0,0)},
      uTroikaDistanceOffset: {value: 0},
      uTroikaOutlineOpacity: {value: 0},
      uTroikaFillOpacity: {value: 1},
      uTroikaPositionOffset: {value: new Vector2()},
      uTroikaCurveRadius: {value: 0},
      uTroikaBlurRadius: {value: 0},
      uTroikaStrokeWidth: {value: 0},
      uTroikaStrokeColor: {value: new Color()},
      uTroikaStrokeOpacity: {value: 1},
      uTroikaOrient: {value: new Matrix3()},
      uTroikaUseGlyphColors: {value: true},
      uTroikaSDFDebug: {value: false}
    },
    vertexDefs: VERTEX_DEFS,
    vertexTransform: VERTEX_TRANSFORM,
    fragmentDefs: FRAGMENT_DEFS,
    fragmentColorTransform: FRAGMENT_TRANSFORM,
    customRewriter({vertexShader, fragmentShader}) {
      let uDiffuseRE = /\buniform\s+vec3\s+diffuse\b/;
      if (uDiffuseRE.test(fragmentShader)) {
        // Replace all instances of `diffuse` with our varying
        fragmentShader = fragmentShader
          .replace(uDiffuseRE, 'varying vec3 vTroikaGlyphColor')
          .replace(/\bdiffuse\b/g, 'vTroikaGlyphColor');
        // Make sure the vertex shader declares the uniform so we can grab it as a fallback
        if (!uDiffuseRE.test(vertexShader)) {
          vertexShader = vertexShader.replace(
            voidMainRegExp,
            'uniform vec3 diffuse;\n$&\nvTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;\n'
          );
        }
      }
      return { vertexShader, fragmentShader }
    }
  });

  // Force transparency - TODO is this reasonable?
  textMaterial.transparent = true;

  Object.defineProperties(textMaterial, {
    isTroikaTextMaterial: {value: true},

    // WebGLShadowMap reverses the side of the shadow material by default, which fails
    // for planes, so here we force the `shadowSide` to always match the main side.
    shadowSide: {
      get() {
        return this.side
      },
      set() {
        //no-op
      }
    }
  });

  return textMaterial
}

const Text = /*#__PURE__*/(() => {

  const defaultMaterial = new MeshBasicMaterial({
    color: 0xffffff,
    side: DoubleSide,
    transparent: true
  });
  const defaultStrokeColor = 0x808080;

  const tempMat4 = new Matrix4();
  const tempVec3a = new Vector3();
  const tempVec3b = new Vector3();
  const tempArray = [];
  const origin = new Vector3();
  const defaultOrient = '+x+y';

  function first(o) {
    return Array.isArray(o) ? o[0] : o
  }

  let getFlatRaycastMesh = () => {
    const mesh = new Mesh(
      new PlaneGeometry(1, 1),
      defaultMaterial
    );
    getFlatRaycastMesh = () => mesh;
    return mesh
  };
  let getCurvedRaycastMesh = () => {
    const mesh = new Mesh(
      new PlaneGeometry(1, 1, 32, 1),
      defaultMaterial
    );
    getCurvedRaycastMesh = () => mesh;
    return mesh
  };

  const syncStartEvent = {type: 'syncstart'};
  const syncCompleteEvent = {type: 'synccomplete'};

  const SYNCABLE_PROPS = [
    'font',
    'fontSize',
    'letterSpacing',
    'lineHeight',
    'maxWidth',
    'overflowWrap',
    'text',
    'direction',
    'textAlign',
    'textIndent',
    'whiteSpace',
    'anchorX',
    'anchorY',
    'colorRanges',
    'sdfGlyphSize'
  ];

  const COPYABLE_PROPS = SYNCABLE_PROPS.concat(
    'material',
    'color',
    'depthOffset',
    'clipRect',
    'curveRadius',
    'orientation',
    'glyphGeometryDetail'
  );



  /**
   * @class Text
   *
   * A ThreeJS Mesh that renders a string of text on a plane in 3D space using signed distance
   * fields (SDF).
   */
  class Text extends Mesh {
    constructor() {
      const geometry = new GlyphsGeometry();
      super(geometry, null);

      // === Text layout properties: === //

      /**
       * @member {string} text
       * The string of text to be rendered.
       */
      this.text = '';

      /**
       * @deprecated Use `anchorX` and `anchorY` instead
       * @member {Array<number>} anchor
       * Defines where in the text block should correspond to the mesh's local position, as a set
       * of horizontal and vertical percentages from 0 to 1. A value of `[0, 0]` (the default)
       * anchors at the top-left, `[1, 1]` at the bottom-right, and `[0.5, 0.5]` centers the
       * block at the mesh's position.
       */
      //this.anchor = null

      /**
       * @member {number|string} anchorX
       * Defines the horizontal position in the text block that should line up with the local origin.
       * Can be specified as a numeric x position in local units, a string percentage of the total
       * text block width e.g. `'25%'`, or one of the following keyword strings: 'left', 'center',
       * or 'right'.
       */
      this.anchorX = 0;

      /**
       * @member {number|string} anchorX
       * Defines the vertical position in the text block that should line up with the local origin.
       * Can be specified as a numeric y position in local units (note: down is negative y), a string
       * percentage of the total text block height e.g. `'25%'`, or one of the following keyword strings:
       * 'top', 'top-baseline', 'middle', 'bottom-baseline', or 'bottom'.
       */
      this.anchorY = 0;

      /**
       * @member {number} curveRadius
       * Defines a cylindrical radius along which the text's plane will be curved. Positive numbers put
       * the cylinder's centerline (oriented vertically) that distance in front of the text, for a concave
       * curvature, while negative numbers put it behind the text for a convex curvature. The centerline
       * will be aligned with the text's local origin; you can use `anchorX` to offset it.
       *
       * Since each glyph is by default rendered with a simple quad, each glyph remains a flat plane
       * internally. You can use `glyphGeometryDetail` to add more vertices for curvature inside glyphs.
       */
      this.curveRadius = 0;

      /**
       * @member {string} direction
       * Sets the base direction for the text. The default value of "auto" will choose a direction based
       * on the text's content according to the bidi spec. A value of "ltr" or "rtl" will force the direction.
       */
      this.direction = 'auto';

      /**
       * @member {string} font
       * URL of a custom font to be used. Font files can be any of the formats supported by
       * OpenType (see https://github.com/opentypejs/opentype.js).
       * Defaults to the Roboto font loaded from Google Fonts.
       */
      this.font = null; //will use default from TextBuilder

      /**
       * @member {number} fontSize
       * The size at which to render the font in local units; corresponds to the em-box height
       * of the chosen `font`.
       */
      this.fontSize = 0.1;

      /**
       * @member {number} letterSpacing
       * Sets a uniform adjustment to spacing between letters after kerning is applied. Positive
       * numbers increase spacing and negative numbers decrease it.
       */
      this.letterSpacing = 0;

      /**
       * @member {number|string} lineHeight
       * Sets the height of each line of text, as a multiple of the `fontSize`. Defaults to 'normal'
       * which chooses a reasonable height based on the chosen font's ascender/descender metrics.
       */
      this.lineHeight = 'normal';

      /**
       * @member {number} maxWidth
       * The maximum width of the text block, above which text may start wrapping according to the
       * `whiteSpace` and `overflowWrap` properties.
       */
      this.maxWidth = Infinity;

      /**
       * @member {string} overflowWrap
       * Defines how text wraps if the `whiteSpace` property is `normal`. Can be either `'normal'`
       * to break at whitespace characters, or `'break-word'` to allow breaking within words.
       * Defaults to `'normal'`.
       */
      this.overflowWrap = 'normal';

      /**
       * @member {string} textAlign
       * The horizontal alignment of each line of text within the overall text bounding box.
       */
      this.textAlign = 'left';

      /**
       * @member {number} textIndent
       * Indentation for the first character of a line; see CSS `text-indent`.
       */
      this.textIndent = 0;

      /**
       * @member {string} whiteSpace
       * Defines whether text should wrap when a line reaches the `maxWidth`. Can
       * be either `'normal'` (the default), to allow wrapping according to the `overflowWrap` property,
       * or `'nowrap'` to prevent wrapping. Note that `'normal'` here honors newline characters to
       * manually break lines, making it behave more like `'pre-wrap'` does in CSS.
       */
      this.whiteSpace = 'normal';


      // === Presentation properties: === //

      /**
       * @member {THREE.Material} material
       * Defines a _base_ material to be used when rendering the text. This material will be
       * automatically replaced with a material derived from it, that adds shader code to
       * decrease the alpha for each fragment (pixel) outside the text glyphs, with antialiasing.
       * By default it will derive from a simple white MeshBasicMaterial, but you can use any
       * of the other mesh materials to gain other features like lighting, texture maps, etc.
       *
       * Also see the `color` shortcut property.
       */
      this.material = null;

      /**
       * @member {string|number|THREE.Color} color
       * This is a shortcut for setting the `color` of the text's material. You can use this
       * if you don't want to specify a whole custom `material`. Also, if you do use a custom
       * `material`, this color will only be used for this particuar Text instance, even if
       * that same material instance is shared across multiple Text objects.
       */
      this.color = null;

      /**
       * @member {object|null} colorRanges
       * WARNING: This API is experimental and may change.
       * This allows more fine-grained control of colors for individual or ranges of characters,
       * taking precedence over the material's `color`. Its format is an Object whose keys each
       * define a starting character index for a range, and whose values are the color for each
       * range. The color value can be a numeric hex color value, a `THREE.Color` object, or
       * any of the strings accepted by `THREE.Color`.
       */
      this.colorRanges = null;

      /**
       * @member {number|string} outlineWidth
       * WARNING: This API is experimental and may change.
       * The width of an outline/halo to be drawn around each text glyph using the `outlineColor` and `outlineOpacity`.
       * Can be specified as either an absolute number in local units, or as a percentage string e.g.
       * `"12%"` which is treated as a percentage of the `fontSize`. Defaults to `0`, which means
       * no outline will be drawn unless an `outlineOffsetX/Y` or `outlineBlur` is set.
       */
      this.outlineWidth = 0;

      /**
       * @member {string|number|THREE.Color} outlineColor
       * WARNING: This API is experimental and may change.
       * The color of the text outline, if `outlineWidth`/`outlineBlur`/`outlineOffsetX/Y` are set.
       * Defaults to black.
       */
      this.outlineColor = 0x000000;

      /**
       * @member {number} outlineOpacity
       * WARNING: This API is experimental and may change.
       * The opacity of the outline, if `outlineWidth`/`outlineBlur`/`outlineOffsetX/Y` are set.
       * Defaults to `1`.
       */
      this.outlineOpacity = 1;

      /**
       * @member {number|string} outlineBlur
       * WARNING: This API is experimental and may change.
       * A blur radius applied to the outer edge of the text's outline. If the `outlineWidth` is
       * zero, the blur will be applied at the glyph edge, like CSS's `text-shadow` blur radius.
       * Can be specified as either an absolute number in local units, or as a percentage string e.g.
       * `"12%"` which is treated as a percentage of the `fontSize`. Defaults to `0`.
       */
      this.outlineBlur = 0;

      /**
       * @member {number|string} outlineOffsetX
       * WARNING: This API is experimental and may change.
       * A horizontal offset for the text outline.
       * Can be specified as either an absolute number in local units, or as a percentage string e.g. `"12%"`
       * which is treated as a percentage of the `fontSize`. Defaults to `0`.
       */
      this.outlineOffsetX = 0;

      /**
       * @member {number|string} outlineOffsetY
       * WARNING: This API is experimental and may change.
       * A vertical offset for the text outline.
       * Can be specified as either an absolute number in local units, or as a percentage string e.g. `"12%"`
       * which is treated as a percentage of the `fontSize`. Defaults to `0`.
       */
      this.outlineOffsetY = 0;

      /**
       * @member {number|string} strokeWidth
       * WARNING: This API is experimental and may change.
       * The width of an inner stroke drawn inside each text glyph using the `strokeColor` and `strokeOpacity`.
       * Can be specified as either an absolute number in local units, or as a percentage string e.g. `"12%"`
       * which is treated as a percentage of the `fontSize`. Defaults to `0`.
       */
      this.strokeWidth = 0;

      /**
       * @member {string|number|THREE.Color} strokeColor
       * WARNING: This API is experimental and may change.
       * The color of the text stroke, if `strokeWidth` is greater than zero. Defaults to gray.
       */
      this.strokeColor = defaultStrokeColor;

      /**
       * @member {number} strokeOpacity
       * WARNING: This API is experimental and may change.
       * The opacity of the stroke, if `strokeWidth` is greater than zero. Defaults to `1`.
       */
      this.strokeOpacity = 1;

      /**
       * @member {number} fillOpacity
       * WARNING: This API is experimental and may change.
       * The opacity of the glyph's fill from 0 to 1. This behaves like the material's `opacity` but allows
       * giving the fill a different opacity than the `strokeOpacity`. A fillOpacity of `0` makes the
       * interior of the glyph invisible, leaving just the `strokeWidth`. Defaults to `1`.
       */
      this.fillOpacity = 1;

      /**
       * @member {number} depthOffset
       * This is a shortcut for setting the material's `polygonOffset` and related properties,
       * which can be useful in preventing z-fighting when this text is laid on top of another
       * plane in the scene. Positive numbers are further from the camera, negatives closer.
       */
      this.depthOffset = 0;

      /**
       * @member {Array<number>} clipRect
       * If specified, defines a `[minX, minY, maxX, maxY]` of a rectangle outside of which all
       * pixels will be discarded. This can be used for example to clip overflowing text when
       * `whiteSpace='nowrap'`.
       */
      this.clipRect = null;

      /**
       * @member {string} orientation
       * Defines the axis plane on which the text should be laid out when the mesh has no extra
       * rotation transform. It is specified as a string with two axes: the horizontal axis with
       * positive pointing right, and the vertical axis with positive pointing up. By default this
       * is '+x+y', meaning the text sits on the xy plane with the text's top toward positive y
       * and facing positive z. A value of '+x-z' would place it on the xz plane with the text's
       * top toward negative z and facing positive y.
       */
      this.orientation = defaultOrient;

      /**
       * @member {number} glyphGeometryDetail
       * Controls number of vertical/horizontal segments that make up each glyph's rectangular
       * plane. Defaults to 1. This can be increased to provide more geometrical detail for custom
       * vertex shader effects, for example.
       */
      this.glyphGeometryDetail = 1;

      /**
       * @member {number|null} sdfGlyphSize
       * The size of each glyph's SDF (signed distance field) used for rendering. This must be a
       * power-of-two number. Defaults to 64 which is generally a good balance of size and quality
       * for most fonts. Larger sizes can improve the quality of glyph rendering by increasing
       * the sharpness of corners and preventing loss of very thin lines, at the expense of
       * increased memory footprint and longer SDF generation time.
       */
      this.sdfGlyphSize = null;

      this.debugSDF = false;
    }

    /**
     * Updates the text rendering according to the current text-related configuration properties.
     * This is an async process, so you can pass in a callback function to be executed when it
     * finishes.
     * @param {function} [callback]
     */
    sync(callback) {
      if (this._needsSync) {
        this._needsSync = false;

        // If there's another sync still in progress, queue
        if (this._isSyncing) {
          (this._queuedSyncs || (this._queuedSyncs = [])).push(callback);
        } else {
          this._isSyncing = true;
          this.dispatchEvent(syncStartEvent);

          getTextRenderInfo({
            text: this.text,
            font: this.font,
            fontSize: this.fontSize || 0.1,
            letterSpacing: this.letterSpacing || 0,
            lineHeight: this.lineHeight || 'normal',
            maxWidth: this.maxWidth,
            direction: this.direction || 'auto',
            textAlign: this.textAlign,
            textIndent: this.textIndent,
            whiteSpace: this.whiteSpace,
            overflowWrap: this.overflowWrap,
            anchorX: this.anchorX,
            anchorY: this.anchorY,
            colorRanges: this.colorRanges,
            includeCaretPositions: true, //TODO parameterize
            sdfGlyphSize: this.sdfGlyphSize
          }, textRenderInfo => {
            this._isSyncing = false;

            // Save result for later use in onBeforeRender
            this._textRenderInfo = textRenderInfo;

            // Update the geometry attributes
            this.geometry.updateGlyphs(
              textRenderInfo.glyphBounds,
              textRenderInfo.glyphAtlasIndices,
              textRenderInfo.blockBounds,
              textRenderInfo.chunkedBounds,
              textRenderInfo.glyphColors
            );

            // If we had extra sync requests queued up, kick it off
            const queued = this._queuedSyncs;
            if (queued) {
              this._queuedSyncs = null;
              this._needsSync = true;
              this.sync(() => {
                queued.forEach(fn => fn && fn());
              });
            }

            this.dispatchEvent(syncCompleteEvent);
            if (callback) {
              callback();
            }
          });
        }
      }
    }

    /**
     * Initiate a sync if needed - note it won't complete until next frame at the
     * earliest so if possible it's a good idea to call sync() manually as soon as
     * all the properties have been set.
     * @override
     */
    onBeforeRender(renderer, scene, camera, geometry, material, group) {
      this.sync();

      // This may not always be a text material, e.g. if there's a scene.overrideMaterial present
      if (material.isTroikaTextMaterial) {
        this._prepareForRender(material);
      }
    }

    /**
     * Shortcut to dispose the geometry specific to this instance.
     * Note: we don't also dispose the derived material here because if anything else is
     * sharing the same base material it will result in a pause next frame as the program
     * is recompiled. Instead users can dispose the base material manually, like normal,
     * and we'll also dispose the derived material at that time.
     */
    dispose() {
      this.geometry.dispose();
    }

    /**
     * @property {TroikaTextRenderInfo|null} textRenderInfo
     * @readonly
     * The current processed rendering data for this TextMesh, returned by the TextBuilder after
     * a `sync()` call. This will be `null` initially, and may be stale for a short period until
     * the asynchrous `sync()` process completes.
     */
    get textRenderInfo() {
      return this._textRenderInfo || null
    }

    // Handler for automatically wrapping the base material with our upgrades. We do the wrapping
    // lazily on _read_ rather than write to avoid unnecessary wrapping on transient values.
    get material() {
      let derivedMaterial = this._derivedMaterial;
      const baseMaterial = this._baseMaterial || this._defaultMaterial || (this._defaultMaterial = defaultMaterial.clone());
      if (!derivedMaterial || derivedMaterial.baseMaterial !== baseMaterial) {
        derivedMaterial = this._derivedMaterial = createTextDerivedMaterial(baseMaterial);
        // dispose the derived material when its base material is disposed:
        baseMaterial.addEventListener('dispose', function onDispose() {
          baseMaterial.removeEventListener('dispose', onDispose);
          derivedMaterial.dispose();
        });
      }
      // If text outline is configured, render it as a preliminary draw using Three's multi-material
      // feature (see GlyphsGeometry which sets up `groups` for this purpose) Doing it with multi
      // materials ensures the layers are always rendered consecutively in a consistent order.
      // Each layer will trigger onBeforeRender with the appropriate material.
      if (this.outlineWidth || this.outlineBlur || this.outlineOffsetX || this.outlineOffsetY) {
        let outlineMaterial = derivedMaterial._outlineMtl;
        if (!outlineMaterial) {
          outlineMaterial = derivedMaterial._outlineMtl = Object.create(derivedMaterial, {
            id: {value: derivedMaterial.id + 0.1}
          });
          outlineMaterial.isTextOutlineMaterial = true;
          outlineMaterial.depthWrite = false;
          outlineMaterial.map = null; //???
          derivedMaterial.addEventListener('dispose', function onDispose() {
            derivedMaterial.removeEventListener('dispose', onDispose);
            outlineMaterial.dispose();
          });
        }
        return [
          outlineMaterial,
          derivedMaterial
        ]
      } else {
        return derivedMaterial
      }
    }
    set material(baseMaterial) {
      if (baseMaterial && baseMaterial.isTroikaTextMaterial) { //prevent double-derivation
        this._derivedMaterial = baseMaterial;
        this._baseMaterial = baseMaterial.baseMaterial;
      } else {
        this._baseMaterial = baseMaterial;
      }
    }

    get glyphGeometryDetail() {
      return this.geometry.detail
    }
    set glyphGeometryDetail(detail) {
      this.geometry.detail = detail;
    }

    get curveRadius() {
      return this.geometry.curveRadius
    }
    set curveRadius(r) {
      this.geometry.curveRadius = r;
    }

    // Create and update material for shadows upon request:
    get customDepthMaterial() {
      return first(this.material).getDepthMaterial()
    }
    get customDistanceMaterial() {
      return first(this.material).getDistanceMaterial()
    }

    _prepareForRender(material) {
      const isOutline = material.isTextOutlineMaterial;
      const uniforms = material.uniforms;
      const textInfo = this.textRenderInfo;
      if (textInfo) {
        const {sdfTexture, blockBounds} = textInfo;
        uniforms.uTroikaSDFTexture.value = sdfTexture;
        uniforms.uTroikaSDFTextureSize.value.set(sdfTexture.image.width, sdfTexture.image.height);
        uniforms.uTroikaSDFGlyphSize.value = textInfo.sdfGlyphSize;
        uniforms.uTroikaSDFExponent.value = textInfo.sdfExponent;
        uniforms.uTroikaTotalBounds.value.fromArray(blockBounds);
        uniforms.uTroikaUseGlyphColors.value = !isOutline && !!textInfo.glyphColors;

        let distanceOffset = 0;
        let blurRadius = 0;
        let strokeWidth = 0;
        let fillOpacity;
        let strokeOpacity;
        let strokeColor;
        let offsetX = 0;
        let offsetY = 0;

        if (isOutline) {
          let {outlineWidth, outlineOffsetX, outlineOffsetY, outlineBlur, outlineOpacity} = this;
          distanceOffset = this._parsePercent(outlineWidth) || 0;
          blurRadius = Math.max(0, this._parsePercent(outlineBlur) || 0);
          fillOpacity = outlineOpacity;
          offsetX = this._parsePercent(outlineOffsetX) || 0;
          offsetY = this._parsePercent(outlineOffsetY) || 0;
        } else {
          strokeWidth = Math.max(0, this._parsePercent(this.strokeWidth) || 0);
          if (strokeWidth) {
            strokeColor = this.strokeColor;
            uniforms.uTroikaStrokeColor.value.set(strokeColor == null ? defaultStrokeColor : strokeColor);
            strokeOpacity = this.strokeOpacity;
            if (strokeOpacity == null) strokeOpacity = 1;
          }
          fillOpacity = this.fillOpacity;
        }

        uniforms.uTroikaDistanceOffset.value = distanceOffset;
        uniforms.uTroikaPositionOffset.value.set(offsetX, offsetY);
        uniforms.uTroikaBlurRadius.value = blurRadius;
        uniforms.uTroikaStrokeWidth.value = strokeWidth;
        uniforms.uTroikaStrokeOpacity.value = strokeOpacity;
        uniforms.uTroikaFillOpacity.value = fillOpacity == null ? 1 : fillOpacity;
        uniforms.uTroikaCurveRadius.value = this.curveRadius || 0;

        let clipRect = this.clipRect;
        if (clipRect && Array.isArray(clipRect) && clipRect.length === 4) {
          uniforms.uTroikaClipRect.value.fromArray(clipRect);
        } else {
          // no clipping - choose a finite rect that shouldn't ever be reached by overflowing glyphs or outlines
          const pad = (this.fontSize || 0.1) * 100;
          uniforms.uTroikaClipRect.value.set(
            blockBounds[0] - pad,
            blockBounds[1] - pad,
            blockBounds[2] + pad,
            blockBounds[3] + pad
          );
        }
        this.geometry.applyClipRect(uniforms.uTroikaClipRect.value);
      }
      uniforms.uTroikaSDFDebug.value = !!this.debugSDF;
      material.polygonOffset = !!this.depthOffset;
      material.polygonOffsetFactor = material.polygonOffsetUnits = this.depthOffset || 0;

      // Shortcut for setting material color via `color` prop on the mesh; this is
      // applied only to the derived material to avoid mutating a shared base material.
      const color = isOutline ? (this.outlineColor || 0) : this.color;

      if (color == null) {
        delete material.color; //inherit from base
      } else {
        const colorObj = material.hasOwnProperty('color') ? material.color : (material.color = new Color());
        if (color !== colorObj._input || typeof color === 'object') {
          colorObj.set(colorObj._input = color);
        }
      }

      // base orientation
      let orient = this.orientation || defaultOrient;
      if (orient !== material._orientation) {
        let rotMat = uniforms.uTroikaOrient.value;
        orient = orient.replace(/[^-+xyz]/g, '');
        let match = orient !== defaultOrient && orient.match(/^([-+])([xyz])([-+])([xyz])$/);
        if (match) {
          let [, hSign, hAxis, vSign, vAxis] = match;
          tempVec3a.set(0, 0, 0)[hAxis] = hSign === '-' ? 1 : -1;
          tempVec3b.set(0, 0, 0)[vAxis] = vSign === '-' ? -1 : 1;
          tempMat4.lookAt(origin, tempVec3a.cross(tempVec3b), tempVec3b);
          rotMat.setFromMatrix4(tempMat4);
        } else {
          rotMat.identity();
        }
        material._orientation = orient;
      }
    }

    _parsePercent(value) {
      if (typeof value === 'string') {
        let match = value.match(/^(-?[\d.]+)%$/);
        let pct = match ? parseFloat(match[1]) : NaN;
        value = (isNaN(pct) ? 0 : pct / 100) * this.fontSize;
      }
      return value
    }

    /**
     * Translate a point in local space to an x/y in the text plane.
     */
    localPositionToTextCoords(position, target = new Vector2()) {
      target.copy(position); //simple non-curved case is 1:1
      const r = this.curveRadius;
      if (r) { //flatten the curve
        target.x = Math.atan2(position.x, Math.abs(r) - Math.abs(position.z)) * Math.abs(r);
      }
      return target
    }

    /**
     * Translate a point in world space to an x/y in the text plane.
     */
    worldPositionToTextCoords(position, target = new Vector2()) {
      tempVec3a.copy(position);
      return this.localPositionToTextCoords(this.worldToLocal(tempVec3a), target)
    }

    /**
     * @override Custom raycasting to test against the whole text block's max rectangular bounds
     * TODO is there any reason to make this more granular, like within individual line or glyph rects?
     */
    raycast(raycaster, intersects) {
      const {textRenderInfo, curveRadius} = this;
      if (textRenderInfo) {
        const bounds = textRenderInfo.blockBounds;
        const raycastMesh = curveRadius ? getCurvedRaycastMesh() : getFlatRaycastMesh();
        const geom = raycastMesh.geometry;
        const {position, uv} = geom.attributes;
        for (let i = 0; i < uv.count; i++) {
          let x = bounds[0] + (uv.getX(i) * (bounds[2] - bounds[0]));
          const y = bounds[1] + (uv.getY(i) * (bounds[3] - bounds[1]));
          let z = 0;
          if (curveRadius) {
            z = curveRadius - Math.cos(x / curveRadius) * curveRadius;
            x = Math.sin(x / curveRadius) * curveRadius;
          }
          position.setXYZ(i, x, y, z);
        }
        geom.boundingSphere = this.geometry.boundingSphere;
        geom.boundingBox = this.geometry.boundingBox;
        raycastMesh.matrixWorld = this.matrixWorld;
        raycastMesh.material.side = this.material.side;
        tempArray.length = 0;
        raycastMesh.raycast(raycaster, tempArray);
        for (let i = 0; i < tempArray.length; i++) {
          tempArray[i].object = this;
          intersects.push(tempArray[i]);
        }
      }
    }

    copy(source) {
      // Prevent copying the geometry reference so we don't end up sharing attributes between instances
      const geom = this.geometry;
      super.copy(source);
      this.geometry = geom;

      COPYABLE_PROPS.forEach(prop => {
        this[prop] = source[prop];
      });
      return this
    }

    clone() {
      return new this.constructor().copy(this)
    }
  }


  // Create setters for properties that affect text layout:
  SYNCABLE_PROPS.forEach(prop => {
    const privateKey = '_private_' + prop;
    Object.defineProperty(Text.prototype, prop, {
      get() {
        return this[privateKey]
      },
      set(value) {
        if (value !== this[privateKey]) {
          this[privateKey] = value;
          this._needsSync = true;
        }
      }
    });
  });


  // Deprecation handler for `anchor` array:
  let deprMsgShown = false;
  Object.defineProperty(Text.prototype, 'anchor', {
    get() {
      return this._deprecated_anchor
    },
    set(val) {
      this._deprecated_anchor = val;
      if (!deprMsgShown) {
        console.warn('TextMesh: `anchor` has been deprecated; use `anchorX` and `anchorY` instead.');
        deprMsgShown = true;
      }
      if (Array.isArray(val)) {
        this.anchorX = `${(+val[0] || 0) * 100}%`;
        this.anchorY = `${(+val[1] || 0) * 100}%`;
      } else {
        this.anchorX = this.anchorY = 0;
      }
    }
  });

  return Text
})();

// eslint-disable-next-line prettier/prettier
const Text$1 = /*#__PURE__*/react.forwardRef(({
  anchorX = 'center',
  anchorY = 'middle',
  children,
  onSync,
  ...props
}, ref) => {
  const invalidate = useThree(({
    invalidate
  }) => invalidate);
  const [troikaMesh] = react.useState(() => new Text());
  const [nodes, text] = react.useMemo(() => {
    const n = [];
    let t = '';
    react.Children.forEach(children, child => {
      if (typeof child === 'string' || typeof child === 'number') {
        t += child;
      } else {
        n.push(child);
      }
    });
    return [n, t];
  }, [children]);
  react.useLayoutEffect(() => void troikaMesh.sync(() => {
    invalidate();
    if (onSync) onSync(troikaMesh);
  }));
  react.useEffect(() => {
    return () => troikaMesh.dispose();
  }, [troikaMesh]);
  return /*#__PURE__*/react.createElement("primitive", _extends({
    object: troikaMesh,
    ref: ref,
    text: text,
    anchorX: anchorX,
    anchorY: anchorY
  }, props), nodes);
});

const presetsObj = {
  sunset: 'venice_sunset_1k.hdr',
  dawn: 'kiara_1_dawn_1k.hdr',
  night: 'dikhololo_night_1k.hdr',
  warehouse: 'empty_warehouse_01_1k.hdr',
  forest: 'forest_slope_1k.hdr',
  apartment: 'lebombo_1k.hdr',
  studio: 'studio_small_03_1k.hdr',
  city: 'potsdamer_platz_1k.hdr',
  park: 'rooitou_park_1k.hdr',
  lobby: 'st_fagans_interior_1k.hdr'
};

function getTexture(texture, gen, isCubeMap) {
  if (isCubeMap) {
    gen.compileEquirectangularShader();
    return gen.fromCubemap(texture).texture;
  }

  return gen.fromEquirectangular(texture).texture;
}

const CUBEMAP_ROOT = 'https://rawcdn.githack.com/pmndrs/drei-assets/aa3600359ba664d546d05821bcbca42013587df2';
function Environment({
  background = false,
  files = ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'],
  path = '',
  preset = undefined,
  scene,
  extensions
}) {
  if (preset) {
    if (!(preset in presetsObj)) {
      throw new Error('Preset must be one of: ' + Object.keys(presetsObj).join(', '));
    }

    files = presetsObj[preset];
    path = CUBEMAP_ROOT + '/hdri/';
  }

  const defaultScene = useThree(({
    scene
  }) => scene);
  const gl = useThree(({
    gl
  }) => gl);
  const isCubeMap = Array.isArray(files);
  const loader = isCubeMap ? CubeTextureLoader : RGBELoader; // @ts-expect-error

  const loaderResult = useLoader(loader, isCubeMap ? [files] : files, loader => {
    loader.setPath(path);
    if (extensions) extensions(loader);
  });
  const map = isCubeMap ? loaderResult[0] : loaderResult; // PMREMGenerator takes its sweet time to generate the env-map,
  // Let's make this part of suspense, or else it just yields a frame-skip

  const texture = useAsset(() => new Promise(res => {
    const gen = new PMREMGenerator(gl);
    const texture = getTexture(map, gen, isCubeMap);
    gen.dispose();
    res(texture);
  }), map);
  react.useLayoutEffect(() => {
    const oldbg = scene ? scene.background : defaultScene.background;
    const oldenv = scene ? scene.environment : defaultScene.environment;

    if (scene) {
      scene.environment = texture;
      if (background) scene.background = texture;
    } else {
      defaultScene.environment = texture;
      if (background) defaultScene.background = texture;
    }

    return () => {
      if (scene) {
        scene.environment = oldenv;
        scene.background = oldbg;
      } else {
        defaultScene.environment = oldenv;
        defaultScene.background = oldbg;
      } // Environment textures are volatile, better dispose and uncache them


      useAsset.clear(map);
      texture.dispose();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texture, background, scene]);
  return null;
}

const OrthographicCamera = /*#__PURE__*/react.forwardRef(({
  makeDefault,
  manual,
  ...props
}, ref) => {
  const set = useThree(({
    set
  }) => set);
  const camera = useThree(({
    camera
  }) => camera);
  const size = useThree(({
    size
  }) => size);
  const cameraRef = react.useRef();
  react.useLayoutEffect(() => {
    if (cameraRef.current && !manual) {
      cameraRef.current.updateProjectionMatrix();
    }
  }, [size, props]);
  react.useLayoutEffect(() => {
    if (makeDefault && cameraRef.current) {
      const oldCam = camera;
      set(() => ({
        camera: cameraRef.current
      }));
      return () => set(() => ({
        camera: oldCam
      }));
    }
  }, [camera, cameraRef, makeDefault, set]);
  return /*#__PURE__*/react.createElement("orthographicCamera", _extends({
    left: size.width / -2,
    right: size.width / 2,
    top: size.height / 2,
    bottom: size.height / -2,
    ref: mergeRefs([cameraRef, ref])
  }, props));
});

const OrbitControls$1 = /*#__PURE__*/react.forwardRef(({
  makeDefault,
  camera,
  regress,
  domElement,
  enableDamping = true,
  ...restProps
}, ref) => {
  const invalidate = useThree(({
    invalidate
  }) => invalidate);
  const defaultCamera = useThree(({
    camera
  }) => camera);
  const gl = useThree(({
    gl
  }) => gl);
  const set = useThree(({
    set
  }) => set);
  const get = useThree(({
    get
  }) => get);
  const performance = useThree(({
    performance
  }) => performance);
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || gl.domElement;
  const controls = react.useMemo(() => new OrbitControls(explCamera), [explCamera]);
  useFrame(() => {
    if (controls.enabled) controls.update();
  });
  react.useEffect(() => {
    const callback = () => {
      invalidate();
      if (regress) performance.regress();
    };

    controls.connect(explDomElement);
    controls.addEventListener('change', callback);
    return () => {
      controls.removeEventListener('change', callback);
      controls.dispose();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regress, controls, invalidate]);
  react.useEffect(() => {
    if (makeDefault) {
      // @ts-expect-error new in @react-three/fiber@7.0.5
      const old = get().controls; // @ts-expect-error new in @react-three/fiber@7.0.5

      set({
        controls
      }); // @ts-expect-error new in @react-three/fiber@7.0.5

      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return /*#__PURE__*/react.createElement("primitive", _extends({
    ref: ref,
    object: controls,
    enableDamping: enableDamping
  }, restProps));
});

// @ts-ignore

function extensions(useDraco, useMeshopt, extendLoader) {
  return loader => {
    if (extendLoader) {
      extendLoader(loader);
    }

    if (useDraco) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(typeof useDraco === 'string' ? useDraco : 'https://www.gstatic.com/draco/v1/decoders/');
      loader.setDRACOLoader(dracoLoader);
    }

    if (useMeshopt) {
      loader.setMeshoptDecoder(MeshoptDecoder);
    }
  };
}

function useGLTF(path, useDraco = true, useMeshOpt = true, extendLoader) {
  const gltf = useLoader(GLTFLoader, path, extensions(useDraco, useMeshOpt, extendLoader));
  return gltf;
}

useGLTF.preload = (path, useDraco = true, useMeshOpt = true, extendLoader) => useLoader.preload(GLTFLoader, path, extensions(useDraco, useMeshOpt, extendLoader)); // @ts-expect-error new in r3f 7.0.5


useGLTF.clear = input => useLoader.clear(GLTFLoader, input);

const eps = 0.00001;

function createShape(width, height, radius0) {
  const shape = new Shape();
  const radius = radius0 - eps;
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
  shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
  shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
  shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
  return shape;
}

const RoundedBox = /*#__PURE__*/react.forwardRef(function RoundedBox({
  args: [width = 1, height = 1, depth = 1] = [],
  radius = 0.05,
  smoothness = 4,
  children,
  ...rest
}, ref) {
  const shape = react.useMemo(() => createShape(width, height, radius), [width, height, radius]);
  const params = react.useMemo(() => ({
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: smoothness * 2,
    steps: 1,
    bevelSize: radius - eps,
    bevelThickness: radius,
    curveSegments: smoothness
  }), [depth, radius, smoothness]);
  const geomRef = react.useRef();
  react.useLayoutEffect(() => {
    if (geomRef.current) {
      geomRef.current.center();
    }
  }, [shape, params]);
  return /*#__PURE__*/react.createElement("mesh", _extends({
    ref: ref
  }, rest), /*#__PURE__*/react.createElement("extrudeBufferGeometry", {
    attach: "geometry",
    ref: geomRef,
    args: [shape, params]
  }), children);
});

export { Environment, Line, OrbitControls$1 as OrbitControls, OrthographicCamera, Ring, RoundedBox, Text$1 as Text, useGLTF };
