
import React, { useMemo, useRef } from 'react'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { OrthographicCamera, RoundedBox, Text } from '@react-three/drei'

import { Camera, Scene } from 'three'

export default function DiceView() {
  const { gl, scene, camera, size } = useThree()
  const virtualScene = useMemo(() => new Scene(), [])
  const virtualCam = useRef<Camera>()

  useFrame(() => {
    gl.autoClear = true
    gl.render(scene, camera)
    gl.autoClear = false
    gl.clearDepth()
    if (virtualCam.current !== undefined) gl.render(virtualScene, virtualCam.current)
  }, 1)

  return createPortal(
    <>
      <OrthographicCamera ref={virtualCam} makeDefault={false} position={[0, 0, 100]} />
      <RoundedBox args={[50, 50, 50]} radius={10} smoothness={4} position={[size.width / 2 - 80, size.height / 2 - 80, 0]}>
        <meshLambertMaterial attach="material" color={'white'} />
      </RoundedBox>
      <Text position={[size.width / 2 - 80, size.height / 2 - 80, 50]} fontSize={25} color="black">
        6
      </Text>
      <RoundedBox args={[50, 50, 50]} radius={10} smoothness={4} position={[size.width / 2 - 140, size.height / 2 - 80, 0]}>
        <meshLambertMaterial attach="material" color={'white'} />
      </RoundedBox>
      <Text position={[size.width / 2 - 140, size.height / 2 - 80, 50]} fontSize={25} color="black">
        3
      </Text>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </>,
    virtualScene
  ) as JSX.Element
}

