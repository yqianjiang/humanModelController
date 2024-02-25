import {BodyComponent, Block, Joint, ComposedComponent} from "./BodyComponent";
import {Pose, Action} from "./PoseAction";
import {rotateJoint} from "./Joint";
import {获取旋转参数} from "./Rotation";

class Executor {
  constructor() {
    this.activeComponent = null;
  }

  executeActionScript(components, script) {
    // Assign the script variables to the components
    const variableMap = components.reduce((acc, comp, i) => {
      acc[script.variables[i]] = comp;
      return acc;
    }, {});

    // todo: 设置速度

    // If the execution method is "循环", then loop
    if (script.executionMethod === "循环") {
      this.executeLoopScript(script, variableMap);
    }

    // 假如有次数，执行次数
    for (let i = 0; i < script.frequency; i++) {
      this.executeScript(script, variableMap);
    }
  }

  executeLoopScript(script, variableMap) {
    while (true) {
      this.executeScript(script, variableMap);
      // 每次执行完毕后，等待一段时间

    }
  }

  executeScript(script, variableMap) {
      script.scriptFlow.forEach((item) => {
        item.keyPoints.forEach((keypoint) => {
          const {part, targetPoseOrAction} = keypoint;
          const component = variableMap[part];
          
          if (targetPoseOrAction) {
            this.executePoseOrAction(component, targetPoseOrAction);
          } else {
            console.error("Invalid targetPoseOrAction");
          }
        });
        // 每个要点执行完毕后，等待一段时间
      });
  }

  // 批量执行姿态或动作（对所有部位执行相同的姿态或动作）
  batchExecutePoseOrAction(components, targetPoseOrAction) {
    components.forEach((component) => {
      this.executePoseOrAction(component, targetPoseOrAction);
    });
  }

  executePoseOrAction(component, targetPoseOrAction) {
    if (component) {
      this.activeComponent = 从字符串获取部位实例(component);
    }
    
    // Depending on the type of the current active component, call relevant methods
    if(this.activeComponent instanceof BodyComponent){
      // 判断 targetPoseOrAction 是姿态还是动作
      if (targetPoseOrAction instanceof Pose) {
        this.executeGeneralPose(this.activeComponent, targetPoseOrAction);
      } else if (targetPoseOrAction instanceof Action) {
        this.executeGeneralAction(this.activeComponent, targetPoseOrAction);
      }
    }else if(this.activeComponent instanceof Block){
      // 判断 targetPoseOrAction 是姿态还是动作
      if (targetPoseOrAction instanceof Pose) {
        this.executeBlockPose(this.activeComponent, targetPoseOrAction);
      } else if (targetPoseOrAction instanceof Action) {
        this.executeBlockAction(this.activeComponent, targetPoseOrAction);
      }
    }else if(this.activeComponent instanceof Joint){
      // 判断 targetPoseOrAction 是姿态还是动作
      if (targetPoseOrAction instanceof Pose) {
        this.executeJointPose(this.activeComponent, targetPoseOrAction);
      } else if (targetPoseOrAction instanceof Action) {
        this.executeJointAction(this.activeComponent, targetPoseOrAction);
      }
    }else if(this.activeComponent instanceof ComposedComponent){
      // 判断 targetPoseOrAction 是姿态还是动作
      if (targetPoseOrAction instanceof Pose) {
        this.executeComposedComponentPose(this.activeComponent, targetPoseOrAction);
      } else if (targetPoseOrAction instanceof Action) {
        this.executeComposedComponentAction(this.activeComponent, targetPoseOrAction);
      }
    } 
  }

  executeGeneralPose(generalBodyComponent, targetPose) {

  }

  executeGeneralAction(generalBodyComponent, targetAction) {
      
    }

  executeBlockPose(block, targetPose) {

  }

  executeBlockAction(block, targetAction) {
      
    }

  // 执行关节姿态
  executeJointPose(joint, targetPose) {

  }

  /**
   * 执行关节动作
   * @param {*} joint 
   * @param {*} targetAction  绕关节旋转 | 移动
   *      
   * type: "rotate" | "move",
   */
  executeJointAction(joint, targetAction) {
    const {type, joint, rotationAmplitude,rotationDirection} = targetAction;
    if (type === 'rotate') {
      rotateJoint(joint, 获取旋转参数(joint, rotationAmplitude, rotationDirection));
    } else if (type === 'move') {
      // Implement corresponding logic here because the targetAction structure for 'move' has not been specified
    }
    }

  executeComposedComponentPose(composedComponent, targetPose) {

  }

  executeComposedComponentAction(composedComponent, targetAction) {

  }
  
}
