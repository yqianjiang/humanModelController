const DIRECTION_MAP = {
  'up': {
    axis: '-x',
    index: 0,
    factor: -1,
  },
  'down': {
    axis: 'x',
    index: 0,
    factor: 1,
  },
  'left': {
    axis: '-z',
    index: 2,
    factor: -1,
  },
  'right': {
    axis: 'z',
    index: 2,
    factor: 1,
  },
  'forward': {
    axis: '-y',
    index: 1,
    factor: -1,
  },
  'backward': {
    axis: 'y',
    index: 1,
    factor: 1,
  }
}

/**
 * @param {*} direction 希望朝向的方向
 * @param {*} angle 希望的旋转角度
 */
export const calculateAngles = ({direction, angle}) => {
  // 将角度转换为弧度
  const radians = angle * Math.PI / 180;
  const axis = DIRECTION_MAP[direction];
  if (!axis) {
    console.log(direction);
    console.error('未知的方向');
    return;
  }
  let angles = [0, 0, 0];
  angles[axis.index] = radians * axis.factor;
  return angles;
}