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
class BodyComponent {
  constructor(name) {
    this.standardName = name;
  }
}

// 体块类
class Block extends BodyComponent {
  constructor(name, inletJoint, outletJoint) {
    super(name);
    this.inletJoint = inletJoint;
    this.outletJoint = outletJoint;
  }
}

// 关节类
class Joint extends BodyComponent {
  constructor(name, inletBlock, outletBlock) {
    super(name);
    this.inletBlock = inletBlock;
    this.outletBlock = outletBlock;
  }
}

// 复合类
class ComposedComponent extends BodyComponent {
  constructor(name, members) {
    super(name);
    this.members = members;
  }
}

const 部位类型Map = {
  "左腿": new Joint("左腿", new Block("左腿入端", null, null), new Block("左腿出端", null, null)),
  "右腿": new Joint("右腿", new Block("右腿入端", null, null), new Block("右腿出端", null, null)),
}

export function 从字符串获取部位实例(部位) {
  return 部位类型Map[部位];
}
