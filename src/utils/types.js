
export class ScriptDescription {
  constructor(variables, scriptFlow, executionMethod, speedGear, speedCurveType, frequency) {
    // 变量
    this.variables = variables;
    // 脚本流程: 要点[],
    this.scriptFlow = scriptFlow;
    // 执行方式
    this.executionMethod = executionMethod;
    // 速度档位
    this.speedGear = speedGear;
    // 变速曲线类型
    this.speedCurveType = speedCurveType;
    // 次数
    this.frequency = frequency;
  }
}

// type 要点 = {部位, 目标姿态或动作}[]
export class KeyPoint {
  constructor(part, targetPoseOrAction) {
    this.part = part;
    this.targetPoseOrAction = targetPoseOrAction;
  }
}

// type 选择符 = "往出端选" | "往入端选"
class Selector {
  towardsOutlet() {
    return "往出端选";
  }

  towardsInlet() {
    return "往入端选";
  }

  selectPartsByReferenceAndSelector({ reference, selector }) {
    // User defined function
  }

  standardizeSelector(string) {
    // User defined function
  }
};

// 目标姿态或动作 = 姿态 | 动作
const TargetPoseOrAction = {
  pose: null, // type 姿势
  action: null,  // type 动作 = 绕关节旋转 | 移动
};

export class Pose {
  constructor(poseName) {
    this.poseName = poseName;
  }
}

export class Action {
  constructor(type) {
    this.type = type;
  }
}

// 移动
export class Move extends Action {
  constructor(direction, action, endPoint, startPoint, speedGear, speedCurve) {
    super("move");
    // 方向
    this.direction = direction;
    // 动作
    this.action = action;
    // 终点: 典型位置 | 定位器的返回值（位置）
    this.endPoint = endPoint;
    // 起点
    this.startPoint = startPoint;
    // 速度档位?: "低速" | "高速"
    this.speedGear = speedGear;
    // 速度曲线
    this.speedCurve = speedCurve;
  }
}

// 绕关节旋转 = {关节, 旋转幅度, 旋转方向}
export class RotateAroundJoint extends Action {
  constructor(joint, rotationAmplitude, rotationDirection) {
    super("rotate");
    // 关节
    this.joint = joint;
    // 旋转幅度
    this.rotationAmplitude = rotationAmplitude;
    // 旋转方向
    this.rotationDirection = rotationDirection;
  }
}
