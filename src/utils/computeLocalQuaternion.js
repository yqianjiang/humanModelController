import { Quaternion, Euler } from 'three';

const _quat = new Quaternion();
const _euler = new Euler();

/**
 * 
 * @param {Quaternion} currentWorldQuaternion 
 * @param {Quaternion} currentLocalQuaternion 
 * @param {[number, number, number]} targetWorldAngles 
 * @returns targetLocalQuaternion
 */
export function computeLocalQuaternion(currentWorldQuaternion, currentLocalQuaternion, targetWorldAngles) {
  // 世界坐标系下的目标旋转角度
  const targetWorldQuaternion = _quat.setFromEuler(_euler.fromArray(targetWorldAngles));

  // 计算当前世界四元数与当前局部四元数的关系，这是转换四元数
  const conversionQuaternion = currentWorldQuaternion.clone().multiply(currentLocalQuaternion.clone().invert());

  // 让转换四元数作用在目标世界四元数上，得到目标局部四元数
  const targetLocalQuaternion = conversionQuaternion.multiply(targetWorldQuaternion);

  return targetLocalQuaternion;
}
