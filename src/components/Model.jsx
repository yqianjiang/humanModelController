import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useAction } from "../hooks/useAction";
import { Vector3, Quaternion } from "three";
import { useFrame } from "@react-three/fiber";

export default function Model(props) {
  const rightEyeMeshRef = useRef();
  const leftEyeMeshRef = useRef();
  const { nodes, animations } =
    useGLTF("/models/Xbot.glb");
  console.log({
    nodes,
    animations,
  });

  // const { ref } = useAnimations(animations);
  const { rotateJoint } = useAction({ nodes });
  useEffect(() => {
    // 抬头 45 度
    rotateJoint("Head", { direction: "up", angle: 45 });

    // 右手手臂整个放下（朝右，相比初始状态旋转80度左右）
    rotateJoint("RightArm", { direction: "right", angle: 80 });

    // 左手向前
    rotateJoint("LeftArm", { direction: "forward", angle: 90 });

    // 左手小臂抬起 90 度【手的方向还是不太符合预期...还要再做另外一个转换？】
    rotateJoint("LeftForeArm", { direction: "right", angle: 90 });

    // 左手手掌向下 90 度【手的方向还是不太符合预期...还要再做另外一个转换？】
    rotateJoint("LeftHand", { direction: "left", angle: 90 });

    // 抬起右腿
    rotateJoint("RightUpLeg", { direction: "up", angle: 90 });
    rotateJoint("RightLeg", { direction: "down", angle: 90 });

    // 左腿往后踢
    // rotateJoint("LeftLeg", { direction: "down", angle: 90 });
  }, []);

  // useFrame(() => {
  //   // 设置眼睛 Mesh 的位置
  //   const rightEyeRotation = new Quaternion();
  //   nodes.mixamorigRightEye.getWorldQuaternion(rightEyeRotation);
  //   rightEyeMeshRef.current.quaternion.copy(rightEyeRotation);
  //   const rightEyePosition = new Vector3();
  //   nodes.mixamorigRightEye.getWorldPosition(rightEyePosition);
  //   rightEyeMeshRef.current.position.set(rightEyePosition.x, rightEyePosition.y, rightEyePosition.z+0.33);
  //   const leftEyePosition = new Vector3();
  //   nodes.mixamorigLeftEye.getWorldPosition(leftEyePosition);
  //   leftEyeMeshRef.current.position.set(leftEyePosition.x, leftEyePosition.y, leftEyePosition.z+0.33);
  // });

  return (
    <group {...props} dispose={null}>
      <group scale={[0.01, 0.01, 0.01]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.Beta_Surface.geometry}
          skeleton={nodes.Beta_Surface.skeleton}
        >
          <meshPhysicalMaterial
            color="0x9299A4"
            metalness={0.06}
            roughness={0.99}
            clearcoat={0.01}
            clearcoatRoughness={0.8099}
          />
        </skinnedMesh>
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.Beta_Joints.geometry}
          skeleton={nodes.Beta_Joints.skeleton}
        >
          <meshPhysicalMaterial
            color="0x6B7F9E"
            metalness={0.8}
            roughness={0.65}
            clearcoat={0.66}
            clearcoatRoughness={0.36}
          />
        </skinnedMesh>
              {/* 眼睛 */}
      {/* <skinnedMesh receiveShadow position={[0,0,0]} scale={[0.1*100,0.1*100,3*100]} ref={rightEyeMeshRef}>
        <skeleton bones={[nodes.mixamorigRightEye]} />
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshPhysicalMaterial
            color={0x6B7F9E}
            metalness={0.8}
            roughness={0.65}
            clearcoat={0.66}
            clearcoatRoughness={0.36}
          />
      </skinnedMesh> */}
      </group>

      {/* <skinnedMesh receiveShadow scale={[0.1,0.1,3]} ref={leftEyeMeshRef} >
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshPhysicalMaterial
            color={0x6B7F9E}
            metalness={0.8}
            roughness={0.65}
            clearcoat={0.66}
            clearcoatRoughness={0.36}
        />
        <skeleton bones={[nodes.mixamorigLeftEye]} />
      </skinnedMesh> */}
    </group>
  );
}
