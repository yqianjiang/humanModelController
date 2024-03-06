/**
 * 
 * class 人体构件 {
  标准名称
}

class 体块类 extends 人体构件 {
  入端关节: 关节类
  出端关节: 关节类
}
class 关节类 extends 人体构件 {
  入端体块: 体块类
  出端体块: 体块类
}
class 统称类 extends 人体构件 {
  成员: 体块类 | 关节类 | 统称类
}
 */

// 人体构件
export class BodyComponent {
  constructor(name) {
    this.standardName = name;
    this.name = name;
  }
}

// 体块类
export class Block extends BodyComponent {
  constructor(name, inletJoint, outletJoint) {
    super(name);
    this.inletJoint = inletJoint;
    this.outletJoint = outletJoint;
  }

  // 旋转时需要动的关节
  setRotationJoints(joints) {
    this.rotationJoints = joints;
  }

  // 获取旋转时需要动的关节
  getRotationJoints() {
    return this.poseJointsMap[this.pose];
  }

  setPose(pose) {
    this.pose = pose;
  }

  setPoseJointsMap(poseJointsMap) {
    this.poseJointsMap = poseJointsMap;
  }

  获取各关节旋转参数(joint, rotationAmplitude, rotationDirection) {
    return this.getRotationJoints().map(x => x.获取旋转参数(joint, rotationAmplitude, rotationDirection));
  }
}

// 关节类
export class Joint extends BodyComponent {
  constructor(name, inletBlock, outletBlock) {
    super(name);
    this.inletBlock = inletBlock;
    this.outletBlock = outletBlock;
  }

  set关节方向Map(关节方向Map) {
    this.关节方向Map = 关节方向Map;
  }

  set关节幅度Map(关节幅度Map) {
    this.关节幅度Map = 关节幅度Map;
  }

  获取旋转参数(joint, rotationAmplitude, rotationDirection) {
    // 查表，根据关节和旋转方向确定 axis 和 angle
    const axis = this.关节方向Map[joint][rotationDirection];

    if (!axis) {
      console.error("未知的关节");
      return;
    }

    const angle = this.关节幅度Map[joint][rotationAmplitude || "中"];

    return { axis, angle };
  }
}

// 复合类
export class ComposedComponent extends BodyComponent {
  constructor(name, members) {
    super(name);
    this.members = members;
  }
}

// 左腿
const leftUpLegJoint = new Joint("LeftUpLeg", null, null);
// const leftLegJoint = new Joint("leftLeg", null, null);
// 左脚
const leftFootJoint = new Joint("LeftFoot", null, null);
const leftLegBlock = new Block("LeftLeg", leftUpLegJoint, leftFootJoint);
leftLegBlock.setPoseJointsMap({
  "直": [leftUpLegJoint],
  "弯": [leftUpLegJoint],
});

// 右腿
const rightUpLegJoint = new Joint("RightUpLeg", null, null);
// 右脚
const rightFootJoint = new Joint("RightFoot", null, null);
const rightLegBlock = new Block("RightLeg", rightUpLegJoint, rightFootJoint);
rightLegBlock.setPoseJointsMap({
  "直": [rightUpLegJoint],
  "弯": [rightUpLegJoint],
});

const 关节方向Map = {
  "髋": {
    "上": 'x',
    "下": '-x',
  },
}
const 关节幅度Map = {
  "髋": {
    "小": 15,
    "中": 30,
    "大": 45,
  },
}
leftUpLegJoint.set关节幅度Map(关节幅度Map);
leftUpLegJoint.set关节方向Map(关节方向Map);
rightUpLegJoint.set关节幅度Map(关节幅度Map);
rightUpLegJoint.set关节方向Map(关节方向Map);

const 部位类型Map = {
  "左腿": leftLegBlock,
  "右腿": rightLegBlock,
}

export function 从字符串获取部位实例(部位) {
  return 部位类型Map[部位];
}
