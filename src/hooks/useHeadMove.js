import { useState } from "react";
import { Vector3, Quaternion } from "three";
import { useFrame } from "@react-three/fiber";

const axisX = new Vector3(1, 0, 0);
const axisY = new Vector3(0, 1, 0);
const DIRECTION_MAP = {
  left: {
    axis: axisY,
    angle: Math.PI / 2,
    angleFactor: 1,
  },
  right: {
    axis: axisY,
    angle: Math.PI / 2,
    angleFactor: -1,
  },
  top: {
    axis: axisX,
    angle: Math.PI / 4,
    angleFactor: -1,
  },
  bottom: {
    axis: axisX,
    angle: Math.PI / 4,
    angleFactor: 1,
  },
};
export const useHeadMove = ({ nodes }) => {
  const [targetQuaternion, setTargetQuaternion] = useState(0);
  function onLookAtDirection(direction, targetAngle) {
    const { axis, angle, angleFactor } = DIRECTION_MAP[direction];
    if (!targetAngle) {
      targetAngle = angle;
    } else {
      targetAngle = Math.abs(targetAngle);
      // 限制旋转角度为 0 到 angle
      targetAngle = Math.max(0, Math.min(angle, targetAngle));
    }

    const targetQuaternion = new Quaternion().setFromAxisAngle(
      axis,
      angle * angleFactor
    );
    setTargetQuaternion(targetQuaternion);
  }

  useFrame(() => {
    const currentRotation = nodes.mixamorigHead.quaternion.clone();
    if (
      currentRotation.toArray().join(",") !==
      targetQuaternion.toArray().join(",")
    ) {
      nodes.mixamorigHead.quaternion.slerp(targetQuaternion, 0.01);
    }
  });

  return {
    onLookAtDirection,
  };
};
