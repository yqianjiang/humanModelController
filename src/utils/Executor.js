import { BodyComponent, Block, Joint, ComposedComponent, 从字符串获取部位实例 } from "./BodyComponent";
import { Pose, Action } from "./types";
import { calculateAngles } from "./calculateAngles";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Executor {
  constructor(executeAction, setSpeed) {
    this.activeComponents = [];
    this.executeAction = executeAction;
    this.setSpeed = setSpeed;
    this.actionInterval = 1000;
    this.frequencyInterval = 1000;
    this.stop = false;
  }

  setSpeedByGear(gear) {
    switch (gear) {
      case "低速":
        this.setSpeed(0.01);
        this.actionInterval = 2000;
        this.frequencyInterval = 2000;
        break;
      case "高速":
        this.setSpeed(0.1);
        this.actionInterval = 200;
        this.frequencyInterval = 200;
        break;
      default:
        this.setSpeed(0.05);
        this.actionInterval = 500;
        this.frequencyInterval = 500;
    }
  }

  /**
   * 执行脚本
   * @param {string[]} components 
   * @param {*} script 
   */
  executeActionScript(components, script) {
    // Assign the script variables to the components
    const variableMap = components.reduce((acc, comp, i) => {
      acc[script.variables[i]] = comp;
      return acc;
    }, {});

    // todo: 设置速度
    this.setSpeedByGear(script.speedGear);

    // If the execution method is "循环", then loop
    if (script.executionMethod === "循环") {
      this.executeLoopScript(script, variableMap);
    } else if (script.frequency) {
      this.executeScriptNTimes(script, variableMap, script.frequency);
    }
  }

  async executeLoopScript(script, variableMap) {
    while (!this.stop) {
      await this.executeScript(script, variableMap);
      // 每次执行完毕后，等待一段时间
      await sleep(this.frequencyInterval);
    }
  }

  // 执行脚本一定次数
  async executeScriptNTimes(script, variableMap, n) {
    for (let i = 0; i < n; i++) {
      await this.executeScript(script, variableMap);
      // 每次执行完毕后，等待一段时间
      await sleep(this.frequencyInterval);
    }
  }

  async executeScript(script, variableMap) {
    for (const item of script.scriptFlow) {
      item.keyPoints.forEach((keypoint) => {
        const { part, targetPoseOrAction } = keypoint;
        const component = variableMap[part];

        if (targetPoseOrAction) {
          this.executePoseOrAction(component, targetPoseOrAction);
        } else {
          console.error("Invalid targetPoseOrAction");
        }
      });
      // 等待一段时间
      await sleep(this.actionInterval);
    }
  }

  // 批量执行姿态或动作（对所有部位执行相同的姿态或动作）
  batchExecutePoseOrAction(components, targetPoseOrAction) {
    if (components) {
      this.activeComponents = components.map(从字符串获取部位实例);
    }
    this.activeComponents.forEach((component) => {
      this._executePoseOrAction(component, targetPoseOrAction);
    });
  }

  executePoseOrAction(component, targetPoseOrAction) {
    if (component) {
      this.activeComponents = [从字符串获取部位实例(component)];
    }

    this._executePoseOrAction(this.activeComponents[0], targetPoseOrAction);
  }

  _executePoseOrAction(component, targetPoseOrAction) {
    // Depending on the type of the current active component, call relevant methods
    if (component instanceof Block) {
      // 判断 targetPoseOrAction 是姿态还是动作
      if (targetPoseOrAction instanceof Pose) {
        this._executeBlockPose(component, targetPoseOrAction);
      } else if (targetPoseOrAction instanceof Action) {
        this._executeBlockAction(component, targetPoseOrAction);
      }
    } else if (component instanceof Joint) {
      // 判断 targetPoseOrAction 是姿态还是动作
      if (targetPoseOrAction instanceof Pose) {
        this._executeJointPose(component, targetPoseOrAction);
      } else if (targetPoseOrAction instanceof Action) {
        this._executeJointAction(component, targetPoseOrAction);
      }
    } else if (component instanceof ComposedComponent) {
      // 判断 targetPoseOrAction 是姿态还是动作
      if (targetPoseOrAction instanceof Pose) {
        this._executeComposedComponentPose(component, targetPoseOrAction);
      } else if (targetPoseOrAction instanceof Action) {
        this._executeComposedComponentAction(component, targetPoseOrAction);
      }
    } else if (component instanceof BodyComponent) {
      // 判断 targetPoseOrAction 是姿态还是动作
      if (targetPoseOrAction instanceof Pose) {
        this._executeGeneralPose(component, targetPoseOrAction);
      } else if (targetPoseOrAction instanceof Action) {
        this._executeGeneralAction(component, targetPoseOrAction);
      }
    }
  }

  _executeBlockPose(block, targetPose) {
    block.setPose(targetPose.poseName);
  }

  _executeBlockAction(block, targetAction) {
    console.log('executeBlockAction', block, targetAction);
    const { type, joint, rotationAmplitude, rotationDirection } = targetAction;
    if (type === 'rotate') {
      // 旋转整个体块，涉及到多个关节
      block.getRotationJoints().map(jointComponent =>
        this._rotateJoint(jointComponent.name, jointComponent.获取旋转参数(joint, rotationAmplitude, rotationDirection)));
    } else if (type === 'move') {
      // Implement corresponding logic here because the targetAction structure for 'move' has not been specified
    }
  }

  // 执行关节姿态
  _executeJointPose(joint, targetPose) {

  }

  /**
   * 执行关节动作
   * @param {*} joint 
   * @param {*} targetAction  绕关节旋转 | 移动
   *      
   * type: "rotate" | "move",
   */
  _executeJointAction(jointComponent, targetAction) {
    const { type, joint, rotationAmplitude, rotationDirection } = targetAction;
    if (type === 'rotate') {
      this._rotateJoint(jointComponent.name, jointComponent.获取旋转参数(joint, rotationAmplitude, rotationDirection));
    } else if (type === 'move') {
      // Implement corresponding logic here because the targetAction structure for 'move' has not been specified
    }
  }

  _rotateJoint(jointName, params) {
    const angles = calculateAngles(params);
    this.executeAction(
      { type: "joint", name: jointName },
      "rotate",
      { angles }
    );
  }

  _executeComposedComponentPose(composedComponent, targetPose) {

  }

  _executeComposedComponentAction(composedComponent, targetAction) {

  }
  _executeGeneralPose(generalBodyComponent, targetPose) {

  }

  _executeGeneralAction(generalBodyComponent, targetAction) {

  }
}

export default Executor;
