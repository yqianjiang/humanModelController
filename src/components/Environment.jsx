import React, { memo } from 'react'

export const Environment = memo(({ direction = [5, 5, 5] }) => (
  <>
    {/* <ambientLight /> */}
    <hemisphereLight position={[0, 20, 20]} e={0xaaaaaa} t={0x222222} />
    <directionalLight
      position={[-5, 8, 8]}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      e={0xffffff}
      t={1.4}
    />
    <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[10, 10, 1, 1]} />
      <shadowMaterial transparent opacity={0.2} />
    </mesh>
  </>
))
