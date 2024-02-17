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

  const handleBoxClick = () => {
    // 低头 45 度
    // rotateJoint("Neck", { axis: 'x', angle: 45 });
    // 头部向左侧 45 度
    // rotateJoint("Neck", { axis: 'z', angle: 45 });
    // 头部向左看 45 度
    rotateJoint("Neck", { axis: '-y', angle: 45 });
  
    // 右手手臂整个放下（相比初始状态旋转80度左右）
    rotateJoint("RightArm", { axis: "z", angle: 80 });
  
    // 左手向前 90 度
    // rotateJoint("LeftArm", { axis: "-y", angle: 90 });

    // 左手肘向上 90 度（会受到左手向前 90 度的影响）
    rotateJoint("LeftForeArm", { axis: "z", angle: 90 });
  
    // 左手手掌向下 90 度（会受到左手肘向上 90 度的影响）
    // rotateJoint("LeftHand", { axis: "-z", angle: 90 });
  
    // 右大腿往前
    // rotateJoint("RightUpLeg", { axis: "-x", angle: 90 });
    
    // 放下右小腿
    rotateJoint("RightLeg", { axis: "x", angle: 90 });
    
    // 左小腿往后
    // rotateJoint("LeftLeg", { axis: "x", angle: 90 });
  }

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
      <mesh onClick={handleBoxClick} position={[0.5,2,0]}>
        <boxGeometry args={[0.1, 0.1, 0.01]}/>
        <meshStandardMaterial /> 
      </mesh>
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
