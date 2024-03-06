const AXIS_MAP = {
  'x': {
    index: 0,
    factor: 1,
  },
  '-x': {
    index: 0,
    factor: -1,
  },
  'y': {
    index: 1,
    factor: 1,
  },
  '-y': {
    index: 1,
    factor: -1,
  },
  'z': {
    index: 2,
    factor: 1,
  },
  '-z': {
    index: 2,
    factor: -1,
  },
}

/**
 * @param {*} direction 希望朝向的方向
 * @param {*} angle 希望的旋转角度
 */
export const calculateAngles = ({ axis, angle }) => {
  // 将角度转换为弧度
  const radians = angle * Math.PI / 180;
  const { index, factor } = AXIS_MAP[axis];
  if (!index && !factor) {
    console.log(direction);
    console.error('未知的方向');
    return;
  }
  let angles = [0, 0, 0];
  angles[index] = radians * factor;
  return angles;
}
