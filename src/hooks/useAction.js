import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { computeLocalQuaternion } from "../utils/computeLocalQuaternion";
import { calculateAngles } from "../utils/calculateAngles";
import { Vector3, Quaternion } from "three";

function getBoneNameFromJointName(name) {
  return `mixamorig${name}`;
}

export const useAction = ({ nodes }) => {
  const movingNodes = useRef([]);
  const targetQuaternions = useRef({});

  /**
   * 旋转关节
   * @param {*} joint
   * @param {[number, number, number]} angles 数组，[x, y, z]，例如沿 x 轴旋转为 [1, 0, 0]
   */
  function _rotateJoint(joint, angles) {
    const direction = joint.getWorldDirection(new Vector3());
    const quaternion = joint.getWorldQuaternion(new Quaternion());
    console.log({
      name: joint.name,
      direction,
    })
    const targetQuaternion = computeLocalQuaternion(quaternion, angles);

    // 加入等待更新
    targetQuaternions.current[joint.name] = targetQuaternion;
    movingNodes.current.push(joint);
  }

  /**
   *
   * @param {*} part 部位，目前支持 {type: "joint", name: "Head"}
   * @param {*} actionType 目前支持 "rotate"，未来支持 "translate" 和 "scale"
   * @param {*} actionParams 如果是 rotate，则是 { angle: 45, axis: [0, 1, 0] }
   * @returns
   */
  function executeAction(part, actionType, actionParams) {
    // 检查部位类型是否为关节
    if (part.type !== "joint") {
      console.error("当前只支持关节部位的动作执行");
      return;
    }
    // 获取关节对象
    const joint = nodes[getBoneNameFromJointName(part.name)];
    // 根据动作类型执行不同的动作
    switch (actionType) {
      case "rotate":
        _rotateJoint(joint, actionParams.angles);
        break;
      default:
        console.error("未知的动作类型");
        return;
    }
  }

  function rotateJoint(jointName, params) {
    const angles = calculateAngles(params);
    executeAction(
      { type: "joint", name: jointName },
      "rotate",
      { angles }
    );
  }

  useFrame(() => {
    for (const target of movingNodes.current) {
      const currentRotation = target.quaternion.clone();
      const targetQuaternion = targetQuaternions.current[target.name];
      if (
        currentRotation.toArray().join(",") !==
        targetQuaternion.toArray().join(",")
      ) {
        target.quaternion.slerp(targetQuaternion, 0.01);
      } else {
        // 已经移动到指定参数，移除当前
        movingNodes.current = movingNodes.current.filter(
          (node) => node.name !== target.name
        );
        targetQuaternions.current[target.name] = null;
      }
    }
  });

  return {
    executeAction,
    rotateJoint,
  };
};
