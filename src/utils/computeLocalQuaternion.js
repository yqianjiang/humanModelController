import { Quaternion, Euler } from 'three';

const _quat = new Quaternion();
const _euler = new Euler();

/**
 * 返回 local 的目标旋转角度
 * @param {*} currentLocalQuaternion
 * @param {[number, number, number]} targetAngles 目标旋转角度（以相机为参考）
 *
 */
export function computeLocalQuaternion(currentLocalQuaternion, targetAngles) {
  // 世界坐标系下的目标旋转角度
  const targetWorldQuaternion = _quat.setFromEuler(_euler.fromArray(targetAngles));

  // 计算从局部坐标系到世界坐标系的逆变换四元数
  const inverseLocalToWorldQuaternion = currentLocalQuaternion.clone().invert();

  // 计算目标局部坐标系四元数
  const targetLocalQuaternion = targetWorldQuaternion.clone().multiply(inverseLocalToWorldQuaternion);

  return targetLocalQuaternion;
}
